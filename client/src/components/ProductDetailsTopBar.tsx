import React from "react";
import { Text } from "../components";
type ProductDetailsTopBarProps = Partial<{
  reference: string;
}>;

const ProductDetailsTopBar: React.FC<ProductDetailsTopBarProps> = (props) => {
  return (
    <div className="items-start justify-start pt-6 w-[100%]">
      <Text className="font-poppins text-black w-full" as="h1" variant="h1">
        PRODUCT DETAILS
      </Text>
      <div className="flex flex-row gap-5 items-end justify-end pr-10 w-auto">
        <Text
          className="font-light font-poppins text-gray_600 w-auto"
          as="h2"
          variant="h2"
        >
          REFERENCE:
        </Text>
        <Text
          className="font-light font-poppins text-gray_600 w-auto"
          as="h2"
          variant="h2"
        >
          {props?.reference}
        </Text>
      </div>
    </div>
  );
};

export { ProductDetailsTopBar };
