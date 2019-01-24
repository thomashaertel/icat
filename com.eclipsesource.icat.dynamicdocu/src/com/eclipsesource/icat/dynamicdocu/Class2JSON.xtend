package com.eclipsesource.icat.dynamicdocu

import org.eclipse.emf.ecore.EClass
import org.eclipse.emf.ecore.EClassifier
import org.eclipse.emf.ecore.EDataType
import org.eclipse.emf.ecore.EEnum
import org.eclipse.emf.ecore.ENamedElement
import org.eclipse.emf.ecore.EOperation
import org.eclipse.emf.ecore.EPackage
import org.eclipse.emf.ecore.EStructuralFeature
import org.eclipse.emf.ecore.ETypedElement
import org.eclipse.emf.ecore.EGenericType
import org.eclipse.emf.ecore.EEnumLiteral

class Class2JSON {

	static def String generate(EPackage[] ePackages) {
		return '''
			«FOR ePackage:ePackages BEFORE '{' SEPARATOR ',' AFTER '}'»
				"«ePackage.name»":«generate(ePackage)»
			«ENDFOR»
		'''
	}

	static def String generate(EPackage ePackage) {
		var classes = ePackage.EClassifiers.filter(EClass);
		var eenums = ePackage.EClassifiers.filter(EEnum);
		var dataTypes = ePackage.EClassifiers.filter(EDataType).reject(EEnum);
		return '''{
	"name": "«ePackage.name»",
	"description": "«getDocumentation(ePackage)»",
	«IF classes.length >0»
		"classes": [
			«FOR clazz:classes SEPARATOR ','»
				{
					«generate(clazz)»
				}
			«ENDFOR»
		]«IF eenums.length >0 || dataTypes.length >0»,«ENDIF»
	«ENDIF»
	«IF eenums.length >0»
		"enums": [
			«FOR eenum:eenums SEPARATOR ','»
				{
					«generate(eenum)»
				}
			«ENDFOR»
		]«IF dataTypes.length >0»,«ENDIF»
	«ENDIF»
	«IF dataTypes.length >0»
		"dataTypes": [
			«FOR dataType:dataTypes SEPARATOR ','»
				{
					«generate(dataType)»
				}
			«ENDFOR»
		]
	«ENDIF»
}'''
	}
	static def String generate(EClassifier eClassifier) {
		'''
		"name": "«eClassifier.name»",
		"description": "«getDocumentation(eClassifier)»",
		"package": "«eClassifier.EPackage.name»",
		«generateInner(eClassifier)»
		'''
	}
	static def String generate(ENamedElement namedElement) {
		'''
		"name": "«namedElement.name»",
		"description": "«getDocumentation(namedElement)»",
		«generateInner(namedElement)»
		'''
	}

	static def dispatch String generateInner(EClass eClass) {
		'''
		«IF eClass.ESuperTypes.length >0»
			"superTypes": [
				«FOR type:eClass.ESuperTypes SEPARATOR ', '»
					"«type.name»"
				«ENDFOR»
			]«IF eClass.EAttributes.length >0 || eClass.EReferences.length >0 || eClass.EOperations.length >0»,«ENDIF»
		«ENDIF»
		«IF eClass.EAttributes.length >0»
			"attributes": [
				«FOR attribute:eClass.EAttributes SEPARATOR ','»
				{
					«generate(attribute)»
				}
				«ENDFOR»
			]«IF eClass.EReferences.length >0 || eClass.EOperations.length >0»,«ENDIF»
		«ENDIF»
		«IF eClass.EReferences.length >0»
			"references": [
				«FOR reference:eClass.EReferences SEPARATOR ','»
				{
					«generate(reference)»
				}
				«ENDFOR»
			]«IF eClass.EOperations.length >0»,«ENDIF»
		«ENDIF»
		«IF eClass.EOperations.length >0»
			"operations": [
				«FOR operation:eClass.EOperations SEPARATOR ','»
				{
					«generate(operation)»
				}
				«ENDFOR»
			]
		«ENDIF»
		'''
	}
	static def dispatch String generateInner(EEnum eenum) {
		'''
		«IF eenum.ELiterals.length >0»
			"literals": [
				«FOR literal:eenum.ELiterals SEPARATOR ','»
					{
						«generate(literal)»
					}
				«ENDFOR»
			]
		«ENDIF»
		'''
	}
	static def dispatch String generateInner(EDataType dataType) {
		'''
		"type":"«dataType.instanceClassName»"
		'''
	}
	static def dispatch String generateInner(EStructuralFeature feature) {
		var featureType = getFeatureType(feature);
		'''
		"package": "«featureType.ePackage»",
		"type": "«featureType.eClassifier»",
		"many": «feature.many»
		'''
	}
	static def dispatch String generateInner(EOperation operation) {
		var featureType = getFeatureType(operation);
		'''
		"package": "«featureType.ePackage»",
		"type": "«featureType.eClassifier»",
		"many": «operation.many»«IF operation.EParameters.length >0»,«ENDIF»
		«IF operation.EParameters.length >0»
			"parameters": [
				«FOR parameter:operation.EParameters SEPARATOR ','»
				{
					"name": "«parameter.name»",
					"type": "«getFeatureType(parameter).eClassifier»",
					"package": "«getFeatureType(parameter).ePackage»",
				}
				«ENDFOR»
			]
		«ENDIF»
		'''
	}
	static def dispatch String generateInner(EEnumLiteral literal) {
		'''
		"value":«literal.value»
		'''
	}

	static def String getDocumentation(ENamedElement modelElement) {
		if (modelElement.getEAnnotation('http://www.eclipse.org/emf/2002/GenModel') === null ||
			!modelElement.getEAnnotation('http://www.eclipse.org/emf/2002/GenModel').details.containsKey('documentation')) {
			return '''Documentation of the «modelElement.eClass.name.toFirstUpper» «modelElement.name».'''
		} else {
			return modelElement.getEAnnotation('http://www.eclipse.org/emf/2002/GenModel').details.get('documentation').replaceAll("\"","'").replaceAll("\\R","\\\\n").replaceAll("\\t","\\\\t")
		}
	}
	
	static def FeaturePackagePair getFeatureType(ETypedElement typedElement) {
		if(typedElement.EGenericType !== null)
			return getFeatureType(typedElement.EGenericType);
		return getFeatureType(typedElement.EType);
	}
	static def FeaturePackagePair getFeatureType(EGenericType classifier) {
		var base = getFeatureType(classifier.ERawType);
		if(classifier.ETypeArguments.length !==0){
			base.eClassifier+='''«FOR type:classifier.ETypeArguments BEFORE '<' SEPARATOR ', ' AFTER '>'»«getFeatureType(type)»«ENDFOR»''';			
		}
		return base;
	}
	static def FeaturePackagePair getFeatureType(EClassifier classifier) {
		if(classifier=== null){
			return new FeaturePackagePair(classifier.EPackage.name, 'void');
		}
		else if (classifier.instanceClass !== null) {
			return new FeaturePackagePair(classifier.EPackage.name, classifier.instanceClass.simpleName);
		} else {
			return new FeaturePackagePair(classifier.EPackage.name, classifier.name);
		}
	}
}

class FeaturePackagePair {
	public String ePackage;
	public String eClassifier;
	
	new(String ePackage, String eClassifier) {
		this.ePackage = ePackage;
		this.eClassifier = eClassifier;
	}
	
}
