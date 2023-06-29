import React from 'react';
import { PopulatedAdvert } from '../../api/collections/advert';
import { OfferStatus, PopulatedOffer } from '../../api/collections/offer';
import { BodyText } from '../Text/BodyText';
import { OfferBar } from './OfferBar';

type OfferSectionProps = {
  status: OfferStatus;
  offers: PopulatedOffer[];
  advert: PopulatedAdvert;
  storeName: string;
  rating: number;
};

function colorMap(status: OfferStatus): string {
  switch (status) {
    case OfferStatus.OPEN:
      return '#4285F4';
    case OfferStatus.ACCEPTED:
      return '#4ECBA9';
    case OfferStatus.REJECTED:
      return 'red';
    case OfferStatus.CANCELED:
      return '#ffc071';
    default:
      return '#4285F4';
  }
}

const OfferSection: React.FC<OfferSectionProps> = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px',
      }}
    >
      <BodyText
        style={{
          fontFamily: 'poppins',
          fontSize: '24px',
          fontWeight: 600,
          color: colorMap(
            props.status === undefined ? OfferStatus.OPEN : props.status,
          ),
        }}
      >
        {props.status}
      </BodyText>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          width: '100%',
          alignItems: 'center',
          fontFamily: 'Poppins',
        }}
      >
        {props?.offers &&
          (props.offers.length > 0 ? (
            props.offers.map((offer, index) => (
              <React.Fragment key={`offer-${index}`}>
                {/* change this to correct variables */}
                <OfferBar offer={offer} advert={props.advert} />
              </React.Fragment>
            ))
          ) : (
            <BodyText style={{}}>No offers yet ...</BodyText>
          ))}
      </div>
    </div>
  );
};

export { OfferSection };
