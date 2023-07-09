import React, { FC } from 'react';
import { Page } from '../components/Page';
import { palette } from '../utils/colors';
import { Title } from '../components/Text/Title';
import { Image } from 'react-bootstrap';
import { BodyText } from '../components/Text/BodyText';
import useMediaQuery from '../hooks/useMediaQuery';
import locationIcon from '../assets/location.svg';
import telephoneIcon from '../assets/telephone.svg';
import emailIcon from '../assets/email.svg';

interface ImageInterface {
  icon: string;
  width: number;
  height: number;
}

interface ContactsInterface {
  image: ImageInterface;
  title: string;
  text: string;
}

const contactModalities: ContactsInterface[] = [
  {
    image: {
      icon: locationIcon,
      width: 100,
      height: 100,
    },
    title: 'Address',
    text: 'StockBridgeStrasse, Munich 80331',
  },
  {
    image: {
      icon: telephoneIcon,
      width: 70,
      height: 70,
    },
    title: 'Phone',
    text: '+49XXXXXXXXXXX',
  },
  {
    image: {
      icon: emailIcon,
      width: 70,
      height: 70,
    },
    title: 'Phone',
    text: 'stockbridge@mail.com',
  },
];

export const ContactUs: FC = () => {
  const matches = useMediaQuery('(min-width: 1000px)');
  return (
    <Page>
      <div
        style={{
          backgroundColor: palette.subSectionsBgAccent,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: 100,
        }}
      >
        <Title style={{ fontWeight: 600, color: 'white', marginTop: 50 }}>
          GET IN TOUCH
        </Title>
        <div
          style={{
            display: 'flex',
            flexDirection: matches ? 'row' : 'column',
            marginTop: 50,
            gap: 100,
          }}
        >
          {contactModalities.map((modality, index) => {
            return (
              <div
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 200,
                  alignItems: 'center',
                  paddingLeft: 25,
                  paddingRight: 25,
                }}
              >
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    backgroundColor: 'white',
                    marginTop: 20,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image
                    src={modality.image.icon}
                    alt="logo"
                    width={modality.image.width}
                    height={modality.image.height}
                  />
                </div>
                <BodyText
                  style={{
                    fontWeight: 600,
                    fontSize: 20,
                    color: 'white',
                    marginTop: 25,
                  }}
                >
                  {modality.title}
                </BodyText>
                <BodyText style={{ color: 'white' }}>{modality.text}</BodyText>
              </div>
            );
          })}
        </div>
      </div>
    </Page>
  );
};
