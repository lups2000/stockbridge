import React, { useState } from 'react';
import { PopulatedUser } from '../../api/collections/user';
import { Ratings } from '../Ratings';
import { BodyText } from '../Text/BodyText';
import { StoreDetailsElement } from './StoreDetailsElement';
import { StoreDetailsModal } from './StoreDetailsModal';

type StoreDetailsBarProps = {
  category: string;
  store: PopulatedUser;
};

const StoreDetailsBar: React.FC<StoreDetailsBarProps> = (props) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      style={{
        backgroundColor: 'rgba(239, 68, 68, 0.55)',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 5,
      }}
    >
      <div>
        <BodyText style={{ fontSize: 30, color: 'white', fontWeight: 600 }}>
          STORE DETAILS
        </BodyText>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <StoreDetailsElement label="Name">
          <BodyText
            style={{
              color: 'white',
              fontSize: 24,
              margin: '0 5px',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={() => setShowModal(true)}
          >
            {props.store?.name}
          </BodyText>
        </StoreDetailsElement>
        <StoreDetailsElement label="Member since">
          <BodyText
            style={{
              color: 'white',
              fontSize: 24,
              margin: '0 5px',
            }}
          >
            {props.store.createdAt
              ? new Date(props.store.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })
              : ''}
          </BodyText>
        </StoreDetailsElement>
        <StoreDetailsElement label="Rating">
          <BodyText style={{ color: 'white', fontSize: 24, margin: '0 5px' }}>
            {Ratings(props.store?.rating ? props.store.rating : 0, 'white')}
          </BodyText>
        </StoreDetailsElement>
      </div>
      {showModal && (
        <StoreDetailsModal
          isShowing={showModal}
          store={props.store._id!}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export { StoreDetailsBar };
