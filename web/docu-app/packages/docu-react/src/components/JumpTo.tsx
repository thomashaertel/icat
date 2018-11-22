import * as React from 'react';

export interface CrumbTocProps {
  toc: string[];
  title?: string;
}

const JumpTo = ({ toc, title = 'Jump to:' }: CrumbTocProps) => (
  <div className='toc'>
    <div className='toc-inner'>
      <span>{title}</span>
      <ol>
        {toc.map(entry => (
          <li key={entry}><a href={'#' + entry}>{entry.charAt(0).toUpperCase() + entry.substr(1)}</a></li>
        ))}
      </ol>
    </div>
  </div>
);

export default JumpTo;
