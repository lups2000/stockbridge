import React, { useEffect, useState } from 'react';
import { ProductAttribute } from '../ProductOverview/ProductAttribute';
import { Offer } from '../../api/collections/offer';
import { PopulatedAdvert } from '../../api/collections/advert';
import { BodyText } from '../Text/BodyText';
import { OfferModal } from './OfferModal';
import { Ratings } from '../Ratings';
import { InfoBar } from '../ProductOverview/InfoBar';
import { getStore, PopulatedUser } from '../../api/collections/user';
require('./offerBarStyle.scss');

type OfferBarUserProfileProps = {
  offer: Offer;
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
  const [offerer, setOfferer] = useState({} as PopulatedUser);
  const [offeree, setOfferee] = useState({} as PopulatedUser);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedOfferor = await getStore(props.offer.offeror!);
        setOfferer(fetchedOfferor);
        const fetchedOfferee = await getStore(props.offer.offeree!);
        setOfferee(fetchedOfferee);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [props.offer.offeree, props.offer.offeror]);

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
                {offerer?.name ?? 'No Name given'}
                {Ratings(offerer?.rating ?? 0, 'red')}
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
                name="quantity"
                value={props?.offer?.quantity}
              />
              <ProductAttribute
                name="price"
                value={props?.offer?.price}
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
