package com.eclipsesource.icat.dynamicdocu;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.resource.Resource;
import org.eclipse.emf.ecore.resource.ResourceSet;
import org.eclipse.emf.ecore.util.EcoreUtil;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.stream.JsonWriter;

import io.typefox.sprotty.api.SModelRoot;

public class ProjectCreator {

	public static void createProject(ResourceSet resourceSet, Path ecorePath, SModelRoot modelRoot, Path outputPath,
			Path resourcesJsPath) throws IOException {
		writeData(resourceSet, ecorePath, outputPath);
		writeGraph(outputPath, modelRoot, resourcesJsPath);
	}

	static void writeData(ResourceSet resourceSet, Path ecorePath, Path outputPath)
			throws IOException {
		EPackage ePackage = loadEcore(resourceSet, ecorePath);

		Path path = outputPath.getParent().resolve(ePackage.getName() + ".json");
		Files.deleteIfExists(path);
		Files.write(path, Class2JSON.generate(ePackage).getBytes());
	}

	static EPackage loadEcore(ResourceSet resourceSet, Path ecorePath) throws IOException {
		Resource resource = resourceSet.createResource(URI.createFileURI(ecorePath.toString()));
		resource.load(null);
		EcoreUtil.resolveAll(resource);
		return (EPackage) resource.getContents().get(0);
	}
	
	static void writeGraph(Path outputPath, SModelRoot modelRoot, Path resourcesPathPath) throws IOException {
		// write graph.js
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		Path jsPath = outputPath.resolve("js");
		if (Files.notExists(jsPath)) {
			Files.createDirectory(jsPath);
		}
		Path targetPath = jsPath.resolve("graph.js");
		try (Writer writer = new FileWriter(targetPath.toFile())) {
			JsonUtil<SModelRoot> jsonUtil = new JsonUtil<SModelRoot>(gson);
			jsonUtil.write(createJsonWriter(writer), modelRoot);
		}

		// copy bundle.js
		Files.copy(resourcesPathPath.resolve("bundle.js"), jsPath.resolve("bundle.js"),
				StandardCopyOption.REPLACE_EXISTING);
	}
	
	static JsonWriter createJsonWriter(Writer writer) {
		JsonWriter jsonWriter = new JsonWriter(writer);
		// enables pretty printing
		jsonWriter.setIndent("  ");
		return jsonWriter;
	}
}
