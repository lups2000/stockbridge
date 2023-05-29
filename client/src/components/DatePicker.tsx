import { FC } from "react";
import { Form } from "react-bootstrap";

export const DatePicker: FC = () => {
  return (
    <div className="row">
      <div>
        <Form.Group controlId="dob">
          <Form.Label>Available From:</Form.Label>
          <Form.Control
            style={{ backgroundColor: "#6C757D", border: "none" }}
            type="date"
            name="dob"
            placeholder="DD.MM.YYYY"
          />
        </Form.Group>
      </div>
    </div>
  );
};
