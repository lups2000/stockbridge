import { FC, useState } from "react";
import { Title } from "../Text/Title";
import { palette } from "../../utils/colors";
import { ColoredLine } from "../ColoredLine";
import { Dropdown, Form } from "react-bootstrap";
import { DatePicker } from "../DatePicker";
import Slider from "@mui/material/Slider";
import { BodyText } from "../Text/BodyText";
import useMediaQuery from "./../../hooks/useMediaQuery";

/**
 * This components represents the filters section in the home page.
 */
export const Filters: FC = () => {
  const [rangePrice, setRangePrice] = useState<number[]>([0, 1000]);
  const [rangeQuantity, setRangeQuantity] = useState<number[]>([0, 100]);
  const matches = useMediaQuery("(min-width: 768px)");
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        paddingBottom: 150,
        width: 350,
        borderRadius: 15,
        backgroundColor: palette.subSectionsBgLighter,
        alignItems: "center",
        display: matches ? "flex" : "none",
        flexDirection: "column",
      }}
    >
      <Title
        style={{ textAlign: "center", fontSize: 30, marginTop: 30 }}
        message="Filters"
      ></Title>
      <ColoredLine height={2} width={100} color="black" />
      <Dropdown style={{ marginTop: 30 }}>
        <Dropdown.Toggle
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "black",
            width: 200,
            fontFamily: "Poppins",
          }}
          id="dropdown-basic"
        >
          Categories
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Flowers</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Plants</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div style={{ width: 200, marginTop: 20 }}>
        <BodyText style={{ textAlign: "center" }} message="Price:" />
        <Slider
          style={{ color: "black", marginTop: -20 }}
          size="small"
          value={rangePrice}
          onChange={(_, newRange) => setRangePrice(newRange as number[])}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
      </div>
      <div style={{ width: 200 }}>
        <BodyText style={{ textAlign: "center" }} message="Quantity:" />
        <Slider
          style={{ color: "black", marginTop: -20 }}
          size="small"
          value={rangeQuantity}
          onChange={(_, newRange) => setRangeQuantity(newRange as number[])}
          valueLabelDisplay="auto"
          min={0}
          max={100}
        />
      </div>
      <div style={{ marginTop: 20 }}>
        <DatePicker />
      </div>
      <div style={{ marginTop: 30 , width: 100}}>
        <div className="row">
          <div>
            <Form.Group>
              <BodyText
                style={{ textAlign: "center",marginBottom: 10 }}
                message="Postal Code:"
              />
              <Form.Control
                style={{ border: "none" }}
                type="text"
                placeholder="XXXXX"
              />
            </Form.Group>
          </div>
        </div>
      </div>
    </div>
  );
};
