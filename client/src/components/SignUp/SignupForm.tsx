import {
  ChangeEvent,
  FC,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Title } from '../Text/Title';
import { palette } from '../../utils/colors';
import { Button, Form } from 'react-bootstrap';
import { BodyText } from '../Text/BodyText';
import { useLocation, useNavigate } from 'react-router-dom';
import addIcon from '../../assets/add.svg';
import backIcon from '../../assets/back.svg';
import {
  checkEmail,
  expDatePaymentToDate,
  checkPasswordLength,
  checkPasswordMatch,
} from '../../utils/functions';
import { LoginContext } from '../../contexts/LoginContext';
import { register, updateUser } from '../../api/collections/user';
import PaymentElement, { PaymentType } from '../Payment/PaymentElement';

enum ErrorType {
  EMAIL = 'Email format invalid',
  PASSWORD_LENGTH = 'Password should contain at least 6 characters',
  PASSWORD_MATCH = "Passwords don't match",
  INCOMPLETE = 'Missing Information',
  ALREADY_REG = 'User already registered',
  NO_SERVER = 'No Server response',
  CREATING = 'Error while creating the user',
}

/**
 * This component represents the form to manage the sign up and it makes also the axios call to the relative endpoint.
 */
export const SignupForm: FC = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const [isFirstPartCompleted, setIsFirstPartCompleted] =
    useState<boolean>(false);

  //first form info
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [repeatPassword, setRepeatPassword] = useState<string>();

  //second form info
  const [shopName, setShopName] = useState<string>('');
  const [address, setAddress] = useState<string>();
  const [houseNumber, setHouseNumber] = useState<string>();
  const [city, setCity] = useState<string>();
  const [postalCode, setPostalCode] = useState<string>();
  const [country, setCountry] = useState<string>();

  //payment info
  const [cardName, setCardName] = useState<string>();
  const [cardNumber, setCardNumber] = useState<string>();
  const [expDateCard, setExpDateCard] = useState<string>();
  const [cvvCard, setCvvCard] = useState<string>();

  const [error, setError] = useState<ErrorType | undefined>(undefined);

  const [isModalShowing, setIsModalShowing] = useState(false);

  const { user, setUser, setLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const selectValue = searchParams.get('step');

    if (selectValue && selectValue === '2') {
      setIsFirstPartCompleted(true);
    }
  }, [location.search]);

  //when the user clicks for the first time on "sign up"
  const handleFirstClick = () => {
    if (email && password && repeatPassword) {
      if (!checkEmail(email)) {
        setError(ErrorType.EMAIL);
        return;
      }
      if (!checkPasswordLength(password)) {
        setError(ErrorType.PASSWORD_LENGTH);
        return;
      }
      if (!checkPasswordMatch(password, repeatPassword)) {
        setError(ErrorType.PASSWORD_MATCH);
        return;
      }
      register({ email, password })
        .then((res) => {
          setUser(res.user);
          setIsFirstPartCompleted(true);
          setError(undefined);
        })
        .catch((err) => {
          if (err.response.status === 409) {
            setError(ErrorType.ALREADY_REG);
          } else {
            setError(ErrorType.NO_SERVER);
          }
        });
    } else {
      setError(ErrorType.INCOMPLETE);
    }
  };

  //when the user clicks for the second time on "sign up" after filling the second form
  const handleSecondClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default submit and page reload

    if (address && city && postalCode && country) {
      updateUser(user?._id!, {
        name: shopName,
        address: {
          street: address,
          houseNumber,
          city,
          postalCode,
          country,
        },
        paymentMethod: {
          name: cardName,
          cardNumber,
          expirationDate: expDatePaymentToDate(expDateCard ?? ''),
          cvv: cvvCard,
        },
        registrationCompleted: true,
      })
        .then((response) => {
          setError(undefined);
          setLoggedIn(true);
          setUser(response);

          navigate('/'); //return to the homepage
        })
        .catch((error) => {
          if (error.response?.status === 409) {
            setError(ErrorType.ALREADY_REG);
          } else if (error.response?.status === 400) {
            setError(ErrorType.CREATING);
          } else {
            setError(ErrorType.NO_SERVER);
          }
        });
    } else {
      setError(ErrorType.INCOMPLETE);
    }
  };

  return (
    <div>
      <Button
        style={{
          position: 'absolute',
          left: 20,
          top: 20,
          backgroundColor: palette.pageBG,
          border: 'none',
        }}
        onClick={() => {
          if (!isFirstPartCompleted) {
            navigate('/');
          } else {
            setIsFirstPartCompleted(false);
          }
        }}
      >
        <img src={backIcon} alt="delete" />
      </Button>
      {!isFirstPartCompleted ? (
        //first form
        <div style={{ paddingTop: 100 }}>
          <Title
            style={{
              color: palette.loginTitle,
              paddingLeft: 40,
              fontWeight: 600,
              fontSize: 36,
            }}
          >
            Sign up{' '}
          </Title>
          <Form
            className="container-fluid"
            style={{ paddingLeft: 40, paddingRight: 40, marginTop: 30 }}
          >
            <Form.Group className="mb-2">
              <Form.Label className="font-link">Email address</Form.Label>
              <Form.Control
                type="email"
                required
                defaultValue={email}
                placeholder="name@address.com"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="font-link">Password</Form.Label>
              <Form.Control
                type="password"
                required
                defaultValue={password}
                placeholder="Password"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label className="font-link">
                Confirm your Password
              </Form.Label>
              <Form.Control
                type="password"
                required
                defaultValue={repeatPassword}
                placeholder="Password"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setRepeatPassword(e.target.value)
                }
              />
            </Form.Group>
            {error ? (
              <BodyText style={{ color: 'red' }}>{error}</BodyText>
            ) : undefined}
            <div className="d-grid font-link" style={{ marginTop: 30 }}>
              <Button
                style={{
                  color: 'white',
                  backgroundColor: palette.subSectionsBgAccent,
                  borderColor: palette.subSectionsBgAccent,
                  fontSize: 20,
                  fontWeight: 500,
                }}
                onClick={() => handleFirstClick()}
              >
                SIGN UP
              </Button>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 4,
                  marginTop: 10,
                }}
              >
                <BodyText style={{ fontSize: 15 }}>Have an account?</BodyText>
                <a href="/signIn">Sign in</a>
              </div>
            </div>
          </Form>
        </div>
      ) : (
        //second form
        <>
          <Title
            style={{
              color: palette.loginTitle,
              paddingLeft: 40,
              fontWeight: 600,
              fontSize: 36,
            }}
          >
            One more step...
          </Title>
          <Form
            className="container-fluid"
            style={{ paddingLeft: 40, paddingRight: 40, marginTop: 30 }}
            onSubmit={(e) => handleSecondClick(e)}
          >
            <Form.Group className="mb-2">
              <Form.Label className="font-link">Store Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setShopName(e.target.value)
                }
              />
            </Form.Group>
            <div className="row">
              <div className="col-md-8">
                <Form.Group className="mb-2">
                  <Form.Label className="font-link">Street Address*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Street Address"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setAddress(e.target.value)
                    }
                  />
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-2">
                  <Form.Label className="font-link">House Number*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="House Number"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setHouseNumber(e.target.value)
                    }
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                <Form.Group className="mb-2">
                  <Form.Label className="font-link">City*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setCity(e.target.value)
                    }
                  />
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group className="mb-2">
                  <Form.Label className="font-link">Postal Code*</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Postal Code"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPostalCode(e.target.value)
                    }
                  />
                </Form.Group>
              </div>
            </div>
            <Form.Group className="mb-2">
              <Form.Label className="font-link">Country*</Form.Label>
              <Form.Control
                type="text"
                placeholder="Country"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setCountry(e.target.value)
                }
              />
            </Form.Group>
            <div
              style={{
                marginTop: 10,
                display: 'flex',
                flexDirection: 'row',
                cursor: 'pointer',
              }}
              onClick={() => setIsModalShowing(true)}
            >
              <img src={addIcon} alt="addIcon" />
              <BodyText style={{ fontSize: 15, marginTop: 15, marginLeft: 8 }}>
                Add a payment method
              </BodyText>
            </div>
            {error ? (
              <BodyText style={{ color: 'red' }}>{error}</BodyText>
            ) : undefined}
            <div className="d-grid font-link" style={{ marginTop: 15 }}>
              <Button
                type="submit"
                style={{
                  color: 'white',
                  backgroundColor: palette.subSectionsBgAccent,
                  borderColor: palette.subSectionsBgAccent,
                  fontSize: 20,
                  fontWeight: 500,
                }}
              >
                SIGN UP
              </Button>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 4,
                  marginTop: 10,
                }}
              >
                <BodyText style={{ fontSize: 15 }}>Have an account?</BodyText>
                <a href="/signIn">Sign in</a>
              </div>
            </div>
          </Form>
        </>
      )}
      {isModalShowing ? (
        // <CustomPaymentModal
        //   name={cardName}
        //   number={cardNumber}
        //   expDate={expDateCard}
        //   cvv={cvvCard}
        //   onChangeName={(name) => setCardName(name)}
        //   onChangeNumber={(number) => setCardNumber(number)}
        //   onChangeDate={(date) => setExpDateCard(date)}
        //   onChangeCVV={(cvv) => setCvvCard(cvv)}
        //   isShowing={isModalShowing}
        //   onClose={() => setIsModalShowing(false)}
        // />
        <PaymentElement
          show={isModalShowing}
          onHide={() => setIsModalShowing(false)}
          type={PaymentType.SETUP_INTENT}
        />
      ) : undefined}
    </div>
  );
};
