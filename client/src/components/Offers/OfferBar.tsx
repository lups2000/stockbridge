import React, { useContext, useEffect, useState } from 'react';
import { ProductAttribute } from '../ProductOverview/ProductAttribute';
import { OfferStatus, PopulatedOffer } from '../../api/collections/offer';
import { PopulatedAdvert } from '../../api/collections/advert';
import { BodyText } from '../Text/BodyText';
import { OfferModal } from './OfferModal';
import { Ratings } from '../Ratings';
import { InfoBar } from '../ProductOverview/InfoBar';
import { User } from '../../api/collections/user';
import outOfStock from '../../assets/out-of-stock.svg'
import { LoginContext } from '../../contexts/LoginContext';
require('./offerBarStyle.scss');

type OfferBarProps = {
  offer: PopulatedOffer;
  advert: PopulatedAdvert;
};

const OfferBar: React.FC<OfferBarProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const { isLoading } = useContext(LoginContext);
  const closeModal = () => {
    setShowModal(false);
  };
  const closeModalOnSave = () => {
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
  }, [props.offer.offeree, props.offer.offeror]);
  return (
    <> 
     {!isLoading ? 
      <InfoBar
        onClick={openModal}
        contentLine1={
          <>
            <BodyText
              style={{
                font: 'light',
                fontFamily: 'Poppins',
                color: 'black',
                width: '50%',
                textAlign: 'start',
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
                width: '50%',
                textAlign: 'end',
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
            {
              props.offer.status === OfferStatus.CANCELED_OUT_OF_STOCK && 
              <img
              style={{
                marginBottom: '2%',
              }}
              src={outOfStock}
              alt="OOS"
            />
            }
          </div>
        }
      /> : <></>}
      {showModal && (
        <OfferModal
          isShowing={showModal}
          onClose={closeModal}
          onSave={closeModalOnSave}
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
