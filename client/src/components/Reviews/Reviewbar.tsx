import { FC, useEffect, useState } from 'react';
import {
  getReview,
  PopulatedReview,
  Review,
} from '../../api/collections/review';
import { getStore, User } from '../../api/collections/user';
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
      setReview(await getReview(props.reviewID!));
    };
    fetchReview();
  }, []);

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
                }}
                onClick={openModal}
              >
                {review.reviewer.name}
              </BodyText>
              {showModal && (
                <StoreDetailsModal
                  isShowing={showModal}
                  onClose={closeModal}
                ></StoreDetailsModal>
              )}

              <BodyText
                style={{
                  font: 'light',
                  fontFamily: 'Poppins',
                  color: 'black',
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
