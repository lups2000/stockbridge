import { CSSProperties, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from "react";

export type TextProps = {
  style: CSSProperties;
  children: React.ReactNode;
  onClick?: () => void; 
};
/**
 * Component to display a title.
 */
export function Title(props: TextProps){
  return <h1 className="font-link" style={props.style}>{props.children}</h1>;
}
