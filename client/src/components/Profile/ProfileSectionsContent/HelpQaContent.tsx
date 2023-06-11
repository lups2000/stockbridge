import React, { ReactElement } from 'react';

type Props = {
  children: ReactElement[];
};

/**
 * Component that displays the content of Help and QA section.
 */
const HelpQaContent: React.FC<Props> = ({ children }) => {
  return <div>this is the content of qa</div>;
};

export default HelpQaContent;
