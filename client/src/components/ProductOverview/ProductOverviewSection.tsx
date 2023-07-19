import React, { useContext, useState } from 'react';

import { ProductDetailsTopBar } from './ProductDetailsTopBar';
import { ProductDetails } from './ProductDetails';
import { Button } from 'react-bootstrap';
import { PopulatedAdvert } from '../../api/collections/advert';
import { OfferModal } from '../Offers/OfferModal';
import { PopulatedUser } from '../../api/collections/user';
import { LoginContext } from '../../contexts/LoginContext';
import { PriorizationModal } from '../Priorization/PriorizationModal';

type ProductOverviewSectionProps = {
  advert: PopulatedAdvert;
  store: PopulatedUser;
};

const ProductOverviewSection: React.FC<ProductOverviewSectionProps> = (
  props,
) => {
  const { user } = useContext(LoginContext);
  const owner = user?._id === props.advert?.store?._id;
  const button_text = !owner
    ? 'Make offer'
    : props.advert?.prioritized
    ? ''
    : 'Prioritize';

  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showPriorizationModal, setShowPriorizationModal] = useState(false);

  const closeOfferModal = (rerender: boolean) => {
    setShowOfferModal(false);
    if (rerender) window.location.reload();
  };
  const closePriorizationModal = (rerender: boolean) => {
    setShowPriorizationModal(false);
    if (rerender) window.location.reload();
  };
  const openOfferModal = () => {
    setShowOfferModal(true);
  };
  const openPriorizationModal = () => {
    setShowPriorizationModal(true);
  };
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#FDDFE3',
        }}
      >
        <ProductDetailsTopBar owner={owner} advert={props.advert} />
        <div
          style={{
            paddingTop: 30,
            paddingBottom: 100,
            paddingLeft: 15,
            position: 'relative',
          }}
        >
          {props.advert ? (
            <>
              <ProductDetails advert={props.advert} />
            </>
          ) : undefined}
          {!props.advert.prioritized || !owner ? (
            <div>
              <Button
                style={{
                  cursor: 'pointer',
                  position: 'absolute',
                  right: 12,
                  bottom: 30,
                  width: 150,
                  fontWeight: 600,
                  fontSize: 24,
                  padding: 7,
                  textAlign: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  border: 'rounded-md',
                  backgroundColor: 'black',
                  borderColor: 'black',
                }}
                onClick={owner ? openPriorizationModal : openOfferModal}
              >
                {button_text}
              </Button>
            </div>
          ) : undefined}
        </div>
      </div>
      <OfferModal
        isShowing={showOfferModal}
        onClose={() => closeOfferModal(false)}
        onSave={() => closeOfferModal(true)}
        advert={props.advert}
        storeName={props.store.name}
        rating={props.store.rating}
      />
      <PriorizationModal
        isShowing={showPriorizationModal}
        onClose={closePriorizationModal}
        advertID={props.advert._id!}
      />
    </>
  );
};

export { ProductOverviewSection };
