import React from "react";
import { Text } from "../components";
type ProductAttributeProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    name: string;
    value: string | number | Date;
    unit: string;
    border: boolean;
  }>;
const ProductAttribute: React.FC<ProductAttributeProps> = (props) => {
  return (
    <div className="flex flex-row gap-5 items-start justify-start w-auto text-black_900">
      <Text className="font-bold font-poppins w-auto" as="h3" variant="h3">
        {props?.name}:
      </Text>

      <div
        style={{
          width: "150px",
          height: "100%",
          borderRadius: "10px",
          border: props?.border ? "2px solid black" : "",
          textAlign: props?.border ? "center" : "start",
        }}
      >
        <Text className="font-light font-poppins" as="h3" variant="h3">
          {`${props?.value} ${props?.unit}`}
        </Text>
      </div>
    </div>
  );
};

export { ProductAttribute };
