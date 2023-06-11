import { FC } from 'react';
import { Button } from 'react-bootstrap';
import { Title } from '../components/Text/Title';
import { palette } from '../utils/colors';
//import signUpImage from "../assets/signUp.png";
import backIcon from '../assets/back.svg';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '../hooks/useMediaQuery';
import { LoginForm } from '../components/SignIn/LoginForm';

export const SignIn: FC = () => {
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width: 768px)');
  return (
    <>
      <div
        style={{
          width: matches ? 600 : '100vw',
          position: 'absolute',
          left: 0,
          minHeight: '100vh',
          backgroundColor: palette.pageBG,
        }}
      >
        <div style={{ marginTop: 200 }}>
          <Title
            style={{
              color: palette.loginTitle,
              paddingLeft: 40,
              fontWeight: 600,
              fontSize: 36,
            }}
          >
            Sign in{' '}
          </Title>
          <Button
            style={{
              position: 'absolute',
              left: 20,
              top: 20,
              backgroundColor: palette.pageBG,
              border: 'none',
            }}
            onClick={() => navigate('/')}
          >
            <img src={backIcon} alt="delete" />
          </Button>
          <LoginForm />
        </div>
      </div>
      <div
        style={{
          width: 'calc(100% - 600px)',
          position: 'fixed',
          right: 0,
          height: '100vh',
          paddingLeft: 50,
          backgroundColor: 'red',
          display: matches ? undefined : 'none',
        }}
      >
        {/*<img TODO
          style={{
            maxWidth: "100%",
            objectFit: "cover",
            height: "100%",
          }}
          src={signUpImage}
          alt="signUp"
        />*/}
      </div>
    </>
  );
};
