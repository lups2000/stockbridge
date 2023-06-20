import { palette } from '../../utils/colors';
import homepageImage from '../../assets/homepageImage.png';
import { Button, Image } from 'react-bootstrap';
import { BodyText } from '../Text/BodyText';
import { Title } from '../Text/Title';
import { SearchBar } from './SearchBar';
import useMediaQuery from '../../hooks/useMediaQuery';
import { useState } from 'react';
import { EditAdvertModal } from '../ProductOverview/EditAdvertModal';
import { ColoredLine } from '../ColoredLine';

/**
 * Component to manage the section of the homepage where the user can click on "post advert" or decide to search for something
 */

export function PostOrSearch() {
  const matches = useMediaQuery('(min-width: 1200px)');
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    window.location.reload();
  };
  return (
    <>
      <div
        style={{
          width: '100%',
          height: 700,
          backgroundColor: palette.imageBg,
        }}
      >
        <Image
          style={{
            width: '100%',
            height: 700,
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
            gap: 50,
            alignItems: 'flex-start',
            marginLeft: '10%',
          }}
        >
          <Button
            style={{
              backgroundColor: palette.subSectionsBgAccent,
              borderColor: palette.subSectionsBgAccent,
              borderRadius: 30,
              width: '20%',
              maxWidth: 260,
              marginTop: '15%',
            }}
            onClick={() => openModal()}
          >
            <BodyText
              style={{
                margin: 'auto',
                fontSize: 15,
                color: 'white',
                fontWeight: 600,
              }}
            >
              POST YOUR ADVERT
            </BodyText>
          </Button>
          <ColoredLine width={60} height={2} color="white" gap={5}>
            <Title
              style={{
                marginTop: 10,
                fontSize: 20,
                color: 'white',
                fontWeight: 400,
              }}
            >
              OR
            </Title>
          </ColoredLine>
          <SearchBar />
          <div
            style={{
              position: 'absolute',
              right: 0,
              marginTop: '15%',
              width: '20%',
              marginRight: '5%',
            }}
          >
            <Title
              style={{
                fontSize: matches ? 36 : 30,
                color: 'white',
                textAlign: 'center',
                fontWeight: 500,
              }}
            >
              Out of stock?or got too much stock?No worries!
            </Title>
          </div>
        </div>
      </div>
      {showModal && (
        <EditAdvertModal isShowing={showModal} onClose={closeModal} />
      )}
    </>
  );
}
