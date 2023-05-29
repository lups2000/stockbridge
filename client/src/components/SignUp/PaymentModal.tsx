import { FC } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { palette } from "../../utils/colors";

interface PaymentModalProps {
  isShowing: boolean;
  onClose: () => void;
}

export const PaymentModal: FC<PaymentModalProps> = (props) => {
  return (
    <Modal show={props.isShowing} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Payment Method</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="nameCard">
            <Form.Label>Name on card</Form.Label>
            <Form.Control type="text" placeholder="Name Surname" autoFocus />
          </Form.Group>
          <Form.Group className="mb-3" controlId="numberCard">
            <Form.Label>Card number</Form.Label>
            <Form.Control type="text" placeholder="1111-2222-3333-4444" />
          </Form.Group>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-2" controlId="expirationCard">
                <Form.Label className="font-link">Expiration</Form.Label>
                <Form.Control type="text" placeholder="2023" />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-2" controlId="CVV">
                <Form.Label className="font-link">CVV</Form.Label>
                <Form.Control type="text" placeholder="012" />
              </Form.Group>
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Close
        </Button>
        <Button style={{backgroundColor: palette.subSectionsBgAccent, border: "none"}} onClick={props.onClose}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
