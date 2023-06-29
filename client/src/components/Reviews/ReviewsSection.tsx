import { FC } from 'react';
import { Advert, PopulatedAdvert } from '../../api/collections/advert';
import { ReviewOfferSection } from '../ProductOverview/ReviewOfferSection';
import { Reviewbar } from './Reviewbar';

type ReviewsSectionProps = {
  advert: PopulatedAdvert;
};
const ReviewsSection: FC<ReviewsSectionProps> = (props) => {
  return (
    <ReviewOfferSection section="REVIEWS">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          padding: '30px',
        }}
      >
        {props.advert.reviews &&
          props.advert.reviews.map((review, i) => (
            <Reviewbar reviewID={review._id} />
          ))}
      </div>
    </ReviewOfferSection>
  );
};

export { ReviewsSection };
