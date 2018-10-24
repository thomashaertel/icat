package com.eclipsesource.icat.webdocu

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.List
import org.eclipse.emf.ecore.EClass
import org.eclipse.emf.ecore.EClassifier
import org.eclipse.emf.ecore.EDataType
import org.eclipse.emf.ecore.EEnum
import org.eclipse.emf.ecore.EOperation
import org.eclipse.emf.ecore.ETypedElement
import org.eclipse.emf.ecore.EGenericType

class GeneratorClass {
	
	static def String generate(EClassifier eClassifier) {
		'''	
			<!-- auto-generated from '«eClassifier.name»' at «DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss").format(LocalDateTime.now)» -->
			<html>
				<head>
					<title>«eClassifier.name»</title>
					<link href="../styles/docu.css" rel="stylesheet" type="text/css">
				</head>
				<body>
					<div class='head'>
						<div class='center'>
							<h1>«eClassifier.name»</h1>
						</div>
					</div>
					<div id='toc' class='toc'>
						<div class='center'>
							<span>Jump to:</span>
							<ol>
								«FOR toc : getToc(eClassifier)»
									<li>
										<a rel="internal" href="#«toc»">«toc.toFirstUpper»</a>
									</li>
								«ENDFOR»
							</ol>
						</div>
					</div>
					<div class='content center'>
						<nav>
							<div class='crumb'>
								<span>
									Package:
								</span>
								<a href='./«eClassifier.EPackage.name»-overview.html'>«eClassifier.EPackage.name»</a>
							</div>
							«generateNav(eClassifier)»
						</nav>
						<article>
							«generateArticle(eClassifier)»
						</article>
					<div>
				</body>
			</html>
		'''
	}
	
	static def dispatch String generateArticle(EClass eClass) {
		'''	
			<p>
				«IF eClass.getEAnnotation('http://www.eclipse.org/emf/2002/GenModel') === null || !eClass.getEAnnotation('http://www.eclipse.org/emf/2002/GenModel').details.containsKey('documentation')»
				Documentation of the EClass «eClass.name».
				«ELSE»
					«eClass.getEAnnotation('http://www.eclipse.org/emf/2002/GenModel').details.get('documentation')»
				«ENDIF»
			</p>
			<!-- super types -->
			«IF eClass.ESuperTypes.length != 0»
			<h2 id='supertypes'>Super Types</h2>
			<dl>
				«FOR superClass : eClass.ESuperTypes»
					<dt>
						<a href='./«superClass.name».html'>«superClass.name»</a>
					</dt>
					<dd></dd>
				«ENDFOR»
			</dl>
			«ENDIF»
			<!-- features -->
			«IF eClass.EStructuralFeatures.length != 0»
				<h2 id='features'>Features</h2>
				<dl>
				«FOR feature : eClass.EStructuralFeatures»
					<dt id='«eClass.name».«feature.name»'>
						«IF !feature.many»
							«IF hasLink(feature)»
								<code><a href='./«getFeatureType(feature)».html'>«getFeatureType(feature)»</a> «feature.name»</code>
							«ELSE»
								<code>«getFeatureType(feature)» «feature.name»</code>
							«ENDIF»
						«ELSE»
							«IF hasLink(feature)»
								<code>List&lt;<a href='./«getFeatureType(feature)».html'>«getFeatureType(feature)»</a>&gt; «feature.name»</code>
							«ELSE»
								<code>List&lt;«getFeatureType(feature)»&gt; «feature.name»</code>
							«ENDIF»
						«ENDIF»
					</dt>
					<dd>
						«IF feature.getEAnnotation('http://www.eclipse.org/emf/2002/GenModel') !== null && feature.getEAnnotation('http://www.eclipse.org/emf/2002/GenModel').details.containsKey('documentation')»
							«feature.getEAnnotation('http://www.eclipse.org/emf/2002/GenModel').details.get('documentation')»
						«ENDIF»
					</dd>
				«ENDFOR»
				</dl>
			«ENDIF»
			<!-- operations -->
			«IF eClass.EOperations.length != 0»
				<h2 id='operations'>Operations</h2>
				<dl>
				«FOR operation : eClass.EOperations»
					<dt id='«eClass.name».«operation.name»'>
						«IF !operation.many»
							«IF hasLink(operation)»
								<code><a href='./«getFeatureType(operation)».html'>«getFeatureType(operation)»</a> «operation.name»(«getParameters(operation)»)</code>
							«ELSE»
								<code>«getFeatureType(operation)» «operation.name»(«getParameters(operation)»)</code>
							«ENDIF»
						«ELSE»
							«IF hasLink(operation)»
								<code>List&lt;<a href='./«getFeatureType(operation)».html'>«getFeatureType(operation)»</a>&gt; «operation.name»(«getParameters(operation)»)</code>
							«ELSE»
								<code>List&lt;«getFeatureType(operation)»&gt; «operation.name»(«getParameters(operation)»)</code>
							«ENDIF»
						«ENDIF»
					</dt>
					<dd>
						«IF operation.getEAnnotation('http://www.eclipse.org/emf/2002/GenModel') !== null && operation.getEAnnotation('http://www.eclipse.org/emf/2002/GenModel').details.containsKey('documentation')»
							«operation.getEAnnotation('http://www.eclipse.org/emf/2002/GenModel').details.get('documentation')»
						«ENDIF»
					</dd>
				«ENDFOR»
				</dl>
			«ENDIF»
		'''
	}
	
