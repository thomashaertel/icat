import * as React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

export interface CrumbTocProps {
  toc: string[];
  title?: string;
  absoluteLink?: boolean;
}

const JumpTo = ({ toc, title = 'Jump to:', absoluteLink=false }: CrumbTocProps) => (
  <div className='toc'>
    <div className='toc-inner'>
      <span>{title}</span>
      <ol>
        {toc.map(entry => (
          <li key={entry}><Link to={`${absoluteLink?"/":"#"}${entry}`}>{entry.charAt(0).toUpperCase() + entry.substr(1)}</Link></li>
        ))}
      </ol>
    </div>
  </div>
);

export default JumpTo;
