import React from "react";
import { Text } from "../components";
import { Ratings } from "./Ratings";
import { ProductAttribute } from "./ProductAttribute";
import { User } from "../api/collections/user";
import { Offer } from "../api/collections/offer";

type OfferBarProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    store: User;
    offer: Offer;
  }>;

const OfferBar: React.FC<OfferBarProps> = (props) => {
  return (
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
      gap: "70%",
      padding: "5px",
      marginLeft: "1px",
      marginRight: "20px",
      width: "100%"
      }}>
        <div className="flex flex-col justify-start w-full sm:w-full">
          <Text
            className="font-light font-poppins text-black_900 w-full"
            as="h3"
            variant="h3"
          >
            {props?.store?.name}
          </Text>
          {Ratings(props?.store?.rating? props.store.rating : 0)}
        </div>
        <Text
          className="font-light font-poppins text-black_900"
          as="h3"
          variant="h3"
        >
          {props?.offer?.createdAt.toLocaleDateString()}
        </Text>
      </div>
      <div className="flex flex-row gap-[10%] items-center justify-center p-5 w-auto w-auto">
        <ProductAttribute
          name="Quantity"
          value={props?.offer?.quantity}
          unit="pcs"
        />
        <ProductAttribute name="Price" value={props?.offer?.price} unit="$" />
      </div>
    </div>
  );
};

export { OfferBar };
