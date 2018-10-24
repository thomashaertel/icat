package com.eclipsesource.icat.webdocu;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EClassifier;
import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.EcorePackage;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.ecore.xmi.impl.XMIResourceFactoryImpl;
import org.osgi.framework.FrameworkUtil;

public class ProjectCreator {

	public static void createProject(Path ecorePath, Path targetProject ) throws IOException {
		EPackage ePackage = loadExample(ecorePath);
		Path basePackagePath = targetProject.resolve("doku"); //ePackage.getName().split("\\.")
		for (EClassifier eClassifier : ePackage.getEClassifiers()) {
			Path path = basePackagePath.resolve(eClassifier.getName() + ".html");
			Files.createDirectories(path.getParent());
			Files.deleteIfExists(path);
			Files.write(path, GeneratorClass.generate(eClassifier).getBytes());
		}
		{
			Path path = basePackagePath.resolve(ePackage.getName() + "-overview.html");
			Files.createDirectories(path.getParent());
			Files.deleteIfExists(path);
			Files.write(path, GeneratorPackage.generate(ePackage).getBytes());
		}
		if(FrameworkUtil.getBundle(ProjectCreator.class) != null){
			Path path = targetProject.resolve("styles/docu.css");
			Path style = Paths.get(FrameworkUtil.getBundle(ProjectCreator.class).getResource("template/styles/docu.css").toString());
			Files.createDirectories(path.getParent());
			Files.deleteIfExists(path);
			Files.copy(style, path, StandardCopyOption.REPLACE_EXISTING);
		}
	}
	
	private static EPackage loadExample(Path ecorePath) throws IOException {
		ResourceSet rs = new ResourceSetImpl();
		rs.getResourceFactoryRegistry().getExtensionToFactoryMap().put("*", new XMIResourceFactoryImpl());
		// needed to be able to resolve resource paths to plugin paths and thus load referenced ecores
		rs.getPackageRegistry().put("platform:/plugin/org.eclipse.emf.ecore/model/Ecore.ecore", EcorePackage.eINSTANCE); 
		EcorePackage.eINSTANCE.eClass();

		Resource resource = rs.createResource(URI.createFileURI(ecorePath.toString()));
		resource.load(null);
		EcoreUtil.resolveAll(resource);
		EObject eObject = resource.getContents().get(0);
		EPackage ePackage = (EPackage) eObject;
		return ePackage;
	}
}
