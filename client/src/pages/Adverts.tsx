import React, { FC } from 'react';
import { AdvertsPagination } from '../components/Adverts/AdvertsPagination';
import { Page } from '../components/Page';

export const Adverts: FC = () => {
  return (
    <Page>
      <AdvertsPagination />
    </Page>
  );
};
