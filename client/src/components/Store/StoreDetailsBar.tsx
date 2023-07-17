import React, { useEffect, useState } from 'react';
import { getStore, PopulatedUser, User } from '../../api/collections/user';
import { Ratings } from '../Ratings';
import { BodyText } from '../Text/BodyText';
import { StoreDetailsModal } from './StoreDetailsModal';

type StoreDetailsBarProps = {
  category: string;
  store: PopulatedUser;
};

const StoreDetailsBar: React.FC<StoreDetailsBarProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const fieldContainer = (message: string, value: string, rating = false) => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '4%',
          alignItems: 'start',
          justifyContent: 'start',
          width: '50%',
        }}
      >
        <BodyText
          style={{
            color: '#7881D7',
            fontWeight: 600,
            fontSize: '24px',
          }}
        >
          {message}
        </BodyText>
        <div
          style={
            rating
              ? {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                  justifyContent: 'start',
                }
              : {}
          }
        >
          <div
            style={{
              width: 'auto',
              fontWeight: 300,
              fontSize: '24px',
              fontFamily: 'Poppins',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              textDecorationColor: rating ? '#ffffff' : '',
            }}
          >
            <BodyText
              style={{
                textDecoration: rating ? 'underline' : '',
                cursor: rating ? 'pointer' : '',
              }}
              onClick={rating ? () => setShowModal(true) : () => {}}
            >
              {' '}
              {value}
            </BodyText>
            {rating && Ratings(props.store?.rating ? props.store.rating : 0)}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div
      style={{
        backgroundColor: 'rgba(239, 68, 68, 0.55)',
        display: 'flex',
        flexDirection: 'column',
        gap: '7px',
        alignItems: 'start',
        justifyContent: 'start',
        paddingBottom: '5px',
        paddingTop: '10px',
        paddingLeft: '2%',
        paddingRight: '10%',
        marginTop: '50px',
        width: '100%',
      }}
    >
      <BodyText style={{ fontSize: 24, color: 'white' }}>
        STORE DETAILS
      </BodyText>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'start',
          justifyContent: 'start',
          width: '100%',
        }}
      >
        <React.Fragment key={'category'}>
          {fieldContainer('Category:', props.category ? props.category : '')}
        </React.Fragment>
        <React.Fragment key={'store-name  '}>
          {fieldContainer('Store:', props.store?.name ?? '', true)}
        </React.Fragment>
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
