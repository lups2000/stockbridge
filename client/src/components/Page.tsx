import React, { FC } from "react";
import { Navbar } from "react-bootstrap";
import { Footer } from "./Elements/Footer";

interface PageProps {
  children: React.ReactNode;
}

/**
 * This component provides a navbar, a footer and a blank page where you can insert content.
 */
export const Page: FC<PageProps> = (props) => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#fff9fc"}}
    >
      <Navbar />
      {props.children}
      <Footer />
    </div>
  );
};
