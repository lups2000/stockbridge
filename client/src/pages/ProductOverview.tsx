import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/apiClient";
import { Advert, Colors } from "../api/collections/advert";
import { OfferStatus } from "../api/collections/offer";
import { User } from "../api/collections/user";

import {
  OfferSection,
  StoreDetailsBar,
  List,
  Reviewbar,
  BodyText,
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
    store: "",
    reviews: [],
    imageurl: "",
    color: Colors.Blue,
  } as Advert);

  console.log("advertID ", id)
  let [user, setUser] = useState({
    id: "",
    name: "",
    rating: 0
  } as User);

  useEffect(() => {
    const fetchAdvert = async () => {
      try {
        const response = await axiosClient
          .get(`adverts/${id}`
          );
        setAdvert(response.data as Advert);
      }
      catch (error) {
        console.error(error);
      }
    }
    const fetchStore = async () => {
      try {
        const response = await axiosClient
          .get(`stores/${advert.store}`
          );
        setUser(response.data);
      }
      catch (error) {
        console.error(error);
      }
    }
    fetchAdvert();
    fetchStore();
  }, [])
  console.log("userID ", advert.store)
  console.log('Fetched advert for: ', advert)
  console.log('fetched user: ', user)
  const owner = true;
  /*  userID === advert?.issuer?.id && advert?.offers?.length > 0; */
  const openOffers = (advert?.offers != undefined && advert?.offers.length>0) ? advert.offers.filter(
    (o) => o.status === OfferStatus.OPEN
  ) : [{
    id: "",
    createdAt: new Date(),
    message: "Hi I am interested",
    price: 2, 
    quantity: 2
  }];
  const acceptedOffers = advert?.offers ? advert.offers.filter(
    (o) => o.status === OfferStatus.ACCEPTED
  ) : [];
  const rejectedOffers = advert?.offers ? advert.offers.filter(
    (o) => o.status === OfferStatus.REJECTED
  ) : [];
  const canceledOffers = advert?.offers ? advert.offers.filter(
    (o) => o.status === OfferStatus.CANCELED
  ) : [];

  return (
    <Page>
      {advert != null ? (
        <>
          <StoreDetailsBar
            store={user} category={advert.category}
          />
          <ProductOverviewSection advert={advert} store={user} advertID={id} />
         
            {owner && (
              <div style= {{
                display: "flex",
                flexDirection: "column",
                width: "100%"
              }}>
              <BodyText style={{
                fontFamily: "poppins",
                color: "black",
                fontSize: "24px",
                fontWeight: 600,
                paddingLeft: "10px"
              }}>OFFERS</BodyText>
               <div style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%"
              }}>
                {openOffers.length > 0 && (
                  <OfferSection status={OfferStatus.OPEN} offers={openOffers} />
                )}
                {acceptedOffers.length > 0 && (
                  <OfferSection status={OfferStatus.ACCEPTED} offers={acceptedOffers} />
                )}
                {rejectedOffers.length > 0 && (
                  <OfferSection status={OfferStatus.REJECTED} offers={rejectedOffers} />
                )}
                {canceledOffers.length > 0 && (
                  <OfferSection status={OfferStatus.CANCELED} offers={canceledOffers} />
                )}
              </div>
              </div>)
            }
            <div style= {{
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px",
                  width: "full"
              }}>
            <BodyText style={{
                  fontFamily: "poppins",
                  color: "black",
                  width: "100%",
                  fontSize: "24px",
                  fontWeight: 600,
                  paddingLeft: "10px"
                }}>REVIEWS</BodyText>
              <List
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                marginTop: "37px",
                alignItems: "center",
                fontFamily: "Poppins"
              }}
              >
                {advert?.reviews?.map((props, index) => (
                  <React.Fragment
                    key={`ProductOverviewViewerReviewbar${index}`}
                  >
                    <Reviewbar
                      className="border border-gray_500 border-solid rounded-[15px] flex flex-col justify-start w-[100%]"
                      {...props}
                    />
                  </React.Fragment>
                ))}
              </List>
            </div>
        </>
      ) : (
        <p>Loading ...</p>
      )}
    </Page>
  );
};

export default ProductOverview;
