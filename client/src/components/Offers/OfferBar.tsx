import React, { useContext, useEffect, useState } from 'react';
import { ProductAttribute } from '../ProductOverview/ProductAttribute';
import { Offer, PopulatedOffer } from '../../api/collections/offer';
import { Advert, PopulatedAdvert } from '../../api/collections/advert';
import { BodyText } from '../Text/BodyText';
import { OfferModal } from './OfferModal';
import { Ratings } from '../Ratings';
import { InfoBar } from '../ProductOverview/InfoBar';
import { LoginContext } from '../../contexts/LoginContext';
import { User } from '../../api/collections/user';
require('./offerBarStyle.scss');

type OfferBarProps = {
  offer: PopulatedOffer;
  advert: PopulatedAdvert;
};

const OfferBar: React.FC<OfferBarProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    //change to set Advert
    window.location.reload();
  };
  const openModal = () => {
    setShowModal(true);
  };
  const [offerer, setOfferer] = useState({} as User);
  const [offeree, setOfferee] = useState({} as User);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setOfferer(props.offer.offeror!);
        setOfferee(props.offer.offeree!);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <InfoBar
        onClick={openModal}
        contentLine1={
          <>
            <BodyText
              style={{
                font: 'light',
                fontFamily: 'Poppins',
                color: 'black',
              }}
            >
              {offerer.name ?? 'No Name given'}
              {Ratings(offerer.rating ?? 0)}
            </BodyText>
            <BodyText
              style={{
                font: 'light',
                fontFamily: 'Poppins',
                color: 'black',
              }}
            >
              {props?.offer?.createdAt?.toString().slice(0, 10)}
            </BodyText>
          </>
        }
        contentLine2={
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '10%',
            }}
          >
            <ProductAttribute
              name="Quantity"
              value={props?.offer?.quantity}
              unit="pcs"
            />
            <ProductAttribute
              name="Price"
              value={props?.offer?.price}
              unit="€"
            />
          </div>
        }
      />
      {showModal && (
        <OfferModal
          isShowing={showModal}
          onClose={closeModal}
          advert={props.advert}
          offer={props.offer}
          storeName={offeree.name!}
          rating={offeree.rating!}
        />
      )}
    </>
  );
};

export { OfferBar };
