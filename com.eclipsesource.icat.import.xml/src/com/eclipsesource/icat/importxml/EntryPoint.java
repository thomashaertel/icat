package com.eclipsesource.icat.importxml;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

public class EntryPoint {

	public static void main(String[] args) throws IOException {
		// parameter
		Path folderPath = Paths.get("/home/eugen/Downloads/dekraica/pac_resource_repository/resources/Entries/com/dekra/data/partner");
		Path ecoreFolderPath = Paths.get("/home/eugen/Downloads/dekraica/pac_resource_repository/resources/Entries/com/dekra/data/partner");
		
		XMLParser.ecoreFromXml(folderPath, ecoreFolderPath);
	}

	

}
