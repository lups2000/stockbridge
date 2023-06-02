import React, { FC } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface PageProps {
  children: React.ReactNode;
}

/**
 * This component provides a navbar, a bottom bar and a blank page where you can insert content.
 */
export const Page: FC<PageProps> = (props) => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />
      {props.children}
      <Footer />
    </div>
  );
};
