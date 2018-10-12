package com.eclipsesource.icat.modelresolution;

import java.io.IOException;
import java.nio.file.Path;

import com.eclipsesource.icat.modelresolution.model.ModelManifest;

public class ModelManifestResolver {

	public static void resolve(Path manifestPath, Path projectPath) {
		try {
			ModelManifest manifest = ModelManifestParser.parse(manifestPath);
			ModelManifestDownloader.download(manifest, projectPath);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
