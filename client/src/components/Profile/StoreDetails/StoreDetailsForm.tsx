import React, { useContext, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { palette } from '../../../utils/colors';
import AccountInformationForm from './AccountInformationForm';
import ShipmentDetailsForm from './ShipmentDetailsForm';
import PaymentDetailsForm from './PaymentDetailsForm';
import StoreDetailsHeader from './StoreDetailsHeader';
import {
  Address,
  PaymentMethod,
  PopulatedUser,
  updateUser,
} from '../../../api/collections/user';
import { LoginContext } from '../../../contexts/LoginContext';
import {
  autocompleteCardNumber,
  autocompleteExpirationDate,
  expDatePaymentToDate,
} from '../../../utils/functions';

export interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface AccountInformationFormProps {
  email: InputProps;
  password: InputProps;
  phone: InputProps;
  onChangeError: (error: boolean) => void;
}

export interface ShipmentDetailsFormProps {
  streetName: InputProps;
  houseNumber: InputProps;
  city: InputProps;
  postalCode: InputProps;
  country: InputProps;
  onChangeError: (error: boolean) => void;
}

export interface PaymentDetailsFormProps {
  cardHolder: InputProps;
  cardNumber: InputProps;
  ccv: InputProps;
  expiration: InputProps;
  onChangeError: (error: boolean) => void;
}

export interface StoreDetailsProps {
  name: InputProps;
  image: {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
  };
  joined: Date;
  onChangeError: (error: boolean) => void;
}

const StoreDetailsForm: React.FC = () => {
  const { user } = useContext(LoginContext);

  const [error, setError] = useState<boolean>(false);

  const [name, setName] = useState<string>(user?.name as string);
  const [image, setImage] = useState<string>('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const [email, setEmail] = useState(user?.email as string);
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState(user?.phoneNumber as string);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const [streetName, setStreetName] = useState(user?.address!.street || '');
  const [houseNumber, setHouseNumber] = useState(
    user?.address!.houseNumber || '',
  );
  const [city, setCity] = useState(user?.address!.city || '');
  const [postalCode, setPostalCode] = useState(user?.address!.postalCode || '');
  const [country, setCountry] = useState(user?.address!.country || '');

  const handleStreetNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStreetName(e.target.value);
  };

  const handleHouseNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHouseNumber(e.target.value);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostalCode(e.target.value);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const [cardHolder, setCardHolder] = useState(user?.paymentMethod!.name || '');
  const [cardNumber, setCardNumber] = useState(
    user?.paymentMethod!.cardNumber || '',
  );
  const [cvv, setCvv] = useState(user?.paymentMethod!.cvv || '');
  const [expiration, setExpiration] = useState('');

  const handleCardHolderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardHolder(e.target.value);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(autocompleteCardNumber(e) ?? '');
  };

  const handleCcvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvv(e.target.value);
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpiration(autocompleteExpirationDate(e) ?? '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error) {
      console.log(error);
      return;
    } else {
      const address: Address = {
        street: streetName || undefined,
        houseNumber: houseNumber || undefined,
        city: city || undefined,
        postalCode: postalCode || undefined,
        country: country || undefined,
      };
      const paymentMethod: PaymentMethod = {
        name: cardHolder || undefined,
        cardNumber: cardNumber || undefined,
        cvv: cvv || undefined,
        expirationDate: expiration
          ? expDatePaymentToDate(expiration)
          : undefined,
      };
      const updatedUser: PopulatedUser = {
        name: name || undefined,
        email: email || undefined,
        password: password || undefined,
        phoneNumber: phone || undefined,
        ...(Object.values(address).some((value) => value !== undefined) && {
          address,
        }),
        ...(Object.values(paymentMethod).some(
          (value) => value !== undefined,
        ) && {
          paymentMethod,
        }),
      };

      await updateUser(user?._id!, updatedUser);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className={'m-2'}>
        <StoreDetailsHeader
          name={{ value: name, onChange: handleNameChange }}
          image={{ value: image, setValue: setImage }}
          joined={new Date()}
          onChangeError={(error) => setError(error)}
        />
        <AccountInformationForm
          email={{
            value: email,
            onChange: handleEmailChange,
          }}
          password={{
            value: password,
            onChange: handlePasswordChange,
          }}
          phone={{
            value: phone,
            onChange: handlePhoneChange,
          }}
          onChangeError={(error) => setError(error)}
        />
        <ShipmentDetailsForm
          streetName={{
            value: streetName,
            onChange: handleStreetNameChange,
          }}
          houseNumber={{
            value: houseNumber,
            onChange: handleHouseNumberChange,
          }}
          city={{
            value: city,
            onChange: handleCityChange,
          }}
          postalCode={{
            value: postalCode,
            onChange: handlePostalCodeChange,
          }}
          country={{
            value: country,
            onChange: handleCountryChange,
          }}
          onChangeError={(error) => setError(error)}
        />
        <PaymentDetailsForm
          cardHolder={{
            value: cardHolder,
            onChange: handleCardHolderChange,
          }}
          cardNumber={{
            value: cardNumber,
            onChange: handleCardNumberChange,
          }}
          ccv={{
            value: cvv,
            onChange: handleCcvChange,
          }}
          expiration={{
            value: expiration,
            onChange: handleExpirationChange,
          }}
          onChangeError={(error) => setError(error)}
        />
        <Row className={'mb-2 justify-content-end '}>
          <Col xs={1}>
            <Button
              type="submit"
              className={'mb-2'}
              style={{
                width: '100%',
                border: 'none',
                backgroundColor: palette.subSectionsBgAccent,
                borderRadius: 30,
              }}
            >
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default StoreDetailsForm;
