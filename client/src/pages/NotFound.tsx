import React, { FC } from 'react';
import { Page } from '../components/Page';
import { Image } from 'react-bootstrap';
import image404 from '../../src/assets/404.jpg';

export const NotFound: FC = () => {
  return (
    <Page>
      <Image
        src={image404}
        fluid
        style={{
          height: '40%',
          width: '40%',
          position: 'relative',
          left: '30%',
          paddingTop: '7em',
          paddingBottom: '7em',
        }}
      />
    </Page>
  );
};
