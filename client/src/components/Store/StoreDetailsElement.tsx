import React, { FC } from 'react';
import { BodyText } from '../Text/BodyText';

interface StoreDetailsElementProps {
  label: string;
  children: React.ReactNode;
}

export const StoreDetailsElement: FC<StoreDetailsElementProps> = (props) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
      <BodyText
        style={{
          color: '#7881D7',
          fontWeight: 600,
          fontSize: 24,
        }}
      >
        {props.label + ':'}
      </BodyText>
      <div>{props.children}</div>
    </div>
  );
};
