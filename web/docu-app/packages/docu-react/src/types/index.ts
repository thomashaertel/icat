
export interface ENamedElement {
  name: string,
  description?: string
}

export interface PackageMember {
  package: string;
}

export interface EEnum extends ENamedElement, PackageMember {
  name: string;
  literals: ELiteral[];
}

export interface ELiteral extends ENamedElement {
  value: number;
}

export interface EParameterProps extends ENamedElement, PackageMember {
  type: string,
  name: string;
}

export interface EDataType extends ENamedElement, PackageMember {
  type: string;
}

export interface EAttribute extends ENamedElement, PackageMember {
  type: string,
  many: boolean
}

export interface EReference extends ENamedElement, PackageMember {
  type: string,
  many: boolean
}

export interface EClass extends ENamedElement, PackageMember {
  superTypes?: string[],
  attributes?: EAttribute[],
  references?: EReference[],
  operations?: EOperation[]
}

export interface EOperation extends ENamedElement, PackageMember {
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