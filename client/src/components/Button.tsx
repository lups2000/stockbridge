import React from "react";

export enum buttonShapes {
  RoundedBorder6 = "rounded-md",
  CircleBorder26 = "rounded-[26px]",
  CircleBorder21 = "rounded-[21px]",
}
export enum buttonVariants {
  OutlineRed300 = "bg-red_300 border-[5px] border-red_300 border-solid",
  FillGreen = "bg-green_300",
  FillRed300 = "bg-red_300",
  icbFillOrange200 = "bg-orange_200",
  fillBlack = "bg-black",
  transparentRedBorder = "border-[1px] border-red_300 border-solid",
  transparentGrayBorder = "border-[1px] border-gray_600 border-solid w-full",
}
export enum buttonSizes {
  sm = "p-[7px]",
  md = "p-3.5",
  smIcn = "p-[13px]",
}

export type ButtonProps = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  "onClick"
> &
  Partial<{
    shape: buttonShapes;
    variant: buttonVariants;
    size: buttonSizes;
    leftIcon: React.ReactNode;
    rightIcon: React.ReactNode;
    onClick: () => void;
  }>;

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  leftIcon,
  rightIcon,
  shape = buttonShapes.CircleBorder21,
  variant = buttonVariants.FillGreen,
  size = buttonSizes.sm,
  ...restProps
}) => {
  return (
    <button
      className={`${restProps.className} ${(shape && shape) || ""} ${
        (size && size) || ""
      } ${(variant && variant) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

export { Button };
