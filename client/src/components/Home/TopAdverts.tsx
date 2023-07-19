import React, { FC, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { BodyText } from '../Text/BodyText';
import { AdvertCard } from '../Adverts/AdvertCard';
import {
  PopulatedAdvert,
  getPopularAdverts,
} from '../../api/collections/advert';
import { FadeLoader } from 'react-spinners';
import { palette } from '../../utils/colors';
import '../../components/override.css';

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
      breakpoint: { max: 1000, min: 650 },
      items: 1,
    },
  };

  const [topAdverts, setTopAdverts] = useState<PopulatedAdvert[]>();

  useEffect(() => {
    getPopularAdverts()
      .then((res) => {
        setTopAdverts(res.results);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    topAdverts?.length! > 0 ?
    <div>
      <BodyText style={{ fontSize: 20, fontWeight: 600, paddingLeft: 25 }}>
        Top Adverts
      </BodyText>
      <div
        style={{
          display: topAdverts ? 'block' : 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {topAdverts ? (
          <Carousel
            responsive={responsive}
            infinite={true}
            centerMode
            containerClass="carousel-container"
          >
            {topAdverts?.map((item, index) => {
              return (
                <AdvertCard
                  key={index}
                  id={item._id}
                  name={item.productname}
                  price={item.price}
                  quantity={item.quantity}
                  icon={item.imageurl}
                  description={item.description}
                  prioritized={item.prioritized}
                  creationDate={item.createdAt}
                  fancyEffect={true}
                  category={item.category}
                />
              );
            })}
          </Carousel>
        ) : (
          <FadeLoader color={palette.subSectionsBgAccent} />
        )}
      </div>
    </div> : <></>
  );
};
