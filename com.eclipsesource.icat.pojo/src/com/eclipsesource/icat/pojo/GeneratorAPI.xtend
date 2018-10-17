package com.eclipsesource.icat.pojo

import static com.eclipsesource.icat.pojo.GeneratorUtil.*;
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import org.eclipse.emf.ecore.EClass
import org.eclipse.emf.ecore.EEnum

class GeneratorAPI {
	

	static def dispatch String generate(EClass eClass) {
		'''	
			// auto-generated from '«eClass.name»' at «DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss").format(LocalDateTime.now)»
			package «eClass.EPackage.name»;
			«IF eClass.EStructuralFeatures.filter[f | f.many].length>0»
				import java.util.List;
			«ENDIF»
			
			«FOR importString: getImports(eClass, false)»
				import «importString»;
			«ENDFOR»
			
			«IF eClass.ESuperTypes.length ==0»
				public interface «eClass.name» {
			«ELSE»
				public interface «eClass.name» extends «eClass.ESuperTypes.get(0).name» {
			«ENDIF»
				«FOR feature : eClass.EStructuralFeatures»
					«IF !feature.many»
						«getFeatureType(feature)» get«feature.name.toFirstUpper»();
						void set«feature.name.toFirstUpper»(«getFeatureType(feature)» value);
					«ELSE»
						List<«getFeatureType(feature)»> get«feature.name.toFirstUpper»();
						void set«feature.name.toFirstUpper» (List<«getFeatureType(feature)»> value);
					«ENDIF»
					
				«ENDFOR»
			}
		'''
	}
	
	static def dispatch String generate(EEnum eEnum) {
		'''	
			// auto-generated from '«eEnum.name»' at «DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss").format(LocalDateTime.now)»
			package «eEnum.EPackage.name»;
			
			public enum «eEnum.name» {
			
				«FOR literal : eEnum. ELiterals SEPARATOR ","»
					«literal.name»
				«ENDFOR»
			}
		'''
	}
}
