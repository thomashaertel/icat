package com.eclipsesource.icat.modelresolution;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.eclipse.core.resources.IProject;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.resources.ResourceAttributes;
import org.eclipse.core.resources.ResourcesPlugin;
import org.eclipse.core.runtime.CoreException;

import com.eclipsesource.icat.modelresolution.model.ModelDependency;
import com.eclipsesource.icat.modelresolution.model.ModelManifest;

public class ModelManifestDownloader {

//	private static final String LOCATION_TEMPLATE = "%0/%1/%2/%3";

	public static void download(ModelManifest manifest, Path projectPath) {
		Path dependencyTarget = projectPath.resolve("model_dependencies");
		try {
			Files.createDirectories(dependencyTarget);
		} catch (IOException e) {
			e.printStackTrace();
		}
		String projectName = Paths.get(ResourcesPlugin.getWorkspace().getRoot().getLocationURI()).relativize(dependencyTarget.getParent()).toString();
		IProject project = ResourcesPlugin.getWorkspace().getRoot().getProject(projectName);
		
		
		for (ModelDependency dependency : manifest.getModel_imports()) {
			copyDependency(manifest.getBaseRepositoryPath(), dependency, dependencyTarget);
			try {
				project.refreshLocal(IResource.DEPTH_INFINITE, null);
			} catch (CoreException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			IResource resource = project.findMember("model_dependencies/"+dependency.getName() + ".ecore");
			ResourceAttributes resourceAttributes = resource.getResourceAttributes();
			resourceAttributes.setReadOnly(true);
			try {
				resource.setResourceAttributes(resourceAttributes);
			} catch (CoreException e) {
				e.printStackTrace();
			}
		}
		
		
		
	}

	private static void copyDependency(String baseLocation, ModelDependency dependency, Path dependencyTarget) {
		try {
			Path source = Paths.get(baseLocation, dependency.getName(), dependency.getStream(), dependency.getVersion(),
					dependency.getName() + ".ecore");
			Path target = dependencyTarget.resolve(dependency.getName() + ".ecore");
			Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

//	private static void cloneDependency(String baseLocation, ModelDependency dependency, Path dependencyTarget) {
//		try {
//			// Clone remote repository
//			CloneCommand cloneCommand = Git.cloneRepository();
//			cloneCommand.setDirectory(dependencyTarget.resolve(dependency.getName()).toFile());
//			cloneCommand.setBare(false);
//			cloneCommand.setURI(String.format(LOCATION_TEMPLATE, baseLocation, dependency.getName(),
//					dependency.getStream(), dependency.getVersion()));
//			cloneCommand.call();
//		} catch (GitAPIException e) {
//			e.printStackTrace();
//		}
//	}
}
