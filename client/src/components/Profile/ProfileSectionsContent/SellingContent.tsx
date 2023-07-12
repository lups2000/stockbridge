import React, { useContext, useEffect, useState } from 'react';
import Tabs, { AdvertSortCriteria, ExtraCriteria, OfferSortCriteria } from '../../ContentTabs/Tabs';
import ContentTab from '../../ContentTabs/ContentTab';
import { LoginContext } from '../../../contexts/LoginContext';
import {
  PopulatedOffer,
  getUserSpecificOffers,
} from '../../../api/collections/offer';
import { PopulatedAdvert } from '../../../api/collections/advert';
import NoResultsMessage from '../NoResultsMessage';
import { OfferBarUserProfile } from '../../Offers/OfferBarProfile/OfferBarUserProfile';

/**
 * Component that displays the content of Selling section.
 */
const SellingContent: React.FC = () => {
  const { user } = useContext(LoginContext);
  const [outgoingOffers, setOutgoingOffers] = useState([] as PopulatedOffer[]);
  const [incomingOffers, setIncomingOffers] = useState([] as PopulatedOffer[]);

  const [searchText, setSearchText] = useState("");
  const [sortCriteria, setSortCriteria] = useState<AdvertSortCriteria | OfferSortCriteria>(AdvertSortCriteria.NONE);
  // False == order asc , True == order desc
  const [sortOrder, setSortOrder] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('user id is ocming');
        console.log(user?._id);

        const outgoingSell = await getUserSpecificOffers(
          user?._id as string,
          'Sell',
          'outgoing',
        );
        const incomingSell = await getUserSpecificOffers(
          user?._id as string,
          'Sell',
          'incoming',
        );

        setOutgoingOffers(outgoingSell as PopulatedOffer[]);
        setIncomingOffers(incomingSell as PopulatedOffer[]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  /**
   * Filters the displayed offers based on the search text and sorts it based on 
   * the selected criteria in the specified order 
   * @param list the list to be filtered and sorted
   * @returns 
   */
  function sortedAndFilteredItems(list: PopulatedOffer[] ) : PopulatedOffer[]{
    let result = list
      .filter(x => x.advert?.productname?.toLowerCase().includes(searchText.toLocaleLowerCase()))
      .sort((a, b) => {
          switch (sortCriteria) {
            case AdvertSortCriteria.NONE:
              return 0;
            case AdvertSortCriteria.NAME:
              return (a.advert?.productname ?? "").localeCompare(b.advert?.productname ?? "");
            case AdvertSortCriteria.DATE:
              return ((a.createdAt ?? "") > (b.createdAt ?? "") ? 1 : ((a.createdAt ?? "") < (b.createdAt ?? "") ? -1 : 0));
            case AdvertSortCriteria.PRICE:
              return (a.price ?? 0) - (b.price ?? 0);
            case AdvertSortCriteria.Quantity:
              return (a.quantity ?? 0) - (b.quantity ?? 0);
            case ExtraCriteria.STATUS:
              return (a.status ?? "").localeCompare(b.status ?? "");
            case ExtraCriteria.STORE:
              return (a.advert?.store ?? "").localeCompare(b.advert?.store ?? "");
            default:
              return 0;
          }

      })
      return sortOrder ? result : result.reverse();
  }
  
  return (
    <div>
      <Tabs isOffer = {true} searchText={searchText} setSearchText={setSearchText} sortCriteria={sortCriteria} setSortCriteria={setSortCriteria} sortOrder= {sortOrder} setSortOrder={setSortOrder}>
        <ContentTab title="Orders">
          Ciao bella, this is the container for the Orders
        </ContentTab>
        <ContentTab title="Incoming Offers">
        {sortedAndFilteredItems(incomingOffers).length > 0 ? sortedAndFilteredItems(incomingOffers).map((offer, _) => {
            return (
              <OfferBarUserProfile offer={offer} advert={offer.advert as PopulatedAdvert} outgoing= {false} highlight={searchText}/>
            );
          }) : <NoResultsMessage />}
        </ContentTab>
        <ContentTab title="Outgoing Offers">
        {sortedAndFilteredItems(outgoingOffers).length > 0 ? sortedAndFilteredItems(outgoingOffers).map((offer, _) => {
            return (
              <OfferBarUserProfile offer={offer} advert={offer.advert as PopulatedAdvert} outgoing= {true} highlight={searchText}/>
            );
          }) : <NoResultsMessage />}
        </ContentTab>
      </Tabs>
    </div>
  );
};

export default SellingContent;
