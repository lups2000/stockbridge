import React, { FC, useEffect, useState } from 'react';
import { ReviewOfferSection } from '../ReviewOfferSection';
import { PopulatedAdvert } from '../../../api/collections/advert';
import {
  OfferStatus,
  PopulatedOffer,
  getOffersByAdvert,
} from '../../../api/collections/offer';
import { OfferCard } from './OfferCard';
import { BodyText } from '../../Text/BodyText';
import { colorMap } from '../../../utils/functions';
import { Button } from 'react-bootstrap';
import {
  AdvertSortCriteria,
  ExtraCriteria,
  OfferSortCriteria,
} from '../../ContentTabs/Tabs';

interface OffersSectionProps {
  advert: PopulatedAdvert;
  storeName: string;
  rating: number;
}

export interface OfferDisplay {
  offers: PopulatedOffer[];
  status: OfferStatus;
  storeName: string;
  rating: number;
}

export const OffersSection: FC<OffersSectionProps> = (props) => {
  const [offers, setOffers] = useState<PopulatedOffer[]>([]);
  const [sortCriteria, setSortCriteria] = useState<
    AdvertSortCriteria | OfferSortCriteria
  >(AdvertSortCriteria.NONE);
  const [sortOrder, setSortOrder] = useState(false);
  const [expandedSections, setExpandedSections] = useState<OfferStatus[]>([OfferStatus.ACCEPTED, OfferStatus.OPEN, OfferStatus.CANCELED_USER, OfferStatus.CANCELED_OUT_OF_STOCK, OfferStatus.REJECTED]);

  const offerValues = [
    ...Object.values(AdvertSortCriteria),
    ...Object.values(ExtraCriteria),
  ];

  useEffect(() => {    
    const fetchData = async () => {
      if (props.advert._id) {
        try {
          const fetchedOffers = await getOffersByAdvert(props.advert._id);
          setOffers(fetchedOffers);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [props.advert._id]);

  const openOffers = offers.filter((o) => o.status === OfferStatus.OPEN);
  const acceptedOffers = offers.filter(
    (o) => o.status === OfferStatus.ACCEPTED,
  );
  const rejectedOffers = offers.filter(
    (o) => o.status === OfferStatus.REJECTED,
  );
  const canceledOffers = offers.filter(
    (o) =>
      o.status === OfferStatus.CANCELED_USER ||
      o.status === OfferStatus.CANCELED_OUT_OF_STOCK,
  );

  const renderOffersForStatus = (status: OfferStatus) => {
    const isExpanded = expandedSections.includes(status);

    const toggleSection = () => {
      if (isExpanded) {
        setExpandedSections(expandedSections.filter((s) => s !== status));
      } else {
        setExpandedSections([...expandedSections, status]);
      }
    };

    let statusOffers: PopulatedOffer[] = [];

    switch (status) {
      case OfferStatus.OPEN:
        statusOffers = openOffers;
        break;
      case OfferStatus.ACCEPTED:
        statusOffers = acceptedOffers;
        break;
      case OfferStatus.REJECTED:
        statusOffers = rejectedOffers;
        break;
      case OfferStatus.CANCELED_USER || OfferStatus.CANCELED_OUT_OF_STOCK:
        statusOffers = canceledOffers;
        break;
      default:
        return null;
    }

    if (statusOffers.length === 0) {
      return null;
    }

    return (
      <div
        key={status}
        style={{
          width: '100%',
          border: '3px solid #F5F5F5',
          borderRadius: 10,
          marginBottom: '10px',
          background: '#F5F5F5',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '0 10px',
          }}
          onClick={toggleSection}
        >
          <div style={{ flex: 1, textAlign: 'center' }}>
            <BodyText
              style={{
                fontSize: '24px',
                fontWeight: 600,
                color: colorMap(status),
                marginBottom: 0,
              }}
            >
              {status}
            </BodyText>
          </div>
          <div>
            <i
              className={isExpanded ? 'bi bi-chevron-up' : 'bi bi-chevron-down'}
              style={{ color: colorMap(status), fontSize: 24 }}
            />
          </div>
        </div>
        {isExpanded && (
          <div style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20 }}>
            {statusOffers.map((offer, index) => (
              <OfferCard
                key={index}
                status={status}
                offer={offer}
                advert={offer.advert as PopulatedAdvert}
                style={{
                  borderColor: colorMap(status),
                  marginBottom: 50,
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  function sortedAndFilteredItems(list: PopulatedOffer[]): PopulatedOffer[] {
    let result = list.sort((a, b) => {
      switch (sortCriteria) {
        case AdvertSortCriteria.NONE:
          return 0;
        case AdvertSortCriteria.NAME:
          return (a.advert?.productname ?? '').localeCompare(
            b.advert?.productname ?? '',
          );
        case AdvertSortCriteria.DATE:
          return (a.createdAt ?? '') > (b.createdAt ?? '')
            ? 1
            : (a.createdAt ?? '') < (b.createdAt ?? '')
            ? -1
            : 0;
        case AdvertSortCriteria.PRICE:
          return (a.price ?? 0) - (b.price ?? 0);
        case AdvertSortCriteria.Quantity:
          return (a.quantity ?? 0) - (b.quantity ?? 0);
        case ExtraCriteria.STATUS:
          return (a.status ?? '').localeCompare(b.status ?? '');
        case ExtraCriteria.STORE:
          return (a?.advert?.store ?? '').localeCompare(b?.advert?.store ?? '');
        default:
          return 0;
      }
    });
    return sortOrder ? result : result.reverse();
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortCriteria(event.target.value as AdvertSortCriteria);
  };

  const handleToggleSortOrder = () => {
    setSortOrder(!sortOrder);
  };

  return (
    <ReviewOfferSection section="OFFERS">
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: -16,
          marginBottom: 20,
        }}
      >
        <BodyText
          style={{
            color: '#f86c6c',
            fontWeight: '500',
            fontSize: 23,
            marginBottom: 0,
            marginRight: 10,
          }}
        >
          Sort by
        </BodyText>
        <select
          onChange={handleSortChange}
          style={{
            padding: 6,
            borderRadius: 8,
            borderColor: '#f86c6c',
            color: 'grey',
            height: 34,
            width: 100,
          }}
        >
          {offerValues.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <Button
          style={{
            alignSelf: 'center',
            background: 'none',
            border: 'none',
            fontSize: '2em',
          }}
          onClick={handleToggleSortOrder}
        >
          <i
            className={sortOrder ? 'bi bi-sort-down' : 'bi bi-sort-up'}
            style={{
              color: '#f76c6c',
            }}
          ></i>
        </Button>
      </div>

      {sortedAndFilteredItems(offers).length > 0 ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          {Object.values(OfferStatus).map((status) => (
            <div
              key={status}
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
                paddingLeft: 30,
                paddingRight: 30,
              }}
            >
              {renderOffersForStatus(status)}
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: 150,
          }}
        >
          <BodyText
            style={{
              color: 'red',
              fontSize: 30,
              textAlign: 'center',
            }}
          >
            No offers yet
          </BodyText>
        </div>
      )}
    </ReviewOfferSection>
  );
};
