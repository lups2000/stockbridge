import React, { ReactElement, useState } from 'react';
import ContentTabTitle from './ContentTabTitle';
//import styles from "./styles.css";

type Props = {
  children: ReactElement[];
};

const Tabs: React.FC<Props> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div>
      <ul
        style={{
          listStyleType: 'none',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
        }}
      >
        {children.map((item, index) => (
          <ContentTabTitle
            key={index}
            title={item.props.title}
            index={index}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </ul>
      {children[selectedTab]}
    </div>
  );
};

export default Tabs;
