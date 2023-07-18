import { FC, useContext, useState } from 'react';
import { Button, Col, Form, Modal, Row, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { PopulatedAdvert } from '../../api/collections/advert';
import {
  createOffer,
  Offer,
  OfferStatus,
  PopulatedOffer,
  updateOffer,
} from '../../api/collections/offer';
import { LoginContext } from '../../contexts/LoginContext';
import { Ratings } from '../Ratings';
import { ResponseModal, ResponseType } from './ResponseModal';
import { FadeLoader } from 'react-spinners';
import { palette } from '../../utils/colors';
import _ from 'lodash';
type OfferContentProps = {
  isShowing: boolean;
  onClose: () => void;
  onSave: () => void;
  offer?: Offer | PopulatedOffer;
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
    case OfferStatus.CANCELED_OUT_OF_STOCK:
      return '#ffc071';
    case OfferStatus.CANCELED_USER:
      return '#ffc071';
    default:
      return '#4285F4';
  }
}
const OfferModal: FC<OfferContentProps> = (props) => {
  const { user } = useContext(LoginContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    quantity: props.offer?.quantity ? props.offer?.quantity : 0,
    price: props.offer?.price ? props.offer?.price : 0,
    createdAt: new Date(),
  } as Offer);

  const offeree = user?._id === (props.offer as PopulatedOffer).offeree?._id;
  const handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [errors, setErrors] = useState(
    {} as {
      price: string | undefined;
      quantity: string | undefined;
    },
  );
  const isValid = () => { 
    return (
      formData.price &&
      formData.price >= 0 &&
      formData.quantity &&
      formData.quantity <= props.advert?.quantity! &&
      formData.quantity > 0
    );
  };
  const [creationError, setCreationError] = useState(false);
  const [acceptanceError, setAcceptanceError] = useState(false);
  const [rejectionError, setRejectionError] = useState(false);
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [showAcceptanceModal, setShowAcceptanceModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [OutOfStockError, setOutOfStockError] = useState(false);
  const [showOutOfStockModal, setShowOutOfStockModal] = useState(false);
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const closeModal = (responseType: ResponseType) => {
    if (responseType === ResponseType.SUCCESSFUL_OFFER_ACCEPTANCE) {
      setShowAcceptanceModal(false);
      window.location.reload();
    } else {
      if (responseType === ResponseType.SUCCESSFUL_OFFER_CREATION) {
        setShowCreationModal(false);
        window.location.reload();
      } else {
        if (responseType === ResponseType.SUCCESSFUL_OFFER_REJECTION) {
          setShowRejectionModal(false);
          window.location.reload();
        } else {
          if (responseType === ResponseType.UNSUCCESSFUL_OFFER_REJECTION) {
            setShowRejectionModal(false);
            window.location.reload();
          } else {
            if (responseType === ResponseType.UNSUCCESSFUL_OFFER_ACCEPTANCE) {
              setShowAcceptanceModal(false);
              window.location.reload();
            } else {
              if (responseType === ResponseType.UNSUCCESSFUL_OFFER_CREATION) {
                setShowCreationModal(false);
              } else {
                if (responseType === ResponseType.OUT_OF_STOCK) {
                  setShowOutOfStockModal(false);
                  window.location.reload();
                }
              }
            }
          }
        }
      }
    }
  };

  const handleSubmit = async () => {
    if (isValid()) {
      setIsLoading(true)
      await createOffer({
        quantity: formData.quantity,
        price: formData.price,
        createdAt: new Date(),
        status: OfferStatus.OPEN,
        offeror: user,
        offeree: props.advert?.store,
        advert: props.advert?._id,
      } as Offer)
        .then((newOffer) => {
          props.onClose()
          if (newOffer) {
            setIsLoading(false);
            setShowCreationModal(true);
            if (newOffer.status === OfferStatus.CANCELED_OUT_OF_STOCK) {
              setOutOfStockError(true);
              setShowOutOfStockModal(true);
              setAcceptanceError(false);
              setCreationError(false);
              setRejectionError(false);
            }
          } else {
            setCreationError(true);
            setShowCreationModal(true);
            setAcceptanceError(false);
            setOutOfStockError(false);
            setRejectionError(false);
          }
        })
        .catch((error) => {
          setCreationError(true);
          setShowCreationModal(true);
        });
    } else {
      setErrors({
        price: formData.price
          ? formData.price > 0
            ? undefined
            : 'Price must be greater than 0'
          : 'Price is missing',
        quantity: formData.quantity
          ? formData.quantity > 0
            ? (                
                  formData.quantity <= props.advert?.quantity!
              )
              ? undefined
              : 'Quantity must be less or equal to available Quantity'
            : 'Quantity must be greater than 0'
          : 'Quantity is missing',
      });
    }
  };

  const handleReject = async () => {
    setIsLoading(true);
    try {
      if (props.offer?._id) {
        updateOffer(props.offer._id, {
          status: OfferStatus.REJECTED,
        });
      }
      setIsLoading(false);
      setShowRejectionModal(true);
    } catch (error) {
      setRejectionError(true);
    }
  };

  const handleConsentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsConsentChecked(event.target.checked);
    };
  const handleAccept = async () => {
    setIsLoading(true);
    try {
      if (props.offer?._id) {
        updateOffer(props.offer._id, {
          status: OfferStatus.ACCEPTED,
        });
      }
      setIsLoading(false);
      setShowAcceptanceModal(true);
    } catch (error) {
      setAcceptanceError(true);
    }
  };

  const status = props.offer ? props.offer.status : OfferStatus.OPEN;
  return isLoading ? (
    <FadeLoader
      color={palette.subSectionsBgAccent}
      style={{
        position: 'absolute',
        left: '45%',
        right: '45%',
        top: '45%',
        bottom: '45%',
      }}
    />
  ) : (
    <>
      {showCreationModal ? (
        <ResponseModal
          isShowing={showCreationModal}
          responseType={
            creationError
              ? ResponseType.UNSUCCESSFUL_OFFER_CREATION
              : ResponseType.SUCCESSFUL_OFFER_CREATION
          }
          onClose={closeModal}
        />
      ) : showAcceptanceModal ? (
        <ResponseModal
          isShowing={showAcceptanceModal}
          responseType={
            acceptanceError
              ? ResponseType.UNSUCCESSFUL_OFFER_ACCEPTANCE
              : ResponseType.SUCCESSFUL_OFFER_ACCEPTANCE
          }
          onClose={closeModal}
        />
      ) : showRejectionModal ? (
        <ResponseModal
          isShowing={showRejectionModal}
          responseType={
            rejectionError
              ? ResponseType.UNSUCCESSFUL_OFFER_REJECTION
              : ResponseType.SUCCESSFUL_OFFER_REJECTION
          }
          onClose={closeModal}
        />
      ) : showOutOfStockModal ? (
        <ResponseModal
          isShowing={showOutOfStockModal}
          responseType={
            OutOfStockError
              ? ResponseType.OUT_OF_STOCK
              : ResponseType.SUCCESSFUL_OFFER_CREATION
          }
          onClose={closeModal}
        />
      ) : (
        <Modal
          show={props.isShowing}
          onHide={() => props.onClose()}
          centered
          size="lg"
        >
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
                    ? props.offer.createdAt?.toString().slice(0, 10)
                    : new Date().toString().slice(0, 10)}
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
                  <Form.Label
                    style={{
                      fontSize: '24px',
                      fontWeight: 400,
                    }}
                  >
                    {props.advert?.productname}
                  </Form.Label>
                </Row>
                {props.advert?.color && (
                  <Row
                    style={{
                      marginTop: '10px',
                    }}
                  >
                    <Form.Label>Color: {props.advert?.color.name}</Form.Label>
                  </Row>
                )}
                {props.advert?.purchaseDate && (
                  <Row
                    style={{
                      marginTop: '10px',
                    }}
                  >
                    <Form.Label>
                      Purchase Date:
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
                      Expiration Date:
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
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10%',
                        }}
                      >
                        <Form.Control
                          style={{
                            width: '60%',
                            color: palette.gray,
                          }}
                          type="number"
                          name="price"
                          value={formData.price}
                          min={0}
                          onChange={handleChange}
                          required
                          isInvalid={!!errors.price}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.price}
                        </Form.Control.Feedback>
                      </div>
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
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10%',
                        }}
                      >
                        <Form.Control
                          style={{
                            width: '60%',
                            color: palette.gray,
                          }}
                          type="number"
                          name="quantity"
                          min={1}
                          value={formData.quantity}
                          onChange={handleChange}
                          required
                          isInvalid={!_.isNil(errors.quantity)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.quantity}
                        </Form.Control.Feedback>
                      </div>
                    )}
                  </Form.Group>
                </Row>
              </Col>
            </Row>
          </Modal.Body>
          {(!props.offer ||
            !['Rejected', 'Canceled', 'Canceled - Out of Stock'].includes(
              props.offer.status!,
            )) && (
            <Modal.Footer
              style={{
                justifyContent: offeree ? 'center' : 'space-between'
              }}
            >
              {offeree && props.offer?.status === 'Open' && (
                <Button
                  className="text-white"
                  onClick={handleReject}
                  style={{
                    background: palette.subSectionsBgAccent,
                    borderColor: palette.subSectionsBgAccent,
                  }}
                >
                  Reject
                </Button>
              )}
              {offeree && props.offer?.status === 'Open' && (
                <Button
                  className="text-white"
                  onClick={handleAccept}
                  style={{
                    background: palette.green,
                    borderColor: palette.green,
                  }}
                >
                  Accept
                </Button>
              )}
              {!props.offer && (
                <>
                  <div>
                    <input type="checkbox" id="consent-checkbox" checked={isConsentChecked}
                      onChange={handleConsentChange} style={{marginRight: '5px'}}/>
                    <label htmlFor="consent-checkbox">
                      I agree to the terms and conditions
                    </label>
                  </div>
                  <Button
                    className="text-white"
                    onClick={handleSubmit}
                    disabled={!isConsentChecked}
                    style={{
                      background: palette.green,
                      borderColor: palette.green,
                    }}
                  >
                    Confirm
                  </Button>
                </>
              )}
              {offeree && props.offer?.status === 'Accepted' && (
                <Button
                  className="text-white"
                  onClick={() => navigate('/userInfo')}
                  style={{
                    background: palette.green,
                    borderColor: palette.green,
                  }}
                >
                  See Order
                </Button>
              )}
            </Modal.Footer>
          )}
        </Modal>
      )}
    </>
  );
};
export { OfferModal };
