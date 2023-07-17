import React, { useContext, useEffect, useState } from 'react';
import Tabs, { AdvertSortCriteria, OfferSortCriteria } from '../../ContentTabs/Tabs';
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
import { sortedAndFilteredOffers, sortedAndFilteredOrders } from '../../../utils/functions';
import { OrderBarUserProfile } from '../../Offers/OfferBarProfile/OrderBarUserProfile';
import { NestedPopulatedOrder, getUserSpecificOrders } from '../../../api/collections/order';
import { palette } from '../../../utils/colors';
import { FadeLoader } from 'react-spinners';
import LoadingElementsContent from './LoadingElementsContent';

/**
 * Component that displays the content of Buying section.
 */
const BuyingContent: React.FC = () => {
  const { user } = useContext(LoginContext);
  const [outgoingOffers, setOutgoingOffers] = useState([] as PopulatedOffer[]);
  const [incomingOffers, setIncomingOffers] = useState([] as PopulatedOffer[]);
  const [orders, setOrders] = useState([] as NestedPopulatedOrder[]);

  const [searchText, setSearchText] = useState("");
  const [sortCriteria, setSortCriteria] = useState<AdvertSortCriteria | OfferSortCriteria>(AdvertSortCriteria.NONE);
  // False == order asc , True == order desc
  const [sortOrder, setSortOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const outgoingSell = await getUserSpecificOffers(
          user?._id as string,
          'Sell',
          'outgoing',
        );
        const incomingAsk = await getUserSpecificOffers(
          user?._id as string,
          'Ask',
          'incoming',
        );

        let orders = await getUserSpecificOrders(user?._id as string, 'Ask');
        let nestedOrders = await Promise.all(orders.map(async x => {
          let offer = await getOffer(x.offer._id ?? "");
          return {
            _id: x._id,
            createdAt: x.createdAt,
            totalPrice: x.totalPrice,
            quantity: x.quantity,
            status: x.status,
            offer: offer
          } as NestedPopulatedOrder
        }));


        setOutgoingOffers(outgoingSell as PopulatedOffer[]);
        setIncomingOffers(incomingAsk as PopulatedOffer[]);
        setOrders(nestedOrders as unknown as NestedPopulatedOrder[]);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Tabs isOffer={true} searchText={searchText} setSearchText={setSearchText} sortCriteria={sortCriteria} setSortCriteria={setSortCriteria} sortOrder={sortOrder} setSortOrder={setSortOrder}>
        <ContentTab title="Orders">
          {isLoading ? 
            <LoadingElementsContent />
            : sortedAndFilteredOrders(orders, sortCriteria, searchText, sortOrder).length > 0 ? sortedAndFilteredOrders(orders, sortCriteria, searchText, sortOrder).map((order, _) => {
              return (
                <OrderBarUserProfile key={order._id} order={order} outgoing={false} highlight={searchText} advert={order.offer?.advert!} />
              );
            }) : <NoResultsMessage />}
        </ContentTab>

        <ContentTab title="Incoming Offers" >
          {isLoading ? 
           <LoadingElementsContent />
           : sortedAndFilteredOffers(incomingOffers, sortCriteria, searchText, sortOrder).length > 0 ? sortedAndFilteredOffers(incomingOffers, sortCriteria, searchText, sortOrder).map((offer, _) => {
            return (
              <OfferBarUserProfile offer={offer} advert={offer.advert as PopulatedAdvert} outgoing={false} highlight={searchText} />
            );
          }) : <NoResultsMessage />}
        </ContentTab>
        <ContentTab title="Outgoing Offers">
          {isLoading ? 
          <LoadingElementsContent /> 
          : sortedAndFilteredOffers(outgoingOffers, sortCriteria, searchText, sortOrder).length > 0 ? sortedAndFilteredOffers(outgoingOffers, sortCriteria, searchText, sortOrder).map((offer, _) => {
            return (
              <OfferBarUserProfile offer={offer} advert={offer.advert as PopulatedAdvert} outgoing={true} highlight={searchText} />
            );
          }) : <NoResultsMessage />}
        </ContentTab>
      </Tabs>
    </div>
  );
};

export default BuyingContent;
