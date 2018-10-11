package com.eclipsesource.icat.pojo

import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

class GeneratorPom {
	

	static def String generate(String groupId, String artifactId) {
		'''	
			<!-- auto-generated at «DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss").format(LocalDateTime.now)» -->
			<project xmlns="http://maven.apache.org/POM/4.0.0"
				xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
				xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
				<modelVersion>4.0.0</modelVersion>
				<groupId>«groupId»</groupId>
				<artifactId>«artifactId»</artifactId>
				<version>0.0.1-SNAPSHOT</version>
				<properties>
					<maven.compiler.source>1.8</maven.compiler.source>
			    	<maven.compiler.target>1.8</maven.compiler.target>
				</properties>
				<build>
					<sourceDirectory>src</sourceDirectory>
				</build>
			</project>
		'''
	}
}
