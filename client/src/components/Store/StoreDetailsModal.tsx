import _ from 'lodash';
import { FC, useEffect, useState } from 'react';
import { Col, Form, FormLabel, Modal, Row } from 'react-bootstrap';
import { getCategoriesByStore } from '../../api/collections/advert';
import {
  getReviewsByReviewee,
  PopulatedReview,
} from '../../api/collections/review';
import { getStore, PopulatedUser } from '../../api/collections/user';
import { Ratings } from '../Ratings';
import { BodyText } from '../Text/BodyText';

type StoreDetailsProps = {
  isShowing: boolean;
  onClose: () => void;
  store: string;
};
const StoreDetailsModal: FC<StoreDetailsProps> = (props) => {
  const [categories, setCategories] = useState(
    [] as { category: string; count: number }[],
  );
  const [reviews, setReviews] = useState([] as PopulatedReview[]);
  const [populatedStore, setStore] = useState({} as PopulatedUser);
  useEffect(() => {
    const fetchCategories = async () => {
      let fetchedCategories = await getCategoriesByStore(props.store);
      const counts = _.countBy(fetchedCategories);
      let categoriesToCount: { category: string; count: number }[] = [];
      Object.keys(counts).forEach((k) =>
        categoriesToCount.push({ category: k, count: counts[k] }),
      );
      categoriesToCount.sort((c1, c2) => c2.count - c1.count);
      setCategories(categoriesToCount);
    };
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await getReviewsByReviewee(props.store);
        setReviews(fetchedReviews);
      } catch (error) {
        console.log('an error happened');
      }
    };
    const fetchStore = async () => {
      setStore(await getStore(props.store));
    };

    if (props.store) fetchCategories();
    fetchStore();
    fetchReviews();
  }, [props.store]);
  return (
    <>
      {' '}
      {categories.length > 0 && (
        <Modal show={props.isShowing} onHide={props.onClose} centered size="lg">
          <Modal.Header
            style={{ borderTop: 'none', borderBottom: 'none' }}
            closeButton
          ></Modal.Header>
          <Modal.Body style={{ borderTop: 'none', borderBottom: 'none' }}>
            <Row>
              {' '}
              <FormLabel
                style={{
                  fontSize: '24px',
                  fontWeight: 500,
                }}
              >
                {populatedStore.name}
              </FormLabel>
              {Ratings(populatedStore.rating ?? 0, 'red')}
            </Row>
            <Row
              style={{
                marginTop: '30px',
              }}
            >
              <Col>
                {populatedStore.createdAt && (
                  <Form.Group
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '2px',
                      width: '100%',
                    }}
                  >
                    <FormLabel
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      Member since:
                    </FormLabel>
                    <FormLabel style={{ marginLeft: '2%' }}>
                      {' '}
                      {populatedStore.createdAt?.toString().slice(0, 10)}
                    </FormLabel>
                  </Form.Group>
                )}
                {populatedStore.phoneNumber && (
                  <Form.Group
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '2px',
                      width: '100%',
                    }}
                  >
                    <FormLabel
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      Phone Number:
                    </FormLabel>
                    <FormLabel style={{ marginLeft: '2%' }}>
                      {' '}
                      {populatedStore.phoneNumber}
                    </FormLabel>
                  </Form.Group>
                )}
                {populatedStore.email && (
                  <Form.Group
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '2px',
                      width: '100%',
                    }}
                  >
                    <FormLabel
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      Email:
                    </FormLabel>
                    <FormLabel style={{ marginLeft: '2%' }}>
                      {' '}
                      {populatedStore.email}
                    </FormLabel>
                  </Form.Group>
                )}
                {categories && (
                  <Form.Group
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '2px',
                      width: '100%',
                    }}
                  >
                    {' '}
                    <FormLabel
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      Main Product Category:{' '}
                    </FormLabel>
                    <FormLabel style={{ marginLeft: '2%' }}>
                      {categories[0].category}
                    </FormLabel>
                  </Form.Group>
                )}
              </Col>
              <Col>
                <Form.Group
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <FormLabel
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    Address:
                  </FormLabel>
                  <FormLabel>
                    {populatedStore.address && populatedStore.address.street}{' '}
                    {populatedStore.address &&
                      populatedStore.address.houseNumber}
                  </FormLabel>
                  <FormLabel>
                    {populatedStore.address &&
                      populatedStore.address.postalCode}
                    , {populatedStore.address && populatedStore.address.city}
                  </FormLabel>
                  <FormLabel>
                    {populatedStore.address && populatedStore.address.country}
                  </FormLabel>
                </Form.Group>
              </Col>
            </Row>
            {reviews && reviews.length > 0 && (
              <div
                style={{
                  overflowX: 'auto',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: 25,
                    marginTop: 50,
                    height: '150px',
                  }}
                >
                  {reviews.map((r, i) => (
                    <div
                      style={{
                        borderRadius: 8,
                        border: '1px solid #ccc',

                        height: '100%',
                        borderColor: 'gray',
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'box-shadow 0.3s ease',
                        boxShadow: '0 0 0 rgba(0, 0, 0, 0.2)',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.boxShadow =
                          '0 0 8px rgba(0, 0, 0, 0.3)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.boxShadow =
                          '0 0 0 rgba(0, 0, 0, 0.2)';
                      }}
                    >
                      <span
                        style={{
                          marginTop: 20,
                          paddingLeft: 10,
                          paddingRight: 10,
                          display: 'flex',
                          flexDirection: 'row',
                          width: '100%',
                        }}
                      >
                        <BodyText
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            textAlign: 'start',
                            width: '50%',
                          }}
                        >
                          {r.reviewer.name}
                        </BodyText>
                        <BodyText
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            textAlign: 'end',
                            width: '50%',
                          }}
                        >
                          {r.createdAt.toString().slice(0, 10)}
                          {Ratings(r.rating ?? 0, 'red')}
                        </BodyText>
                      </span>
                      <BodyText
                        style={{
                          fontSize: 12,
                          textAlign: 'start',
                          color: 'GrayText',
                          paddingLeft: 10,
                          paddingRight: 10,
                          width: 200,
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 3,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'break-spaces',
                        }}
                      >
                        {r.description}
                      </BodyText>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export { StoreDetailsModal };
