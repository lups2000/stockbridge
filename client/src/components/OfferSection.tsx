import React from "react";
import { Offer, OfferStatus } from "../api/collections/offer";
import { BodyText, List, Text } from "../components";
import { OfferBar } from "./OfferBar";

type OfferSectionProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    status: OfferStatus;
    offers: Offer[];
  }>;

function colorMap(status: OfferStatus): string {
  switch (status) {
    case OfferStatus.OPEN:
      return "#4285F4";
    case OfferStatus.ACCEPTED:
      return "#4ECBA9";
    case OfferStatus.REJECTED:
      return "red";
    case OfferStatus.CANCELED:
      return "#ffc071";
    default:
      return "#4285F4";
  }
}

const OfferSection: React.FC<OfferSectionProps> = (props) => {
  return (
    <div style= {{
      display: "flex", 
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: "7%",
      width: "80%"
    }}>
      <BodyText
      style={{
        fontFamily: "poppins",
        fontSize: "24px",
        fontWeight: 400,
        color: colorMap(
          props.status === undefined ? OfferStatus.OPEN : props.status
        ),
      }}
      >
        {props.status}
      </BodyText>
      <List
       style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginTop: "37px",
        alignItems: "center",
        fontFamily: "Poppins"
      }}
      >
        {props?.offers?.map((props, index) => (
          <React.Fragment key={`ProductOverviewViewerReviewbar${index}`}>
            <OfferBar {...props} />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
};

export { OfferSection };
