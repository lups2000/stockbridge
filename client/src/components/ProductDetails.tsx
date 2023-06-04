import React from "react";
import { Text, Img, Button } from "../components";
import { ProductAttribute } from "./ProductAttribute";

type ProductDetailsProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    productname: string;
    imageurl: string;
    description: string;
    color: string;
    purchaseDate: Date;
    quantity: number;
    price: number;
  }>;

const ProductDetails: React.FC<ProductDetailsProps> = (props) => {
  const image_url = "images/" + props?.imageurl;

  return (
    <div className="flex items-start justify-center pt-[5%] h-[100%] w-[100%]">
      <Img src={image_url} className="w-[30%]" alt={props?.productname} />
      <div className="flex flex-col gap-10 items-start ml-[10%] mr-[10%] w-[100%">
        <Text className="font-poppins text-black_900" as="h1" variant="h1">
          {props?.productname}
        </Text>
        <Text className="font-light font-poppins text-gray_600 w-[100%]">
          {props?.description}
        </Text>
        <ProductAttribute name="Color" value={props?.color}></ProductAttribute>
        <ProductAttribute
          name="Purchased On"
          value={props?.purchaseDate}
        ></ProductAttribute>
        <div className="flex flex-row gap-[20%] items-start justify-start mt-[10%] w-auto">
          <ProductAttribute
            name="Quantity"
            value={props?.quantity}
            unit="pcs"
            border={true}
          ></ProductAttribute>
          <ProductAttribute
            name="Price"
            value={props?.price}
            unit="$"
            border={true}
          ></ProductAttribute>
        </div>
      </div>
    </div>
  );
};

export { ProductDetails };
