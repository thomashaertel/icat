package com.eclipsesource.icat.pojo

import java.util.Set
import java.util.TreeSet
import org.eclipse.emf.ecore.EAttribute
import org.eclipse.emf.ecore.EClass
import org.eclipse.emf.ecore.EEnum
import org.eclipse.emf.ecore.EReference
import org.eclipse.emf.ecore.EStructuralFeature

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

	static def Set<String> getImports(String basePackage, EClass eClass) {
		val imports = new TreeSet<String>();
		for (EStructuralFeature feature : eClass.EStructuralFeatures) {
			if (feature instanceof EAttribute) {
				if (feature.EAttributeType instanceof EEnum) {
					imports.add(basePackage + '.' + eClass.EPackage.name + '.' + feature.EAttributeType.name);
				}
			} else if (feature instanceof EReference) {
				if (feature.EReferenceType.instanceClass !== null) {
					imports.add(feature.EReferenceType.instanceClass.name);
				} else {
					imports.add(basePackage + '.' + eClass.EPackage.name + '.' + feature.EReferenceType.name);
				}
			}
		}
		imports.add(basePackage + '.' + eClass.EPackage.name + '.' + eClass.name);
		return imports;
	}
}