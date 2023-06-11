import { TextProps } from './Title';

/**
 * Component to display a body text.
 */
export function BodyText(props: TextProps) {
  return (
    <p className="font-link" style={props.style} onClick={props.onClick}>
      {props.children}
    </p>
  );
}
