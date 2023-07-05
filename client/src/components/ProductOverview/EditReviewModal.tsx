import React, { FC, useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import {
  Advert,
  PopulatedAdvert,
  updateAdvert,
} from '../../api/collections/advert';
import { Review, createReview } from '../../api/collections/review';
import { LoginContext } from '../../contexts/LoginContext';
import { palette } from '../../utils/colors';
import { Ratings } from '../Ratings';

type EditReviewContentProps = {
  isShowing: boolean;
  onClose: () => void;
  advert?: PopulatedAdvert;
};

const EditReviewModal: FC<EditReviewContentProps> = (props) => {
  const [description, setDescription] = useState('');

  const [errors, setErrors] = useState({
    description: false,
    rating: false,
  });
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  const handleDescriptionChange = (event: any) => {
    event.preventDefault();
    const { _, value } = event.target;
    setDescription(value);
  };

  // todo: check file format (only picture formats allowed)
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      const file = event.target.files[0];
      if (file != undefined) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {};
      }
    }
  };

  const validationErrors = {
    description: false,
    rating: false,
  };
  const { user, loggedIn } = useContext(LoginContext);
  const handleSubmit = async () => {
    if (!description) {
      validationErrors.description = true;
    }
    if (!rating) {
      validationErrors.rating = true;
    }
    if (Object.values(validationErrors).some((e) => e)) {
      console.log('Errors are happening');
      setErrors(validationErrors);
    } else {
      try {
        if (props.advert) {
          const createdReview = await createReview({
            description: description,
            rating: rating,
            reviewer: user,
            reviewedAdvert: props.advert,
            createdAt: new Date(),
          } as Review);
          // Don't mind thins line please it will be removed at my next PR
          await updateAdvert(props.advert._id!, {
            reviews: [createdReview._id],
          });
        }
        setErrors({
          description: false,
          rating: false,
        });
        if (props.onClose) props?.onClose();
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <Modal show={props.isShowing} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>New Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'auto',
              gap: '70%',
            }}
          >
            <Form.Label
              style={{
                color: palette.gray,
              }}
            >
              Review
            </Form.Label>
            {Ratings(rating, handleRatingChange)}
          </Form.Group>
          <Form.Group>
            <Form.Control
              style={{
                padding: '10px',
                color: palette.gray,
                margin: '5px',
                overflow: 'hidden',
              }}
              as="textarea"
              rows={3}
              name="description"
              value={description}
              onChange={handleDescriptionChange}
            ></Form.Control>
          </Form.Group>
        </Form>
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
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { EditReviewModal };