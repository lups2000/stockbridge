import React, { ReactElement } from 'react';
import { BodyText } from '../../Text/BodyText';

type Props = {
  children: ReactElement[];
};

/**
 * Component that displays the content of Help and QA section.
 */
const HelpQaContent: React.FC<Props> = ({ children }) => {
  return <BodyText style={{
    fontWeight: 300,
    fontSize: 42,
    position: 'relative',
    top: '20%',
    left:'35%'
  }}>Coming Soon ...!</BodyText>;
};

export default HelpQaContent;
