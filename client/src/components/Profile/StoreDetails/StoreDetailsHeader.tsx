import React, { ChangeEvent, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Image,
  Form,
  Modal,
  Button,
} from 'react-bootstrap';
import { Title } from '../../Text/Title';
import { BodyText } from '../../Text/BodyText';
import { StoreDetailsProps } from './StoreDetailsForm';
import defaultUserImage from '../../../assets/defaultUser.png';

const StoreDetailsHeader: React.FC<StoreDetailsProps> = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleImageClick = () => {
    setShowModal(true);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    // Handle file upload logic here
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        props.image.setValue(reader.result as string);
      };
    }
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  };

  const formattedJoinDate: string = props.joined.toLocaleDateString(
    undefined,
    options,
  );

  return (
    <Container className="p-2 m-2" fluid>
      <Row className="align-items-center">
        <Col xs={4}>
          <Image
            src={props.image.value}
            alt="Store Image"
            onError={(e: React.SyntheticEvent<HTMLImageElement>) =>
              (e.currentTarget.src = defaultUserImage)
            }
            roundedCircle
            className={'p-2'}
            style={{
              width: '75%',
              height: undefined,
              objectFit: 'cover',
              aspectRatio: '1/1',
              cursor: 'pointer',
            }}
            onClick={handleImageClick}
            fluid
          />
        </Col>
        <Col xs={8}>
          <Title style={{}}>
            <Form.Control
              type="text"
              value={props.name.value}
              onChange={props.name.onChange}
              className="mb-2"
              style={{
                border: 'none',
                boxShadow: 'none',
                background: 'none',
                padding: 0,
                margin: 0,
                fontWeight: 'normal',
                fontSize: 'inherit',
                outline: 'none',
              }}
            />
          </Title>
          <BodyText style={{}}>{`Joined on ${formattedJoinDate}`}</BodyText>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpload}
            disabled={!selectedFile}
          >
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default StoreDetailsHeader;
