import React, { FC, useState } from 'react';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import {
  Advert,
  updateAdvert,
  createAdvert,
  ProductCategory,
  Colors,
} from '../../api/collections/advert';
import { palette } from '../../utils/colors';
import { Img } from '../Img';

type EditAdvertContentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    isShowing: boolean;
    onClose: () => void;
    advert?: Advert;
    userID: string;
    advertID?: string;
  }>;

const EditAdvertModal: FC<EditAdvertContentProps> = (props) => {
  const [isChecked, setIsChecked] = useState(
    props.advert?.type ? props.advert?.type : '',
  );

  const handleType = (event: any) => {
    setIsChecked(event.target.value);
  };
  const purchaseDate = props.advert?.purchaseDate
    ? props.advert.purchaseDate.toString().substring(0, 10)
    : '';
  const expirationDate = props.advert?.expirationDate
    ? props.advert.expirationDate.toString().substring(0, 10)
    : '';
  const [encodedImage, setEncodedImage] = useState(
    props.advert?.imageurl ? props.advert?.imageurl : '',
  );
  console.log('Constructing Form for advert: ', props.advert);
  const [formData, setFormData] = useState({
    productname: props.advert?.productname ? props.advert?.productname : '',
    description: props.advert?.description ? props.advert?.description : '',
    prioritized: props.advert?.prioritized ? props.advert?.prioritized : false,
    color: props.advert?.color ? props.advert?.color : '',
    purchaseDate: purchaseDate,
    expirationDate: expirationDate,
    quantity: props.advert?.quantity ? props.advert?.quantity : 0,
    price: props.advert?.price ? props.advert?.price : 0,
    category: props.advert?.category ? props.advert?.category : '',
    store: props.advert?.store ? props.advert?.store : props.userID,
  });

  const handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [errors, setErrors] = useState({
    productname: false,
    category: false,
    price: false,
    quantity: false,
    type: false,
  });

  // todo: check file format (only picture formats allowed)
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      const file = event.target.files[0];
      if (file != undefined) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (reader.result) {
            setEncodedImage(reader.result as string);
          }
        };
      }
    }
  };
  const validationErrors = {
    productname: false,
    category: false,
    price: false,
    quantity: false,
    type: false,
  };
  const handleSubmit = async () => {
    if (!formData.productname) {
      validationErrors.productname = true;
    }
    if (!formData.category) {
      validationErrors.category = true;
    }
    if (!formData.quantity) {
      validationErrors.quantity = true;
    }
    if (!formData.price) {
      validationErrors.price = true;
    }
    if (!isChecked) {
      validationErrors.type = true;
    }

    if (Object.values(validationErrors).some((e) => e)) {
      console.log('Errors are happening');
      setErrors(validationErrors);
    } else {
      try {
        if (props.advertID) {
          await updateAdvert(props.advertID, {
            productname: formData.productname,
            description: formData.description,
            //type: isChecked,
            prioritized: false,
            color: formData.color,
            expirationDate: new Date(formData.expirationDate),
            purchaseDate: new Date(formData.purchaseDate),
            quantity: formData.quantity,
            price: formData.price,
            category: formData.category,
            imageurl: encodedImage,
          } as Advert);
        } else {
          await createAdvert({
            productname: formData.productname,
            description: formData.description,
            prioritized: false,
            color: formData.color,
            expirationDate: new Date(formData.expirationDate),
            purchaseDate: new Date(formData.purchaseDate),
            quantity: formData.quantity,
            price: formData.price,
            advertStatus: 'Ongoing',
            category: formData.category,
            date: new Date(),
            store: formData.store,
            imageurl: encodedImage,
            type: isChecked,
          } as Advert);
        }
        setErrors({
          productname: false,
          category: false,
          price: false,
          quantity: false,
          type: false,
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
        <Modal.Title>Advert details:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    padding: '10px',
                    color: palette.gray,
                  }}
                >
                  Sell/ Ask:
                </Form.Label>
                <Form.Check
                  inline
                  required
                  type="radio"
                  name="type"
                  id="Sell"
                  label="Sell"
                  onChange={props.advert ? undefined : handleType}
                  value={'Sell'}
                  checked={isChecked === 'Sell'}
                />
                <Form.Check
                  inline
                  required
                  type="radio"
                  name="type"
                  id="Ask"
                  label="Ask"
                  onChange={props.advert ? undefined : handleType}
                  value={'Ask'}
                  checked={isChecked === 'Ask'}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                style={{
                  textAlign: 'center',
                }}
                controlId="FileUpload"
              >
                <div className="custom-file">
                  <Form.Control
                    type="file"
                    onChange={handleFileInput}
                    style={{
                      backgroundColor: 'transparent',
                      borderColor: 'black',
                      borderRadius: 15,
                      alignContent: 'start',
                      justifyContent: 'start',
                      marginBottom: '10px',
                    }}
                    id="customFile"
                  />
                </div>
                {encodedImage && (
                  <div className="flex-col items-end justify-end">
                    <Img
                      style={{
                        width: '160px',
                        height: '160px',
                        borderRadius: '60px',
                      }}
                      src={encodedImage}
                    />
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                  }}
                >
                  Product Name
                </Form.Label>
                <Form.Control
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                  }}
                  required
                  type="text"
                  placeholder="Product Name"
                  name="productname"
                  value={formData.productname}
                  onChange={handleChange}
                  isInvalid={!!errors.productname}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {errors.productname}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="category">
                <Form.Label
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                  }}
                >
                  Product Category
                </Form.Label>
                <Form.Select
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                  }}
                  required
                  placeholder="Product Category"
                  value={formData.category}
                  name="category"
                  onChange={handleChange}
                  isInvalid={!!errors.category}
                >
                  <option> -- Select Category -- </option>
                  {Object.values(ProductCategory)
                    .filter((key) => isNaN(Number(key)))
                    .map((c) => (
                      <option>{c}</option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                  }}
                >
                  Product Color
                </Form.Label>
                <Form.Select
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                  }}
                  placeholder="Product Category"
                  value={formData.color}
                  name="color"
                  onChange={handleChange}
                >
                  {Object.values(Colors)
                    .filter((key) => isNaN(Number(key)))
                    .map((c) => (
                      <option>{c}</option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label
                style={{
                  padding: '10px',
                  color: palette.gray,
                  margin: '5px',
                }}
              >
                Purchase Date
              </Form.Label>
              <Form.Control
                style={{
                  padding: '10px',
                  color: palette.gray,
                  margin: '5px',
                }}
                type="date"
                value={formData.purchaseDate}
                name="purchaseDate"
                onChange={handleChange}
              />
            </Col>
            <Col>
              <Form.Label
                style={{
                  padding: '10px',
                  color: palette.gray,
                  margin: '5px',
                }}
              >
                Expiration Date
              </Form.Label>
              <Form.Control
                style={{
                  padding: '10px',
                  color: palette.gray,
                  margin: '5px',
                }}
                type="date"
                value={formData.expirationDate}
                name="expirationDate"
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                  }}
                >
                  {' '}
                  Quantity (pcs)
                </Form.Label>
                <Form.Control
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                  }}
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  isInvalid={!!errors.quantity}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                  }}
                >
                  {' '}
                  Price (€)
                </Form.Label>
                <Form.Control
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                  }}
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  isInvalid={!!errors.price}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                  }}
                >
                  {' '}
                  Description
                </Form.Label>
                <Form.Control
                  style={{
                    padding: '10px',
                    color: palette.gray,
                    margin: '5px',
                  }}
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
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

export { EditAdvertModal };
