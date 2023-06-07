import React from "react";
import { User } from "../api/collections/user";
import { BodyText, Ratings } from "../components";


type StoreDetailsBarProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    category: string;
    store: User;
  }>;


const StoreDetailsBar: React.FC<StoreDetailsBarProps> = (props) => {
  const fieldContainer = (message: string, value: string, rating = false) => {
    return (
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "4%",
        alignItems: "start",
        justifyContent: "start",
        width: "30%"
      }}>
        <BodyText
          style={{
            color: "#7881D7", 
            fontWeight: 600,
            fontSize: "24px",
          }}
        >{message}</BodyText>
        <div style={rating? {
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "start",  
        } : {}}>
          <BodyText
            style={{
              width: "auto", 
              fontWeight: 300,
              fontSize: "24px",
              fontFamily: 'Poppins',
              color: "#ffffff",
              textDecorationColor: rating ? "#ffffff": "",
              borderBottom: rating ? '2px solid' : ""
            }} 
          >{value}</BodyText>
          {
            rating &&
              Ratings(props.store? props.store.rating : 0) 
          }
        </div>
      </div>
    )
  };
  return (
    <div style={{
      backgroundColor: 'rgba(239, 68, 68, 0.55)',
      display: 'flex',
      flexDirection: 'column',
      gap: '7px',
      alignItems: 'start',
      justifyContent: 'start',
      paddingBottom: '5px',
      paddingTop: '10px',
      paddingLeft: '2%',
      paddingRight: '10%',
      marginTop: "50px",
      width: '100%'
    }}>
      <BodyText
        style={{ fontSize: 24, color: "white" }}
      >STORE DETAILS</BodyText>
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: "15%",
        alignItems: "start",
        justifyContent: "start",
        width: "100%",
      }}>
        {fieldContainer("Category:", props.category ? props.category : "")}
        {fieldContainer("Store:", props.store?.name? props.store?.name : "", true)}
      </div>
    </div>
  );
};

export { StoreDetailsBar };
