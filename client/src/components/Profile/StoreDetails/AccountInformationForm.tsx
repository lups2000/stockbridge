import React, { useEffect } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import { Title } from '../../Text/Title';
import { AccountInformationFormProps } from './StoreDetailsForm';
import { checkEmail, checkPhoneNumber } from '../../../utils/functions';

const AccountInformationForm = (props: AccountInformationFormProps) => {
  useEffect(() => {
    if (props.email.value && props.phone.value) {
      if (
        checkPhoneNumber(props.phone.value) &&
        checkEmail(props.email.value) &&
        (props.password.value.length >= 6 || !props.password.value)
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
        <h2>Account Information</h2>
      </Title>
      <FloatingLabel className="mb-3" controlId="email" label="Email Address">
        <Form.Control
          type="email"
          value={props.email.value}
          onChange={props.email.onChange}
          autoComplete="username"
          isInvalid={!checkEmail(props.email.value)}
        />
      </FloatingLabel>

      <FloatingLabel className="mb-3" controlId="password" label="Password">
        <Form.Control
          type="password"
          value={props.password.value}
          onChange={props.password.onChange}
          autoComplete="current-password"
        />
      </FloatingLabel>

      <FloatingLabel className="mb-3" controlId="phone" label="Phone Number">
        <Form.Control
          type="tel"
          value={props.phone.value}
          onChange={props.phone.onChange}
          isInvalid={!checkPhoneNumber(props.phone.value)}
        />
      </FloatingLabel>
    </>
  );
};

export default AccountInformationForm;
