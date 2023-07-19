import { FC, useContext, useState } from 'react';
import { Button, Col, Form, Modal, Row, Image } from 'react-bootstrap';
import { AdvertType, PopulatedAdvert } from '../../api/collections/advert';
import {
  acceptOffer,
  cancelOffer,
  createOffer,
  Offer,
  OfferStatus,
  PopulatedOffer,
  rejectOffer,
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
  const [formData, setFormData] = useState({
    quantity: props.offer?.quantity ? props.offer?.quantity : 0,
    price: props.offer?.price ? props.offer?.price : 0,
    createdAt: new Date(),
  } as Offer);
  const offeree =
    props.offer?.offeree &&
    user?._id === (props.offer as PopulatedOffer).offeree?._id;
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
  const [cancelationError, setCancelationError] = useState(false);
  const [showCreationModal, setShowCreationModal] = useState(false);
  const [showAcceptanceModal, setShowAcceptanceModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showCancelationModal, setShowCancelationModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [OutOfStockError, setOutOfStockError] = useState(false);
  const [showOutOfStockModal, setShowOutOfStockModal] = useState(false);
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const closeModal = (responseType: ResponseType) => {
    props.onClose();
    switch (responseType) {
      case ResponseType.SUCCESSFUL_OFFER_ACCEPTANCE:
        setShowAcceptanceModal(false);
        window.location.reload();
        break;
      case ResponseType.SUCCESSFUL_OFFER_CREATION:
        setShowCreationModal(false);
        window.location.reload();
        break;
      case ResponseType.SUCCESSFUL_OFFER_REJECTION:
        setShowRejectionModal(false);
        window.location.reload();
        break;
      case ResponseType.UNSUCCESSFUL_OFFER_REJECTION:
        setShowRejectionModal(false);
        window.location.reload();
        break;
      case ResponseType.UNSUCCESSFUL_OFFER_ACCEPTANCE:
        setShowAcceptanceModal(false);
        window.location.reload();
        break;
      case ResponseType.UNSUCCESSFUL_OFFER_CREATION:
        setShowCreationModal(false);
        break;
      case ResponseType.OUT_OF_STOCK:
        setShowOutOfStockModal(false);
        window.location.reload();
        break;
      case ResponseType.OUT_OF_ADVERTS:
        setShowCreationModal(false);
        break;
      case ResponseType.SUCCESSFUL_CANCEL:
        setShowCancelationModal(false);
        window.location.reload();
        break;
      case ResponseType.UNSUCCESSFUL_CANCEL:
        setShowCancelationModal(false);
        break;
      default:
        console.log('Invalid response type!');
    }
  };

  const handleSubmit = async () => {
    if (isValid()) {
      setIsLoading(true);
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
          props.onClose();
          if (newOffer) {
            setIsLoading(false);
            setShowCreationModal(true);
            if (newOffer.status === OfferStatus.CANCELED_OUT_OF_STOCK) {
              setOutOfStockError(true);
              setShowOutOfStockModal(true);
              setShowCreationModal(false);
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
            ? formData.quantity <= props.advert?.quantity!
              ? undefined
              : 'Quantity must be less or equal to available Quantity'
            : 'Quantity must be greater than 0'
          : 'Quantity is missing',
      });
    }
  };

  const handleReject = async () => {
    try {
      if (props.offer?._id) {
        await rejectOffer(props.offer as PopulatedOffer, user?._id!);
      }
      setShowRejectionModal(true);
    } catch (error) {
      setRejectionError(true);
    }
  };

  const handleConsentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsConsentChecked(event.target.checked);
  };
  const handleAccept = async () => {
    try {
      if (props.offer?._id) {
        await acceptOffer(props.offer as PopulatedOffer, user?._id!);
      }
      setShowAcceptanceModal(true);
    } catch (error) {
      setAcceptanceError(true);
    }
  };

  const handleCancel = async () => {
    try {
      if (props.offer?._id) {
        setIsLoading(true);
        await cancelOffer(props.offer as PopulatedOffer, user?._id!);
      }
      setShowCancelationModal(true);
      setIsLoading(false);
    } catch (error) {
      setCancelationError(true);
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
          buying={props.advert?.type === AdvertType.Sell}
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
      ) : showCancelationModal ? (
        <ResponseModal
          isShowing={showCancelationModal}
          responseType={
            cancelationError
              ? ResponseType.UNSUCCESSFUL_CANCEL
              : ResponseType.SUCCESSFUL_CANCEL
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
                height: '70%'
              }}
            >
                <Col style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  bottom: '1em'
                }}>
                <Form.Label
                    style={{
                      fontSize: '24px',
                      fontWeight: 400,
                      marginBottom: '1em'
                    }}
                  >
                    {props.advert?.productname}
                  </Form.Label>
                  <Image
                    style={{
                      width: '10em',
                      height: '10em',
                      borderRadius: 60,
                    }}
                    src={props.advert?.imageurl}
                  />
                </Col>

              {
                props.offer &&
              <Col
                style={{
                  marginLeft: props.advert?.imageurl ? '' : '100px',
                }}
              >
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
                        {props.advert?.price} €
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
                        {props.advert?.quantity} pcs
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
              }
              <Col style={{
                position: 'relative',
                bottom: '1.7em'
              }}>
                <Row>
                  <Form.Label>
                    {props.advert?.type === 'Sell' ? 'Buyer' : 'Seller'}:{' '}
                    {props.storeName}
                    {Ratings(props.rating ? props.rating : 0, 'red')}
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
                        width: props.offer ? '130px' : '110px',
                      }}
                    >
                     Offered Price {props.offer ? '' : '(€)'}
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
                        width: props.offer ? '130px' : '110px',
                      }}
                    >
                     Offered Quantity {props.offer ? '' : '(pcs)'}
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
          {(!props.offer || OfferStatus.OPEN === props.offer.status) && (
            <Modal.Footer
              style={{
                justifyContent: offeree
                  ? 'center'
                  : props.offer
                  ? 'center'
                  : 'space-between',
              }}
            >
              {offeree && props.offer?.status === OfferStatus.OPEN && (
                <Button
                  className="text-white"
                  onClick={handleReject}
                  style={{
                    background: palette.rejectedOffer,
                    borderColor: palette.rejectedOffer,
                  }}
                >
                  Reject
                </Button>
              )}
              {offeree && props.offer?.status === OfferStatus.OPEN && (
                <Button
                  className="text-white"
                  onClick={handleAccept}
                  style={{
                    background: palette.acceptedOffer,
                    borderColor: palette.acceptedOffer,
                  }}
                >
                  Accept
                </Button>
              )}
              {!offeree && props.offer?.status === OfferStatus.OPEN && (
                <Button
                  className="text-white"
                  onClick={handleCancel}
                  style={{
                    background: palette.canceledOffer,
                    borderColor: palette.canceledOffer,
                  }}
                >
                  Cancel
                </Button>
              )}
              {!props.offer && (
                <>
                  <div>
                    <input
                      type="checkbox"
                      id="consent-checkbox"
                      checked={isConsentChecked}
                      onChange={handleConsentChange}
                      style={{ marginRight: '5px' }}
                    />
                    <label htmlFor="consent-checkbox">
                      I agree to the terms and conditions
                    </label>
                  </div>
                  <Button
                    className="text-white"
                    onClick={handleSubmit}
                    disabled={!isConsentChecked}
                    style={{
                      background: palette.acceptedOffer,
                      borderColor: palette.acceptedOffer,
                    }}
                  >
                    Confirm
                  </Button>
                </>
              )}
            </Modal.Footer>
          )}
        </Modal>
      )}
    </>
  );
};
export { OfferModal };
