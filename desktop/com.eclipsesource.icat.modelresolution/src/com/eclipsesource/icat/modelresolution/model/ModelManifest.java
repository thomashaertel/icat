package com.eclipsesource.icat.modelresolution.model;

import java.util.List;

public class ModelManifest {

	private String baseRepositoryPath;
	private List<ModelDependency> model_imports;

	public List<ModelDependency> getModel_imports() {
		return model_imports;
	}

	public void setModel_imports(List<ModelDependency> model_imports) {
		this.model_imports = model_imports;
	}

	public String getBaseRepositoryPath() {
		return baseRepositoryPath;
	}

	public void setBaseRepositoryPath(String baseRepositoryPath) {
		this.baseRepositoryPath = baseRepositoryPath;
	}
}
