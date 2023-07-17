import { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { Colors, getAdvert, PopulatedAdvert } from '../api/collections/advert';
import { getStore, PopulatedUser } from '../api/collections/user';
import { OffersSection } from '../components/Offers/OffersSection';
import { Page } from '../components/Page';
import { ProductOverviewSection } from '../components/ProductOverview/ProductOverviewSection';
import { ReviewsSection } from '../components/Reviews/ReviewsSection';
import { StoreDetailsBar } from '../components/Store/StoreDetailsBar';
import { LoginContext } from '../contexts/LoginContext';
import { FadeLoader } from 'react-spinners';
import { palette } from '../utils/colors';
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
  } as PopulatedAdvert);
  const [store, setStore] = useState({} as PopulatedUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const fetchedAdvert = await getAdvert(id);
          if (fetchedAdvert) {
            setAdvert(fetchedAdvert as PopulatedAdvert);
            setIsLoading(false)
          if (fetchedAdvert.store) {
            setStore(await getStore(fetchedAdvert.store._id!));
          }
        }
      }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const { user } = useContext(LoginContext);
  const owner = store._id === user?._id;
  return (
    isLoading ? <FadeLoader color={palette.subSectionsBgAccent} style={{
      position: 'absolute',
      left: '45%',
      right: '45%',
      top: '45%',
      bottom: '45%'
    }} /> :
    <Page>
      {advert ? (
        <div
          style={{
            width: '100%',
            maxWidth: '100vw', // Set the maximum width to the viewport width
          }}
        >
          <StoreDetailsBar category={advert.category!} store={store} />
          <ProductOverviewSection advert={advert} store={store} />
          {owner && advert.offers && advert.offers.length > 0 && (
            <OffersSection
              advert={advert}
              storeName={store.name || ''}
              rating={store.rating || 0}
            />
          )}
          {advert.reviews && advert.reviews.length > 0 && advert._id && (
            <ReviewsSection advert={advert} />
          )}
        </div>
      ) : (
        <Spinner role="status" />
      )}
    </Page>
    
  );
};

export default ProductOverview;
