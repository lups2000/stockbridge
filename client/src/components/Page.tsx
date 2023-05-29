import React, { FC } from "react";
import { Navbar } from "./Navbar";
import { BottomBar } from "./BottomBar";

interface PageProps {
  children: React.ReactNode;
}

/**
 * This component provides a navbar, a bottom bar and a blank page where you can insert content.
 */
export const Page: FC<PageProps> = (props) => {
  return (
    <div>
      <Navbar />
      {props.children}
      <BottomBar />
    </div>
  );
};
