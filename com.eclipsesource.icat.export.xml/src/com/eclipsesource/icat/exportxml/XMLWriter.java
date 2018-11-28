package com.eclipsesource.icat.exportxml;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.function.Function;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;

import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EAnnotation;
import org.eclipse.emf.ecore.EAttribute;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.EStructuralFeature;
import org.eclipse.emf.ecore.EcorePackage;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.xmi.impl.EcoreResourceFactoryImpl;

import com.eclipsesource.icat.schemaxml.model.Entry;
import com.eclipsesource.icat.schemaxml.model.Field;

public class XMLWriter {

	public static void convertXML(Path ecoreFolderPath, Path xmlFolder) throws IOException {
		Files.list(ecoreFolderPath).filter(p -> p.toString().endsWith(".ecore")).map(XMLWriter::createResource).forEach(e -> convertXML(e, xmlFolder));
	}
	
	private static Resource createResource(Path ecorePath) {
		ResourceSet rs = new ResourceSetImpl();
		rs.getResourceFactoryRegistry().getExtensionToFactoryMap().put("*", new EcoreResourceFactoryImpl());
		EcorePackage.eINSTANCE.eClass();

		Resource resource = rs.createResource(URI.createFileURI(ecorePath.toString()));
		
		try {
			resource.load(null);
		} catch (IOException e) {
			e.printStackTrace();
		}

		return resource;
	}
	
	public static void convertXML(Resource resource, Path xmlFolder) {
		if(!resource.isLoaded())
			return;
		EPackage ePackage= (EPackage) resource.getContents().get(0);
		ePackage.getEClassifiers().stream().filter(EClass.class::isInstance).map(EClass.class::cast).map(XMLWriter::getEntry).forEach(e -> writeXML(e, xmlFolder));
	}
	
	private static Entry getEntry(EClass eClass) {
		Entry entry =  new Entry();
		
		entry.setName(eClass.getName());
		entry.setXmlName(eClass.getName());
		entry.setPackageName(eClass.getEPackage().getNsURI());
		
		EAnnotation eAnnotation = eClass.getEAnnotation("com.eclipsesource.icat.schemaxml");
		if(eAnnotation != null) {
			entry.setApplication(getValue(eAnnotation, "Application", Function.identity()));
			entry.setDeleted(getValue(eAnnotation, "Deleted", Boolean::valueOf));
			entry.setParent(getValue(eAnnotation, "Parent", Function.identity()));
			entry.setSchema(getValue(eAnnotation, "Schema", Function.identity()));
			entry.setTable(getValue(eAnnotation, "Table", Function.identity()));
			entry.setUnit(getValue(eAnnotation, "Unit", Function.identity()));
		}
		
		eClass.getEStructuralFeatures().stream().map(XMLWriter::feature2Field).forEach(entry.getField()::addAll);
		return entry;
	}
	private static <T>  T getValue(EAnnotation annotation, String key, Function<String, T> transform) {
		return transform.apply(annotation.getDetails().get(key));
	}
	private static Collection<Field> feature2Field(EStructuralFeature feature) {
		Field field = new Field();
		EAnnotation eAnnotation = feature.getEAnnotation("com.eclipsesource.icat.schemaxml");
		if(eAnnotation == null) {
			System.out.println("The EClass "+feature.getEContainingClass().getName()+" is missing the anntotation.");
			return Collections.emptySet();
		}
		field.setBk(getValue(eAnnotation, "Bk", Boolean::valueOf));
		field.setCascadeType(getValue(eAnnotation, "CascadeType", Function.identity()));
		field.setColumn(getValue(eAnnotation, "Column", Function.identity()));
		field.setCustomType(getValue(eAnnotation, "CustomType", Function.identity()));
		field.setDbType(getValue(eAnnotation, "DbType", Short::valueOf));
		field.setDigit(getValue(eAnnotation, "Digit", Short::valueOf));
		field.setFk(getValue(eAnnotation, "Fk", Boolean::valueOf));
		field.setInsertable(getValue(eAnnotation, "Insertable", Boolean::parseBoolean));
		if(feature instanceof EAttribute)
			field.setJavaType(feature.getEType().getInstanceTypeName());
		else
			field.setJavaType(feature.getEType().getEPackage().getNsURI()+"."+feature.getEType().getName());
		field.setJoinDstKey(getValue(eAnnotation, "JoinDstKey", Function.identity()));
		String joinSrcKey = getValue(eAnnotation, "JoinSrcKey", Function.identity());
		field.setJoinSrcKey(joinSrcKey);
		field.setJoinTable(getValue(eAnnotation, "JoinTable", Function.identity()));
		field.setLength(getValue(eAnnotation, "Length", Short::valueOf));
		field.setLob(getValue(eAnnotation, "Lob", Boolean::valueOf));
		field.setMappedBy(getValue(eAnnotation, "MappedBy", Function.identity()));
		field.setName(feature.getName());
		field.setNullable(feature.isUnsettable());
		field.setPk(getValue(eAnnotation, "Pk", Boolean::valueOf));
		field.setRelation(getValue(eAnnotation, "Relation", Function.identity()));
		field.setUpdatable(feature.isChangeable());
		field.setXmlAttribute(getValue(eAnnotation, "XmlAttribute", Boolean::valueOf));
		field.setXmlName(getValue(eAnnotation, "XmlName", Function.identity()));
		
		if(joinSrcKey!=null) {
			Field fkField = getForeignKeyField(joinSrcKey,feature.getName());
			return Arrays.asList(fkField,field);
		}
		return Collections.singleton(field);
	}
	private static Field getForeignKeyField(String columnName,String name) {
		Field field = new Field();
				
		field.setBk(false);
		field.setColumn(columnName);
		field.setDbType((short)12);
		field.setDigit((short)0);
		field.setFk(true);
		field.setInsertable(true);
		field.setJavaType("java.lang.String");
		field.setLength((short)23);
		field.setLob(false);
		field.setName(name);
		field.setNullable(true);
		field.setPk(false);
		field.setUpdatable(true);
		field.setXmlAttribute(false);
		field.setXmlName(name);
		
		return field;
	}
	private static void writeXML(Entry entry, Path xmlPath) {
		try {
			JAXBContext jaxbContext = JAXBContext.newInstance("com.eclipsesource.icat.schemaxml.model", Entry.class.getClassLoader());
			
			Marshaller jaxbMarshaller = jaxbContext.createMarshaller();
			String subFolder = entry.getPackageName();
			Path packagePath = xmlPath.resolve(subFolder.substring(subFolder.lastIndexOf(".")+1));
			Files.createDirectories(packagePath);
			Path entryPath = packagePath.resolve(entry.getName()+".xml");
			jaxbMarshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
			jaxbMarshaller.marshal(entry, entryPath.toFile());

		} catch (JAXBException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

}
