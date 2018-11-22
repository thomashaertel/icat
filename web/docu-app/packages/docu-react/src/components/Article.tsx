import * as React from 'react'
import {isEClass, isEEnum} from "../util";
import EClassArticle from "./EClassArticle";
import EEnumArticle from "./EEnumArticle";
import EDataTypeArticle from "./EDataTypeArticle";
import {EDataType, ENamedElement} from "../types";

export interface ArticleProps {
  eClassifier: ENamedElement;
}

const Article = ({ eClassifier }: ArticleProps) => {
  if (isEClass(eClassifier)) {
    return (<EClassArticle {...eClassifier} />);
  } else if (isEEnum(eClassifier)) {
    return (<EEnumArticle {...eClassifier} />)
  }

  return (<EDataTypeArticle {...(eClassifier as EDataType)} />);
};


export default Article;