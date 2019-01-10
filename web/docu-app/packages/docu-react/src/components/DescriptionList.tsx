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
          terms.map((term: T, idx: number) => {
            const id = title + "-" + term.name + "-" + idx;
            const desc = convertToMd(term.description);
            return (
              <React.Fragment key={id}>
                <dt id={term.name} key={id}>
                  {renderTerm(term)}
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
