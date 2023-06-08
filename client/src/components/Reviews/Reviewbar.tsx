import React, { useState } from "react";
import { Review } from "../../api/collections/review";
import { Ratings } from "../Ratings";
import { StoreDetailsModal } from "../Store/StoreDetailsModal";
import { BodyText } from "../Text/BodyText";

type ReviewbarProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    review: Review
  }>;

const Reviewbar: React.FC<ReviewbarProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
    window.location.reload();
  }
  const openModal = () => {
    setShowModal(true);
  };
  return (
    <>
      <div style={{
        border: "solid",
        borderColor: "lightgray",
        borderRadius: "15px",
        justifyContent: "start",
        width: "100%"
      }}>
        <div style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          paddingLeft: "30px",
          paddingTop: "30px",
          paddingRight: "20px",
          gap: "80%"
        }}>
            <BodyText
              style={{
                font: "light",
                fontSize: "18px",
                fontFamily: "Poppins",
                color: "black",
                width: "full",
                textDecoration: "underline",
                cursor: 'pointer',
              }}
              onClick={openModal}
            >
              {props.review?.reviewer ? props.review.reviewer?.name : "No Name given"}
            </BodyText>
            {showModal && <StoreDetailsModal isShowing={showModal} onClose={closeModal}></StoreDetailsModal>}
          
          <BodyText
            style={{
              font: "light",
              fontFamily: "Poppins",
              color: "black",
              width: "full",
            }}
          >
            {props?.review?.createdAt.toLocaleDateString()}
            {Ratings(props?.review?.rating ? props.review.rating : 0)}
          </BodyText>
        </div>
        <div style={{
          width: "auto",
          display: "flex",
          flexDirection: "row",
          gap: "5%",
          alignItems: "start",
          justifyContent: "start",
          padding: "10px",
          marginLeft: "2%"
        }}><BodyText style={{ color: "GrayText", font: "light", }}>{props.review?.description}</BodyText></div>

      </div>

    </>
  );
};

export { Reviewbar };
