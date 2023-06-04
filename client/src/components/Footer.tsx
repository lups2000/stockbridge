import { FC } from "react";
import { palette } from "../utils/colors";
import { Dropdown } from "react-bootstrap";
import { BodyText } from "./Text/BodyText";
import { ColoredLine } from "./ColoredLine";

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
          message="LEGAL"
        ></BodyText>
        <ColoredLine color="black" width={20} height={2} marginTop={-10} />
        <a href="#ciao">
          <BodyText
            style={{ fontSize: 15, fontWeight: 400, marginTop: 20 }}
            message="Terms"
          ></BodyText>
        </a>
        <a href="#ciao">
          <BodyText
            style={{ fontSize: 15, fontWeight: 400 }}
            message="Privacy"
          ></BodyText>
        </a>
      </div>
      <div>
        <BodyText
          style={{ fontSize: 15, fontWeight: 600 }}
          message="Social"
        ></BodyText>
        <ColoredLine color="black" width={20} height={2} marginTop={-10} />
        <a href="#ciao">
          <BodyText
            style={{ fontSize: 15, fontWeight: 400, marginTop: 20 }}
            message="Instagram"
          ></BodyText>
        </a>
        <a href="#ciao">
          <BodyText
            style={{ fontSize: 15, fontWeight: 400 }}
            message="Facebook"
          ></BodyText>
        </a>
      </div>
      <Dropdown>
        <Dropdown.Header>
          <BodyText
            style={{ fontSize: 15, fontWeight: 600 }}
            message="LANGUAGE"
          ></BodyText>
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
