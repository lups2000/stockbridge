import { FC } from 'react';
import { Form } from 'react-bootstrap';

/**
 * This component represents a simple date picker.
 */
export const DatePicker: FC = () => {
  return (
    <div className="row">
      <div>
        <Form.Group>
          <Form.Label style={{ fontFamily: 'Poppins' }}>
            Available From:
          </Form.Label>
          <Form.Control
            style={{ border: 'none' }}
            type="date"
            placeholder="DD.MM.YYYY"
          />
        </Form.Group>
      </div>
    </div>
  );
};
