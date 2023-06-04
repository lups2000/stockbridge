import { ChangeEvent, FC, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { palette } from "../../utils/colors";
import { BodyText } from "../Text/BodyText";
import {
  chekCreditCardNumber,
  spaceBetweenDigits,
} from "../../utils/functions";

interface PaymentModalProps {
  isShowing: boolean;
  onClose: () => void;
  name: string | undefined;
  onChangeName: (name: string) => void;
  number: string | undefined;
  onChangeNumber: (number: string) => void;
  expDate: Date | undefined;
  onChangeDate: (date: Date) => void;
  cvv: string | undefined;
  onChangeCVV: (cvv: string) => void;
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

  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const checkPaymentDetails = () => {
    if (name && number && expDate && cvv) {
      
    } else {
      setError(true);
      setErrorMessage("Missing Information");
    }
  };

  useEffect(() => console.log(number), [number]);

  return (
    <Modal show={isShowing} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Payment Method</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="nameCard">
            <Form.Label>Name on card</Form.Label>
            <Form.Control
              type="text"
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
              value={number}
              placeholder="1111 2222 3333 4444"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                onChangeNumber(spaceBetweenDigits(e) ?? "");
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
                  placeholder="2023"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onChangeDate(new Date(e.target.value))
                  }
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-2" controlId="CVV">
                <Form.Label className="font-link">CVV</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="012"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onChangeCVV(e.target.value)
                  }
                />
              </Form.Group>
            </div>
          </div>
        </Form>
        {error ? (
          <BodyText style={{ color: "red" }} message={errorMessage}></BodyText>
        ) : undefined}
      </Modal.Body>
      <Modal.Footer>
        <Button
          style={{
            backgroundColor: palette.subSectionsBgAccent,
            border: "none",
          }}
          onClick={() => checkPaymentDetails()}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
