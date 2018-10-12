package com.eclipsesource.icat.modelresolution;

import java.io.BufferedReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import com.eclipsesource.icat.modelresolution.model.ModelManifest;
import com.google.gson.Gson;

public class ModelManifestParser {

	public static ModelManifest parse(Path manifestPath) throws IOException {
		Gson gson = new Gson();
		try (BufferedReader bufferedReader = Files.newBufferedReader(manifestPath)) {
			return gson.fromJson(bufferedReader, ModelManifest.class);
		}
	}
}
