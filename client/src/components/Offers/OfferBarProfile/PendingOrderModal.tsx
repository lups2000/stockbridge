import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export interface PendingOrderModalProps {
  show: boolean;
  handleClose: () => void;
  body: string;
  isPayer: boolean;
  onPay?: () => void;
  onCancel?: () => void;
}
const PendingOrderModal = (props: PendingOrderModalProps) => {
  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Pending Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.isPayer
          ? 'You have a pending order. You can either pay or cancel the order'
          : 'Waiting for payment.'}
      </Modal.Body>
      <Modal.Footer>
        {props.isPayer ? (
          <>
            <Button variant="secondary" onClick={props.onCancel}>
              Cancel Order
            </Button>
            <Button variant="primary" onClick={props.onPay}>
              Pay
            </Button>
          </>
        ) : (
          <>
            <Button variant="primary" onClick={props.handleClose}>
              Close
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default PendingOrderModal;
