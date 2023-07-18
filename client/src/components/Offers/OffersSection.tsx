import { FC, useEffect, useState } from 'react';
import { PopulatedAdvert } from '../../api/collections/advert';
import { getOffersByAdvert, OfferStatus } from '../../api/collections/offer';
import { ReviewOfferSection } from '../ProductOverview/ReviewOfferSection';
import { OfferSection } from './OfferSection';

type OffersSectionProps = {
  advert: PopulatedAdvert;
  storeName: string;
  rating: number;
};

const OffersSection: FC<OffersSectionProps> = (props) => {
  const openOffers =
    props.advert.offers?.filter((o) => o.status === 'Open') ?? [];
  const acceptedOffers =
    props.advert.offers?.filter((o) => o.status === 'Accepted') ?? [];
  const rejectedOffers =
    props.advert.offers?.filter((o) => o.status === 'Rejected') ?? [];
  const canceledOffers =
    props.advert.offers?.filter((o) => o.status === 'Canceled') ?? [];
  return (
    <ReviewOfferSection section="OFFERS">
      {openOffers.length > 0 && (
        <OfferSection
          status={OfferStatus.OPEN}
          offers={openOffers}
          advert={props.advert}
          storeName={props.storeName}
          rating={props.rating}
        />
      )}
      {acceptedOffers.length > 0 && (
        <OfferSection
          status={OfferStatus.ACCEPTED}
          offers={acceptedOffers}
          advert={props.advert}
          storeName={props.storeName}
          rating={props.rating}
        />
      )}
      {rejectedOffers.length > 0 && (
        <OfferSection
          status={OfferStatus.REJECTED}
          offers={rejectedOffers}
          advert={props.advert}
          storeName={props.storeName}
          rating={props.rating}
        />
      )}
      {canceledOffers.length > 0 && (
        <OfferSection
          status={OfferStatus.CANCELED_USER}
          offers={canceledOffers}
          advert={props.advert}
          storeName={props.storeName}
          rating={props.rating}
        />
      )}
    </ReviewOfferSection>
  );
};

export { OffersSection };
