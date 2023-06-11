import React from 'react';
import { palette } from '../../utils/colors';

type Props = {
  title: string;
  index: number;
  setSelectedTab: (index: number) => void;
};

const TabTitle: React.FC<Props> = ({ title, setSelectedTab, index }) => {
  return (
    <li style={{ display: 'inline' }}>
      <button
        className="btn-lg"
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: '#f99697',
          fontSize: '30px',
          padding: '15px 20px',
        }}
        onClick={() => setSelectedTab(index)}
      >
        {title}
      </button>
    </li>
  );
};

export default TabTitle;
