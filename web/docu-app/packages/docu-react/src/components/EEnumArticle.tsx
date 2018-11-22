import * as React from 'react';
const ReactMarkdown = require("react-markdown");
import {EEnum, ELiteral} from "../types";
import DescriptionList from "./DescriptionList";
import {convertToMd} from "../util/turndown";


const EEnumArticle = (props: EEnum) => {
  const { description = `Documentation of the EEnum ${props.name}` } = props;
  return (
    <article>
      <ReactMarkdown source={convertToMd(description)}/>
      <DescriptionList
        title="Literals"
        terms={props.literals}
        renderTerm={(literal: ELiteral) => (
          <span>{literal.name} = {literal.value}</span>
        )}
      />
    </article>
  );
};

export default EEnumArticle;
