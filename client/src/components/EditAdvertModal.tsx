import React, { FC, useRef, useState } from "react";
import { Img } from "../components";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { PRODUCT_CATEGORY, COLORS } from "../api/collections/advert";
import { palette } from "../utils/colors";
import axios from "axios";
import { json } from "react-router-dom";



type EditAdvertContentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  Partial<{
    isShowing: boolean;
    onClose: () => void;
  }>;

const EditAdvertModal: FC<EditAdvertContentProps> = (props) => {
  const [formData, setFormData] = useState({
    productname: "",
    category: "",
    description: "",
    imageurl: "",
    reference: "",
    type: "Sell",
    price: 0,
    quantity: 0,
    color: "",
    purchaseDate: "",
    issuer: 1,
    prioritized: false,
  });
  const [purchaseDate, setPurchaseDate] = useState(new Date());

  const handleChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const [dragging, setDragging] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const iconRef = useRef<HTMLInputElement>(null!);
  const [preview, setPreview] = useState("");

  const onBtnClick = () => {
    /*Collecting node-element and performing click*/
    iconRef?.current.click();
  };
  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files[0];
    setPreview(URL.createObjectURL(file));
  };

  // todo: check file format (only picture formats allowed)
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      console.log("File uploaded: ", file);
      if (file != undefined) {
        setPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleDateChange = (date: React.SetStateAction<Date>) => {
    setPurchaseDate(date);
  };
  const handleSubmitPicture = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    const axiosClient = axios.create({
      baseURL: `http://localhost:3001/api/v1`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    
    // using interceptors to clean redirects
    
    const response = await axiosClient.post("/adverts", {data: formData});
    console.log("Response:", response.status);
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
              <Form.Group className="mb-3" controlId="advertType">
              <Form.Label style={{ padding: '10px',
            color:  palette.gray}}>Sell/ Ask:</Form.Label>
              <Form.Check inline type="radio" name="advertType" id="radio1" label="Sell"/>
              <Form.Check inline type="radio" name="advertType" id="radio2" label="Ask"/>
              </Form.Group>
            </Col>
            <Col>
            <Form.Group style={{
              textAlign:"center"
            }} 
            controlId="FileUpload">
            <div className="custom-file">
            <Form.Control
              type="file"
              onChange={handleFileInput}
              style={{
                backgroundColor: "transparent",
                borderColor: "black",
                borderRadius: 15,
                alignContent: "start",
                justifyContent: "start",
                marginBottom: "10px"
              }}
              id="customFile"/>
        </div>
        {preview && (
              <div className="flex-col items-end justify-end">
                <Img
                  style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "60px",
                  }}
                  src={preview}
                />
              </div>
            )}
      </Form.Group>
            </Col>
            </Row> 
          <Row>
            <Col>
              <Form.Group>
                <Form.Label style={{ padding: '10px',
            color:  palette.gray, margin: "5px"}}>Product Name</Form.Label>
                <Form.Control style={{ padding: '10px',
            color:  palette.gray, margin: "5px"}} type="text" placeholder="Product Name"></Form.Control>
              </Form.Group>
            </Col>    
            <Col>
              <Form.Group controlId="category">
                <Form.Label style={{ padding: '10px',
            color:  palette.gray, margin: "5px"}}>Product Category</Form.Label>
                <Form.Select style={{ padding: '10px',
            color:  palette.gray, margin: "5px"}} placeholder="Product Category" value={formData.category} name="category" onChange={handleChange}>
                {Object.keys(PRODUCT_CATEGORY).filter((key) => isNaN(Number(key))).map(c => (
                      <option>{c}</option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>    
          </Row>
          <Row>
            <Col>
            <Form.Group>
                <Form.Label style={{ padding: '10px',
            color:  palette.gray, margin: "5px"}}>Product Color</Form.Label>
                <Form.Select style={{ padding: '10px',
            color:  palette.gray, margin: "5px"}} placeholder="Product Category" value={formData.color} name="color" onChange={handleChange}>
                {Object.values(COLORS).filter((key) => isNaN(Number(key))).map(c => (
                      <option>{c}</option>
                    ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
            <Form.Label style={{ padding: '10px',
            color:  palette.gray, margin: "5px"}}>Purchase Date</Form.Label>
                  <Form.Control
                  style={{ padding: '10px',
                  color:  palette.gray, margin: "5px"}}
                    type="date"
                    value={formData.purchaseDate}
                    name= "purchaseDate"
                    onChange={handleChange}
                  />
            </Col>
          </Row>
          <Row>
            <Col>
            <Form.Group>
            <Form.Label style={{ padding: '10px',
            color:  palette.gray, margin: "5px"}}> Quantity (pcs)</Form.Label>
            <Form.Control style={{ padding: '10px',
            color:  palette.gray, margin: "5px"}} type="number" name="quantity" onChange={handleChange}></Form.Control>
            </Form.Group>
            </Col>
            <Col>
            <Form.Group>
            <Form.Label style={{ padding: '10px',
            color:  palette.gray, margin: "5px"}}> Price (€)</Form.Label>
            <Form.Control style={{ padding: '10px',
            color:  palette.gray, margin: "5px"}} type="number" name="price" onChange={handleChange}></Form.Control>
            </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col>
            <Form.Group>
            <Form.Label style={{ padding: '10px',
            color:  palette.gray, margin: "5px"}}> Description</Form.Label>
            <Form.Control style={{ padding: '10px',
            color:  palette.gray, margin: "5px"}} as="textarea" rows={3} name="description" onChange={handleChange}></Form.Control>
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
              borderColor: palette.green
            }}
        >
          Submit
        </Button>
      </Modal.Footer>
      </Modal>
  );
};

export { EditAdvertModal };
