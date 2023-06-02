import { CSSProperties } from "react";

export type TextProps = {
  style: CSSProperties;
  message: string;
};
/**
 * Component to display a title.
 */
export function Title(props: TextProps) {
  return <h1 className="font-link" style={props.style}>{props.message}</h1>;
}
