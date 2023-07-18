import { FC, useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { PopulatedAdvert } from '../../api/collections/advert';
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

  const [error, setError] = useState<boolean>(false);
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setError(false);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    setDescription(value);
    setError(false);
  };

  const { user } = useContext(LoginContext);
  const handleSubmit = async () => {
    if (!rating || !description) {
      setError(true);
    } else {
      try {
        if (props.advert) {
          await createReview({
            description: description,
            rating: rating,
            reviewer: user!._id,
            reviewee: props.advert.store,
            reviewedAdvert: props.advert,
            createdAt: new Date(),
          } as Review);
        }
        if (props.onClose) {
          props.onClose();
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Modal show={props.isShowing} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Write your review</Modal.Title>
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
            {Ratings(rating, 'red', handleRatingChange)}
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
              isInvalid={error}
            />
            <Form.Control.Feedback
              style={{
                margin: '5px',
              }}
              type="invalid"
            >
              {error && 'Review incomplete'}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="text-white"
          onClick={handleSubmit}
          style={{
            background: palette.subSectionsBgAccent,
            borderColor: palette.subSectionsBgAccent,
          }}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { EditReviewModal };
