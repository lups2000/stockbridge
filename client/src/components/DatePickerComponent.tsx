import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const variants = {
  OutlineBluegray100:
    "bg-gray_50_01 outline outline-[1px] outline-blue_gray_100",
  OutlineGray30001: "bg-gray_50_01 outline outline-[1px] outline-blue_gray_100",
  OutlineTransparent: "outline outline-[1px] outline-blue_gray_100",
} as const;
const shapes = { RoundedBorder6: "rounded-md" } as const;
const sizes = { sm: "px-1.5 py-[7px]", md: "p-4" } as const;

type DatePickerComponentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    placeholder: string;
    className: string;
    shape: keyof typeof shapes;
    variant: keyof typeof variants;
    size: keyof typeof sizes;
  }>;

const DatePickerComponent: React.FC<DatePickerComponentProps> = (props) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleDateChange = (event: any) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div
      className={`inset-0 z-50 ${props.className} ${
        (props.shape && shapes[props.shape]) || ""
      } ${(props.size && sizes[props.size]) || ""} ${
        (props.variant && variants[props.variant]) || ""
      }`}
    >
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
      />
    </div>
  );
};

export { DatePickerComponent };
