
export interface ENamedElement {
  name: string,
  description?: string
}

export interface EEnum extends ENamedElement {
  package: string,
  name: string;
  literals: ELiteral[];
}

export interface ELiteral extends ENamedElement {
  value: number;
}

export interface EParameterProps extends ENamedElement{
  package: string,
  type: string,
  name: string;
}

export interface EDataType extends ENamedElement {
  package: string,
  type: string;
}

export interface EAttribute extends ENamedElement {
  package: string,
  type: string,
  many: boolean
}

export interface EReference extends ENamedElement {
  package: string,
  type: string,
  many: boolean
}

export interface EClass extends ENamedElement {
  package: string,
  superTypes?: string[],
  attributes?: EAttribute[],
  references?: EReference[],
  operations?: EOperation[]
}

export interface EOperation extends ENamedElement {
  package: string,
  type: string;
  parameters: EParameterProps[];
  many: boolean
}

export interface EPackage extends ENamedElement {
  classes?: EClass[],
  enums?: EEnum[];
  dataTypes?: EDataType[],
}

export interface Resource {
  [key:string]:EPackage;
}