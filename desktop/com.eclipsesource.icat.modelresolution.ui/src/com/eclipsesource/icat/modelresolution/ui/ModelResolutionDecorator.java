package com.eclipsesource.icat.modelresolution.ui;

import org.eclipse.core.resources.IResource;
import org.eclipse.jdt.internal.ui.JavaPluginImages;
import org.eclipse.jface.viewers.IDecoration;
import org.eclipse.jface.viewers.ILabelProviderListener;
import org.eclipse.jface.viewers.ILightweightLabelDecorator;

@SuppressWarnings("restriction")
public class ModelResolutionDecorator implements ILightweightLabelDecorator {

	@Override
	public void addListener(ILabelProviderListener listener) {

	}

	@Override
	public void dispose() {

	}

	@Override
	public boolean isLabelProperty(Object element, String property) {
		return false;
	}

	@Override
	public void removeListener(ILabelProviderListener listener) {

	}

	
	@Override
	public void decorate(Object element, IDecoration decoration) {
		if(!(element instanceof IResource)) {
			return;
		}
		IResource resource = (IResource) element;
		if(!resource.getLocation().lastSegment().equalsIgnoreCase("model_dependencies")) {
			return;
		}
		decoration.addOverlay(JavaPluginImages.DESC_OVR_LIBRARY, IDecoration.TOP_RIGHT);
	}

}
