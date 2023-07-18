import React, { useContext, useEffect, useState } from 'react';
import Tabs, {
  AdvertSortCriteria,
  ExtraCriteria,
  OfferSortCriteria,
} from '../../ContentTabs/Tabs';
import ContentTab from '../../ContentTabs/ContentTab';
import { LoginContext } from '../../../contexts/LoginContext';
import {
  PopulatedOffer,
  getOffer,
  getUserSpecificOffers,
} from '../../../api/collections/offer';
import { PopulatedAdvert } from '../../../api/collections/advert';
import NoResultsMessage from '../NoResultsMessage';
import { OfferBarUserProfile } from '../../Offers/OfferBarProfile/OfferBarUserProfile';
import {
  NestedPopulatedOrder,
  getUserSpecificOrders,
} from '../../../api/collections/order';
import { OrderBarUserProfile } from '../../Offers/OfferBarProfile/OrderBarUserProfile';
import {
  sortedAndFilteredOffers,
  sortedAndFilteredOrders,
} from '../../../utils/functions';
import { FadeLoader } from 'react-spinners';
import { palette } from '../../../utils/colors';
import LoadingElementsContent from './LoadingElementsContent';

/**
 * Component that displays the content of Selling section.
 */
const SellingContent: React.FC = () => {
  const { user } = useContext(LoginContext);
  const [outgoingOffers, setOutgoingOffers] = useState([] as PopulatedOffer[]);
  const [incomingOffers, setIncomingOffers] = useState([] as PopulatedOffer[]);
  const [orders, setOrders] = useState([] as NestedPopulatedOrder[]);

  const [searchText, setSearchText] = useState('');
  const [sortCriteria, setSortCriteria] = useState<
    AdvertSortCriteria | OfferSortCriteria
  >(AdvertSortCriteria.NONE);
  // False == order asc , True == order desc
  const [sortOrder, setSortOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const outgoingAsk = await getUserSpecificOffers(
          user?._id as string,
          'Ask',
          'outgoing',
        );
        const incomingSell = await getUserSpecificOffers(
          user?._id as string,
          'Sell',
          'incoming',
        );

        let orders = await getUserSpecificOrders(user?._id as string, 'Sell');
        let nestedOrders = await Promise.all(
          orders.map(async (x) => {
            let offer = await getOffer(x.offer._id ?? '');
            return {
              _id: x._id,
              createdAt: x.createdAt,
              totalPrice: x.totalPrice,
              quantity: x.quantity,
              status: x.status,
              offer: offer,
            } as NestedPopulatedOrder;
          }),
        );

        setOutgoingOffers(outgoingAsk as PopulatedOffer[]);
        setIncomingOffers(incomingSell as PopulatedOffer[]);
        setOrders(nestedOrders as unknown as NestedPopulatedOrder[]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user?._id]);

  return (
    <div>
      <Tabs
        isOffer={true}
        searchText={searchText}
        setSearchText={setSearchText}
        sortCriteria={sortCriteria}
        setSortCriteria={setSortCriteria}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      >
        <ContentTab title="Orders">
          {isLoading ? (
            <LoadingElementsContent />
          ) : sortedAndFilteredOrders(
              orders,
              sortCriteria,
              searchText,
              sortOrder,
            ).length > 0 ? (
            sortedAndFilteredOrders(
              orders,
              sortCriteria,
              searchText,
              sortOrder,
            ).map((order, _) => {
              return (
                <OrderBarUserProfile
                  key={order._id}
                  order={order}
                  outgoing={false}
                  highlight={searchText}
                  advert={order.offer?.advert!}
                />
              );
            })
          ) : (
            <NoResultsMessage />
          )}
        </ContentTab>
        <ContentTab title="Incoming Offers">
          {isLoading ? (
            <LoadingElementsContent />
          ) : sortedAndFilteredOffers(
              incomingOffers,
              sortCriteria,
              searchText,
              sortOrder,
            ).length > 0 ? (
            sortedAndFilteredOffers(
              incomingOffers,
              sortCriteria,
              searchText,
              sortOrder,
            ).map((offer, _) => {
              return (
                <OfferBarUserProfile
                  key={offer._id}
                  offer={offer}
                  advert={offer.advert as PopulatedAdvert}
                  outgoing={false}
                  highlight={searchText}
                />
              );
            })
          ) : (
            <NoResultsMessage />
          )}
        </ContentTab>
        <ContentTab title="Outgoing Offers">
          {isLoading ? (
            <LoadingElementsContent />
          ) : sortedAndFilteredOffers(
              outgoingOffers,
              sortCriteria,
              searchText,
              sortOrder,
            ).length > 0 ? (
            sortedAndFilteredOffers(
              outgoingOffers,
              sortCriteria,
              searchText,
              sortOrder,
            ).map((offer, _) => {
              return (
                <OfferBarUserProfile
                  key={offer._id}
                  offer={offer}
                  advert={offer.advert as PopulatedAdvert}
                  outgoing={true}
                  highlight={searchText}
                />
              );
            })
          ) : (
            <NoResultsMessage />
          )}
        </ContentTab>
      </Tabs>
    </div>
  );
};

export default SellingContent;
