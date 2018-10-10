package com.eclipsesource.icat.pojo

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import org.eclipse.emf.ecore.EClass

import static com.eclipsesource.icat.pojo.GeneratorUtil.*

class GeneratorImpl {
	

	static def String generate(String basePackage, EClass eClass) {
		'''	
			// auto-generated from '«eClass.name»' at «DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss").format(LocalDateTime.now)»
			package «basePackage».«eClass.EPackage.name».impl;
			
			«IF eClass.EStructuralFeatures.filter[f | f.many].length>0»
				import java.util.ArrayList;
				import java.util.List;
			«ENDIF»
			
			«FOR importString: getImports(basePackage,eClass)»
				import «importString»;
			«ENDFOR»
			
			public class «eClass.name»Impl implements «eClass.name» {
			
				«FOR feature : eClass.EStructuralFeatures»
					«IF !feature.many»
						private «getFeatureType(feature)» «feature.name.toFirstUpper»;
					«ELSE»
						private List<«getFeatureType(feature)»> «feature.name.toFirstUpper» = new ArrayList<>();
					«ENDIF»
				«ENDFOR»

				«FOR feature : eClass.EStructuralFeatures»
					«IF !feature.many»
						@Override
						public «getFeatureType(feature)» get«feature.name.toFirstUpper»() {
							return this.«feature.name.toFirstUpper»;
						}

						@Override
						public void set«feature.name.toFirstUpper»(«getFeatureType(feature)» value) {
							this.«feature.name.toFirstUpper» = value;
						}
					«ELSE»
						@Override
						public List<«getFeatureType(feature)»> get«feature.name.toFirstUpper»() {
							return this.«feature.name.toFirstUpper»;
						}

						@Override
						public void set«feature.name.toFirstUpper»(List<«getFeatureType(feature)»> value) {
							this.«feature.name.toFirstUpper» = value;
						}
					«ENDIF»

				«ENDFOR»
			}
		'''
	}
}
