import React from "react";

import { Img, Button as CustomButton } from "../components";
import { ProductDetailsTopBar } from "./ProductDetailsTopBar";
import { ProductDetails } from "./ProductDetails";

import { Button } from "react-bootstrap";
import { Advert } from "../api/collections/advert";
import { buttonShapes, buttonSizes, buttonVariants } from "./Button";

type ProductOverviewSectionProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    advert: Advert;
    userid: string;
  }>;

const ProductOverviewSection: React.FC<ProductOverviewSectionProps> = (
  props
) => {
  const owner = props.userid === props.advert?.store;
  const button_text = owner
    ? "Buy"
    : props.advert?.prioritized
    ? "Prioritized"
    : "Prioritize";
  return (
    <div className="flex items-end flex-col gap-8">
      {owner && (
        <Button className="w-auto mr-10">
          <Img src="images/edit-pencil.svg"></Img>
        </Button>
      )}

      <div className={props.className} style={{ background: "#FDDFE3" }}>
        <div className="flex flex-col gap-[30%] items-start justify-start pb-[5%] w-[100%]">
          <ProductDetailsTopBar reference={""}></ProductDetailsTopBar>
          <ProductDetails
            price={props.advert?.price}
            productname={props.advert?.productname}
            color={props.advert?.color}
            description={props.advert?.description}
            purchaseDate={props.advert?.purchaseDate}
            quantity={props.advert?.quantity}
            imageurl={props.advert?.imageUrl}
          ></ProductDetails>

          <CustomButton
            className="cursor-pointer font-bold font-poppins w-auto ml-[85%] mt-[25px] text-4xl sm:text-[32px] md:text-[34px] text-center text-white_A700"
            shape={buttonShapes.RoundedBorder6}
            size={buttonSizes.sm}
            variant={buttonVariants.fillBlack}
            onClick={() => {}}
          >
            {button_text}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export { ProductOverviewSection };
