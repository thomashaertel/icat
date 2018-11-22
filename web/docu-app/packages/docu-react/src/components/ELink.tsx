import * as React from 'react'
import {Link} from "react-router-dom";
import {PackageContentContext} from '../App';

export interface ELinkProps {
  name: string;
}

const ELink = ({ name }: ELinkProps) => (
  <PackageContentContext.Consumer>
    {
      knownTypes => {
        if (knownTypes.has(name)) {
          return <Link to={`/${name}`}>{name}</Link>
        }
        return (<span>{name}</span>);
      }
    }
  </PackageContentContext.Consumer>
);

export default ELink;
