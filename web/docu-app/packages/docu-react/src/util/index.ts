import {EClass, EEnum, EPackage, ENamedElement, ELiteral} from "../types";

export const isEClass = (eClassifier: ENamedElement): eClassifier is EClass =>
  eClassifier['attributes'] !== undefined || eClassifier['references'] !== undefined;

export const isEEnum = (eClassifier: ENamedElement): eClassifier is EEnum =>
  eClassifier['literals'] !== undefined;

export const isEPackage = (eNamedElement: ENamedElement): eNamedElement is EPackage =>
  eNamedElement['classes'] !== undefined ||
  eNamedElement['dataTypes'] !== undefined ||
  eNamedElement['enums'] !== undefined;

export const getArrayByName =
  <T>(pred: (element: ENamedElement) => boolean, propName: string) => (element: ENamedElement): T[] => {
  if (pred(element)) {
    return (element[propName] || []);
  }
  return []
};

export const getOrEmpty = <T>(array?: T[]): T[] => array === undefined ? [] : array;

export const getLiterals: ((el: ENamedElement) => ELiteral[]) = getArrayByName(isEEnum, 'literals');

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

export const isNonEmpty = (array?: any[]): boolean => array !== undefined && array.length > 0;

export const startCase = (s: string) => s.charAt(0).toUpperCase() + s.substr(1);
