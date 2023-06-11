import React, { useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { Title } from '../../Text/Title';
import { PaymentDetailsFormProps } from './StoreDetailsForm';
import {
  checkCVV,
  checkPaymentExpirationDate,
  chekCreditCardNumber,
} from '../../../utils/functions';

const PaymentDetailsForm = (props: PaymentDetailsFormProps) => {
  useEffect(() => {
    if (
      props.cardNumber.value &&
      props.cardHolder.value &&
      props.ccv &&
      props.expiration.value
    ) {
      if (
        checkCVV(props.ccv.value) &&
        checkPaymentExpirationDate(props.expiration.value) &&
        chekCreditCardNumber(props.cardNumber.value)
      ) {
        props.onChangeError(false);
      } else {
        props.onChangeError(true);
      }
    } else {
      props.onChangeError(true);
    }
  }, [props]);

  return (
    <>
      <Title style={{}}>
        <h2>Payment Details</h2>
      </Title>
      <Form.Floating className="mb-3">
        <Form.Control
          type="text"
          id="cardHolder"
          placeholder="Card Holder"
          value={props.cardHolder.value}
          onChange={props.cardHolder.onChange}
        />
        <label htmlFor="cardHolder">Card Holder</label>
      </Form.Floating>
      <Form.Floating className="mb-3">
        <Form.Control
          type="text"
          id="cardNumber"
          placeholder="Card Number"
          value={props.cardNumber.value}
          onChange={props.cardNumber.onChange}
          isInvalid={!chekCreditCardNumber(props.cardNumber.value)}
          maxLength={19} // to limit the credit card number
        />
        <label htmlFor="cardNumber">Card Number</label>
      </Form.Floating>
      <Row className="mb-3">
        <Col>
          <Form.Floating>
            <Form.Control
              type="text"
              id="ccv"
              placeholder="CCV"
              value={props.ccv.value}
              onChange={props.ccv.onChange}
              isInvalid={!checkCVV(props.ccv.value)}
              maxLength={3} // to limit cvv length
            />
            <label htmlFor="ccv">CCV</label>
          </Form.Floating>
        </Col>
        <Col>
          <Form.Floating>
            <Form.Control
              type="text"
              id="expiration"
              placeholder="Expiration Date"
              value={props.expiration.value}
              onChange={props.expiration.onChange}
              isInvalid={!checkPaymentExpirationDate(props.expiration.value)}
              maxLength={5} // to limit expiration date length
            />
            <label htmlFor="expiration">Expiration Date</label>
          </Form.Floating>
        </Col>
      </Row>
    </>
  );
};

export default PaymentDetailsForm;
