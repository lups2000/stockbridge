import { FC, useContext, useState } from 'react';
import { Button, Col, Form, Modal, Row, Image } from 'react-bootstrap';
import {
  PopulatedAdvert,
  updateAdvert,
} from '../../api/collections/advert';
import {
  createOffer,
  Offer,
  OfferStatus,
  PopulatedOffer,
} from '../../api/collections/offer';
import { LoginContext } from '../../contexts/LoginContext';
import { palette } from '../../utils/colors';
import { Ratings } from '../Ratings';

type OfferContentProps = {
  isShowing: boolean;
  onClose: () =>  void;
  onSave: () => void;
  offer?: PopulatedOffer;
  advert?: PopulatedAdvert;
  storeName?: String;
  rating?: number;
};
function colorMap(status: OfferStatus): string {
  switch (status) {
    case OfferStatus.OPEN:
      return '#4285F4';
    case OfferStatus.ACCEPTED:
      return '#4ECBA9';
    case OfferStatus.REJECTED:
      return 'red';
    case OfferStatus.CANCELED:
      return '#ffc071';
    default:
      return '#4285F4';
  }
}
const OfferModal: FC<OfferContentProps> = (props) => {
  const { user, loggedIn } = useContext(LoginContext);

  const [formData, setFormData] = useState({
    Quantity: props.offer?.quantity ? props.offer?.quantity : 0,
    Price: props.offer?.price ? props.offer?.price : 0,
    createdAt: new Date(),
    status: OfferStatus.OPEN,
    offeror: user?._id,
    offeree: props.advert?.store,
    advert: props.advert?._id,
  } as Offer);

  const handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState(
    {} as {
      Price: string;
      Quantity: string;
    },
  );
  const isValid = () => {
    return formData.price && formData.quantity;
  };
  const handleSubmit = async () => {
    if (isValid()) {
      try {
        const createdOffer = await createOffer(formData as Offer);
        if (props.advert?._id) {
          console.log('Updating advert: ', props.advert._id);
          updateAdvert(props.advert._id, {
            offers: [createdOffer._id!],
          });
        }
        if (props.onSave) props?.onSave();
      } catch (error) {
        console.error(error);
      }
    } else {
      setErrors({
        Price: formData.price
          ? formData.price > 0
            ? ''
            : 'Price must be greater than 0'
          : 'Price is missing',
        Quantity: formData.quantity
          ? formData.quantity > 0
            ? formData.quantity < props.advert?.quantity!
              ? ''
              : 'Quantity must be less or equal to available Quantity'
            : 'Quantity must be greater than 0'
          : 'Quantity is missing',
      });
    }
  };
  const status = props.offer ? props.offer.status : OfferStatus.OPEN;
  return (
    <Modal show={props.isShowing} onHide={props.onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Offer Overview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col></Col>
          <Col></Col>
          <Col>
            <Form.Label
              style={{
                marginLeft: '50%',
                fontSize: '16px',
                color: 'GrayText',
                font: 'light',
              }}
            >
              {props.offer
                ? props.offer.createdAt?.toString().substring(0, 10)
                : new Date().toString().substring(0, 10)}
            </Form.Label>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label
                style={{
                  padding: '10px',
                  color: 'balck',
                  margin: '5px',
                  fontSize: '16px',
                  marginBottom: '30px',
                  fontWeight: 800,
                }}
              >
                Status:
              </Form.Label>
              <Form.Label
                style={{
                  color: colorMap(
                    props.offer?.status
                      ? props.offer?.status
                      : OfferStatus.OPEN,
                  ),
                  fontWeight: 600,
                }}
              >
                {status}
              </Form.Label>
            </Form.Group>
          </Col>
          <Col></Col>
          <Col></Col>
        </Row>
        <Row
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {props.advert?.imageurl && (
            <Col>
              <Image
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '60px',
                }}
                src={props.advert?.imageurl}
              />
            </Col>
          )}
          <Col
            style={{
              marginLeft: props.advert?.imageurl ? '' : '100px',
            }}
          >
            <Row>
              <Form.Label>{props.advert?.productname}</Form.Label>
            </Row>
            <Row
              style={{
                marginTop: '10px',
              }}
            >
              <Form.Label>Color: {props.advert?.color}</Form.Label>
            </Row>
            {props.advert?.purchaseDate && (
              <Row
                style={{
                  marginTop: '10px',
                }}
              >
                <Form.Label>
                  Purchase Date:{' '}
                  {props.advert?.purchaseDate.toString().substring(0, 10)}
                </Form.Label>
              </Row>
            )}
            {props.advert?.expirationDate && (
              <Row
                style={{
                  marginTop: '10px',
                }}
              >
                <Form.Label>
                  Expiration Date:{' '}
                  {props.advert?.expirationDate.toString().substring(0, 10)}
                </Form.Label>
              </Row>
            )}
          </Col>
          <Col>
            <Row>
              <Form.Label>
                {props.advert?.type === 'Sell' ? 'Seller' : 'Buyer'}:{' '}
                {props.storeName}
                {Ratings(props.rating ? props.rating : 0)}
              </Form.Label>
            </Row>
            <Row>
              <Form.Group
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignContent: 'center',
                  gap: '10%',
                  marginTop: '10px',
                }}
              >
                <Form.Label
                  style={{
                    width: props.offer ? '60px' : '110px',
                  }}
                >
                  Price {props.offer ? '' : '(€)'}
                </Form.Label>
                {props.offer ? (
                  <Form.Label
                    style={{
                      color: palette.gray,
                      font: 'bold',
                      fontWeight: 600,
                    }}
                  >
                    {props.offer.price} €
                  </Form.Label>
                ) : (
                  <>
                    <Form.Control
                      style={{
                        width: '30%',
                        color: palette.gray,
                      }}
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      isInvalid={!!errors.Price}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Price}
                    </Form.Control.Feedback>
                  </>
                )}
              </Form.Group>
            </Row>
            <Row>
              <Form.Group
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  alignContent: 'center',
                  gap: '10%',
                  marginTop: '10px',
                }}
              >
                <Form.Label
                  style={{
                    width: props.offer ? '60px' : '110px',
                  }}
                >
                  Quantity {props.offer ? '' : '(pcs)'}
                </Form.Label>
                {props.offer ? (
                  <Form.Label
                    style={{
                      color: palette.gray,
                      font: 'bold',
                      fontWeight: 600,
                    }}
                  >
                    {props.offer.quantity} pcs
                  </Form.Label>
                ) : (
                  <>
                    <Form.Control
                      style={{
                        width: '30%',
                        color: palette.gray,
                      }}
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                      isInvalid={!!errors.Quantity}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.Quantity}
                    </Form.Control.Feedback>
                  </>
                )}
              </Form.Group>
            </Row>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="text-white"
          onClick={handleSubmit}
          style={{
            background: palette.green,
            borderColor: palette.green,
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { OfferModal };
