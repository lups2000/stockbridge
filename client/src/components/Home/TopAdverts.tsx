import React, { FC } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { BodyText } from '../Text/BodyText';
import { AdvertCard } from '../AdvertCard';

/**
 * This component displays the top adverts from different categories, those that have been prioritized.
 */
export const TopAdverts: FC = () => {
  const responsive = {
    huge_desktop: {
      breakpoint: { max: 6000, min: 3000 },
      items: 5,
    },
    big_desktop: {
      breakpoint: { max: 3000, min: 1900 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1900, min: 1400 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1400, min: 1000 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 1000, min: 650},
      items: 1,
    },
  };

  return (
    <div>
      <BodyText style={{ fontSize: 20, fontWeight: 600, paddingLeft: 25 }}>
        Top Adverts
      </BodyText>
      <div>
        <Carousel responsive={responsive} infinite={true} centerMode>
          <AdvertCard />
          <AdvertCard />
          <AdvertCard />
          <AdvertCard />
          <AdvertCard />
          <AdvertCard />
          <AdvertCard />
          <AdvertCard />
          <AdvertCard />
          <AdvertCard />
        </Carousel>
      </div>
    </div>
  );
};
