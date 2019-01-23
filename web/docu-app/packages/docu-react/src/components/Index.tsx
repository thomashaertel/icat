import * as React from 'react';
import {RouteComponentProps, withRouter} from "react-router-dom";
import {EPackage} from "../types";
import Sprotty from "./Sprotty";
import JumpTo from "./JumpTo";
import Nav from "./Nav";

export interface IndexPageProps {
  ePackage: EPackage;
}

const IndexPage = ({ ePackage, history, location }: IndexPageProps & RouteComponentProps<any>) => (
  <React.Fragment>
    <div className='head'>
      <div className={'center'}>
        <h1>{ePackage.name}</h1>
      </div>
    </div>
    <JumpTo title='Overview' toc={[]} />
    <div className='center'>
      <div className='content'>
        <Nav ePackageName={ePackage.name} eNamedElement={ePackage}/>
        <div className='layout'>
          <Sprotty
            onDoubleClick={(ids) => {
              if (location.pathname.substring(1) === ids[0]) {
                return;
              }
              history.push(`/${ids[0]}`)
            }}
            open
            showCollapsibleButton={false}
            ePackage={ePackage.name}
          />
        </div>
      </div>
    </div>
  </React.Fragment>
);

export default withRouter<RouteComponentProps<any> & IndexPageProps>(IndexPage);
