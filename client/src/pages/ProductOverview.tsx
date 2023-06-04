import React from "react";
import { PRODUCT_CATEGORY } from "../api/collections/advert";
import { OfferStatus } from "../api/collections/offer";

import {
  Footer,
  OfferSection,
  StoreDetailsBar,
  List,
  Text,
  Reviewbar,
} from "../components";

import { ProductOverviewSection } from "../components";
import { Navbar } from "../components/Navbar";

const ProductOverview = () => {
  //let [advert, setAdvert] = useState(null);
  /* console.log("ADVERT ID: ", advertID);
  console.log("User ID: ", userID); */
  /* const fetchElement = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/adverts/${advertID.id}`
      );
      console.log("Response: ", response);
      const data = await response.json();
      setAdvert(data);
    } catch (error) {
      console.error("Error fetching element:", error);
    }
  }; */
  /* useEffect(() => {
    if (advertID) {
      fetchElement();
    } else {
      setAdvert({
        productname: "Orchids",
        category: "Flowers_And_Bouquets",
        description: "jvnsmvnmsnvb",
        imageurl: "imgaes/img_orchids1.png",
        reference: "X-ZFH32KFS",
        type: "SELL",
        price: 10,
        quantity: 10,
        color: "Blue",
        purchaseDate: "12.03.2023",
        issuer: userID,
        prioritized: false,
      })
    }
  }, []); */
  const advert = {
    id: 12,
    price: 12,
    category: "Flowers",
    quantity: 10,
    productname: "Orchids",
    type: "Sell",
    description:
      "lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s,",
    color: "Blue",
    purchaseDate: new Date(2023, 4, 23),
    imageurl: "img_orchids1.png",
    reference: "X-6743FGXC",
    reviews: [
      {
        storename: "Store Name",
        rating: 4.5,
        review:
          "Great service, shipment arrived on time. totally recommend this store!",
        date: new Date(1023, 4, 23).toLocaleDateString(),
      },
    ],
    offers: [
      {
        status: OfferStatus.REJECTED,
        store: {
          id: "6474c7d7222db607692cb307",
          category: PRODUCT_CATEGORY.Flowers_And_Bouquets,
          storename: "Offer Store",
          rating: 3,
        },
        quantity: 15,
        price: 3,
        date: new Date(2023, 5, 26),
      },
      {
        status: OfferStatus.OPEN,
        store: {
          id: "6474c7d7222db607692cb307",
          category: PRODUCT_CATEGORY.Flowers_And_Bouquets,
          storename: "Offer Store",
          rating: 3,
        },
        quantity: 15,
        price: 3,
        date: new Date(2023, 5, 26),
      },
      {
        status: OfferStatus.ACCEPTED,
        store: {
          id: "6474c7d7222db607692cb307",
          category: PRODUCT_CATEGORY.Flowers_And_Bouquets,
          storename: "Offer Store",
          rating: 3,
        },
        quantity: 15,
        price: 3,
        date: new Date(2023, 5, 26),
      },
      {
        status: OfferStatus.CANCELED,
        store: {
          id: "6474c7d7222db607692cb307",
          category: PRODUCT_CATEGORY.Flowers_And_Bouquets,
          storename: "Offer Store",
          rating: 3,
        },
        quantity: 15,
        price: 3,
        date: new Date(2023, 5, 26),
      },
    ],
    issuer: "6474c7d7222db607692cb307",
  };
  console.log("Fetched advert: ", advert);
  const owner = true;
  /*  userID === advert?.issuer?.id && advert?.offers?.length > 0; */
  const openOffers = advert?.offers?.filter(
    (o) => o.status === OfferStatus.OPEN
  );
  const acceptedOffers = advert?.offers?.filter(
    (o) => o.status === OfferStatus.ACCEPTED
  );
  const rejectedOffers = advert?.offers?.filter(
    (o) => o.status === OfferStatus.REJECTED
  );
  const canceledOffers = advert?.offers?.filter(
    (o) => o.status === OfferStatus.CANCELED
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
      }}
      className=" bg-gray_50_02 flex flex-col font-poppins gap-[50px] items-center mx-auto pt-2.5 w-[100%] h-full"
    >
      <Navbar />
      {advert != null ? (
        <>
          <div className="flex flex-col gap-40 items-start justify-start w-full">
            <StoreDetailsBar
              className="bg-red_300 opacity-[55%] flex flex-col gap-7 items-start justify-start p-30 pb-5 pt-5 pl-10 sm:px-5 w-full"
              userID={advert?.issuer}
            />

            <ProductOverviewSection className="flex items-start justify-start pl-10" />
          </div>

          <div className="flex flex-col gap-20 items-start justify-start w-full">
            {owner && (
              <div className="items-center justify-center p-10 w-full">
                <Text
                  className="text-black_900_dd uppercase"
                  as="h1"
                  variant="h1"
                >
                  Offers
                </Text>
                {openOffers.length > 0 && (
                  <OfferSection status={OfferStatus.OPEN} offers={[]} />
                )}
                {acceptedOffers.length > 0 && (
                  <OfferSection status={OfferStatus.ACCEPTED} offers={[]} />
                )}
                {rejectedOffers.length > 0 && (
                  <OfferSection status={OfferStatus.REJECTED} offers={[]} />
                )}
                {canceledOffers.length > 0 && (
                  <OfferSection status={OfferStatus.CANCELED} offers={[]} />
                )}
              </div>
            )}
            <div className="items-center justify-center p-10 w-full">
              <Text
                className="text-black_900_dd uppercase"
                as="h1"
                variant="h1"
              >
                Reviews
              </Text>
              <List
                className="font-poppins gap-[20%] grid items-center mt-[37px] w-[100%]"
                orientation="vertical"
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
          </div>
        </>
      ) : (
        <p>Loading ...</p>
      )}
      <Footer />
    </div>
  );
};

export default ProductOverview;
