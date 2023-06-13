import { ChangeEvent, FC, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { palette } from '../../utils/colors';
import { BodyText } from '../Text/BodyText';
import {
  checkCVV,
  checkPaymentExpirationDate,
  chekCreditCardNumber,
  autocompleteCardNumber,
  autocompleteExpirationDate,
} from '../../utils/functions';

interface PaymentModalProps {
  isShowing: boolean;
  onClose: () => void;
  name: string | undefined;
  onChangeName: (name: string) => void;
  number: string | undefined;
  onChangeNumber: (number: string) => void;
  expDate: string | undefined;
  onChangeDate: (date: string) => void;
  cvv: string | undefined;
  onChangeCVV: (cvv: string) => void;
}

enum ErrorType {
  CARD_NUMBER = 'Credit Card number invalid',
  CVV = 'CVV invalid',
  EXP_DATE = 'Expiration Date Invalid',
  INCOMPLETE = 'Missing Information',
}

/**
 * This component represents the modal where the user can insert his payment method.
 */
export const PaymentModal: FC<PaymentModalProps> = (props) => {
  const {
    isShowing,
    onClose,
    name,
    number,
    expDate,
    cvv,
    onChangeCVV,
    onChangeDate,
    onChangeName,
    onChangeNumber,
  } = props;

  const [error, setError] = useState<ErrorType | undefined>(undefined);

  const checkPaymentDetails = () => {
    if (name && number && expDate && cvv) {
      if (!chekCreditCardNumber(number)) {
        setError(ErrorType.CARD_NUMBER);
        return;
      }
      if (!checkCVV(cvv)) {
        setError(ErrorType.CVV);
        return;
      }
      if (!checkPaymentExpirationDate(expDate)) {
        setError(ErrorType.EXP_DATE);
        return;
      }
      setError(undefined);
      onClose();
    } else {
      setError(ErrorType.INCOMPLETE);
    }
  };

  return (
    <Modal
      show={isShowing}
      onHide={() => {
        onChangeNumber('');
        onChangeDate('');
        onChangeName('');
        onChangeCVV('');
        onClose();
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Payment Method</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="nameCard">
            <Form.Label>Name on card</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Name Surname"
              autoFocus
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                onChangeName(e.target.value)
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="numberCard">
            <Form.Label>Card number</Form.Label>
            <Form.Control
              type="text"
              value={number ?? ''}
              placeholder="1111 2222 3333 4444"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                onChangeNumber(autocompleteCardNumber(e) ?? '');
              }}
              maxLength={19} // to limit the credit card number
            />
          </Form.Group>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-2" controlId="expirationCard">
                <Form.Label className="font-link">Expiration</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="01/24"
                  maxLength={5}
                  value={expDate ?? ''}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    onChangeDate(autocompleteExpirationDate(e) ?? '');
                  }}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-2" controlId="CVV">
                <Form.Label className="font-link">CVV</Form.Label>
                <Form.Control
                  type="text"
                  value={cvv}
                  placeholder="012"
                  maxLength={3}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onChangeCVV(e.target.value)
                  }
                />
              </Form.Group>
            </div>
          </div>
        </Form>
        {error ? (
          <BodyText style={{ color: 'red' }}>{error}</BodyText>
        ) : undefined}
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{
            backgroundColor: palette.subSectionsBgAccent,
            border: 'none',
          }}
          onClick={() => checkPaymentDetails()}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
