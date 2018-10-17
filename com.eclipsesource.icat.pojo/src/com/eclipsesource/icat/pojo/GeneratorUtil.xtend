package com.eclipsesource.icat.pojo

import java.util.Set
import java.util.TreeSet
import org.eclipse.emf.ecore.EAttribute
import org.eclipse.emf.ecore.EClass
import org.eclipse.emf.ecore.EEnum
import org.eclipse.emf.ecore.EReference
import org.eclipse.emf.ecore.EStructuralFeature
import org.eclipse.emf.ecore.EPackage

class GeneratorUtil {
	static def String getFeatureType(EStructuralFeature feature) {
		if (feature instanceof EAttribute) {
			if (feature.EAttributeType.instanceClass !== null) {
				return feature.EAttributeType.instanceClass.simpleName
			} else {
				return feature.EAttributeType.name;
			}
		}
		if (feature instanceof EReference)
			return feature.EReferenceType.name;
	}

	static def Set<String> getImports(EClass eClass, boolean impl) {
		val imports = new TreeSet<String>();
		for (EStructuralFeature feature : eClass.EStructuralFeatures) {
			if (feature instanceof EAttribute) {
				if (feature.EAttributeType instanceof EEnum) {
					imports.add(eClass.EPackage.name + '.' + feature.EAttributeType.name);
				}
				else if (feature.EAttributeType.instanceClass !==null && !feature.EAttributeType.instanceClass.primitive && !feature.EAttributeType.instanceClassName.startsWith('java.lang')) {
					imports.add(feature.EAttributeType.instanceClassName);
				}
			} else if (feature instanceof EReference) {
				if (feature.EReferenceType.instanceClass !== null) {
					imports.add(feature.EReferenceType.instanceClass.name);
				} else {
					imports.add(eClass.EPackage.name + '.' + feature.EReferenceType.name);
				}
			}
		}
		for (EClass superType: eClass.ESuperTypes) {
			if(!impl){
				imports.add((superType.eContainer as EPackage).name + '.' + superType.name);				
			}
			else{
				imports.add((superType.eContainer as EPackage).name + '.impl.' + superType.name+'Impl');
			}
		}
		
		if(impl){
			imports.add(eClass.EPackage.name + '.' + eClass.name);
		}
		
		return imports;
	}
}
