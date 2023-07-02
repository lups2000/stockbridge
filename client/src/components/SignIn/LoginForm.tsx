import { ChangeEvent, FC, FormEvent, useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { palette } from '../../utils/colors';
import { BodyText } from '../Text/BodyText';
import { useNavigate } from 'react-router-dom';
import { checkEmail } from '../../utils/functions';
import { login } from '../../api/collections/user';
import { LoginContext } from '../../contexts/LoginContext';

enum ErrorType {
  EMAIL = 'Email format invalid',
  INCOMPLETE = 'Missing Information',
  INVALID = 'Invalid Credentials',
  NO_SERVER = 'No Server response',
}

/**
 * This component represents the form to manage the login and it makes also the axios call to the relative endpoint.
 */
export const LoginForm: FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const [error, setError] = useState<ErrorType | undefined>(undefined);

  const navigate = useNavigate();

  const { setLoggedIn, setUser } = useContext(LoginContext);

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default submit and page reload

    if (email && password) {
      if (checkEmail(email)) {
        await login(email, password)
          .then((response) => {
            if (response.user.registrationCompleted) {
              setError(undefined);
              setLoggedIn(true);
              setUser(response.user);

              navigate('/');
            } else {
              setUser(response.user);
              navigate('/signUp?step=2');
            }
          })
          .catch((error) => {
            if (error.response?.status === 401) {
              setError(ErrorType.INVALID);
            } else {
              setError(ErrorType.NO_SERVER);
            }
          });
      } else {
        setError(ErrorType.EMAIL);
      }
    } else {
      setError(ErrorType.INCOMPLETE);
    }
  };

  return (
    <Form
      className="container-fluid"
      style={{ paddingLeft: 40, paddingRight: 40, marginTop: 30 }}
      method="POST"
      onSubmit={(e) => handleOnSubmit(e)}
    >
      <Form.Group className="mb-2">
        <Form.Label className="font-link">Email address</Form.Label>
        <Form.Control
          type="email"
          required
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
          placeholder="Password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      </Form.Group>
      {error ? (
        <BodyText style={{ color: 'red' }}>{error}</BodyText>
      ) : undefined}
      <div className="d-grid font-link" style={{ marginTop: 30 }}>
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
          SIGN IN
        </Button>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 4,
            marginTop: 10,
          }}
        >
          <BodyText style={{ fontSize: 15 }}>No account?</BodyText>
          <a href="/signUp">Sign up</a>
        </div>
      </div>
    </Form>
  );
};
