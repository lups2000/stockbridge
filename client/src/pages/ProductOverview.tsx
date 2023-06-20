import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Advert, Colors, getAdvert } from '../api/collections/advert';
import { getStore, User } from '../api/collections/user';
import { OffersSection } from '../components/Offers/OffersSection';
import { Page } from '../components/Page';
import { ProductOverviewSection } from '../components/ProductOverview/ProductOverviewSection';
import { ReviewsSection } from '../components/Reviews/ReviewsSection';
import { StoreDetailsBar } from '../components/Store/StoreDetailsBar';
import { LoginContext } from '../contexts/LoginContext';

const ProductOverview = () => {
  const { id } = useParams();
  let [advert, setAdvert] = useState({
    id: '',
    productname: '',
    prioritized: false,
    quantity: 0,
    description: '',
    price: 0,
    expirationDate: new Date(),
    purchaseDate: new Date(),
    status: '',
    type: '',
    category: '',
    offers: [],
    store: '',
    reviews: [],
    imageurl: '',
    color: Colors.Blue,
    createdAt: new Date(),
  } as Advert);
  const [store, setStore] = useState({} as User);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const fetchedAdvert = await getAdvert(id);
          if (fetchedAdvert.store) {
            const fetchedStore = await getStore(fetchedAdvert.store);
            setStore(fetchedStore);
          }
          setAdvert(fetchedAdvert as Advert);
          console.log(fetchedAdvert);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const { user, loggedIn } = useContext(LoginContext);
  const owner = store._id === user?._id;
  return (
    <Page>
      {advert ? (
        <div
          style={{
            width: '100%',
            maxWidth: '100vw', // Set the maximum width to the viewport width
          }}
        >
          <StoreDetailsBar category={advert.category} store={store} />
          <ProductOverviewSection advert={advert} store={store} />
          {owner && advert.offers && advert.offers.length > 0 && (
            <OffersSection
              advert={advert}
              storeName={store.name || ''}
              rating={store.rating || 0}
            />
          )}
          {advert.reviews && advert.reviews.length > 0 && advert._id && (
            <ReviewsSection advertID={advert._id} />
          )}
        </div>
      ) : (
        <p>Loading ...</p>
      )}
    </Page>
  );
};

export default ProductOverview;