	// strange formating in order to have a plain line 
	def static String getParameters(EOperation operation) {
	'''«FOR param : operation.EParameters SEPARATOR ', '»
			«IF hasLink(param.EType)»
				<a href='./«getFeatureType(param)».html'>«getFeatureType(param)»</a> «param.name»
			«ELSE»
				«getFeatureType(param)» «param.name»«ENDIF»«ENDFOR»'''
	}
	
	static def dispatch String generateArticle(EEnum eEnum) {
		'''	
			<p>
				«IF eEnum.getEAnnotation('http://www.eclipse.org/emf/2002/GenModel') === null || !eEnum.getEAnnotation('http://www.eclipse.org/emf/2002/GenModel').details.containsKey('documentation')»
				Documentation of the Enum «eEnum.name».
				«ELSE»
					«eEnum.getEAnnotation('http://www.eclipse.org/emf/2002/GenModel').details.get('documentation')»
				«ENDIF»
			</p>
			<!-- enum literals -->
			<h2 id='literals'>Enum Literals</h2>
			<dl>
			«FOR literal : eEnum. ELiterals»
				<dt id='«eEnum.name».«literal»'>
					<code>«literal»</code>
				</dt>
				<dd>
					«IF literal.getEAnnotation('http://www.eclipse.org/emf/2002/GenModel') !== null && literal.getEAnnotation('http://www.eclipse.org/emf/2002/GenModel').details.containsKey('documentation')»
						«literal.getEAnnotation('http://www.eclipse.org/emf/2002/GenModel').details.get('documentation')»
					«ENDIF»
				</dd>
			«ENDFOR»
			</dl>
		'''
	}
	static def dispatch String generateArticle(EDataType dataType) {
		'''	
			<p>
				«IF dataType.getEAnnotation('http://www.eclipse.org/emf/2002/GenModel') === null || !dataType.getEAnnotation('http://www.eclipse.org/emf/2002/GenModel').details.containsKey('documentation')»
				Documentation of the DataType «dataType.name».
				«ELSE»
					«dataType.getEAnnotation('http://www.eclipse.org/emf/2002/GenModel').details.get('documentation')»
				«ENDIF»
			</p>
			<!-- dataType -->
			<h2 id='datatype'>DataType</h2>
			<dl>
				<dt id='«dataType.name».instance'>
					<code>«dataType.instanceClassName»</code>
				</dt>
				<dd>
				</dd>
			</dl>
		'''
	}
	static def dispatch String generateNav(EClass eClass) {
		'''	
		<ol>
			<li>
				<!-- super types -->
				«IF eClass.ESuperTypes.length != 0»
				<summary>Super Types</summary>
				<ol>
					«FOR superClass : eClass.ESuperTypes»
						<li>
							<a href='./«superClass.name».html'>«superClass.name»</a>
						</li>
					«ENDFOR»
				</ol>
				«ENDIF»
			</li>
			<li>
				<!-- features -->
				«IF eClass.EStructuralFeatures.length != 0»
					<summary>Features</summary>
					<ol>
					«FOR feature : eClass.EStructuralFeatures»
						<li>
							<a href='#«eClass.name».«feature.name»'><code>«feature.name»</code></a>
						</li>
					«ENDFOR»
					</ol>
				«ENDIF»
			</li>
			<li>
				<!-- operations -->
				«IF eClass.EOperations.length != 0»
					<summary>Operations</summary>
					<ol>
					«FOR operation : eClass.EOperations»
						<li>
							<a href='#«eClass.name».«operation.name»'><code>«operation.name»(«getParameters(operation)»)</code></a>
						</li>
					«ENDFOR»
					</ol>
				«ENDIF»
			</li>
		<ol>
		'''
	}
	
