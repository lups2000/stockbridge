import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAdvert, PopulatedAdvert } from '../api/collections/advert';
import { getStore, PopulatedUser } from '../api/collections/user';
import { Page } from '../components/Page';
import { ProductOverviewSection } from '../components/ProductOverview/ProductOverviewSection';
import { ReviewsSection } from '../components/Reviews/ReviewsSection';
import { StoreDetailsBar } from '../components/Store/StoreDetailsBar';
import { LoginContext } from '../contexts/LoginContext';
import { OffersSection } from '../components/ProductOverview/Offers/OffersSection';
import { FadeLoader } from 'react-spinners';
import { palette } from '../utils/colors';

const ProductOverview = () => {
  const { id } = useParams();
  const [advert, setAdvert] = useState({
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
    color: undefined,
    createdAt: new Date(),
  } as PopulatedAdvert);
  const [store, setStore] = useState({} as PopulatedUser);

  const { loggedIn, user } = useContext(LoginContext);
  const owner = store._id === user?._id;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const fetchedAdvert = await getAdvert(id);
          if (fetchedAdvert) {
            setAdvert(fetchedAdvert as PopulatedAdvert);
            setIsLoading(false);
            if (fetchedAdvert.store) {
              await getStore(fetchedAdvert.store._id!).then((response) =>
                setStore(response),
              );
            }
          }
        }
      } catch (error: any) {
        if (!loggedIn) {
          navigate('/signIn');
        } else {
          navigate('/404'); //not found page
        }
      }
    };
    fetchData();
  }, [id, navigate]);

  return (
    <Page>
      {!isLoading ? (
        <div
          style={{
            width: '100%',
            maxWidth: '100vw', // Set the maximum width to the viewport width
          }}
        >
          <StoreDetailsBar category={advert.category!} store={store} />
          <ProductOverviewSection advert={advert} store={store} />
          {owner && advert.offers && (
            <OffersSection
              advert={advert}
              storeName={store.name ?? ''}
              rating={store.rating ?? 0}
            />
          )}
          {advert.reviews && advert._id && <ReviewsSection advert={advert} />}
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 100,
          }}
        >
          <FadeLoader color={palette.subSectionsBgAccent} />
        </div>
      )}
    </Page>
  );
};

export default ProductOverview;
