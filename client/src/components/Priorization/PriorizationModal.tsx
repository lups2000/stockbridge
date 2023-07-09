import { FC } from 'react';
import { Modal } from 'react-bootstrap';
import { BodyText } from '../Text/BodyText';

type PriorizationModalProps = {
  isShowing: boolean;
  onClose: (rerender: boolean) => void;
};
const PriorizationModal: FC<PriorizationModalProps> = (props) => {
  return (
    <Modal show={props.isShowing}>
      <BodyText style={{}}>Coming soon ...</BodyText>
    </Modal>
  );
};

export { PriorizationModal };
