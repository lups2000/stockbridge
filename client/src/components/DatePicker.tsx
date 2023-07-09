import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

interface DatePickerProps {
  value?: Date;
  onDateChange: (date: Date) => void;
}

/**
 * This component represents a simple date picker.
 */
export const DatePicker: FC<DatePickerProps> = (props) => {
  const [dateString, setDateString] = useState(
    props.value ? props.value.toISOString().split('T')[0] : '',
  );

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDateString(e.target.value);
    props.onDateChange(new Date(e.target.value));
  };

  useEffect(() => {
    if (props.value) {
      return;
    }
    setDateString('');
  }, [props.value]);

  return (
    <div className="row">
      <div>
        <Form.Group>
          <Form.Label style={{ fontFamily: 'Poppins' }}>
            Available From:
          </Form.Label>
          <Form.Control
            style={{ border: 'none', textAlign: 'center' }}
            type="date"
            placeholder="DD.MM.YYYY"
            value={dateString}
            onChange={handleDateChange}
          />
        </Form.Group>
      </div>
    </div>
  );
};
