import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/apiClient";
import { Advert, Colors } from "../api/collections/advert";
import { Offer } from "../api/collections/offer";

import {
  OffersSection,
  ReviewsSection,
  StoreDetailsBar,
} from "../components";

import { ProductOverviewSection } from "../components";
import { Page } from "../components/Page";

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
  const [store, setStore] = useState({});
  useEffect(() => {
    const fetchStore = async (storeID: string) => {
      try {
        const response = await axiosClient
          .get(`stores/${storeID}`
          );
        setStore(response.data);
      }
      catch (error) {
        console.error(error);
      }
    }
    const fetchOffers = async (offerIDs: string[]) => {
      let fetchedOffers: Offer[] = [];

      for (const offerId in offerIDs) {
        try {
          const response = await axiosClient
            .get(`offers/${offerId}`
            );
          fetchedOffers.push(response.data as Offer);
        }
        catch (error) {
          console.error(error);
        }
      }
      setOffers(fetchedOffers);
    }
    const fetchAdvert = async () => {
      try {
        const response = await axiosClient
          .get(`adverts/${id}`
          );
        const fetchedAdvert = response.data;
        fetchStore(fetchedAdvert.store);
        fetchOffers(fetchedAdvert.offers);
        fetchedAdvert.store = store;
        fetchedAdvert.offers = offers;
        setAdvert(fetchedAdvert as Advert);
      }
      catch (error) {
        console.error(error);
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
            category={advert.category} store={advert.store}
          />
          <ProductOverviewSection advert={advert} advertID={id} />

          {owner && OffersSection(advert.offers ? advert.offers : [], advert)}
          { ReviewsSection(advert.reviews ? advert.reviews : [])}
        </>
      ) : (
        <p>Loading ...</p>
      )}
    </Page>
  );
};

export default ProductOverview;
