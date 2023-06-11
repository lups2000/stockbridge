import { Review } from '../../api/collections/review';
import { BodyText } from '../Text/BodyText';
import { Reviewbar } from './Reviewbar';

const ReviewsSection = (reviews: Review[]) => {
  if (reviews.length == 0) {
    reviews = [
      {
        id: '',
        rating: 4,
        description: 'New review 2',
        createdAt: new Date('07.06.2023'),
        reviewer: {
          _id: '6470e8a153c3e3e95e30176b',
          name: 'Reviewer Name',
          rating: 3,
        },
        reviewedAdvert: {
          id: '647ddfb46d74b615e34256bc',
        },
      },
    ];
  }
  return (
    <div
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
        width: 'full',
      }}
    >
      <BodyText
        style={{
          fontFamily: 'poppins',
          color: 'black',
          width: '100%',
          fontSize: '36px',
          fontWeight: 600,
          paddingLeft: '10px',
        }}
      >
        REVIEWS
      </BodyText>
      <div
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {reviews.map((review) => (
          <Reviewbar review={review} />
        ))}
      </div>
    </div>
  );
};

export { ReviewsSection };
