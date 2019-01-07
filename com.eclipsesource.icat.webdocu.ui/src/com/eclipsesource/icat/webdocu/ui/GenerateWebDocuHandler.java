package com.eclipsesource.icat.webdocu.ui;

import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.eclipse.core.commands.AbstractHandler;
import org.eclipse.core.commands.ExecutionEvent;
import org.eclipse.core.commands.ExecutionException;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.FileLocator;
import org.eclipse.core.runtime.Platform;
import org.eclipse.emf.common.util.URI;
import org.eclipse.emf.ecore.resource.impl.ResourceSetImpl;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.swt.SWT;
import org.eclipse.swt.widgets.DirectoryDialog;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.ui.handlers.HandlerUtil;

import com.eclipsesource.glsp.ecore.diagram.EcoreModelFactory;
import com.eclipsesource.icat.dynamicdocu.EntryPoint;
import com.eclipsesource.icat.dynamicdocu.ProjectCreator;

import io.typefox.sprotty.api.Bounds;
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

			Path bundleJsPath = getResourcesJsPath();
			Path outputPath = queryOutputPath(event);
			Path ecorePath = selectedResource.getLocation().toFile().toPath();

			ResourceSetImpl resourceSet = EntryPoint.createResourceSet();
			EcoreModelFactory ecoreModelFactory = new EcoreModelFactory();
			EntryPoint.initializeElkLayoutEngine();
			SModelRoot modelRoot = ecoreModelFactory.loadModel(resourceSet, URI.createURI(selectedResource.getLocationURI().toString()));
			modelRoot.setCanvasBounds(new Bounds(-1, -1, -1, -1));

			ProjectCreator.createProject(resourceSet, ecorePath, modelRoot, outputPath, bundleJsPath);
		} catch (IOException | URISyntaxException e) {
			MessageDialog.openError(HandlerUtil.getActiveShell(event), "Error generating web documentation",
					e.getMessage());
		}

		return null;
	}

	protected Path getResourcesJsPath() throws IOException, URISyntaxException {
		URL entry = Platform.getBundle("com.eclipsesource.icat.webdocu").getEntry("resources");
		URL fileURL = FileLocator.toFileURL(entry);
		return Paths.get(fileURL.toURI());
	}

	protected Path queryOutputPath(ExecutionEvent event) {
		Shell shell = HandlerUtil.getActiveShell(event);
		DirectoryDialog dd = new DirectoryDialog(shell, SWT.SAVE);
		Path outputPath = Paths.get(dd.open());
		return outputPath;
	}

}
