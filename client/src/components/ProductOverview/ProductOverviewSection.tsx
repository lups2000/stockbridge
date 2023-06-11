import React, { useState } from 'react';

import { ProductDetailsTopBar } from './ProductDetailsTopBar';
import { ProductDetails } from './ProductDetails';

import { Button } from 'react-bootstrap';
import { Advert } from '../../api/collections/advert';
import { OfferModal } from '../Offers/OfferModal';

type ProductOverviewSectionProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    advert: Advert;
    userid: string;
    advertID: string;
  }>;

const ProductOverviewSection: React.FC<ProductOverviewSectionProps> = (
  props,
) => {
  const owner = props.userid === props.advert?.store;
  const button_text = !owner
    ? props.advert?.type === 'Sell'
      ? 'Buy'
      : 'Sell'
    : props.advert?.prioritized
    ? 'Prioritized'
    : 'Prioritize';

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    window.location.reload();
  };
  const openModal = () => {
    setShowModal(true);
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: '30px',
        width: 'full',
        marginTop: '10%',
      }}
    >
      <ProductDetailsTopBar
        owner={owner}
        advert={props.advert}
        advertID={props.advertID}
      ></ProductDetailsTopBar>
      <div
        style={{
          background: '#FDDFE3',
          alignItems: 'start',
          justifyContent: 'start',
          paddingLeft: '3%',
          width: '100%',
          padding: '40px',
        }}
      >
        <ProductDetails advert={props.advert}></ProductDetails>
        {showModal && (
          <OfferModal
            isShowing={showModal}
            onClose={closeModal}
            advert={props.advert}
          />
        )}
        <Button
          style={{
            cursor: 'pointer',
            fontWeight: 'bold',
            fontFamily: 'Poppins',
            width: '150px',
            marginLeft: '85%',
            marginTop: '25px',
            fontSize: '24px',
            textAlign: 'center',
            color: 'white',
            textDecoration: 'none',
            padding: '7px',
            border: 'rounded-md',
            backgroundColor: 'black',
            borderColor: 'black',
          }}
          onClick={openModal}
        >
          {button_text}
        </Button>
      </div>
    </div>
  );
};

export { ProductOverviewSection };
