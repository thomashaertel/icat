package com.eclipsesource.icat.webdocu.ui;

import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;

import org.eclipse.core.commands.AbstractHandler;
import org.eclipse.core.commands.ExecutionEvent;
import org.eclipse.core.commands.ExecutionException;
import org.eclipse.core.resources.IResource;
import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.EPackage;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.swt.SWT;
import org.eclipse.swt.widgets.DirectoryDialog;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.ui.handlers.HandlerUtil;

import com.eclipsesource.icat.dynamicdocu.DocuWebApp;
import com.eclipsesource.icat.dynamicdocu.EntryPoint;

import io.typefox.sprotty.api.SModelRoot;

public class GenerateWebDocuHandler extends AbstractHandler {

	@Override
	public Object execute(ExecutionEvent event) throws ExecutionException {
		Object firstElement = HandlerUtil.getCurrentStructuredSelection(event).getFirstElement();
		if (!(firstElement instanceof IResource)) {
			return null;
		}
		IResource selectedResource = (IResource) firstElement;

		try {

			Path outputPath = queryOutputPath(event);
			Path ecorePath = selectedResource.getLocation().toFile().toPath();
			ResourceSetImpl resourceSet = EntryPoint.createResourceSet();
			EPackage[] ePackages = EntryPoint.loadEPackages(resourceSet, ecorePath);
			Map<String, SModelRoot> modelRoot = EntryPoint.loadGraph(resourceSet, URI.createURI(selectedResource.getLocationURI().toString()));

			DocuWebApp.materialize(outputPath.toFile());
			DocuWebApp.copyArtifacts(ePackages, modelRoot, outputPath);
		} catch (IOException | URISyntaxException e) {
			MessageDialog.openError(HandlerUtil.getActiveShell(event), "Error generating web documentation",
					e.getMessage());
		}

		return null;
	} 
	
	protected Path queryOutputPath(ExecutionEvent event) {
		Shell shell = HandlerUtil.getActiveShell(event);
		DirectoryDialog dd = new DirectoryDialog(shell, SWT.SAVE);
		Path outputPath = Paths.get(dd.open());
		return outputPath;
	}

}
