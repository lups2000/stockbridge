import React, { useContext, useEffect, useState } from 'react';
import Tabs from '../../ContentTabs/Tabs';
import ContentTab from '../../ContentTabs/ContentTab';
import { LoginContext } from '../../../contexts/LoginContext';
import { PopulatedOffer, getUserSpecificOffers } from '../../../api/collections/offer';
import { PopulatedAdvert } from '../../../api/collections/advert';
import NoResultsMessage from '../NoResultsMessage';
import { OfferBarUserProfile } from '../../Offers/OfferBarProfile/OfferBarUserProfile';

/**
 * Component that displays the content of Selling section.
 */
const SellingContent: React.FC = () => {
  const { user, loggedIn } = useContext(LoginContext);
  const [outgoingOffers, setOutgoingOffers] = useState([] as PopulatedOffer[]);
  const [incomingOffers, setIncomingOffers] = useState([] as PopulatedOffer[]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('user id is ocming')
        console.log(user?._id);

        const outgoingSell = await getUserSpecificOffers(user?._id as string, 'Sell', 'outgoing');
        const incomingSell = await getUserSpecificOffers(user?._id as string, 'Sell', 'incoming');
        
        setOutgoingOffers(outgoingSell as PopulatedOffer[]);
        setIncomingOffers(incomingSell as PopulatedOffer[]);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div>
      <Tabs>
        <ContentTab title="Orders">
          Ciao bella, this is the container for the Orders
        </ContentTab>
        <ContentTab title="Incoming Offers">
        {incomingOffers.length > 0 ? incomingOffers.map((offer, _) => {
            return (
              <OfferBarUserProfile offer={offer} advert={offer.advert as PopulatedAdvert} outgoing= {false}/>
            );
          }) : <NoResultsMessage />}
        </ContentTab>
        <ContentTab title="Outgoing Offers">
        {outgoingOffers.length > 0 ? outgoingOffers.map((offer, _) => {
            return (
              <OfferBarUserProfile offer={offer} advert={offer.advert as PopulatedAdvert} outgoing= {true} />
            );
          }) : <NoResultsMessage />}
        </ContentTab>
      </Tabs>
    </div>
  );
};

export default SellingContent;
