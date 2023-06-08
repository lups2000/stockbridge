import { FC } from "react";
import { Dropdown } from "react-bootstrap";
import { palette } from "../utils/colors";
import { ColoredLine } from "./ColoredLine";
import { BodyText } from "./Text/BodyText";

/**
 * This component represents the footer/bottom bar of our website.
 */
export const Footer: FC = () => {
  return (
    <div
      style={{
        height: 300,
        backgroundColor: palette.subSectionsBgLighter,
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "center",
        gap: 100,
        paddingTop: 100,
        marginTop: "auto",
      }}
    >
      <div>© StockBridge 2023</div>
      <div>
        <BodyText
          style={{ fontSize: 15, fontWeight: 600 }}
        >LEGAL</BodyText>
        <ColoredLine color="black" width={20} height={2} marginTop={-10} />
        <a href="#ciao">
          <BodyText
            style={{ fontSize: 15, fontWeight: 400, marginTop: 20 }}
          >Terms</BodyText>
        </a>
        <a href="#ciao">
          <BodyText
            style={{ fontSize: 15, fontWeight: 400 }}
          >Privacy</BodyText>
        </a>
      </div>
      <div>
        <BodyText
          style={{ fontSize: 15, fontWeight: 600 }}
        >Social</BodyText>
        <ColoredLine color="black" width={20} height={2} marginTop={-10} />
        <a href="#ciao">
          <BodyText
            style={{ fontSize: 15, fontWeight: 400, marginTop: 20 }}
          >Instagram</BodyText>
        </a>
        <a href="#ciao">
          <BodyText
            style={{ fontSize: 15, fontWeight: 400 }}
          >Facebook</BodyText>
        </a>
      </div>
      <Dropdown>
        <Dropdown.Header>
          <BodyText
            style={{ fontSize: 15, fontWeight: 600 }}
          >LANGUAGE</BodyText>
        </Dropdown.Header>
        <ColoredLine color="black" width={20} height={2} marginTop={-10} />
        <Dropdown.Toggle
          style={{
            backgroundColor: "white",
            border: "none",
            color: "black",
            marginTop: 20,
          }}
          id="dropdown-basic"
        >
          English
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">German</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};
