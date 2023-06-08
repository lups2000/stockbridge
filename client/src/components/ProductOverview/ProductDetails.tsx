import React from "react";
import { Advert } from "../../api/collections/advert";
import { Img } from "../Img";
import { BodyText } from "../Text/BodyText";
import { ProductAttribute } from "./ProductAttribute";

type ProductDetailsProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    advert: Advert;
  }>;

const ProductDetails: React.FC<ProductDetailsProps> = (props) => {
  return (
    <div style= {{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "10%",
      justifyContent: "start",
      marginLeft: "10%",
      paddingTop: "1%",
      height: "full",
      width: "100%",
    }}>
      <Img
        style={{
          width: "250px",
          height: "auto",
          borderRadius: "60px",
          borderColor: "transparent"
        }}
        src={props?.advert?.imageurl}
      />
      <div className="flex flex-col gap-10 items-start ml-[10%] mr-[10%] w-[100%">
        <BodyText style={{
          fontFamily: "Poppins",
          color: "black",
          fontSize: "24px",
          fontWeight: 600
        }}>{props?.advert?.productname? props.advert.productname : "Fake Product Name"}</BodyText>
        <BodyText style={{
          fontFamily: "Poppins",
          color: "gray",
          fontSize: "16px",
          fontWeight: 300,
          marginLeft: "10px"
        }}>{props?.advert?.productname? props.advert.description : "Here goes the product description!"}</BodyText>
        
        {
          props?.advert?.color && 
          <ProductAttribute margin= "10%" name="Color" value={props?.advert?.color}></ProductAttribute>
        } 
        {
            props?.advert?.purchaseDate &&
            <ProductAttribute
            name="Purchased On"
            value={ props.advert.purchaseDate.toString().substring(0, 10)}
          ></ProductAttribute>
        }
          {
            props?.advert?.expirationDate &&
            <ProductAttribute
            name="Expires On"
            value={`${props.advert.expirationDate.toString().substring(0, 10)}`}
          ></ProductAttribute>
        }
        <div style={{
          display: "flex",
          flexDirection: "row",
          gap: "20%",
          alignItems: "start",
          justifyContent: "start",
          marginTop: "5%",
          width: "auto"
        }}>
          <ProductAttribute
            name="Quantity"
            value={props?.advert?.quantity}
            unit="pcs"
            border={true}
          ></ProductAttribute>
          <ProductAttribute
            name="Price"
            value={props?.advert?.price}
            unit="€"
            border={true}
          ></ProductAttribute>
        </div>
      </div>
    </div>
  );
};

export { ProductDetails };
