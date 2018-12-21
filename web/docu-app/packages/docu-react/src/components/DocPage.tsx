import * as React from 'react';
import JumpTo from "./JumpTo";
import Nav from "./Nav";
import {EPackage, ENamedElement} from "../types";
import Article from "./Article";
import Sprotty from './Sprotty';
import {isEClass, isEEnum, isNonEmpty} from "../util";
import {RouteComponentProps, withRouter} from "react-router";

export interface DocPageProps {
  eClassifier: ENamedElement,
  ePackage: EPackage
}

const DocPage = ({ eClassifier, ePackage, history, location }: DocPageProps & RouteComponentProps<any>) => {
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
    <React.Fragment>
      <div className='head'>
        <div className={'center'}>
          <h1>{eClassifier.name}</h1>
        </div>
      </div>
      <JumpTo toc={toc}/>
      <div className={['content', 'center'].join(' ')}>
        <Nav ePackageName={ePackage.name} eNamedElement={eClassifier}/>
        <div className='layout'>
          <Sprotty
            onDoubleClick={(ids) => {
              if (location.pathname.substring(1) === ids[0]) {
                return;
              }
              history.push(`/${ids[0]}`)
            }}
            selectedNodeId={eClassifier.name}
            showCollapsibleButton
          />
          <Article eClassifier={eClassifier}/>
        </div>
      </div>
    </React.Fragment>
  );
}


export default withRouter(DocPage);
