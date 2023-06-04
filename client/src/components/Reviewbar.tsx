import React from "react";

import { Text } from "../components";
import { Ratings } from "./Ratings";

type ReviewbarProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{ storename: string; rating: number; date: string; review: string }>;

const Reviewbar: React.FC<ReviewbarProps> = (props) => {
  return (
    <>
      <div className={props.className}>
        <div className="flex sm:flex-col flex-row gap-[70%] items-start justify-start p-2 ml-1 mr-[20px] w-auto w-full">
          <Text
            className="font-light font-poppins text-black_900 w-full"
            as="h3"
            variant="h3"
          >
            {props?.storename}
          </Text>
          <div className="flex flex-col justify-start w-full sm:w-full">
            <Text
              className="font-light font-poppins text-black_900"
              as="h3"
              variant="h3"
            >
              {props?.date}
            </Text>

            <Ratings rating={props.rating}></Ratings>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start mb-[18px] ml-[17px] py-2.5 w-auto md:w-full">
          <Text
            className="font-light font-poppins text-gray_600 w-auto"
            as="body"
            variant="h5"
          >
            {props?.review}
          </Text>
        </div>
      </div>
    </>
  );
};

export { Reviewbar };
