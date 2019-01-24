package com.eclipsesource.icat.dynamicdocu;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.InvalidPathException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.stream.Collectors;

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

	private static final Path DEFAULT_INPUT_PATH = Paths.get("vehicle.ecore");
	private static final Path DEFAULT_OUTPUT_PATH = Paths.get("vehicle-docu");

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

		EPackage[] ePackages = loadEPackages(resourceSet, ecorePath);		
		Map<String,SModelRoot> modelRoots = loadGraph(resourceSet, URI.createFileURI(ecorePath.toFile().getAbsolutePath()));

		DocuWebApp.materialize(outputPath.toFile());
		DocuWebApp.copyArtifacts(ePackages, modelRoots, outputPath);
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
	
	public static EPackage[] loadEPackages(ResourceSet resourceSet, Path ecorePath) throws IOException {
		Resource resource = resourceSet.createResource(URI.createFileURI(ecorePath.toString()));
		resource.load(null);
		EcoreUtil.resolveAll(resource);
		return resourceSet.getResources().stream().map(r -> r.getContents().get(0)).filter(EPackage.class::isInstance).collect(Collectors.toList()).toArray(new EPackage[0]);
	}
	
	public static Map<String,SModelRoot> loadGraph(ResourceSet resourceSet, URI uri) {
		EcoreModelFactory ecoreModelFactory = new EcoreModelFactory();
		Map<String,SModelRoot> modelRoots = ecoreModelFactory.loadModels(resourceSet, uri);
		modelRoots.values().forEach(m -> m.setCanvasBounds(new Bounds(-1, -1, -1, -1)));
		return modelRoots;
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
