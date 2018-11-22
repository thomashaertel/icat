import * as React from 'react';
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import {EClass, EDataType, EEnum, EPackage} from "../types";
import Sprotty from "./Sprotty";

export interface IndexPageProps {
  ePackage: EPackage;
}

interface GenerateLinksProps {
  title: string;
  names: string[];
}

const GenerateLinks = ({ title, names }: GenerateLinksProps) => {
  if (names && names.length > 0) {
    return (
      <React.Fragment>
        <h3>{title}</h3>
        <ol>
          {
            (names || [])
              .sort()
              .map((name: string) => (
                <li>
                  <Link to={`/${name}`}>{name}</Link>
                </li>
              ))
          }
        </ol>
      </React.Fragment>
    );
  }

  return null;
};


const IndexPage = ({ ePackage, history }: IndexPageProps & RouteComponentProps<any>) => (
  <React.Fragment>
    <div className='head'>
      <div className='center'>
        <h1>Classes in Package {ePackage.name}</h1>
      </div>
    </div>
    <Sprotty
      onSelect={(ids) => history.push(`/${ids[0]}`)}
      allowSelection
    />
    <div className='center content'>
      <ol>
        <li>
          <GenerateLinks
            title='Classes'
            names={(ePackage.classes || []).map((cls: EClass) => cls.name)}
          />
        </li>
        <li>
          <GenerateLinks
            title='Enums'
            names={(ePackage.enums || []).map((eEnum: EEnum) => eEnum.name)}
          />
        </li>
        <li>
          <GenerateLinks
            title='EDataTypes'
            names={(ePackage.dataTypes || []).map((dataType: EDataType) => dataType.name)}
          />
        </li>
      </ol>
    </div>
  </React.Fragment>
);

export default withRouter<RouteComponentProps<any> & IndexPageProps>(IndexPage);