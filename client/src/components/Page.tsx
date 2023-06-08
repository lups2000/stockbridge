import React, { FC } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";


interface PageProps {
  children: React.ReactNode;
}

/**
 * This component provides a navbar, a footer and a blank page where you can insert content.
 */
export const Page: FC<PageProps> = (props) => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column"}}
    >
      <Navbar />
      {props.children}
      <Footer />
    </div>
  );
};
