import { FC } from 'react';
import { Col, Modal, Row } from 'react-bootstrap';
import { BodyText } from '../Text/BodyText';
import success from '../../assets/success.svg';
import fail from '../../assets/fail.svg';
import { Image } from 'react-bootstrap';
import { PopulatedOffer } from '../../api/collections/offer';
import { useNavigate } from 'react-router-dom';

export enum ResponseType {
  SUCCESSFUL_OFFER_CREATION,
  UNSUCCESSFUL_OFFER_CREATION,
  SUCCESSFUL_OFFER_REJECTION,
  UNSUCCESSFUL_OFFER_REJECTION,
  SUCCESSFUL_OFFER_ACCEPTANCE,
  UNSUCCESSFUL_OFFER_ACCEPTANCE,
}

type OfferCreationModalProps = {
  responseType: ResponseType;
  isShowing: boolean;
  offer: PopulatedOffer;
  onClose: (responseType: ResponseType) => void;
};

const ResponseModal: FC<OfferCreationModalProps> = (props) => {
  const creation =
    props.responseType === ResponseType.SUCCESSFUL_OFFER_CREATION ||
    props.responseType === ResponseType.UNSUCCESSFUL_OFFER_CREATION;
  const acceptance =
    props.responseType === ResponseType.SUCCESSFUL_OFFER_ACCEPTANCE ||
    props.responseType === ResponseType.UNSUCCESSFUL_OFFER_ACCEPTANCE;
  const successfull = [
    ResponseType.SUCCESSFUL_OFFER_ACCEPTANCE,
    ResponseType.SUCCESSFUL_OFFER_CREATION,
    ResponseType.SUCCESSFUL_OFFER_REJECTION,
  ].includes(props.responseType);
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
              {props.responseType ===
                ResponseType.SUCCESSFUL_OFFER_ACCEPTANCE ||
              props.responseType === ResponseType.UNSUCCESSFUL_OFFER_ACCEPTANCE
                ? 'Offer Acceptance'
                : props.responseType ===
                    ResponseType.SUCCESSFUL_OFFER_CREATION ||
                  props.responseType ===
                    ResponseType.UNSUCCESSFUL_OFFER_CREATION
                ? 'Offer Creation'
                : 'Offer Rejection'}
            </BodyText>
            <BodyText
              style={{ fontWeight: 200, fontSize: 16, color: 'GrayText' }}
            >
              {props.offer._id}
            </BodyText>
          </Col>
          <Col style={{ width: '50%', textAlign: 'end' }}>
            <BodyText style={{}}>
              {props.offer.createdAt?.toString().slice(0, 10)}
            </BodyText>
          </Col>
        </Row>
        <Row
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Col>
            <Image
              src={successfull ? success : fail}
              style={{
                width: '20%',
                position: 'relative',
                left: '40%',
              }}
            ></Image>
            <BodyText
              style={{
                display: 'flex',
                position: 'relative',
                left: '30%',
              }}
            >
              Offer {creation ? `to` : `from`}{' '}
              <p
                style={{
                  fontWeight: 600,
                  marginLeft: 4,
                  marginRight: 4,
                }}
              >
                {creation
                  ? props.offer.offeree?.name
                  : props.offer.offeror?.name}
              </p>{' '}
              was {successfull ? 'successfully' : 'not successfully'}{' '}
              {creation ? 'created' : acceptance ? 'accepted' : 'rejected'}!
            </BodyText>
            <BodyText
              style={{ position: 'relative', left: '28%', display: 'flex' }}
            >
              You can track your offer's status in
              <p
                style={{
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  marginLeft: 4,
                }}
                onClick={() => navigate('/userInfo')}
              >
                user account
              </p>
            </BodyText>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export { ResponseModal };
