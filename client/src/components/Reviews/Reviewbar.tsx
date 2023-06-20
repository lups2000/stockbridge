import { FC, useEffect, useState } from 'react';
import { getReview, Review } from '../../api/collections/review';
import { getStore, User } from '../../api/collections/user';
import { InfoBar } from '../ProductOverview/InfoBar';
import { Ratings } from '../Ratings';
import { StoreDetailsModal } from '../Store/StoreDetailsModal';
import { BodyText } from '../Text/BodyText';

type ReviewBarProps = {
  review?: Review;
  store?: User;
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
  return (
    <>
      {props.review && props.store && (
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
                {props.store.name}
              </BodyText>
              {showModal && (
                <StoreDetailsModal
                  isShowing={showModal}
                  onClose={closeModal}
                  storeName={props.store.phoneNumber}
                  rating={props.store.rating}
                ></StoreDetailsModal>
              )}

              <BodyText
                style={{
                  font: 'light',
                  fontFamily: 'Poppins',
                  color: 'black',
                }}
              >
                {props.review.createdAt.toString().substring(0, 10)}
                {Ratings(props.review.rating ? props.review.rating : 0)}
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
              {props.review?.description}
            </BodyText>
          }
        />
      )}
    </>
  );
};

export { Reviewbar };
