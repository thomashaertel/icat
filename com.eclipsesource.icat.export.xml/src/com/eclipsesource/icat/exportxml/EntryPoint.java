package com.eclipsesource.icat.exportxml;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

public class EntryPoint {

	public static void main(String[] args) throws IOException {
		// parameter
		Path folderPath = Paths.get("/home/eugen/Downloads/dekraica/pac_resource_repository/resources/Entries/com/dekra/data2");
		Path ecoreFolderPath = Paths.get("/home/eugen/Downloads/dekraica/pac_resource_repository/resources/Entries/com/dekra/data/");
		XMLWriter.convertXML(ecoreFolderPath, folderPath);
	}

	

}
