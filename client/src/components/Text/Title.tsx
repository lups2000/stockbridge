import { CSSProperties, FC } from "react";

export type TextProps = {
  style: CSSProperties;
  message: React.ReactNode;
};

/**
 * Component to display a title.
 */
export const Title: FC<TextProps> = (props) => {
  //return 
  //<h1 className="font-link" style={props.style}>{props.message}</h1>;
  return (
    <h1 className="font-link" style={props.style}>
      {props.message}
    </h1>
  );
}



