import * as React from 'react';
import {Link} from "react-router-dom";
const ReactMarkdown = require("react-markdown");
import {EAttribute, EClass, EOperation, EReference, ENamedElement} from "../types";
import ELink from "./ELink";
import DescriptionList from "./DescriptionList";
import {join, makeNamedElement} from "../util";
import { convertToMd } from "../util/turndown";

const styles: any = {
  leftPad: {
    marginLeft: '0.25em'
  }
};

const SpanWithLeftMargin = ({ children }: any) =>(
  <span style={styles.leftPad}>{children}</span>
);

const TypeRef = ({ type, many }: any) => {
  // check for generics
  const angleIndex = type.indexOf('<');
  if (angleIndex > -1) {
    const generics: string[] = type.substring(angleIndex + 1, type.lastIndexOf('>')).split(",");
    return (
      <React.Fragment>
        <span>{type.substring(0, angleIndex + 1)}</span>
        {
          join(
            generics.map(t => <ELink name={t}/>),
            <span>,</span>
          )
        }
        <span>{type.substring(type.lastIndexOf(">"))}</span>
      </React.Fragment>
    )
  }
  return many ?
    <span>List&lt;<ELink name={type}/>&gt;</span> :
    <ELink name={type} />;
};

const EClassArticle = (props: EClass) => {
  const {
    description = `Documentation of the EClass ${props.name}`,
    attributes = [],
    references = [],
    operations = [],
    superTypes = [],
  } = props;
  return (
    <article>
      <ReactMarkdown source={convertToMd(description)}/>
      < DescriptionList
        title="Super Types"
        terms={superTypes.map(makeNamedElement)}
        renderTerm={(superType: ENamedElement) => <Link to={`/${superType.name}`}>{superType.name}</Link>}
      />
      <DescriptionList
        title='Attributes'
        terms={attributes}
        renderTerm={(attr: EAttribute) => (
          <code>
            <TypeRef type={attr.type} many={attr.many}/>
            <SpanWithLeftMargin>{attr.name}</SpanWithLeftMargin>
          </code>
        )}
      />
      <DescriptionList
        title='References'
        terms={references}
        renderTerm={(ref: EReference) => (
          <code>
            <TypeRef type={ref.type} many={ref.many}/>
            <SpanWithLeftMargin>{ref.name}</SpanWithLeftMargin>
          </code>
        )}
      />
      <DescriptionList
        title='Operations'
        terms={operations}
        renderTerm={(op: EOperation) => (
          <code>
            <TypeRef type={op.type} many={op.many}/>
            <SpanWithLeftMargin>{op.name}</SpanWithLeftMargin>
            (
            {
              (op.parameters || []).map(p => (
                <React.Fragment>
                  <ELink name={p.type}/><span style={styles.leftPad}>{p.name}</span>
                </React.Fragment>
              ))
            }
            )
          </code>
        )}
      />
    </article>
  );
};

export default EClassArticle;

