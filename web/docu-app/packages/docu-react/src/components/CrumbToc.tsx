import * as React from 'react';
import {ENamedElement} from "../types";
import {isEClass, isEEnum} from "../util";

const isNonEmpty = (array?: any[]): boolean => array !== undefined && array.length > 0;

export interface CrumbTocProps {
  eClassifier: ENamedElement;
}

const CrumbToc = ({ eClassifier }: CrumbTocProps) => {
  const toc = [];
  if (eClassifier && isEClass(eClassifier)) {
    if (isNonEmpty(eClassifier.attributes)) {
      toc.push("attributes");
    }
    if (isNonEmpty(eClassifier.references)) {
      toc.push("references");
    }
    if (isNonEmpty(eClassifier.operations)) {
      toc.push("operations");
    }
  } else if (isEEnum(eClassifier)) {
    toc.push("literals")
  }

  return (
    <div id='toc' className='toc'>
      {
        <div className={'center'}>
          {toc.length > 0 && <span>Jump to:</span>}
          <ol>
            {toc.map(entry => <li><a href={'#' + entry}>{entry.charAt(0).toUpperCase() + entry.substr(1)}</a></li>)}
          </ol>
        </div>
      }
    </div>
  );
};

export default CrumbToc;
