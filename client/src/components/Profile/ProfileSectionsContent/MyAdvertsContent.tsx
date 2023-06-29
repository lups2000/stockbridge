import React, { ReactElement, useContext, useEffect, useState } from 'react';
import Tabs from '../../ContentTabs/Tabs';
import ContentTab from '../../ContentTabs/ContentTab';
import ProductInfoBar from '../ProductInfoBar';
import { Advert, PopulatedAdvert, getAdvertsByUser } from '../../../api/collections/advert';
import NoResultsMessage from '../NoResultsMessage';
import { LoginContext } from '../../../contexts/LoginContext';


/**
 * Component that displays the content of MyAdverts section.
 */
const MyAdvertsContent: React.FC = ({  }) => {
  const [buyingAdverts, setBuyingAdverts] = useState([] as PopulatedAdvert[]);
  const [sellingAdverts, setSellingAdverts] = useState([] as PopulatedAdvert[]);
  const { user, loggedIn } = useContext(LoginContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedAdverts = await getAdvertsByUser(user?._id);
        let sellingAds = fetchedAdverts.filter(x => x.type === 'Sell');
        setSellingAdverts(sellingAds as PopulatedAdvert[]);
        let buyingAds = fetchedAdverts.filter(x => x.type === 'Ask');
        setBuyingAdverts(buyingAds as PopulatedAdvert[]);
        console.log(sellingAds, buyingAds);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Tabs>
        <ContentTab title="Selling Ads">
          {sellingAdverts.length > 0 ? sellingAdverts.map((product, _) => {
            return (
              <ProductInfoBar
                productId={product._id}
                imageUrl={product.imageurl}
                name={product.productname}
                date={product.purchaseDate?.toString().substring(0, 10)}
                quantity={product.quantity}
                price={product.price}
              />
            );
          }) : <NoResultsMessage />}
        </ContentTab>
        <ContentTab title="Buying Ads">
          {buyingAdverts.length > 0 ? buyingAdverts.map((product, _) => {
            return (
              <ProductInfoBar
                productId={product._id}
                imageUrl={product.imageurl}
                name={product.productname}
                date={product.purchaseDate?.toString().substring(0, 10)}
                quantity={product.quantity}
                price={product.price}
              />
            );
          }) : <NoResultsMessage />}
        </ContentTab>
      </Tabs>
    </div>
  );
};

export default MyAdvertsContent;
