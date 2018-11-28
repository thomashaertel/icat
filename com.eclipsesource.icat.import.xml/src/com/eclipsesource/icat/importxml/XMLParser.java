package com.eclipsesource.icat.importxml;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;

import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EAnnotation;
import org.eclipse.emf.ecore.EAttribute;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EClassifier;
import org.eclipse.emf.ecore.EDataType;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.EReference;
import org.eclipse.emf.ecore.EStructuralFeature;
import org.eclipse.emf.ecore.EcoreFactory;
import org.eclipse.emf.ecore.EcorePackage;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.xmi.impl.EcoreResourceFactoryImpl;

import com.eclipsesource.icat.schemaxml.model.Entry;
import com.eclipsesource.icat.schemaxml.model.Field;

public class XMLParser {

	public static void ecoreFromXml(Path folderPath, Path ecoreFolderPath) {
		try {
			Map<String, Entry> entries = parseFolder(folderPath);
			Map<String, EPackage> ePackages = preparePackages(entries);
			convertEntries(entries, ePackages);
			
			ResourceSet rs = new ResourceSetImpl();
			rs.getResourceFactoryRegistry().getExtensionToFactoryMap().put("*", new EcoreResourceFactoryImpl());
			EcorePackage.eINSTANCE.eClass();
			
			ePackages.values().stream().map(p->addPackageToResource(rs,ecoreFolderPath,p)).forEach(rs.getResources()::add);
			
			for(Resource r:rs.getResources())
				r.save(null);
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	private static Resource addPackageToResource(ResourceSet rs,Path ecoreFolderPath, EPackage ePackage) {
		Resource resource = rs.createResource(URI.createFileURI(ecoreFolderPath.resolve(ePackage.getNsURI() + ".ecore").toString()));
		resource.getContents().add(ePackage);
		return resource;
	}
	

	public static Map<String, Entry> parseFolder(Path folderPath) throws IOException {
		try (Stream<Path> stream = Files.find(folderPath, Integer.MAX_VALUE,
				(p, a) -> p.getFileName().toString().endsWith(".xml"));) {
			return stream.map(XMLParser::parseXML).filter(Objects::nonNull)
					.collect(Collectors.toMap(e -> e.getPackageName() + "." + e.getName(), Function.identity()));

		}
	}

	public static Entry parseXML(Path xmlPath) {
		try {
			JAXBContext jaxbContext = JAXBContext.newInstance("com.eclipsesource.icat.schemaxml.model", Entry.class.getClassLoader());

			Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
			return (Entry) jaxbUnmarshaller.unmarshal(xmlPath.toFile());

		} catch (JAXBException e) {
			e.printStackTrace();
		}
		return null;

	}

	private static Map<String, EPackage> preparePackages(Map<String, Entry> entries) {
		Set<String> keySet = entries.keySet();
		return keySet.stream().map(k -> k.substring(0, k.lastIndexOf("."))).distinct().map(XMLParser::getEPackage)
				.collect(Collectors.toMap(EPackage::getNsURI, Function.identity()));
	}

	private static EPackage getEPackage(String name) {
		EPackage ePackage = EcoreFactory.eINSTANCE.createEPackage();
		ePackage.setName(simplePackageName(name));
		ePackage.setNsPrefix(simplePackageName(name));
		ePackage.setNsURI(name);
		return ePackage;
	}

	private static void convertEntries(Map<String, Entry> entries, Map<String, EPackage> ePackages) {
		for (Entry entry : entries.values()) {
			EPackage referencedPackage = ePackages.get(entry.getPackageName());
			if (referencedPackage == null) {
				continue;
			}
			EClassifier referencedClassifier = referencedPackage.getEClassifier(entry.getName());
			if (referencedClassifier != null)
				continue;

			convert(entry, ePackages, entries);
		}
	}

	private static void convert(Entry entry, Map<String, EPackage> ePackages, Map<String, Entry> entries) {
		EPackage ePackage = ePackages.computeIfAbsent(entry.getPackageName(), XMLParser::getEPackage);
		EClass eClass = EcoreFactory.eINSTANCE.createEClass();
		eClass.setName(entry.getName());
		EAnnotation annotation = EcoreFactory.eINSTANCE.createEAnnotation();
		annotation.setSource("com.eclipsesource.icat.schemaxml");
		annotation.getDetails().put("Application", entry.getApplication());
		annotation.getDetails().put("Deleted", Boolean.toString(entry.isDeleted()));
		annotation.getDetails().put("Parent", entry.getParent());
		annotation.getDetails().put("Schema", entry.getSchema());
		annotation.getDetails().put("Table", entry.getTable());
		annotation.getDetails().put("Unit", entry.getUnit());
		ePackage.getEAnnotations().add(annotation);
		
		ePackage.getEClassifiers().add(eClass);
		for (Field field : entry.getField()) {
			EStructuralFeature feature = getFeature(entry, field, eClass, ePackages, entries);
			if (feature == null) {
				System.err.println("Could not parse Field '" + field.getName() + "' of Entry '" + entry.getPackageName()
						+ "." + entry.getName() + "'. Type is '" + field.getJavaType() + "'.");
				continue;
			}
			if ("1_M".equals(field.getRelation())) {
				feature.setUpperBound(-1);
			}
			feature.setUnsettable(field.isNullable());
			feature.setChangeable(field.isUpdatable());

			EStructuralFeature existingFeature = eClass.getEStructuralFeature(feature.getName());
			feature.getEAnnotations().add(convertAdditionalAttributes(field));
			
			if (existingFeature != null) {
				// case 1 we added foreign key before
				String currentJoinSrc = getAnnotationValue(feature,"JoinSrcKey");
				String existingJoinSrc = getAnnotationValue(existingFeature,"JoinSrcKey");
				if(currentJoinSrc!=null && currentJoinSrc.equals(getAnnotationValue(existingFeature,"Column"))) {
					eClass.getEStructuralFeatures().remove(existingFeature);
					eClass.getEStructuralFeatures().add(feature);
				}
				// case 2 we are adding foreign key now
				else if(existingJoinSrc!=null && existingJoinSrc.equals(getAnnotationValue(feature,"Column"))) {
					// do nothing just ignore
					continue;
				} else {
					System.err.println("A Feature with the Name '" + existingFeature.getName()
							+ "' already exists in EClass '" + entry.getPackageName()+"."+existingFeature.getEContainingClass().getName()
							+ "' it will be replaced. Feature Type was '" + existingFeature.getEType().getName() + "'.");
					eClass.getEStructuralFeatures().remove(existingFeature);
				}
			}
			eClass.getEStructuralFeatures().add(feature);
			
		}
	}
	
	private static String getAnnotationValue(EStructuralFeature feature, String key) {
		return feature.getEAnnotation("com.eclipsesource.icat.schemaxml").getDetails().get(key);
	}

	private static EAnnotation convertAdditionalAttributes(Field field) {
		EAnnotation annotation = EcoreFactory.eINSTANCE.createEAnnotation();
		annotation.setSource("com.eclipsesource.icat.schemaxml");
			
		annotation.getDetails().put("Bk", String.valueOf(field.isBk()));
		annotation.getDetails().put("CascadeType", field.getCascadeType());
		annotation.getDetails().put("Column", field.getColumn());
		annotation.getDetails().put("CustomType", field.getCustomType());
		annotation.getDetails().put("DbType", String.valueOf(field.getDbType()));
		annotation.getDetails().put("Digit", String.valueOf(field.getDigit()));
		annotation.getDetails().put("Fk", String.valueOf(field.isFk()));
		annotation.getDetails().put("Insertable", String.valueOf(field.isInsertable()));
		annotation.getDetails().put("JoinDstKey", field.getJoinDstKey());
		annotation.getDetails().put("JoinSrcKey", field.getJoinSrcKey());
		annotation.getDetails().put("JoinTable", field.getJoinTable());		
		annotation.getDetails().put("Length", String.valueOf(field.getLength()));
		annotation.getDetails().put("Lob", String.valueOf(field.isLob()));
		annotation.getDetails().put("MappedBy", field.getMappedBy());
		annotation.getDetails().put("Pk", String.valueOf(field.isPk()));
		annotation.getDetails().put("Relation", field.getRelation());
		annotation.getDetails().put("XmlAttribute", String.valueOf(field.isXmlAttribute()));
		annotation.getDetails().put("XmlName", field.getXmlName());
		
		return annotation;
	}

	private static EStructuralFeature getFeature(Entry entry, Field field, EClass eClass,
			Map<String, EPackage> ePackages, Map<String, Entry> entries) {
		Optional<EClassifier> dataType = EcorePackage.eINSTANCE.getEClassifiers().stream()
				.filter(e -> e instanceof EDataType)
				.filter(e -> e.getInstanceClassName().equalsIgnoreCase(field.getJavaType().replaceAll(" ", ""))).findFirst();
		if (dataType.isPresent()) {
			EAttribute eAttribute = EcoreFactory.eINSTANCE.createEAttribute();
			eAttribute.setName(field.getName());
			eAttribute.setEType(dataType.get());
			return eAttribute;
		} else {
			EReference eReference = EcoreFactory.eINSTANCE.createEReference();
			eReference.setName(field.getName());
			String javaType = field.getJavaType();
			int indexOfLastDot = javaType.lastIndexOf(".");
			String packageName = javaType.substring(0, indexOfLastDot);
			String typeName = javaType.substring(indexOfLastDot + 1);
			EPackage referencedPackage = ePackages.get(packageName);
			if (referencedPackage == null) {
				return null;
			}
			EClassifier referencedClassifier = referencedPackage.getEClassifier(typeName);
			if (referencedClassifier == null) {
				convert(entries.get(javaType), ePackages, entries);
				referencedClassifier = referencedPackage.getEClassifier(typeName);
			}
			eReference.setEType(referencedClassifier);
			return eReference;
		}
	}


	private static String simplePackageName(String packageName) {
		int indexOfDot = packageName.lastIndexOf(".");
		if (indexOfDot == -1)
			return packageName;
		return packageName.substring(indexOfDot + 1);
	}

}
