package com.eclipsesource.icat.pojo;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EClass;
import org.eclipse.emf.ecore.EClassifier;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.EcorePackage;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.xmi.impl.XMIResourceFactoryImpl;

public class ProjectCreator {

	public static void createProject(Path ecorePath, String basePackage, Path targetProject ) throws IOException {
		EPackage ePackage = loadExample(ecorePath);
		Path basePackagePath = Paths.get("src", basePackage.split("\\.")).resolve(ePackage.getName());
		for (EClassifier eClassifier : ePackage.getEClassifiers()) {
			Path path = targetProject.resolve(basePackagePath).resolve(eClassifier.getName() + ".java");
			Files.createDirectories(path.getParent());
			Files.deleteIfExists(path);
			Files.write(path, GeneratorAPI.generate(basePackage, eClassifier).getBytes());
			if (eClassifier instanceof EClass) {
				Path pathImpl = targetProject.resolve(basePackagePath).resolve("impl")
						.resolve(eClassifier.getName() + "Impl.java");
				Files.createDirectories(pathImpl.getParent());
				Files.deleteIfExists(pathImpl);
				Files.write(pathImpl, GeneratorImpl.generate(basePackage, (EClass) eClassifier).getBytes());
			}
		}

		// pom.xml
		{
			Path pomPath = targetProject.resolve("pom.xml");
			Files.createDirectories(pomPath.getParent());
			Files.deleteIfExists(pomPath);
			Files.write(pomPath, GeneratorPom.generate(basePackage, basePackage + "." + ePackage.getName()).getBytes());
		}
	}
	
	private static EPackage loadExample(Path ecorePath) throws IOException {
		ResourceSet rs = new ResourceSetImpl();
		rs.getResourceFactoryRegistry().getExtensionToFactoryMap().put("*", new XMIResourceFactoryImpl());
		EcorePackage.eINSTANCE.eClass();

		Resource resource = rs.createResource(URI.createURI(ecorePath.toString()));
		resource.load(null);
		EObject eObject = resource.getContents().get(0);
		EPackage ePackage = (EPackage) eObject;
		return ePackage;
	}
}
