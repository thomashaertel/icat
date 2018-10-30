package com.eclipsesource.icat.importxml.ui.handlers;

import java.nio.file.Path;
import java.nio.file.Paths;

import org.eclipse.core.commands.AbstractHandler;
import org.eclipse.core.commands.ExecutionEvent;
import org.eclipse.core.commands.ExecutionException;
import org.eclipse.core.resources.IResource;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.swt.SWT;
import org.eclipse.swt.widgets.DirectoryDialog;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.ui.handlers.HandlerUtil;

import com.eclipsesource.icat.importxml.XMLParser;

public class ImportXMLHandler extends AbstractHandler {

	@Override
	public Object execute(ExecutionEvent event) throws ExecutionException {
		Shell shell = HandlerUtil.getActiveShell(event);

		IResource selectedResource = (IResource)((IStructuredSelection)HandlerUtil.getCurrentSelection(event)).getFirstElement();
		Path ecorePath = Paths.get(selectedResource.getLocationURI());
		// TODO this is quick and dirty, we should implement a custom dialog
		DirectoryDialog dd = new DirectoryDialog(shell, SWT.SAVE);
		String targetProject = dd.open();
		if(targetProject == null) {
			return null;
		}
		XMLParser.ecoreFromXml(Paths.get(targetProject), ecorePath);
		return null;
	}
}
