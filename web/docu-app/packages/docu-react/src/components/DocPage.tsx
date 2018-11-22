import * as React from 'react';
import CrumbToc from "./CrumbToc";
import Nav from "./Nav";
import {EPackage, ENamedElement} from "../types";
import Article from "./Article";
import Sprotty from './Sprotty';

export interface DocPageProps {
  eClassifier: ENamedElement,
  ePackage: EPackage
}

const styles: any = {
  layout: {
    flexDirection: 'column',
    flexGrow: 1,
    marginBottom: '2em'
  }
};

class DocPage extends React.Component<DocPageProps, any> {

  render() {
    const { eClassifier, ePackage } = this.props;
    return (
      <React.Fragment>
        <div className='head'>
          <div className={'center'}>
            <h1>{eClassifier.name}</h1>
          </div>
        </div>
        <CrumbToc eClassifier={eClassifier}/>
        <div className={['content', 'center'].join(' ')}>
          <Nav ePackage={ePackage} eClassifier={eClassifier}/>
          <div style={styles.layout}>
            <Article eClassifier={eClassifier}/>
            <Sprotty selectedNodeId={eClassifier.name} allowSelection={false} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DocPage;
