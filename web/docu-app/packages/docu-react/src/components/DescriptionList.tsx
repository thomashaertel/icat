import * as React from 'react'
import {ENamedElement} from "../types";
import { convertToMd } from "../util/turndown";
const ReactMarkdown = require("react-markdown");

export interface DescriptionListProps<T> {
  terms?: T[],
  title: string,
  renderTerm: (t: T) => React.ReactElement<any>
}

const DescriptionList = function<T extends ENamedElement>(props: DescriptionListProps<T>) {
  const {
    terms,
    title,
    renderTerm
  } = props;
  return (
    <React.Fragment>
      {
        terms && terms.length > 0 &&
        <h2 id={title.toLowerCase()}>{title}</h2>
      }
      {
        terms &&
        <dl>
        {
          terms.map((feat: T) => {
            const desc = convertToMd(feat.description);
            return (
              <React.Fragment>
                <dt id={`${feat.name}`} key={feat.name}>
                  {renderTerm(feat)}
                </dt>
                <dd><ReactMarkdown source={desc}/></dd>
              </React.Fragment>
            )
          })
        }
        </dl>
      }
    </React.Fragment>
  );
};

export default DescriptionList;
