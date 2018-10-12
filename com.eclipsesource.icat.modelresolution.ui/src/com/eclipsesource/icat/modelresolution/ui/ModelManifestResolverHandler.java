package com.eclipsesource.icat.modelresolution.ui;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.eclipse.core.commands.AbstractHandler;
import org.eclipse.core.commands.ExecutionEvent;
import org.eclipse.core.commands.ExecutionException;
import org.eclipse.core.resources.IResource;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.ui.handlers.HandlerUtil;

import com.eclipsesource.icat.modelresolution.ModelManifestResolver;

public class ModelManifestResolverHandler extends AbstractHandler {

	@Override
	public Object execute(ExecutionEvent event) throws ExecutionException {
		IResource selectedResource = (IResource)((IStructuredSelection)HandlerUtil.getCurrentSelection(event)).getFirstElement();
		Path manifestPath = Paths.get(selectedResource.getLocation().toString());
		Path projectPath = Paths.get(selectedResource.getProject().getLocation().toString());
		
		
		ModelManifestResolver.resolve(manifestPath, projectPath);
		return null;
	}
}
