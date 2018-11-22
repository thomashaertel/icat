import * as React from 'react';
import {Link} from "react-router-dom";
import {
  EAttribute,
  EClass,
  EDataType,
  EEnum,
  ELiteral,
  ENamedElement,
  EOperation,
  EPackage,
  EReference
} from "../types";
import {getOrEmpty, isEClass, isEEnum, isEPackage} from "../util";
import ELink from "./ELink";

export interface NavProps {
  ePackageName: string;
  eNamedElement: ENamedElement;
}

interface GenerateLinkProps<T> {
  name: string;
  elements: T[];
  renderLink: (t: T) => React.ReactElement<any>;
}

// TODO: duplciate
const styles: any = {
  leftPad: {
    marginLeft: '0.25em'
  }
};


const GenerateLinks = function <T>({ name, elements, renderLink } : GenerateLinkProps<T>) {
  if (elements && elements.length > 0) {
    return (<li>
        <summary>{name}</summary>
        <ol>
          {
            elements.map(feat =>
              <li>
                <code>{renderLink(feat)}</code>
              </li>
            )
          }
        </ol>
      </li>
    )
  }

  return null;
};

type ValidTypes = EReference | EAttribute | EOperation | string | ENamedElement;

const HRef = ({ name }: { name: string}) => <a href={`#${name}`}>{name}</a>;

const classProps = (eClass: EClass): GenerateLinkProps<ValidTypes>[] => {
  const links: GenerateLinkProps<ValidTypes>[] = [];
  links.push({
    name: 'SuperTypes',
    elements: getOrEmpty(eClass.superTypes),
    renderLink: (featureName: string) => <HRef name={featureName}/>
  });
  links.push({
    name: 'Features',
    elements: getOrEmpty(eClass.attributes).concat(getOrEmpty(eClass.references)),
    renderLink: (feat: EReference | EAttribute) => <HRef name={feat.name}/>
  });
  links.push({
    name: 'Operations',
    elements: getOrEmpty(eClass.operations),
    renderLink: (op: EOperation) => (
      <React.Fragment>
        <HRef name={op.name}/>
        (
        {
          (op.parameters || []).map(p => (
            <React.Fragment>
              <ELink name={p.type}/><span style={styles.leftPad}>{p.name}</span>
            </React.Fragment>
          ))
        }
        )
      </React.Fragment>
    )
  });

  return links;
};

const packageProps = (ePackage: EPackage): GenerateLinkProps<ValidTypes>[] => {
  const links: GenerateLinkProps<ValidTypes>[] = [];
  links.push(({
    name: 'Classes',
    elements: getOrEmpty(ePackage.classes),
    renderLink: (eClass: EClass) => <Link to={`/${eClass.name}`}>{eClass.name}</Link>
  }));
  links.push(({
    name: 'DataTypes',
    elements: getOrEmpty(ePackage.dataTypes),
    renderLink: (eDataType: EDataType) => <Link to={`/${eDataType.name}`}>{eDataType.name}</Link>
  }));
  links.push(({
    name: 'Enums',
    elements: getOrEmpty(ePackage.enums),
    renderLink: (eEnum: EEnum) => <Link to={`/${eEnum.name}`}>{eEnum.name}</Link>
  }));
  return links;
};

const Nav = ({ ePackageName, eNamedElement }: NavProps) => {
  let links: GenerateLinkProps<ValidTypes>[] = [];
  if (isEClass(eNamedElement)) {
    links = links.concat(classProps(eNamedElement))
  } else if (isEEnum(eNamedElement)) {
    links.push({
      name: 'Literals',
      elements: getOrEmpty(eNamedElement.literals),
      renderLink: (literal: ELiteral) => <HRef name={literal.name}/>
    });
  } else if (isEPackage(eNamedElement)) {
    links = links.concat(packageProps(eNamedElement));
  }

  return (
    <nav>
      <div className='crumb'>
        <span>Package: <Link to="/">{ePackageName}</Link></span>
      </div>
      <ol>
        {
          links.map((features: GenerateLinkProps<ValidTypes>) =>
            <GenerateLinks
              name={features.name}
              elements={features.elements}
              renderLink={features.renderLink}
            />
          )
        }
      </ol>
    </nav>
  )
};

export default Nav;