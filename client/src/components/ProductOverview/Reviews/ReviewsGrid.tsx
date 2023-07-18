import React, { FC } from 'react';
import { BodyText } from '../../Text/BodyText';
import { FadeLoader } from 'react-spinners';
import { palette } from '../../../utils/colors';
import { ReviewCard } from './ReviewCard';
import { ReviewDisplay } from '../../Reviews/ReviewsSection';


export const ReviewsGrid: FC<ReviewDisplay> = (props) => {
  return (
    <div
      className="row"
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 50,
        alignItems: 'center',
      }}
    >
      {props.reviews ? (
        props.reviews.length > 0 ? (
          props.reviews.map((item, index) => (
            <div
              className="col-md-4 mb-4"
              key={item._id}
              style={{
                flex: '1 0 300px',
                maxWidth: '300px',
                marginRight: '20px',
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <ReviewCard
                key={index}
                name={item.reviewer.name ?? ''}
                date={new Date(item.createdAt)}
                description={item.description}
                rating={item.rating}
              />
            </div>
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
