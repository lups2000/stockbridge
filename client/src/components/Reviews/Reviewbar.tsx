import { FC, useEffect, useState } from 'react';
import { getReview, PopulatedReview } from '../../api/collections/review';
import { getStore, PopulatedUser } from '../../api/collections/user';

import { InfoBar } from '../ProductOverview/InfoBar';
import { Ratings } from '../Ratings';
import { StoreDetailsModal } from '../Store/StoreDetailsModal';
import { BodyText } from '../Text/BodyText';

type ReviewBarProps = {
  reviewID?: string;
};
const Reviewbar: FC<ReviewBarProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    window.location.reload();
  };
  const openModal = () => {
    setShowModal(true);
  };

  const [review, setReview] = useState({} as PopulatedReview);

  useEffect(() => {
    const fetchReview = async () => {
      const fetchedReview = await getReview(props.reviewID!);
      setReview(fetchedReview);
    };
    fetchReview();
  }, [props.reviewID, review.reviewer?._id]);

  return (
    <>
      {review && review.reviewer && (
        <InfoBar
          onClick={openModal}
          contentLine1={
            <>
              <BodyText
                style={{
                  font: 'light',
                  fontSize: '18px',
                  fontFamily: 'Poppins',
                  color: 'black',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  width: '50%',
                  textAlign: 'start',
                }}
                onClick={openModal}
              >
                {review.reviewer.name}
              </BodyText>
              {showModal && (
                <StoreDetailsModal
                  isShowing={showModal}
                  onClose={closeModal}
                  store={review.reviewer._id!}
                ></StoreDetailsModal>
              )}
              <BodyText
                style={{
                  font: 'light',
                  fontFamily: 'Poppins',
                  color: 'black',
                  width: '50%',
                  textAlign: 'end',
                }}
              >
                {review.createdAt.toString().substring(0, 10)}
                {Ratings(review.rating ? review.rating : 0)}
              </BodyText>
            </>
          }
          contentLine2={
            <BodyText
              style={{
                color: 'GrayText',
                font: 'light',
                justifyContent: 'start',
                alignItems: 'start',
                marginLeft: '4%',
              }}
            >
              {review?.description}
            </BodyText>
          }
        />
      )}
    </>
  );
};

export { Reviewbar };
