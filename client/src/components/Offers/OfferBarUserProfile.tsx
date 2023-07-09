import React, { useContext, useEffect, useState } from 'react';
import { ProductAttribute } from '../ProductOverview/ProductAttribute';
import { PopulatedOffer } from '../../api/collections/offer';
import { PopulatedAdvert } from '../../api/collections/advert';
import { BodyText } from '../Text/BodyText';
import { OfferModal } from './OfferModal';
import { Ratings } from '../Ratings';
import { InfoBar } from '../ProductOverview/InfoBar';
import { User } from '../../api/collections/user';
require('./offerBarStyle.scss');

type OfferBarUserProfileProps = {
  offer: PopulatedOffer;
  advert: PopulatedAdvert;
};

/**
 * This is a user bar for the userinfo page. To avoid breaking the product overview functionality. TODO: refactor
 * @param props
 * @returns
 */
const OfferBarUserProfile: React.FC<OfferBarUserProfileProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
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
    const fetchData = () => {
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
      <div
        style={{
          marginBottom: '1em',
        }}
      >
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
                {/* The state does not work properly, this is a workaround that issue */}
                {props.offer.offeror?.name ?? 'No Name given'}
                {Ratings(props.offer.offeror?.rating ?? 0)}
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
            onSave={closeModalOnSave}
            advert={props.advert}
            offer={props.offer}
            storeName={offeree.name!}
            rating={offeree.rating!}
          />
        )}
      </div>
    </>
  );
};

export { OfferBarUserProfile };
