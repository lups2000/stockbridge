import React, { useState } from "react";
import { Text, Ratings } from "../components";

type StoreDetailsBarProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    userID: string;
  }>;

const StoreDetailsBar: React.FC<StoreDetailsBarProps> = (props) => {
  const fetchUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/v1/users/${props.userID}`
      );
      console.log("Response: ", response);
      const data = await response.json();
      //setUser(data);
    } catch (error) {
      console.error("Error fetching element:", error);
    }
  };
  /* useEffect(() => {
      fetchUser();
      if (user == null || user == undefined) {
        setUser({
          category: "FLOWERS",
          rating: 5,
          storename: "Petals & Blooms"
        })
      }
    }
  
, []); */
  const user = {
    category: "FLOWERS",
    rating: 5,
    storename: "Petals & Blooms",
  };
  console.log("user: ", user);
  return (
    <>
      <div className={props.className}>
        <Text
          className="font-poppins gap-5 text-white_A700"
          as="h1"
          variant="h1"
        >
          STORE DETAILS
        </Text>
        <div className="flex flex-row gap-[15%] items-start justify-start w-full">
          <div className="flex flex-column gap-[4%] items-start justify-start w-auto">
            <Text
              className="font-light font-poppins text-indigo_600"
              style={{ color: "233FC8" }}
              as="h2"
              variant="h2"
            >
              Category:
            </Text>
            <Text
              className="font-light font-poppins text-white_A700"
              as="h2"
              variant="h2"
            >
              {user.category}
            </Text>
          </div>

          <div className="flex flex-column gap-[4%] items-start justify-start w-full">
            <Text
              className="font-normal font-poppins text-indigo_600"
              as="h2"
              variant="h2"
            >
              Store:
            </Text>
            <div className="flex-row gap-7 itemts-center justify-start w-auto">
              <Text
                className="font-light font-poppins text-white_A700 underline w-[100%]"
                as="h2"
                variant="h2"
              >
                {user.storename}
              </Text>
              <Ratings
                className="flex font-light font-poppins text-white_A700 w-auto"
                rating={user.rating}
              ></Ratings>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { StoreDetailsBar };
