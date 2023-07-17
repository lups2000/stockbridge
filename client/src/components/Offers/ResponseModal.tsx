import { FC } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { BodyText } from '../Text/BodyText';
import success from '../../assets/success.svg';
import fail from '../../assets/fail.svg';
import outofstock from '../../assets/out-of-stock.svg';
import { Image } from 'react-bootstrap';
import { Offer } from '../../api/collections/offer';
import { useNavigate } from 'react-router-dom';


export enum ResponseType {
  SUCCESSFUL_OFFER_CREATION,
  UNSUCCESSFUL_OFFER_CREATION,
  SUCCESSFUL_OFFER_REJECTION,
  UNSUCCESSFUL_OFFER_REJECTION,
  SUCCESSFUL_OFFER_ACCEPTANCE,
  UNSUCCESSFUL_OFFER_ACCEPTANCE,
  OUT_OF_STOCK
}

type OfferCreationModalProps = {
  responseType: ResponseType;
  isShowing: boolean;
  offer: Offer;
  onClose: (responseType: ResponseType) => void;
};

const ResponseModal: FC<OfferCreationModalProps> = (props) => {
  const creation =
    props.responseType === ResponseType.SUCCESSFUL_OFFER_CREATION ||
    props.responseType === ResponseType.UNSUCCESSFUL_OFFER_CREATION || ResponseType.OUT_OF_STOCK;
  const acceptance =
    props.responseType === ResponseType.SUCCESSFUL_OFFER_ACCEPTANCE ||
    props.responseType === ResponseType.UNSUCCESSFUL_OFFER_ACCEPTANCE;
  const successfull = [
    ResponseType.SUCCESSFUL_OFFER_ACCEPTANCE,
    ResponseType.SUCCESSFUL_OFFER_CREATION,
    ResponseType.SUCCESSFUL_OFFER_REJECTION,
  ].includes(props.responseType);
  const outOfStock = props.responseType === ResponseType.OUT_OF_STOCK;
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
            >
              {acceptance
                ? 'Offer Acceptance'
                : creation
                ? 'Offer Creation'
                : 'Offer Rejection'}
            </BodyText>
            <BodyText
              style={{ fontWeight: 200, fontSize: 16, color: 'GrayText' }}
            >
              {props.offer?._id}
            </BodyText>
          </Col>
          <Col style={{ width: '50%', textAlign: 'end' }}>
            <BodyText style={{}}>
              {props.offer?.createdAt?.toString().slice(0, 10)}
            </BodyText>
          </Col>
        </Row>
        <Row
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center'
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
              Offer
              was {successfull ? 'successfully' : 'not successfully'}{' '}
              {acceptance ? 'accepted' : creation ? 'created' : 'rejected'}!
            </BodyText>
            {outOfStock && <BodyText>
              The product has run out of stock of stock!
            </BodyText>}
            <BodyText>
              You can track your offer's status in
              <BodyText
                style={{
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                onClick={() => navigate('/userInfo')}
              >
                user account
              </BodyText>
            </BodyText>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export { ResponseModal };
