package com.eclipsesource.icat.pojo

import com.eclipsesource.icat.modelresolution.ModelManifestParser
import java.nio.file.Paths
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import org.eclipse.emf.ecore.EPackage

class GeneratorPom {
	

	static def String generate(EPackage ePackage) {
		'''	
			<!-- auto-generated at «DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss").format(LocalDateTime.now)» -->
			<project xmlns="http://maven.apache.org/POM/4.0.0"
				xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
				xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
				<modelVersion>4.0.0</modelVersion>
				<groupId>«getGroupId(ePackage)»</groupId>
				<artifactId>«ePackage.name»</artifactId>
				<version>0.0.1-SNAPSHOT</version>
				<properties>
					<maven.compiler.source>1.8</maven.compiler.source>
			    	<maven.compiler.target>1.8</maven.compiler.target>
				</properties>
				<build>
					<sourceDirectory>src</sourceDirectory>
				</build>
				«IF ePackage.eResource.resourceSet.resources.length>1»
					<dependencies>
						«FOR refResource : ePackage.eResource.resourceSet.resources.subList(1, ePackage.eResource.resourceSet.resources.length)»
							«IF !refResource.contents.empty»
								<dependency>
									<groupId>«getGroupId(refResource.contents.get(0) as EPackage)»</groupId>
									<artifactId>«(refResource.contents.get(0) as EPackage).name»</artifactId>
									<version>«getReferencedPackageVersion(refResource.contents.get(0) as EPackage)»</version>
								</dependency>
							«ELSE»
								<!-- The Resource «refResource.URI.toString» could not be loaded! -->
							«ENDIF»
						«ENDFOR»
					</dependencies>
				«ENDIF»
			</project>
		'''
	}
	static def String getGroupId(EPackage ePackage) {
		var groupId = ePackage.name;
		if (groupId.contains('.')) {
			groupId = groupId.substring(0,groupId.lastIndexOf('.'));
		}
		return groupId;
	}
	
	static def String getReferencedPackageVersion(EPackage ePackage) {
		val ecoreURI = ePackage.eResource.URI;
		val manifestPath = Paths.get(ecoreURI.toFileString()).parent.resolveSibling('META-INF').resolve('Model-Manifest.json');
		val manifest = ModelManifestParser.parse(manifestPath);
		val modelImport = manifest.model_imports.findFirst[mi | mi.name == ecoreURI.lastSegment.substring(0,ecoreURI.lastSegment.lastIndexOf('.'))];
		return modelImport.version;
	}
}
