
export interface ENamedElement {
  name: string,
  description?: string
}

export interface EEnum extends ENamedElement {
  name: string;
  literals: ELiteral[];
}

export interface ELiteral extends ENamedElement {
  value: number;
}

export interface EParameterProps extends ENamedElement{
  type: string,
  name: string;
}

export interface EDataType extends ENamedElement {
  type: string;
}

export interface EAttribute extends ENamedElement {
  type: string,
  many: boolean
}

export interface EReference extends ENamedElement {
  type: string,
  many: boolean
}

export interface EClass extends ENamedElement {
  superTypes?: string[],
  attributes?: EAttribute[],
  references?: EReference[],
  operations?: EOperation[]
}

export interface EOperation extends ENamedElement {
  type: string;
  parameters: EParameterProps[];
  many: boolean
}

export interface EPackage extends ENamedElement {
  classes?: EClass[],
  enums?: EEnum[];
  dataTypes?: EDataType[],
}
