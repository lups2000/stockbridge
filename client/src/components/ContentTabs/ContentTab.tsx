import React from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

const ContentTab: React.FC<Props> = ({ children }) => {
  return (
    <ul
      style={{
        listStyleType: 'none',
        overflow: 'hidden',
        marginTop: '5em',
        flex: 'column',
        gap: 10,
      }}
    >
      {children}
    </ul>
  );
};

export default ContentTab;
