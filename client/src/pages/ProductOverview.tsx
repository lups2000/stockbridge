import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Advert, Colors, getAdvert } from "../api/collections/advert";
import { getOffer, Offer } from "../api/collections/offer";
import { User } from "../api/collections/user";
import { OffersSection } from "../components/Offers/OffersSection";
import { Page } from "../components/Page";
import { ProductOverviewSection,  } from "../components/ProductOverview/ProductOverviewSection";
import { ReviewsSection } from "../components/Reviews/ReviewsSection";
import { StoreDetailsBar } from "../components/Store/StoreDetailsBar";

const ProductOverview = () => {
  const { id } = useParams();
  let [advert, setAdvert] = useState({
    id: "",
    productname: "",
    prioritized: false,
    quantity: 0,
    description: "",
    price: 0,
    expirationDate: new Date(),
    purchaseDate: new Date(),
    status: "",
    type: "",
    category: "",
    offers: [],
    store: {
      id: "",
      name: "",
      rating: 0
    },
    reviews: [],
    imageurl: "",
    color: Colors.Blue,
  } as Advert);
  const [offers, setOffers] = useState([] as Offer[]);
  const [store, setStore] = useState({} as User);
  useEffect(() => {
    const fetchStore = async (storeID: string) => {
      try {
        //TODO: CHANGE WITH SERVER CALL
        const store = {
          name: "Fake store",
          rating: 2,
        }
        setStore(store as User);
      }
      catch (error) {
        console.error(error);
      }
    }
    const fetchOffers = async (offerIDs: string[]) => {
      let fetchedOffers: Offer[] = [];

      for (const offerId in offerIDs) {
        try {
          const offer = await getOffer(offerId);
          fetchedOffers.push(offer);
        }
        catch (error) {
          console.error(error);
        }
      }
      setOffers(fetchedOffers);
    }
    const fetchAdvert = async () => {
      if (id) {
        try {
          const fetchedAdvert = await getAdvert(id);
          if (fetchedAdvert.store) {
            setStore(fetchedAdvert.store)
          }
          if (fetchedAdvert.offers) {
            setOffers(fetchedAdvert.offers)
          }
          setAdvert(fetchedAdvert as Advert);
        }
        catch (error) {
          console.error(error);
        }
      }
    }
    fetchAdvert();
  }, [])
  const owner = true;
  /*  userID === advert?.issuer?.id && advert?.offers?.length > 0; */
  return (
    <Page>
      {advert != null ? (
        <>
          <StoreDetailsBar
            category={advert.category} store={store}
          />
          <ProductOverviewSection advert={advert} advertID={id} />
          {owner && OffersSection(offers, advert)}
          {ReviewsSection(advert.reviews ? advert.reviews : [])}
        </>
      ) : (
        <p>Loading ...</p>
      )}
    </Page>
  );
};

export default ProductOverview;
