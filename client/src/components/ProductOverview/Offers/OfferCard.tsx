import { CSSProperties, FC, useState } from 'react';
import { BodyText } from '../../Text/BodyText';
import { Ratings } from '../../Ratings';
import { OfferStatus, PopulatedOffer } from '../../../api/collections/offer';
import { OfferModal } from '../../Offers/OfferModal';
import { PopulatedAdvert } from '../../../api/collections/advert';
import outOfStock from '../../../assets/out-of-stock.svg';
interface OfferCardProps {
  status: OfferStatus;
  offer: PopulatedOffer;
  advert: PopulatedAdvert;
  style?: CSSProperties;
}

export const OfferCard: FC<OfferCardProps> = (props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
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

  return (
    <>
      <div
        style={{
          minWidth: 300,
          minHeight: 150,
          border: '3px solid lightgray',
          borderRadius: 15,
          display: 'flex',
          flexDirection: 'column',
          padding: 16,
          ...props.style,
          cursor: 'pointer',
        }}
        onClick={openModal}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
            }}
          >
            <BodyText style={{ fontSize: 18, marginBottom: 0 }}>
              {props.offer.offeror?.name}
            </BodyText>
            <div>
              {Ratings(
                props.offer.offeror?.rating ? props.offer.offeror.rating : 0,
                'red',
              )}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
            }}
          >
            <BodyText style={{ fontSize: 18, marginBottom: 0 }}>
              {props.offer.createdAt
                ? new Date(props.offer.createdAt).toLocaleDateString('it', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                  })
                : ''}
            </BodyText>
          </div>
        </div>
        <div
          style={{
            flexGrow: 1,
            wordBreak: 'break-all',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'start',
            marginLeft: '33%',
            gap: 50,
          }}
        >
          <BodyText style={{ fontWeight: 600, fontSize: 20, marginBottom: 0 }}>
            Quantity:{' '}
            <BodyText
              style={{ fontWeight: 400, display: 'inline', marginLeft: 10 }}
            >
              {props.offer.quantity + ' pcs'}
            </BodyText>
          </BodyText>
          <BodyText style={{ fontWeight: 600, fontSize: 20, marginBottom: 0 }}>
            Price:{' '}
            <BodyText
              style={{ fontWeight: 400, display: 'inline', marginLeft: 10 }}
            >
              {props.offer.price + ' €'}
            </BodyText>
          </BodyText>
          {props.offer.status === OfferStatus.CANCELED_OUT_OF_STOCK && (
            <img
              style={{
                marginLeft: '4em',
              }}
              src={outOfStock}
              alt="OOS"
            />
          )}
        </div>
      </div>
      {showModal && (
        <OfferModal
          isShowing={showModal}
          onClose={closeModal}
          onSave={closeModalOnSave}
          advert={props.advert}
          offer={props.offer}
          storeName={props.offer.offeror?.name}
          rating={props.offer.offeror?.rating}
        />
      )}
    </>
  );
};
