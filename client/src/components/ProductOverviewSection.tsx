import React, { useState } from "react";


import { ProductDetailsTopBar } from "./ProductDetailsTopBar";
import { ProductDetails } from "./ProductDetails";
import { Advert } from "../api/collections/advert";
import { Button } from "react-bootstrap";
import { OfferModal } from "./OfferModal";
import { User } from "../api/collections/user";

type ProductOverviewSectionProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    advert: Advert;
    userid: string;
    store: User;
    advertID: string;
  }>;

const ProductOverviewSection: React.FC<ProductOverviewSectionProps> = (
  props
) => {
  const owner = props.userid === props.advert?.store;
  const button_text = !owner
    ? (props.advert?.type === "Sell" ? "Buy" : "Sell")
    : props.advert?.prioritized
      ? "Prioritized"
      : "Prioritize";

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    window.location.reload();
  }
  const openModal = () => {
    setShowModal(true);
  };
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "start",
      gap: "8",
      width: "full",
      marginTop: "30px"
    }}>
      <ProductDetailsTopBar owner={owner} advert={props.advert} advertID={props.advertID}></ProductDetailsTopBar>
      <div style={{
        background: "#FDDFE3",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "start",
        paddingLeft: "3%",
        width: "100%",
        padding: "40px"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "30%",
          alignItems: "start",
          justifyContent: "start",
          paddingBottom: "5%",
          width: "100%"
        }}>


          <ProductDetails
            advert={props.advert}
          ></ProductDetails>
          {showModal && <OfferModal isShowing={showModal} onClose={closeModal} advert={props.advert} store={props.store}/>}
          <Button
            style={{
              cursor: 'pointer',
              fontWeight: 'bold',
              fontFamily: 'Poppins',
              width: '150px',
              marginLeft: '85%',
              marginTop: '25px',
              fontSize: '24px',
              textAlign: 'center',
              color: 'white',
              textDecoration: 'none',
              padding: "7px",
              border: "rounded-md",
              backgroundColor: "black",
              borderColor: "black"
            }}
            onClick= {openModal}
          >
            {button_text}
          </Button>
        </div>
      </div>
    </div>
  );
};

export { ProductOverviewSection };
