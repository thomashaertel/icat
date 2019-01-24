package com.eclipsesource.icat.dynamicdocu;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.apache.commons.io.FileUtils;
import org.eclipse.core.runtime.FileLocator;
import org.eclipse.core.runtime.Platform;
import org.eclipse.emf.ecore.EPackage;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.stream.JsonWriter;

import io.typefox.sprotty.api.SModelRoot;

public class DocuWebApp {
	
	public static final String GLOBAL_GRAPH_VAR = "__docu_app_graph__";
	public static final String GLOBAL_MODEL_VAR = "__docu_app_model__";
	public static final String MODEL_JS_FILE = "model.js";
	public static final String GRAPH_JS_FILE = "graph.js";
	
	public static void materialize(File targetFolder) throws IOException, URISyntaxException {
		Path bundleJsPath = getResourcesJsPath();
		FileUtils.copyDirectory(bundleJsPath.toFile(), targetFolder);
	}	
	
	public static void copyArtifacts(EPackage ePackage, SModelRoot modelRoot, Path outputPath) throws IOException {		
		writePackage(ePackage, outputPath);
		writeGraph(modelRoot, outputPath);
	}

	protected static Path getResourcesJsPath() throws IOException, URISyntaxException {
		URL entry = Platform.getBundle("com.eclipsesource.icat.dynamicdocu").getEntry("build");
		URL fileURL = FileLocator.toFileURL(entry);
		return Paths.get(fileURL.toURI());
	}

	static void writePackage(EPackage ePackage, Path outputPath)
			throws IOException {
		Path path = outputPath.resolve(MODEL_JS_FILE);
		Files.createDirectories(path.getParent());
		Files.deleteIfExists(path);
		Files.write(path, (GLOBAL_MODEL_VAR + "=" + Class2JSON.generate(ePackage)).getBytes());
	}
	
	static void writeGraph(SModelRoot modelRoot, Path outputPath) throws IOException {
		Gson gson = new GsonBuilder().setPrettyPrinting().create();		
		Path targetPath = outputPath.resolve(GRAPH_JS_FILE);
		Files.createDirectories(targetPath.getParent());
		try (Writer writer = new FileWriter(targetPath.toFile())) {
			writer.append(GLOBAL_GRAPH_VAR + "=");
			JsonUtil<SModelRoot> jsonUtil = new JsonUtil<SModelRoot>(gson);
			jsonUtil.write(createJsonWriter(writer), modelRoot);
		}
	}
	
	static JsonWriter createJsonWriter(Writer writer) {
		JsonWriter jsonWriter = new JsonWriter(writer);
		// enables pretty printing
		jsonWriter.setIndent("  ");
		return jsonWriter;
	}
}
