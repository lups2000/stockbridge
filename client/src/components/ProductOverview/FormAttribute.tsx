import { FC } from 'react';
import { Col, Form } from 'react-bootstrap';
import { palette } from '../../utils/colors';

type FormAttributeProps = {
  name: string;
  label: string;
  value: any;
  type?: string;
  max?: any;
  min?: any;
  control: boolean;
  placeholder?: string;
  defaultOption?: string;
  options?: any;
  onChange: (event: any) => void;
};
const FormAttribute: FC<FormAttributeProps> = (props) => {
  return (
    <Col>
      <Form.Label
        style={{
          paddingLeft: 10,
          fontWeight: '600',
        }}
      >
        {props.label}
      </Form.Label>
      {props.control ? (
        <Form.Control
          style={{
            padding: 10,
            color: palette.gray,
            margin: 5,
          }}
          type={props.type}
          max={props.max}
          min={props.min}
          value={props.value}
          name={props.name}
          onChange={props.onChange}
        />
      ) : (
        <Form.Select
          style={{
            padding: 10,
            color: palette.gray,
            margin: 5,
          }}
          placeholder={props.placeholder}
          value={props.value}
          name={props.name}
          onChange={props.onChange}
        >
          <option> {props.defaultOption} </option>
          {props.options}
        </Form.Select>
      )}
    </Col>
  );
};

export { FormAttribute };
