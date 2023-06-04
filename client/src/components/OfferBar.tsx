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
    <div className="border border-gray_500 border-solid rounded-[15px] justify-start w-full">
      <div className="flex sm:flex-col flex-row gap-[70%] p-5 ml-1 mr-[20px] w-auto w-full">
        <div className="flex flex-col justify-start w-full sm:w-full">
          <Text
            className="font-light font-poppins text-black_900 w-full"
            as="h3"
            variant="h3"
          >
            {props?.store?.name}
          </Text>
          <Ratings rating={props?.store?.rating}></Ratings>
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
