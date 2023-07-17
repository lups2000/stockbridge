import { palette } from '../../utils/colors';
import profilePageImage from './/../../assets/profilePageImage.png';
import { Image } from 'react-bootstrap';
import { Title } from '../Text/Title';
import useMediaQuery from './../../hooks/useMediaQuery';

export function ProfileHeader() {
  const matches = useMediaQuery('(min-width: 1200px)');

  return (
    <div
      style={{
        width: '100%',
        height: 236,
        backgroundColor: palette.imageBg,
      }}
    >
      <Image
        style={{
          width: '100%',
          height: 236,
          zIndex: -1,
          position: 'absolute',
          objectFit: 'fill',
        }}
        src={profilePageImage}
        alt="homepage"
      />

      <div
        className="textContainer"
        style={{
          display: 'block',
          position: 'relative',
          top: '20%',
        }}
      >
        <Title
          style={{
            fontSize: matches ? 36 : 30,
            color: 'white',
            whiteSpace: 'pre-line',
            textAlign: 'center',
            fontWeight: 500,
          }}
        >
          <h1>
            Out of stock? or got
            <br />
            too much stock?
            <br />
            No worries!
          </h1>
        </Title>
      </div>
    </div>
  );
}
