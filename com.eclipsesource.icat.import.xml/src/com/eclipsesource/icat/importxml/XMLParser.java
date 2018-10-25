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
import org.eclipse.emf.ecore.ENamedElement;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.EReference;
import org.eclipse.emf.ecore.EcoreFactory;
import org.eclipse.emf.ecore.EcorePackage;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.xmi.impl.EcoreResourceFactoryImpl;

import com.eclipsesource.icat.importxml.model.Entry;
import com.eclipsesource.icat.importxml.model.Field;

public class XMLParser {

	public static void ecoreFromXml(Path folderPath, Path ecoreFolderPath) {
		try {
			Map<String, Entry> entries = parseFolder(folderPath);
			Map<String, EPackage> ePackages = preparePackages(entries);
			convertEntries(entries, ePackages);

			for (EPackage ePackage : ePackages.values()) {
				Resource resource = createResource(ecoreFolderPath.resolve(simplePackageName(ePackage) + ".ecore"));
				resource.getContents().add(ePackage);
				resource.save(null);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
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
			JAXBContext jaxbContext = JAXBContext.newInstance(Entry.class);

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
				.collect(Collectors.toMap(ENamedElement::getName, Function.identity()));
	}

	private static EPackage getEPackage(String name) {
		EPackage ePackage = EcoreFactory.eINSTANCE.createEPackage();
		ePackage.setName(name);
		return ePackage;
	}

	private static void convertEntries(Map<String, Entry> entries, Map<String, EPackage> ePackages) {
		for (Entry entry : entries.values()) {
			convert(entry, ePackages, entries);
		}
	}

	private static void convert(Entry entry, Map<String, EPackage> ePackages, Map<String, Entry> entries) {
		EPackage ePackage = ePackages.computeIfAbsent(entry.getPackageName(), XMLParser::getEPackage);
		EClass eClass = EcoreFactory.eINSTANCE.createEClass();
		eClass.setName(entry.getName());
		for (Field field : entry.getField()) {
			if (field.getJoinSrcKey() == null) {
				EAttribute eAttribute = EcoreFactory.eINSTANCE.createEAttribute();
				eAttribute.setName(field.getName());
				if (field.getLength() == 0) {
					Optional<EClassifier> dataType = EcorePackage.eINSTANCE.getEClassifiers().stream()
							.filter(e -> e instanceof EDataType)
							.filter(e -> e.getInstanceClassName().equalsIgnoreCase(field.getJavaType())).findFirst();
					if (dataType.isPresent())
						eAttribute.setEType(dataType.get());
				} else {
					EDataType eDataType = EcoreFactory.eINSTANCE.createEDataType();
					eDataType.setInstanceTypeName(field.getJavaType());
					eDataType.setName(entry.getName() + "_" + field.getName() + "_Type");
					EAnnotation eAnnotation = EcoreFactory.eINSTANCE.createEAnnotation();
					eAnnotation.setSource("http:///org/eclipse/emf/ecore/util/ExtendedMetaData");
					eAnnotation.getDetails().put("maxLength", Short.toString(field.getLength()));
					eDataType.getEAnnotations().add(eAnnotation);
					ePackage.getEClassifiers().add(eDataType);
					eAttribute.setEType(eDataType);
				}
				eClass.getEStructuralFeatures().add(eAttribute);
			} else {
				EReference eReference = EcoreFactory.eINSTANCE.createEReference();
				eReference.setName(field.getName());
				String javaType = field.getJavaType();
				int indexOfLastDot = javaType.lastIndexOf(".");
				String packageName = javaType.substring(0, indexOfLastDot);
				String typeName = javaType.substring(indexOfLastDot + 1);
				EPackage referencedPackage = ePackages.get(packageName);
				EClassifier referencedClassifier = referencedPackage.getEClassifier(typeName);
				if (referencedClassifier == null) {
					convert(entries.get(javaType), ePackages, entries);
					referencedClassifier = referencedPackage.getEClassifier(typeName);
				}
				eReference.setEType(referencedClassifier);

				eClass.getEStructuralFeatures().add(eReference);
			}
		}
		ePackage.getEClassifiers().add(eClass);
	}

	private static Resource createResource(Path ecorePath) throws IOException {
		ResourceSet rs = new ResourceSetImpl();
		rs.getResourceFactoryRegistry().getExtensionToFactoryMap().put("*", new EcoreResourceFactoryImpl());
		EcorePackage.eINSTANCE.eClass();

		Resource resource = rs.createResource(URI.createFileURI(ecorePath.toString()));

		return resource;
	}

	private static String simplePackageName(EPackage ePackage) {
		String result = ePackage.getName();
		int indexOfDot = result.lastIndexOf(".");
		if (indexOfDot == -1)
			return result;
		return result.substring(indexOfDot + 1);
	}

}
