import React, { FC } from 'react';
import { Button, Image } from 'react-bootstrap';
import icon from '../assets/howWorks1.svg'; // stupid icon just for testing
import { BodyText } from './Text/BodyText';
import { ColoredLine } from './ColoredLine';

export const AdvertCard: FC = () => {
  return (
    <div
      style={{
        width: 300,
        height: 425,
        borderRadius: 8,
        position: 'relative',
        border: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Image
        src={icon}
        alt="image"
        width={200}
        height={200}
        style={{ backgroundColor: 'red', marginTop: 15 }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 50,
          paddingLeft: 5,
          paddingRight: 5,
          marginTop: 10
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <BodyText style={{ fontSize: 20, fontWeight: 600 }}>Orchids</BodyText>
          <ColoredLine width={30} height={3} color="#4ECBA9" marginTop={-10} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <BodyText style={{ fontSize: 18, fontWeight: 500 }}>
            Quantity: 10
          </BodyText>
          <BodyText style={{ fontSize: 18, fontWeight: 500, marginTop: -10 }}>
            Price: 10$
          </BodyText>
        </div>
      </div>
      <div
        style={{
          width: 300,
          overflow: 'hidden',
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <BodyText
          style={{ fontSize: 15, fontWeight: 400, textAlign: 'center' }}
        >
          sakdjksdjksa jdkskdjakdjs kjdkajsdkja kdjkajkdjak sakdjksdjksa
          jdkskdjakdjs kjdkajsdkja kdjkajkdjak
        </BodyText>
      </div>
      <Button style={{ position: 'absolute', left: 10, bottom: 10 }}>View Advert</Button>
      <BodyText
        style={{
          fontSize: 15,
          fontWeight: 300,
          textAlign: 'center',
          position: 'absolute',
          right: 10,
          bottom: 0,
        }}
      >
        10.05.23
      </BodyText>
    </div>
  );
};
