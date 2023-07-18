import { FC } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { BodyText } from '../Text/BodyText';
import success from '../../assets/success.svg';
import fail from '../../assets/fail.svg';
import outofstock from '../../assets/out-of-stock.svg';
import { Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



export enum ResponseType {
  SUCCESSFUL_OFFER_CREATION,
  UNSUCCESSFUL_OFFER_CREATION,
  SUCCESSFUL_OFFER_REJECTION,
  UNSUCCESSFUL_OFFER_REJECTION,
  SUCCESSFUL_OFFER_ACCEPTANCE,
  UNSUCCESSFUL_OFFER_ACCEPTANCE,
  OUT_OF_STOCK,
  SUCCESSFUL_ADVERT_CREATION,
  UNSUCCESSFUL_ADVERT_CREATION,
  SUCCESSFUL_ADVERT_UPDATE,
  UNSUCCESSFUL_ADVERT_UPDATE,
  OUT_OF_ADVERTS
}

type OfferCreationModalProps = {
  responseType: ResponseType;
  isShowing: boolean;
  advertID?: string;
  onClose: (responseType: ResponseType) => void;
};

const ResponseModal: FC<OfferCreationModalProps> = (props) => {
  const creation =
    props.responseType === ResponseType.SUCCESSFUL_OFFER_CREATION ||
    props.responseType === ResponseType.UNSUCCESSFUL_OFFER_CREATION || props.responseType === ResponseType.OUT_OF_STOCK || props.responseType === ResponseType.SUCCESSFUL_ADVERT_CREATION ||
    props.responseType === ResponseType.UNSUCCESSFUL_ADVERT_CREATION || props.responseType === ResponseType.OUT_OF_ADVERTS;
  const acceptance =
    props.responseType === ResponseType.SUCCESSFUL_OFFER_ACCEPTANCE ||
    props.responseType === ResponseType.UNSUCCESSFUL_OFFER_ACCEPTANCE;
  const update = props.responseType === ResponseType.SUCCESSFUL_ADVERT_UPDATE || props.responseType === ResponseType.UNSUCCESSFUL_ADVERT_UPDATE
  const successfull = [
    ResponseType.SUCCESSFUL_OFFER_ACCEPTANCE,
    ResponseType.SUCCESSFUL_OFFER_CREATION,
    ResponseType.SUCCESSFUL_OFFER_REJECTION,
    ResponseType.SUCCESSFUL_ADVERT_CREATION,
    ResponseType.SUCCESSFUL_ADVERT_UPDATE
  ].includes(props.responseType);

  const advert = props.responseType === ResponseType.SUCCESSFUL_ADVERT_CREATION || props.responseType === ResponseType.UNSUCCESSFUL_ADVERT_CREATION || props.responseType === ResponseType.SUCCESSFUL_ADVERT_UPDATE || props.responseType === ResponseType.UNSUCCESSFUL_ADVERT_UPDATE || props.responseType === ResponseType.OUT_OF_ADVERTS;
  const outOfStock = props.responseType === ResponseType.OUT_OF_STOCK;
  const outOfAdverts = props.responseType === ResponseType.OUT_OF_ADVERTS;
  const navigate = useNavigate(); 
  return (
    <Modal
      show={props.isShowing}
      centered
      size="lg"
      onHide={() => props.onClose(props.responseType)}
    >
      <Modal.Header
        style={{
          borderBottom: 'none',
          alignItems: 'start',
        }}
        closeButton
      ></Modal.Header>

      <Modal.Body>
        <Row>
          <Col
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
            }}
          >
            <BodyText
              style={{
                fontWeight: 600,
                fontSize: 20,
              }}
            > {
                advert ? 'Advert ' : 'Offer '
              }
              {acceptance
                ? 'Acceptance'
                : creation
                ? 'Creation'
                : update? 'Update' : 'Rejection'}
            </BodyText>
          </Col>
        </Row>
        <Row
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: '0.8em'
          }}
        >
            <Image
              src={successfull ? success : outOfStock ? outofstock: fail}
              style={{
                width: '20%',
              }}
            ></Image>
            <BodyText
              style={{
                textAlign: 'center'
              }}
            >
              {advert ? 'Advert ' : 'Offer '}
              was {successfull ? 'successfully' : 'not successfully'}{' '}
              {acceptance ? 'accepted' : creation ? 'created' : update ? 'updated' : 'rejected'}!
            </BodyText>
            {outOfStock && <BodyText>
              The product has run out of stock!
            </BodyText>}
            {outOfAdverts && <BodyText>
              You have reached the limit number of adverts for this week!
            </BodyText>}
            {
              !advert && <BodyText
              style={{
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/userInfo')}
            >
              More Info
            </BodyText>
            }
              
            
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export { ResponseModal };
