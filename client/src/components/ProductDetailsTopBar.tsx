import React, { useState } from "react";
import { BodyText, Button, EditAdvertModal, Img} from "../components";
import edit from "../assets/edit-pencil.svg";
import { Advert } from "../api/collections/advert";

type ProductDetailsTopBarProps = Partial<{
  owner: boolean;
  advert?: Advert;
  advertID: string;
}>;

const ProductDetailsTopBar: React.FC<ProductDetailsTopBarProps> = (props) => {

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
      flexDirection: "row",
      gap: "75%",
      width: "100%"
    }}  >
      <BodyText style={{
        fontFamily: "poppins",
        color: "black",
        width: "100%",
        fontSize: "24px",
        fontWeight: 600,
        paddingLeft: "10px"
      }}>PRODUCT DETAILS</BodyText>
      {!props.owner && (
        <Button style={{
          width: "full",
          marginRight: "20px",
          backgroundColor: "transparent",
          borderColor: "transparent"
        }}
        onClick={openModal}>
          <Img src={edit}></Img>
        </Button>
      )}
       {showModal && <EditAdvertModal isShowing={showModal} onClose={closeModal} advert={props.advert} advertID={props.advertID}/>}
    </div>
  );
};

export { ProductDetailsTopBar };
