import React, { FC } from 'react';
import { Page } from '../components/Page';
import { Image } from 'react-bootstrap';
import { palette } from '../utils/colors';
import homepageImage from '../assets/homepageImage.png';
import { Title } from '../components/Text/Title';
import { BodyText } from '../components/Text/BodyText';
import ourMissionImage from '../assets/ourMission.jpg';
import ourStory from '../assets/ourStory.jpg';
import useMediaQuery from '../hooks/useMediaQuery';

export const About: FC = () => {
  const matches = useMediaQuery('(min-width: 1000px)');
  return (
    <Page>
      <div
        style={{
          width: '100%',
          height: 500,
          backgroundColor: palette.imageBg,
          position: 'relative',
        }}
      >
        <Image
          style={{
            width: '100%',
            height: 500,
            zIndex: -1,
            position: 'absolute',
            objectFit: 'cover',
          }}
          src={homepageImage}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            height: '100%',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Title
            style={{
              fontSize: 35,
              color: 'white',
              fontWeight: 500,
            }}
          >
            Discover us: Unveiling Our Purpose and Passion
          </Title>
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingLeft: 100,
            paddingRight: 100,
            marginTop: 30,
            marginBottom: matches ? 50 : 0,
          }}
        >
          <Title style={{ fontWeight: 500, marginTop: 50 }}>Our Mission</Title>
          <BodyText style={{ fontSize: 18, marginTop: 20 }}>
            Our mission at StockBridge is to revolutionize the way small and
            medium-sized stores handle surplus inventory of slow-moving products
            or unexpected surges in product demand. We aim to achieve this by
            uniting stores with similar product categories on our cutting-edge
            platform. By bringing together these stores, we empower them to
            collaborate, share resources, and find innovative solutions to
            inventory challenges. Through our platform, we strive to enhance
            efficiency, reduce waste, and maximize profitability for all
            participating stores.
          </BodyText>
        </div>
        <div
          style={{
            flex: 1,
            display: matches ? 'flex' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            src={ourMissionImage}
            alt="Image"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            flex: 1,
            display: matches ? 'flex' : 'none',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            src={ourStory}
            alt="Image"
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingLeft: 100,
            paddingRight: 100,
            marginTop: matches ? 30 : 0,
            marginBottom: 50,
          }}
        >
          <Title style={{ fontWeight: 500, marginTop: 50 }}>Our Story</Title>
          <BodyText style={{ fontSize: 18, marginTop: 20 }}>
            IDK what I can write here but it's a nice section lol.
          </BodyText>
        </div>
      </div>
    </Page>
  );
};
