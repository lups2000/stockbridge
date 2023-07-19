import React, { useContext, useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { palette } from '../../../utils/colors';
import AccountInformationForm from './AccountInformationForm';
import ShipmentDetailsForm from './ShipmentDetailsForm';
import StoreDetailsHeader from './StoreDetailsHeader';
import {
  Address,
  PopulatedUser,
  updateUser,
} from '../../../api/collections/user';
import { LoginContext } from '../../../contexts/LoginContext';
import PaymentElement, { PaymentType } from '../../Payment/PaymentElement';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userDefaultImage from '../../../assets/defaultUser.png';

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
  const [image, setImage] = useState<string>(
    (user?.imageUrl as string) ?? userDefaultImage,
  );

  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);

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

  let notify: () => void;

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

      const updatedUser: PopulatedUser = {
        name: name || undefined,
        email: email || undefined,
        password: password || undefined,
        phoneNumber: phone || undefined,
        imageUrl: image || undefined,
        ...(Object.values(address).some((value) => value !== undefined) && {
          address,
        }),
      };
      try {
        await updateUser(user?._id!, updatedUser);
        notify = () =>
          toast.success('Changes Saved!', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        notify();
      } catch (error) {
        notify = () =>
          toast.error('Error Saving Changes!', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        notify();
      }
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className={'m-2'}>
        <StoreDetailsHeader
          name={{ value: name, onChange: handleNameChange }}
          image={{ value: image, setValue: setImage }}
          joined={ user?.createdAt ?? new Date() }
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
        {/*<PaymentDetailsForm*/}
        {/*  cardHolder={{*/}
        {/*    value: cardHolder,*/}
        {/*    onChange: handleCardHolderChange,*/}
        {/*  }}*/}
        {/*  cardNumber={{*/}
        {/*    value: cardNumber,*/}
        {/*    onChange: handleCardNumberChange,*/}
        {/*  }}*/}
        {/*  ccv={{*/}
        {/*    value: cvv,*/}
        {/*    onChange: handleCcvChange,*/}
        {/*  }}*/}
        {/*  expiration={{*/}
        {/*    value: expiration,*/}
        {/*    onChange: handleExpirationChange,*/}
        {/*  }}*/}
        {/*  onChangeError={(error) => setError(error)}*/}
        {/*/>*/}
        <Row className={'mb-2 justify-content-end '}>
          <Col xs={3}>
            <Button
              onClick={() => setShowPaymentModal(true)}
              className={'mb-2'}
              style={{
                width: '100%',
                border: 'none',
                backgroundColor: palette.subSectionsBgAccent,
                borderRadius: 30,
              }}
            >
              Edit Payment Details
            </Button>
          </Col>
          <Col xs={2}>
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
      {showPaymentModal ? (
        <PaymentElement
          show={showPaymentModal}
          onHide={() => setShowPaymentModal(false)}
          type={PaymentType.SETUP_INTENT}
        />
      ) : undefined}
      <ToastContainer />
    </>
  );
};

export default StoreDetailsForm;
