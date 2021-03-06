package com.eclipsesource.icat.importxml;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

public class EntryPoint {

	private static final String defaultFolder = "data";
	private static final String defaultEcoreFolder = "data";

	public static void main(String[] args) throws IOException {
		String argFolder = null;
		String argEcoreFolder = null;
		for (int i = 0; i < args.length; i++) {
			if ("folder".equalsIgnoreCase(args[i])) {
				argFolder = args[++i];
			} else if ("ecoreFolder".equalsIgnoreCase(args[i])) {
				argEcoreFolder = args[++i];
			}

		}
		// parameter
		Path folderPath = Paths.get(argFolder == null ? defaultFolder : argFolder);
		Path ecoreFolderPath = Paths.get(argEcoreFolder == null ? defaultEcoreFolder : argEcoreFolder);

		XMLParser.ecoreFromXml(folderPath, ecoreFolderPath);
	}

	

}
