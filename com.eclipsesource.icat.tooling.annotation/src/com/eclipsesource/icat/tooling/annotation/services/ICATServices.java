package com.eclipsesource.icat.tooling.annotation.services;

import org.eclipse.emf.ecore.EObject;
import org.eclipse.emf.ecore.util.EcoreUtil;

public class ICATServices {
	/**
	 * Returns the root container; it may be this object itself
	 * 
	 * @param eObject the object to get the root container for.
	 * @return the root container.
	 */
	public EObject getRootContainer(EObject eObject) {
		return EcoreUtil.getRootContainer(eObject);
	}
}
