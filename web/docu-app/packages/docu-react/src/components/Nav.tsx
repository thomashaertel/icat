import * as React from 'react';
import {Link} from "react-router-dom";
import {EAttribute, ELiteral, ENamedElement, EOperation, EPackage, EReference} from "../types";
import {
  getFeatures,
  getLiterals,
  getOperations,
  getSuperTypes,
  isEClass,
  isEEnum,
} from "../util";
import ELink from "./ELink";

export interface NavProps {
  ePackage: EPackage;
  eClassifier: ENamedElement;
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

const Nav = ({ ePackage, eClassifier }: NavProps) => {
  const links: GenerateLinkProps<ValidTypes>[] = [];
  if (isEClass(eClassifier)) {
    links.push({
      name: 'SuperTypes',
      elements: getSuperTypes(eClassifier),
      renderLink: (featureName: string) => <a href={featureName}>{featureName}</a>
    });
    links.push({
      name: 'Features',
      elements: getFeatures(eClassifier),
      renderLink: (feat: EReference | EAttribute) => <a href={`#${feat.name}`}>{feat.name}</a>
    });
    links.push({
      name: 'Operations',
      elements: getOperations(eClassifier),
      renderLink: (op: EOperation) => (
        <React.Fragment>
          <a href={`#${op.name}`}>{op.name}</a>
          (
          {
            (op.parameters || []).map(p => (
              <React.Fragment>
                <ELink name={p.type} /><span style={styles.leftPad}>{p.name}</span>
              </React.Fragment>
            ))
          }
          )
        </React.Fragment>
      )
    });
  } else if (isEEnum(eClassifier)) {
    links.push({
      name: 'Literals',
      elements: getLiterals(eClassifier),
      renderLink: (literal: ELiteral) => <a href={`#${literal.name}`}>{literal.name}</a>
    });
  }

  return (
    <nav>
      <div className='crumb'>
        <span>Package: <Link to="/">{ePackage.name}</Link></span>
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