import { TextProps } from "./Title";

/**
 * Component to display a body text.
 */
export function BodyText(props: TextProps) {
  return <p style={props.style}>{props.message}</p>;
}
