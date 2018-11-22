import * as React from 'react';
const ReactMarkdown = require("react-markdown");
import {EDataType} from "../types";
import {convertToMd} from "../util/turndown";

const EDataTypeArticle = (props: EDataType) => {
  const {
    description = `Documentation of the EDataType ${props.name}`,
  } = props;
  return (
    <article>
      <ReactMarkdown source={convertToMd(description)}/>
      <code>{props.type}</code>
    </article>
  );
};

export default EDataTypeArticle;

