import { FC, useEffect, useState } from 'react';
import { getReviewsByAdvert, Review } from '../../api/collections/review';
import { getStore, User } from '../../api/collections/user';
import { ReviewOfferSection } from '../ProductOverview/ReviewOfferSection';
import { Reviewbar } from './Reviewbar';

type ReviewsSectionProps = {
  advertID: string;
};
const ReviewsSection: FC<ReviewsSectionProps> = (props) => {
  const [reviews, setReviews] = useState(
    [] as { review: Review; store: User }[],
  );
  console.log(props.advertID);
  useEffect(() => {
    const fetchData = async () => {
      let advertReviews = await getReviewsByAdvert(props.advertID);
      let fetchedReviews: { review: Review; store: User }[] = [];
      advertReviews = advertReviews.filter(
        (r) => r.reviewedAdvert === props.advertID,
      );
      for (const review of advertReviews) {
        const store = await getStore(review.reviewer);
        fetchedReviews.push({ review: review, store: store });
      }
      setReviews(fetchedReviews);
    };
    fetchData();
  }, []);
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
        {reviews.map((r, i) => (
          <Reviewbar review={r.review} store={r.store} />
        ))}
      </div>
    </ReviewOfferSection>
  );
};

export { ReviewsSection };
