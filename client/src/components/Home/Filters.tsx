import { FC, useState } from "react";
import { Title } from "../Text/Title";
import { palette } from "../../utils/colors";
import { ColoredLine } from "../ColoredLine";
import { Dropdown, Form } from "react-bootstrap";
import { DatePicker } from "../DatePicker";
import Slider from "@mui/material/Slider";

export const Filters: FC = () => {
  const [rangePrice, setRangePrice] = useState<number[]>([0, 1000]);
  const [rangeQuantity, setRangeQuantity] = useState<number[]>([0, 100]);
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        //height: 2000,
        width: 350,
        borderRadius: 15,
        backgroundColor: palette.subSectionsBgLighter,
        alignItems: "center",
        display: "flex",
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
      <div style={{ width: 200 }}>
        Price:
        <Slider
          style={{ color: "black" }}
          value={rangePrice}
          onChange={(_,newRange) => setRangePrice(newRange as number[])}
          valueLabelDisplay="auto"
          min={0}
          max={1000}
        />
      </div>
      <div style={{ width: 200 }}>
        Quantity:
        <Slider
          style={{ color: "black" }}
          value={rangeQuantity}
          onChange={(_,newRange) => setRangeQuantity(newRange as number[])}
          valueLabelDisplay="auto"
          min={0}
          max={100}
        />
      </div>
      <div style={{ marginTop: 30 }}>
        <DatePicker />
      </div>
      <div style={{ marginTop: 30 }}>
        <div className="row">
          <div>
            <Form.Group controlId="dob">
              <Form.Label>Postal Code:</Form.Label>
              <Form.Control
                style={{ backgroundColor: "#6C757D", border: "none" }}
                type="text"
                name="dob"
                placeholder="XXXXX"
              />
            </Form.Group>
          </div>
        </div>
      </div>
    </div>
  );
};
