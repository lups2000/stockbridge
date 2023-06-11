type ColoredLineProps = {
  color: string;
  height: number;
  width: number;
  marginTop?: number;
  gap?: number;
  children?: React.ReactNode;
};

/**
 * Component to display a colored line.
 */
export function ColoredLine(props: ColoredLineProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: props.gap ?? 0,
        marginTop: props.marginTop,
      }}
    >
      <div
        style={{
          width: props.width,
          height: props.height,
          backgroundColor: props.color,
        }}
      />
      {props.children}
      <div
        style={{
          width: props.width,
          height: props.height,
          backgroundColor: props.color,
        }}
      />
    </div>
  );
}
