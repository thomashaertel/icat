import {EClass, EEnum, EPackage, ENamedElement, ELiteral} from "../types";

export const isEClass = (eClassifier: ENamedElement): eClassifier is EClass =>
  eClassifier['attributes'] !== undefined || eClassifier['references'] !== undefined;

export const isEEnum = (eClassifier: ENamedElement): eClassifier is EEnum =>
  eClassifier['literals'] !== undefined;

export const getSuperTypes = (element: ENamedElement): string[] => {
  const features: string[] = [];
  if (isEClass(element)) {
    return features.concat(element.superTypes || []);
  }
  return features;
};

export const getFeatures = (element: ENamedElement): ENamedElement[] => {
  const features: ENamedElement[] = [];
  if (isEClass(element)) {
    return features
      .concat(element.attributes || [])
      .concat(element.references || []);
  }
  return features;
};

export const getOperations = (element: ENamedElement): ENamedElement[] => {
  if (isEClass(element)) {
    return (element.operations || []);
  }
  return [];
};

export const getLiterals = (element: ENamedElement): ELiteral[] => {
  if (isEEnum(element)) {
    return element.literals;
  }
  return [];
};

export const makeNamedElement = (name: string): ENamedElement => ({ name });

export const getTypes = (ePackage: EPackage): Set<string> => {
  const knownTypes: Set<string> = new Set();
  (ePackage.classes || []).forEach((cls: ENamedElement) => knownTypes.add(cls.name));
  (ePackage.dataTypes || []).forEach((dataType: ENamedElement) => knownTypes.add(dataType.name));
  (ePackage.enums || []).forEach(e => knownTypes.add(e.name));
  return knownTypes;
};

export const join = <T>(elements: T[], delimiter: T): T[] => {
  let i = -1;
  const acc: T[] = [];
  return elements.reduce(function(ts: T[], e: T) {
    if (++i > 0) {
       ts.push(delimiter);
    }
    ts.push(e);
    return ts;
  }, acc);
};