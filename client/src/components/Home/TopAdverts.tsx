import React, { FC } from 'react';
import { BodyText } from '../Text/BodyText';
import { AdvertCard } from '../AdvertCard';

/**
 * This component displays the top adverts from different categories, those that have been prioritized.
 */
export const TopAdverts: FC = () => {
  return (
    <div>
      <BodyText style={{ fontSize: 20, fontWeight: 600, paddingLeft: 25 }}>
        Top Adverts
      </BodyText>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 25,
          paddingLeft: 25,
          paddingRight: 25,
        }}
      >
        <AdvertCard />
      </div>
    </div>
  );
};
