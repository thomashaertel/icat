package com.eclipsesource.icat.webdocu;

import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.List;

import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EClassifier;
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
		List<String> cssFiles = Arrays.asList("doc");
		writeHtml(resourceSet, ecorePath, cssFiles, outputPath);
		writeJs(outputPath, modelRoot, resourcesJsPath);
		writeCss(cssFiles, outputPath, resourcesJsPath);
	}

	static void writeHtml(ResourceSet resourceSet, Path ecorePath, List<String> cssFiles, Path outputPath)
			throws IOException {
		EPackage ePackage = loadEcore(resourceSet, ecorePath);
		for (EClassifier eClassifier : ePackage.getEClassifiers()) {
			Path path = outputPath.resolve(eClassifier.getName() + ".html");
			Files.createDirectories(path.getParent());
			Files.deleteIfExists(path);
			Files.write(path, GeneratorClass.generate(eClassifier).getBytes());
		}

		Path indexHtml = outputPath.resolve("index.html");
		Files.createDirectories(indexHtml.getParent());
		Files.write(indexHtml, GeneratorPackage.generate(ePackage, cssFiles).getBytes());
	}

	static EPackage loadEcore(ResourceSet resourceSet, Path ecorePath) throws IOException {
		Resource resource = resourceSet.createResource(URI.createFileURI(ecorePath.toString()));
		resource.load(null);
		EcoreUtil.resolveAll(resource);
		return (EPackage) resource.getContents().get(0);
	}

	static void writeJs(Path outputPath, SModelRoot modelRoot, Path resourcesPathPath) throws IOException {
		// write graph.js
		Gson gson = new GsonBuilder().setPrettyPrinting().create();
		Path jsPath = outputPath.resolve("js");
		if (Files.notExists(jsPath)) {
			Files.createDirectory(jsPath);
		}
		Path targetPath = jsPath.resolve("graph.js");
		try (Writer writer = new FileWriter(targetPath.toFile())) {
			writer.write("__graph__ = \n");
			JsonUtil<SModelRoot> jsonUtil = new JsonUtil<SModelRoot>(gson);
			jsonUtil.write(createJsonWriter(writer), modelRoot);
		}

		// copy bundle.js
		Files.copy(resourcesPathPath.resolve("bundle.js"), jsPath.resolve("bundle.js"),
				StandardCopyOption.REPLACE_EXISTING);
	}

	static void writeCss(List<String> cssFiles, Path outputPath, Path resourcesPathPath) throws IOException {
		Path stylesPath = outputPath.resolve("styles");
		if (Files.notExists(stylesPath)) {
			Files.createDirectory(stylesPath);
		}
		for (String cssFile : cssFiles) {
			Path dest = stylesPath.resolve(cssFile + ".css");
			Path css = Paths.get(resourcesPathPath.resolve("template/styles/" + cssFile + ".css").toString());
			Files.copy(css, dest, StandardCopyOption.REPLACE_EXISTING);
		}
	}

	static JsonWriter createJsonWriter(Writer writer) {
		JsonWriter jsonWriter = new JsonWriter(writer);
		// enables pretty printing
		jsonWriter.setIndent("  ");
		return jsonWriter;
	}
}