	static def dispatch String generateNav(EEnum eEnum) {
		'''	
		<ol>
			<li>
				<!-- enum literals -->
				<summary>Literals</summary>
				<ol>
				«FOR literal : eEnum. ELiterals»
					<li>
						<a href='#«eEnum.name».«literal»'><code>«literal»</code></a>
					</li>
				«ENDFOR»
				</ol>
			</li>
		<ol>
		'''
	}
	static def dispatch String generateNav(EDataType dataType) {
		'''	
		'''
	}
	static def dispatch List<String> getToc(EClass eClass) {
		val result = newArrayList();
		if(eClass.ESuperTypes.length>0){
			result.add('supertypes');
		}
		if(eClass.EStructuralFeatures.length>0){
			result.add('features');
		}
		if(eClass.EOperations.length>0){
			result.add('operations');
		}
		return result;
		
	}
	static def dispatch List<String> getToc(EEnum eEnum) {
		val result = newArrayList();
		result.add('literals');
		return result;
	}
	static def dispatch List<String> getToc(EDataType eEnum) {
		val result = newArrayList();
		return result;
	}
	static def String getFeatureType(ETypedElement typedElement) {
		if(typedElement.EGenericType !== null)
			return getFeatureType(typedElement.EGenericType);
		return getFeatureType(typedElement.EType);
	}
	static def String getFeatureType(EGenericType classifier) {
		var base = getFeatureType(classifier.ERawType);
		if(classifier.ETypeArguments.length !==0){
			base+='''«FOR type:classifier.ETypeArguments BEFORE '&lt;' SEPARATOR ', ' AFTER '&gt;'»«IF hasLink(type.ERawType)»<a href='./«getFeatureType(type)».html'>«getFeatureType(type)»</a>«ELSE»«getFeatureType(type)»«ENDIF»«ENDFOR»''';			
		}
		return base;
	}
	static def String getFeatureType(EClassifier classifier) {
		if(classifier=== null){
			return 'void';
		}
		else if (classifier.instanceClass !== null) {
			return classifier.instanceClass.simpleName
		} else {
			return classifier.name;
		}
	}
	static def boolean hasLink(ETypedElement typedElement) {
		return hasLink(typedElement.EType);
	}
//	static def boolean hasLink(EStructuralFeature feature) {
//		if (feature instanceof EAttribute) {
//			if (feature.EAttributeType.instanceClass !== null) {
//				return false;
//			} else {
//				return true;
//			}
//		}
//		if (feature instanceof EReference){
//			return true;			
//		}
//		return false;
//	}
	static def boolean hasLink(EClassifier classifier) {
		if (classifier=== null || classifier.instanceClass !== null) {
			return false;
		}
		return true;
	}
}