import { palette } from '../../utils/colors';
import homepageImage from '../../assets/homepageImage.png';
import { Button, Image } from 'react-bootstrap';
import { Title } from '../Text/Title';
import { useState } from 'react';
import { EditAdvertModal } from '../ProductOverview/EditAdvertModal';
import { useNavigate } from 'react-router-dom';

export function MainArea() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const navigate = useNavigate();

  return (
    <>
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
            High demand? Surplus stock? We've got you covered!
          </Title>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 80,
              gap: 100,
              paddingLeft: 20,
              paddingRight: 20,
            }}
          >
            <Button
              style={{
                backgroundColor: palette.subSectionsBgAccent,
                borderColor: palette.subSectionsBgAccent,
                borderRadius: 15,
                fontSize: 15,
                color: 'white',
                fontWeight: 700,
                paddingLeft: 50,
                paddingRight: 50,
              }}
              onClick={() => navigate('/adverts')}
            >
              BROWSE ADVERTS
            </Button>
            <Button
              style={{
                backgroundColor: palette.subSectionsBgAccent,
                borderColor: palette.subSectionsBgAccent,
                borderRadius: 15,
                fontSize: 15,
                color: 'white',
                fontWeight: 700,
                paddingLeft: 50,
                paddingRight: 50,
              }}
              onClick={() => openModal()}
            >
              POST YOUR ADVERT
            </Button>
          </div>
        </div>
      </div>
      {showModal && (
        <EditAdvertModal isShowing={showModal} onClose={closeModal} editMode={false}/>
      )}
    </>
  );
}
