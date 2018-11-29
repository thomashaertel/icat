package com.eclipsesource.icat.exportxml.ui.handlers;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.eclipse.core.commands.AbstractHandler;
import org.eclipse.core.commands.ExecutionEvent;
import org.eclipse.core.commands.ExecutionException;
import org.eclipse.core.resources.IResource;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IProgressMonitor;
import org.eclipse.core.runtime.NullProgressMonitor;
import org.eclipse.jface.dialogs.ProgressMonitorDialog;
import org.eclipse.jface.operation.IRunnableWithProgress;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.swt.SWT;
import org.eclipse.swt.widgets.DirectoryDialog;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.ui.handlers.HandlerUtil;

import com.eclipsesource.icat.exportxml.XMLWriter;

public class ExportXMLHandler extends AbstractHandler {

	@Override
	public Object execute(ExecutionEvent event) throws ExecutionException {
		Shell shell = HandlerUtil.getActiveShell(event);

		IResource selectedResource = (IResource) ((IStructuredSelection) HandlerUtil.getCurrentSelection(event))
				.getFirstElement();
		Path ecorePath = Paths.get(selectedResource.getLocationURI());
		// TODO this is quick and dirty, we should implement a custom dialog
		DirectoryDialog dd = new DirectoryDialog(shell, SWT.SAVE);
		dd.setMessage("Select the folder where the xml will be generated into.");
		String targetProject = dd.open();
		if (targetProject == null) {
			return null;
		}
		ProgressMonitorDialog pmd = new ProgressMonitorDialog(shell);
		try {
			pmd.run(true, false, new IRunnableWithProgress() {
				public void run(IProgressMonitor monitor) throws InvocationTargetException, InterruptedException {
					monitor.beginTask("Export Ecores", IProgressMonitor.UNKNOWN);

					try {
						XMLWriter.convertXML(ecorePath, Paths.get(targetProject));
					} catch (IOException e) {
						e.printStackTrace();
					}					
					monitor.done();
					
				}
			});
			selectedResource.refreshLocal(1, new NullProgressMonitor());
		} catch (InvocationTargetException | InterruptedException | CoreException e) {
			e.printStackTrace();
		}
		return null;
	}
}
