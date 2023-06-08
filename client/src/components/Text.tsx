import React from "react";

const variantClasses = {
  h1: "font-bold text-5xl sm:text-[38px] md:text-[44px]",
  h2: "font-bold text-4xl sm:text-[32px] md:text-[34px]",
  h3: "md:text-3xl sm:text-[28px] text-[32px]",
  h4: "font-bold text-2xl md:text-[22px] sm:text-xl",
  h5: "font-light text-xl",
  h6: "text-lg",
  body1: "font-normal text-base",
  body2: "font-normal text-sm",
  body3: "font-normal text-[12.8px]",
  body4: "font-normal text-xs",
} as const;

export type TextProps = Partial<{
  className: string;
  variant: keyof typeof variantClasses;
  as: React.ElementType;
}> &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;

const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  children,
  className = "",
  variant,
  as,
  ...restProps
}) => {
  const Component = "span";
  return (
    <Component
      className={`${className} ${variant && variantClasses[variant]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
