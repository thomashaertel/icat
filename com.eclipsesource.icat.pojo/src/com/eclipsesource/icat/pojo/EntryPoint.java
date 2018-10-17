package com.eclipsesource.icat.pojo;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Path;
import java.nio.file.Paths;

public class EntryPoint {

	private static java.net.URI exampleURI() {
		try {
			return EntryPoint.class.getClassLoader().getResource("Coffee.ecore").toURI();
		} catch (URISyntaxException e) {
			throw new IllegalStateException(e);
		}
	}

	public static void main(String[] args) throws IOException {
		// parameter
		Path ecorePath = Paths.get(exampleURI());
		String targetProject = "/home/eugen/Workspaces/dekra/ExamplePojoTest";
		
		ProjectCreator.createProject(ecorePath, Paths.get(targetProject));
	}

	

}
