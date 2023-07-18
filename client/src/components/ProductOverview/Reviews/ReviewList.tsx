import React, { FC } from 'react';
import { FadeLoader } from 'react-spinners';
import { palette } from '../../../utils/colors';
import { BodyText } from '../../Text/BodyText';
import { ReviewDisplay } from '../../Reviews/ReviewsSection';
import { ReviewCard } from './ReviewCard';

export const ReviewList: FC<ReviewDisplay> = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 50,
        alignItems: 'center',
      }}
    >
      {props.reviews ? (
        props.reviews.length > 0 ? (
          props.reviews.map((item, index) => (
            <ReviewCard
              key={index}
              name={item.reviewer.name ?? ''}
              date={new Date(item.createdAt)}
              description={item.description}
              rating={item.rating}
              style={{width: "100%"}}
            />
          ))
        ) : (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              height: 150,
            }}
          >
            <BodyText
              style={{
                color: 'red',
                fontSize: 30,
                textAlign: 'center',
              }}
            >
              No reviews yet
            </BodyText>
          </div>
        )
      ) : (
        <FadeLoader color={palette.subSectionsBgAccent} />
      )}
    </div>
  );
};
