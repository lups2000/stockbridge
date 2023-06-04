import React from "react";
import { List } from "../components";

type RatingsProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    rating: number;
  }>;

const Ratings: React.FC<RatingsProps> = (props) => {
  const stars = [1, 2, 3, 4, 5];
  const rating = props.rating == undefined ? 0 : props.rating;
  return (
    <List className="grid grid-cols-5 w-[60%]" orientation="horizontal">
      {props.rating &&
        stars.map((star) => (
          <div style={{ color: star <= rating ? "red" : "gray" }}>&#9733;</div>
        ))}
    </List>
  );
};

export { Ratings };
