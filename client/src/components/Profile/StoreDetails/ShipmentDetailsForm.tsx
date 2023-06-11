import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { Title } from '../../Text/Title';
import { ShipmentDetailsFormProps } from './StoreDetailsForm';

const ShipmentDetailsForm = (props: ShipmentDetailsFormProps) => {
  return (
    <>
      <Title style={{}}>
        <h2>Shipment Details</h2>
      </Title>
      {/*<Form onSubmit={handleSubmit} className={"m-2"}>*/}
      <Row className={'mb-2'}>
        <Col>
          <Form.Floating>
            <Form.Control
              type="text"
              id="streetName"
              placeholder="Street Name"
              value={props.streetName.value}
              onChange={props.streetName.onChange}
            />
            <label htmlFor="streetName">Street Name</label>
          </Form.Floating>
        </Col>
        <Col>
          <Form.Floating>
            <Form.Control
              type="text"
              id="houseNumber"
              placeholder="House Number"
              value={props.houseNumber.value}
              onChange={props.houseNumber.onChange}
            />
            <label htmlFor="houseNumber">House Number</label>
          </Form.Floating>
        </Col>
      </Row>
      <Row className={'mb-2'}>
        <Col>
          <Form.Floating>
            <Form.Control
              type="text"
              id="city"
              placeholder="City"
              value={props.city.value}
              onChange={props.city.onChange}
            />
            <label htmlFor="city">City</label>
          </Form.Floating>
        </Col>
        <Col>
          <Form.Floating>
            <Form.Control
              type="text"
              id="postalCode"
              placeholder="Postal Code"
              value={props.postalCode.value}
              onChange={props.postalCode.onChange}
            />
            <label htmlFor="postalCode">Postal Code</label>
          </Form.Floating>
        </Col>
        <Col>
          <Form.Floating>
            <Form.Control
              type="text"
              id="country"
              placeholder="Country"
              value={props.country.value}
              onChange={props.country.onChange}
            />
            <label htmlFor="country">Country</label>
          </Form.Floating>
        </Col>
      </Row>
      {/*<Row className={'mb-2 justify-content-end '}>*/}
      {/*    <Col xs={1} >*/}
      {/*    <Button type="submit" className={'mb-2'}*/}
      {/*            style={{*/}
      {/*                width: "100%",*/}
      {/*                border: "none",*/}
      {/*                backgroundColor: palette.subSectionsBgAccent,*/}
      {/*                borderRadius: 30,*/}
      {/*            }}*/}
      {/*    >*/}
      {/*        Save*/}
      {/*    </Button>*/}
      {/*    </Col>*/}
      {/*</Row>*/}
      {/*</Form>*/}
    </>
  );
};

export default ShipmentDetailsForm;
