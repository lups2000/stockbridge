import React, { useState } from "react";
import { ProductAttribute } from "../ProductOverview/ProductAttribute";
import { Offer } from "../../api/collections/offer";
import { Advert } from "../../api/collections/advert";
import { BodyText } from "../Text/BodyText";
import { OfferModal } from "./OfferModal";
import { Ratings } from "../Ratings";
require('./offerBarStyle.scss');

type OfferBarProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    offer: Offer;
    advert: Advert;
  }>;

const OfferBar: React.FC<OfferBarProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    //change to set Advert
    window.location.reload();
  }
  const openModal = () => {
    setShowModal(true);
  };
  return (
    <div style={{
      border: "solid",
      borderColor: "lightgray",
      borderRadius: "15px",
      justifyContent: "start",
      width: "100%",
      cursor: "pointer"
    }} onClick={openModal}>
      <div style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        paddingLeft: "30px",
        paddingTop: "30px",
        gap: "80%"
      }}>
          <BodyText
            style={{
              font: "light",
              fontFamily: "Poppins",
              color: "black",
              width: "full"
            }}
          >
            {props?.offer?.offeror ? props.offer.offeror?.name : "No Name given"}
            {Ratings(props?.offer?.offeror?.rating ? props.offer.offeror.rating : 0)}
          </BodyText>
        <BodyText
          style={{
            font: "light",
            fontFamily: "Poppins",
            color: "black",
            width: "full"
          }}
        >
          {props?.offer?.createdAt?.toLocaleDateString()}
        </BodyText>
      </div>
      <div style={{
        width: "auto",
        display: "flex",
        flexDirection: "row",
        gap: "5%",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px",
        marginLeft: "20%"
      }}>
        <ProductAttribute
          name="Quantity"
          value={props?.offer?.quantity}
          unit="pcs"
        />
        <ProductAttribute name="Price" value={props?.offer?.price} unit="€" />
      </div>
      {showModal && <OfferModal isShowing={showModal} onClose={closeModal} advert={props.advert} offer={props.offer}/>}
    </div>
  );
};

export { OfferBar };
