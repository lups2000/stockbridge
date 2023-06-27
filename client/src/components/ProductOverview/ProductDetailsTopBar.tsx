import React, { useEffect, useRef, useState } from 'react';
import edit from '../../assets/edit-pencil.svg';
import review from '../../assets/carbon_review.svg';
import { Button, Image } from 'react-bootstrap';
import { Advert, PopulatedAdvert } from '../../api/collections/advert';
import { EditAdvertModal } from './EditAdvertModal';
import { BodyText } from '../Text/BodyText';
import { EditReviewModal } from './EditReviewModal';

type ProductDetailsTopBarProps = {
  owner: boolean;
  advert: PopulatedAdvert;
};

const ProductDetailsTopBar: React.FC<ProductDetailsTopBarProps> = (props) => {
  const [showAdvertModal, setShowAdvertModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const closeModal = () => {
    if (props.owner) {
      setShowAdvertModal(false);
    } else {
      setShowReviewModal(false);
    }
    window.location.reload();
  };
  const openModal = () => {
    if (props.owner) {
      setShowAdvertModal(true);
    } else {
      setShowReviewModal(true);
    }
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
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
        PRODUCT DETAILS
      </BodyText>
      <Button
        style={{
          width: 'full',
          marginRight: '20px',
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        }}
        onClick={openModal}
      >
      <Image src={props.owner ? edit : review}></Image>
      </Button>
      {showAdvertModal && (
        <EditAdvertModal
          isShowing={showAdvertModal}
          onClose={closeModal}
          advert={props.advert}
        />
      )}
      {showReviewModal && (
        <EditReviewModal
          isShowing={showReviewModal}
          onClose={closeModal}
          advert={props.advert}
        />
      )}
    </div>
  );
};

export { ProductDetailsTopBar };
