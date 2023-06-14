import { FC } from 'react';
import { palette } from '../utils/colors';
import loginImage from '../assets/loginImage.png';
import useMediaQuery from '../hooks/useMediaQuery';
import { SignupForm } from '../components/SignUp/SignupForm';
import { Image } from 'react-bootstrap';
export const SignUp: FC = () => {
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
        <div style={{ marginTop: 100 }}>
          <SignupForm />
        </div>
      </div>
      <div
        style={{
          width: 'calc(100% - 600px)',
          position: 'fixed',
          right: 0,
          height: '100vh',
          display: matches ? undefined : 'none',
        }}
      >
        <Image
          draggable={false}
          fluid
          style={{
            width: '100%',
            minHeight: '100vh',
            objectFit: 'cover',
          }}
          src={loginImage}
          alt="signUp"
        />
      </div>
    </>
  );
};
