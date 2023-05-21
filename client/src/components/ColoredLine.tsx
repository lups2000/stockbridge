type ColoredLineProps = {
  color: string;
  height: number;
  width: number;
  marginTop?: number;
};

/**
 * Component to display a colored line.
 */
export function ColoredLine(props: ColoredLineProps) {
  return (
    <div
      style={{
        color: props.color,
        backgroundColor: props.color,
        height: props.height,
        width: props.width,
        marginTop: props.marginTop,
        margin: "auto",
      }}
    />
  );
}
