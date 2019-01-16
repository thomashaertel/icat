package com.eclipsesource.icat.dynamicdocu;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.InvalidPathException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.plugin.EcorePlugin;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.emf.ecore.util.EcoreUtil;
import org.eclipse.emf.ecore.xmi.impl.XMIResourceFactoryImpl;

import com.eclipsesource.glsp.ecore.diagram.EcoreModelFactory;

import io.typefox.sprotty.api.Bounds;
import io.typefox.sprotty.api.SModelRoot;

public class EntryPoint {

	private static final Path DEFAULT_INPUT_PATH = Paths.get("partner.ecore");
	private static final Path DEFAULT_OUTPUT_PATH = Paths.get("/home/eugen/Downloads/dekraica/result/com.dekra.data.partner.docu");

	public static void main(String[] args) throws IOException, URISyntaxException {

		Path ecorePath = readEcorePath(args);
		Path outputPath = readOutputPath(args);

		if (!Files.isRegularFile(ecorePath)) {
			System.err.println("Given Ecore file is either a directory or does not exist: "
					+ ecorePath.toFile().getAbsolutePath());
			return;
		}

		System.out.println("Ecore input path is: " + ecorePath.toFile().getAbsolutePath());
		System.out.println("Doc output folder is: " + outputPath.toFile().getAbsolutePath());

		ResourceSetImpl resourceSet = createResourceSet();

		EPackage ePackage = loadEPackage(resourceSet, ecorePath);		
		SModelRoot modelRoot = loadGraph(resourceSet, URI.createFileURI(ecorePath.toFile().getAbsolutePath()));

		DocuWebApp.materialize(outputPath.toFile());
		DocuWebApp.copyArtifacts(ePackage, modelRoot, outputPath);
		System.out.println("DONE!");
	}

	public static ResourceSetImpl createResourceSet() {
		ResourceSetImpl resourceSet = new ResourceSetImpl();
		resourceSet.getResourceFactoryRegistry().getExtensionToFactoryMap().put("*", new XMIResourceFactoryImpl());
		// we need to be able to resolve resource paths to plugin paths and thus load
		// referenced ecores
		resourceSet.getURIConverter().getURIMap().put(URI.createPlatformPluginURI("/org.eclipse.emf.ecore/", true),
				URI.createURI(EcorePlugin.INSTANCE.getBaseURL().toExternalForm()));
		return resourceSet;
	}
	
	public static EPackage loadEPackage(ResourceSet resourceSet, Path ecorePath) throws IOException {
		Resource resource = resourceSet.createResource(URI.createFileURI(ecorePath.toString()));
		resource.load(null);
		EcoreUtil.resolveAll(resource);
		return (EPackage) resource.getContents().get(0);
	}
	
	public static SModelRoot loadGraph(ResourceSet resourceSet, URI uri) {
		EcoreModelFactory ecoreModelFactory = new EcoreModelFactory();
		SModelRoot modelRoot = ecoreModelFactory.loadModel(resourceSet, uri, false);
		modelRoot.setCanvasBounds(new Bounds(-1, -1, -1, -1));
		return modelRoot;
	}

	static Path readEcorePath(String[] args) {
		try {
			if (args.length < 1) {
				return DEFAULT_INPUT_PATH;
			}
			return Paths.get(args[0]);
		} catch (InvalidPathException ex) {
			return DEFAULT_INPUT_PATH;
		}
	}

	static Path readOutputPath(String[] args) {
		try {
			if (args.length < 2) {
				return DEFAULT_OUTPUT_PATH;
			}
			return Paths.get(args[1]);
		} catch (InvalidPathException ex) {
			return DEFAULT_OUTPUT_PATH;
		}
	}
}
