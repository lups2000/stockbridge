import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Form, Modal, Row, Image } from 'react-bootstrap';
import {
  Advert,
  updateAdvert,
  createAdvert,
  ProductCategory,
  PopulatedAdvert,
  Sizes,
  Options,
  EnergyClass,
  closeAdvert,
} from '../../api/collections/advert';
import { ChromePicker } from 'react-color';
import { palette } from '../../utils/colors';
import defaultPostAdvertImage from '../../assets/advertPostAdvert.svg';
import trashIcon from '../../assets/trash-bin.svg';
import { LoginContext } from '../../contexts/LoginContext';
import useMediaQuery from '../../hooks/useMediaQuery';
import {
  checkExpirationDateAvert,
  checkPurchaseDateAdvert,
} from '../../utils/functions';
import { BodyText } from '../Text/BodyText';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import colorPicker from '../../assets/colour-picker.svg';
import { FormAttribute } from './FormAttribute';
import { ResponseModal, ResponseType } from '../Offers/ResponseModal';

type EditAdvertContentProps = {
  isShowing: boolean;
  onClose: () => void;
  advert?: PopulatedAdvert;
  editMode: boolean;
};
export function groupList(attributeList: string[], n: number): string[][] {
  const groupedList: string[][] = [];
  let currentGroup: string[] = [];
  for (let i = 0; i < attributeList.length; i++) {
    const currentValue = attributeList[i];
    if (i % n === 0) {
      currentGroup = [];
      currentGroup.push(currentValue);
    } else {
      currentGroup.push(currentValue);
      groupedList.push(currentGroup);
    }

    if (i === attributeList.length - 1 && i % n === 0) {
      groupedList.push(currentGroup);
    }
  }
  return groupedList;
}
export function categoryToAttributes(category: string) {
  if (
    Object.values(ProductCategory)
      .map((c) => c.toString())
      .includes(category)
  ) {
    switch (category) {
      case ProductCategory.Apparel_And_Accessories:
        return ['color', 'fabric', 'size', 'sustainable'];
      case ProductCategory.Electronics_And_Gadgets:
        return ['color', 'energyClass'];
      case ProductCategory.Home_And_Kitchen:
      case ProductCategory.Furniture_And_Decor:
      case ProductCategory.Office_Supplies:
      case ProductCategory.Tools_And_Hardware:
        return ['color', 'height', 'width', 'length', 'weight', 'material'];
      case ProductCategory.Health_And_Beauty:
      case ProductCategory.Babies_And_Kids_Products:
        return [
          'volume',
          'expirationDate',
          'color',
          'crueltyFree',
          'sustainable',
          'recyclable',
        ];
      case ProductCategory.Sports_And_Fitness:
        return ['weight', 'safetyFeatures'];
      case ProductCategory.Books_And_Media:
        return ['pages', 'size', 'hardCover'];
      case ProductCategory.Automotive_Parts:
        return ['color', 'expirationDate'];
      case ProductCategory.Food_And_Beverages:
        return ['expirationDate'];
      case ProductCategory.Flowers_And_Bouquets:
        return ['color', 'expirationDate', 'purchaseDate'];
      default:
        return ['color'];
    }
  } else {
    return undefined;
  }
}

function mapColorName(hex: string): string | undefined {
  switch (hex.toUpperCase()) {
    case '#0000FF':
      return 'Blue';
    case '#FF0000':
      return 'Red';
    case '#008000':
      return 'Green';
    case '#000000':
      return 'Black';
    case '#FFFFFF':
      return 'White';
    case '#FFC0CB':
      return 'Pink';
    case '#FFFF00':
      return 'Yellow';
    case '#FFA500':
      return 'Orange';
    case '#A020F0':
      return 'Purple';
    default:
      return undefined;
  }
}
export const EditAdvertModal: FC<EditAdvertContentProps> = (props) => {
  const { user, loggedIn } = useContext(LoginContext);

  const matches = useMediaQuery('(min-width: 992px)');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [encodedImage, setEncodedImage] = useState(
    props.advert?.imageurl ?? '',
  );
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const [advertType, setAdvertType] = useState(
    props.advert?.type ? props.advert?.type : 'Sell',
  );

  const handleType = (event: any) => {
    setAdvertType(event.target.value);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      colorPickerRef.current &&
      !colorPickerRef.current.contains(event.target as Node)
    ) {
      setShowPicker(false);
    }
  };
  const [attributeList, setAttributeList] = useState<string[]>();
  useEffect(() => {
    if (props.advert) {
      setAttributeList(categoryToAttributes(props.advert.category!));
    }
  }, [props.advert]);
  const [formData, setFormData] = useState({
    productname: props.advert?.productname ?? undefined,
    description: props.advert?.description ?? undefined,
    prioritized: props.advert?.prioritized ?? false,
    color: props.advert?.color ?? undefined,
    purchaseDate: props.advert?.purchaseDate
      ? props.advert?.purchaseDate.toString().substring(0, 10)
      : undefined,
    expirationDate: props.advert?.expirationDate
      ? props.advert.expirationDate.toString().substring(0, 10)
      : undefined,
    Quantity: props.advert?.quantity ?? undefined,
    Price: props.advert?.price ?? undefined,
    category: props.advert?.category ?? '',
    store: props.advert?.store ?? user?._id,
    size: props.advert?.size ?? undefined,
    fabric: props.advert?.fabric ?? '',
    sustainable: props.advert?.sustainable ?? undefined,
    energyClass: props.advert?.energyClass ?? undefined,
    crueltyFree: props.advert?.crueltyFree ?? undefined,
    recyclable: props.advert?.recyclable ?? undefined,
    weight: props.advert?.weight ?? undefined,
    height: props.advert?.height ?? undefined,
    width: props.advert?.width ?? undefined,
    length: props.advert?.length ?? undefined,
    pages: props.advert?.width ?? undefined,
    volume: props.advert?.volume ?? undefined,
    material: props.advert?.material ?? '',
  });
  const [errors, setErrors] = useState({
    productname: '',
    category: '',
    Price: '',
    Quantity: '',
  });

  function attributes(name: string, formData: any) {
    switch (name) {
      case 'purchaseDate':
        return (
          <FormAttribute
            name={name}
            control={true}
            label="Purchase Date"
            value={formData.purchaseDate?.toString() ?? ''}
            type="date"
            max={new Date().toISOString().substring(0, 10)}
            onChange={(e) => {
              if (checkPurchaseDateAdvert(e.target.value)) {
                handleChange(e);
              }
            }}
          />
        );

      case 'expirationDate':
        return (
          <FormAttribute
            name={name}
            control={true}
            label="Expiration Date"
            min={new Date().toISOString().substring(0, 10)}
            value={formData.expirationDate?.toString() ?? ''}
            type="date"
            onChange={(e) => {
              if (checkExpirationDateAvert(e.target.value)) {
                handleChange(e);
              }
            }}
          />
        );
      case 'color':
        return (
          <Col>
            <Form.Group>
              <Form.Label
                style={{
                  paddingLeft: 10,
                  fontWeight: '600',
                }}
              >
                Product Color
              </Form.Label>
              {showPicker && (
                <div
                  ref={colorPickerRef}
                  style={{ position: 'absolute', top: '1em', right: '3em' }}
                >
                  <ChromePicker
                    color={formData.color?.hex}
                    onChange={(color: any) => handleColorChange(color)}
                  />
                </div>
              )}
              <Form.Group style={{ position: 'relative' }}>
                <Form.Control
                  style={{
                    padding: 10,
                    color: palette.gray,
                    margin: 5,
                  }}
                  type="text"
                  name="color"
                  placeholder="Enter Color or Select"
                  onChange={(e) => {
                    handleColorChange({ name: e.currentTarget.value });
                  }}
                  value={formData.color?.name ?? formData.color?.hex}
                ></Form.Control>
                <div className="input-group-append">
                  <Button
                    style={{
                      position: 'absolute',
                      top: '0.33em',
                      right: '-1em',
                      background: 'transparent',
                      borderColor: 'transparent',
                      width: '15%',
                    }}
                    onClick={handlePipetteClick}
                  >
                    <Image src={colorPicker} />
                  </Button>
                </div>
              </Form.Group>
            </Form.Group>
          </Col>
        );
      case 'size':
        return (
          <FormAttribute
            name={name}
            control={false}
            label="Size"
            placeholder="Size"
            value={formData.size}
            defaultOption=" -- Select Size -- "
            options={Object.values(Sizes)
              .filter((key) => isNaN(Number(key)))
              .map((c, index) => (
                <option key={index}>{c}</option>
              ))}
            onChange={handleChange}
          />
        );
      case 'fabric':
        return (
          <FormAttribute
            name={name}
            control={true}
            label="Fabric"
            value={formData.fabric}
            onChange={handleChange}
          />
        );
      case 'sustainable':
        return (
          <FormAttribute
            name={name}
            control={false}
            label="Sustainable"
            value={formData.sustainable}
            onChange={handleChange}
            defaultOption=" -- Is the Product Sustainable? -- "
            options={Object.values(Options)
              .filter((key) => isNaN(Number(key)))
              .map((c, index) => (
                <option key={index}>{c}</option>
              ))}
          />
        );
      case 'crueltyFree':
        return (
          <FormAttribute
            name={name}
            control={false}
            label="Cruelty Free"
            value={formData.crueltyFree}
            onChange={handleChange}
            defaultOption=" -- Is the Product Cruelty Free? -- "
            options={Object.values(Options)
              .filter((key) => isNaN(Number(key)))
              .map((c, index) => (
                <option key={index}>{c}</option>
              ))}
          />
        );
      case 'recyclable':
        return (
          <FormAttribute
            name={name}
            control={false}
            label="Recyclable Package"
            value={formData.recyclable}
            onChange={handleChange}
            defaultOption=" -- Is the Product's Package Recyclable? -- "
            options={Object.values(Options)
              .filter((key) => isNaN(Number(key)))
              .map((c, index) => (
                <option key={index}>{c}</option>
              ))}
          />
        );
      case 'energyClass':
        return (
          <FormAttribute
            name={name}
            control={false}
            label="Energy Class"
            value={formData.energyClass}
            onChange={handleChange}
            defaultOption=" -- Energy Class -- "
            options={Object.values(EnergyClass)
              .filter((key) => isNaN(Number(key)))
              .map((c, index) => (
                <option key={index}>{c}</option>
              ))}
          />
        );
      case 'weight':
        return (
          <FormAttribute
            name={name}
            control={true}
            label="Weight (Kg)"
            min={0}
            value={formData.weight ?? ''}
            type="number"
            onChange={handleChange}
          />
        );
      case 'height':
        return (
          <FormAttribute
            name={name}
            control={true}
            label="Height (cm)"
            min={0}
            value={formData.height ?? ''}
            type="number"
            onChange={handleChange}
          />
        );
      case 'width':
        return (
          <FormAttribute
            name={name}
            control={true}
            label="Width (cm)"
            min={0}
            value={formData.width ?? ''}
            type="number"
            onChange={handleChange}
          />
        );
      case 'length':
        return (
          <FormAttribute
            name={name}
            control={true}
            label="Length (cm)"
            min={0}
            value={formData.length ?? ''}
            type="number"
            onChange={handleChange}
          />
        );
      case 'pages':
        return (
          <FormAttribute
            name={name}
            control={true}
            label="Pages"
            min={0}
            value={formData.pages ?? ''}
            type="number"
            onChange={handleChange}
          />
        );
      case 'volume':
        return (
          <FormAttribute
            name={name}
            control={true}
            label="Volume (ml)"
            min={0}
            value={formData.volume ?? ''}
            type="number"
            onChange={handleChange}
          />
        );
      case 'material':
        return (
          <FormAttribute
            name={name}
            control={true}
            label="Material"
            value={formData.material}
            onChange={handleChange}
          />
        );
    }
  }

  const [showResponseModal, setShowResponseModal] = useState(false);
  const [responseType, setResponseType] = useState(
    ResponseType.SUCCESSFUL_ADVERT_CREATION,
  );

  const handleChange = (event: any) => {
    const { name, value, type } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value) : value,
    });
    setErrors({
      ...errors,
      [name]: value
        ? type === 'number'
          ? parseInt(value) > 0
            ? ''
            : `${name} must be higher than 0`
          : ''
        : `${name} is missing`,
    });
  };

  const [advertID, setAdvertID] = useState('');

  const handleImageClick = () => {
    if (fileInputRef.current != null) {
      fileInputRef.current.click();
    }
  };

  const handleUploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      const file = event.target.files[0];
      if (file !== undefined) {
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

  const isValid = () => {
    return (
      formData.productname &&
      formData.category &&
      formData.Price &&
      formData.Quantity
    );
  };

  const navigate = useNavigate();

  const handleCloseAdvert = async () => {
    try {
      if (props.advert?._id) {
        await closeAdvert(props.advert?._id);
        setResponseType(ResponseType.SUCCESSFUL_ADVERT_DELETION);
        setShowResponseModal(true);
      }
    } catch {
      setResponseType(ResponseType.UNSUCCESSFUL_ADVERT_DELETION);
      setShowResponseModal(true);
    }
  };

  const handleSubmit = async () => {
    if (!loggedIn) {
      navigate('/signIn');
    }
    if (isValid()) {
      try {
        if (props.advert?._id) {
          await updateAdvert(props.advert._id, {
            productname: formData.productname,
            description: formData.description,
            color: formData.color ?? undefined,
            expirationDate: new Date(formData.expirationDate ?? ''),
            purchaseDate: new Date(formData.purchaseDate ?? ''),
            quantity: formData.Quantity,
            price: formData.Price,
            category: formData.category,
            imageurl: encodedImage,
            size: formData.size ?? undefined,
            fabric: formData.fabric ?? undefined,
            sustainable: formData.sustainable ?? undefined,
            energyClass: formData.energyClass ?? undefined,
            crueltyFree: formData.crueltyFree ?? undefined,
            recyclable: formData.recyclable ?? undefined,
            weight: formData.weight ?? undefined,
            height: formData.height ?? undefined,
            width: formData.width ?? undefined,
            length: formData.length ?? undefined,
            pages: formData.pages ?? undefined,
            volume: formData.volume ?? undefined,
            material: formData.material ?? undefined,
          } as Advert)
            .then((updatedAdvert) => {
              if (updatedAdvert) {
                setResponseType(ResponseType.SUCCESSFUL_ADVERT_UPDATE);
                setShowResponseModal(true);
              } else {
                setResponseType(ResponseType.UNSUCCESSFUL_ADVERT_UPDATE);
                setShowResponseModal(true);
              }
            })
            .catch((error) => {
              setResponseType(ResponseType.UNSUCCESSFUL_ADVERT_UPDATE);
              setShowResponseModal(true);
            });
        } else {
          await createAdvert({
            productname: formData.productname,
            description: formData.description,
            prioritized: false,
            color: formData.color ?? undefined,
            expirationDate: new Date(formData.expirationDate ?? ''),
            purchaseDate: new Date(formData.purchaseDate ?? ''),
            quantity: formData.Quantity,
            price: formData.Price,
            status: 'Ongoing',
            category: formData.category,
            createdAt: new Date(),
            store: user?._id,
            imageurl: encodedImage,
            type: advertType,
            size: formData.size ?? undefined,
            fabric: formData.fabric ?? undefined,
            sustainable: formData.sustainable ?? undefined,
            energyClass: formData.energyClass ?? undefined,
            crueltyFree: formData.crueltyFree ?? undefined,
            recyclable: formData.recyclable ?? undefined,
            weight: formData.weight ?? undefined,
            height: formData.height ?? undefined,
            width: formData.width ?? undefined,
            length: formData.length ?? undefined,
            pages: formData.pages ?? undefined,
            volume: formData.volume ?? undefined,
            material: formData.material ?? undefined,
          })
            .then((createdAdvert) => {
              if (createdAdvert) {
                setAdvertID(createdAdvert._id!);
                setResponseType(ResponseType.SUCCESSFUL_ADVERT_CREATION);
                setShowResponseModal(true);
              } else {
                setResponseType(ResponseType.UNSUCCESSFUL_ADVERT_CREATION);
                setShowResponseModal(true);
              }
            })
            .catch((error) => {
              if (error.response.status === 403) {
                setResponseType(ResponseType.OUT_OF_ADVERTS);
              } else {
                setResponseType(ResponseType.UNSUCCESSFUL_ADVERT_CREATION);
              }
              setShowResponseModal(true);
            });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setErrors({
        productname: formData.productname ? '' : 'Product Name is missing',
        category: formData.category ? '' : 'Category is missing',
        Price: formData.Price
          ? formData.Price > 0
            ? ''
            : 'Price must be greater than 0'
          : 'Price is missing',
        Quantity: formData.Quantity
          ? formData.Quantity > 0
            ? ''
            : 'Quantity must be greater than 0'
          : 'Quantity is missing',
      });
    }
  };
  const [showPicker, setShowPicker] = useState(false);
  useEffect(() => {
    if (showPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPicker]);
  const handleColorChange = (selectedColor: any) => {
    setFormData({
      ...formData,
      color: {
        name: selectedColor.name ?? mapColorName(selectedColor.hex),
        hex: selectedColor.hex,
      },
    });
  };

  const handlePipetteClick = () => {
    setShowPicker(!showPicker);
  };

  return showResponseModal ? (
    <ResponseModal
      responseType={responseType}
      isShowing={showResponseModal}
      advertID={props.advert ? props.advert._id! : advertID}
      onClose={function (responseType: ResponseType): void {
        if (responseType === ResponseType.SUCCESSFUL_ADVERT_CREATION) {
          navigate(`/productoverview/${advertID}`);
        } else {
          if (responseType === ResponseType.SUCCESSFUL_ADVERT_UPDATE) {
            window.location.reload();
          }
        }
        if (responseType === ResponseType.SUCCESSFUL_ADVERT_DELETION) {
          navigate('/userInfo'); //redirect user to the userInfo page
        }
        //in every case we reload the window
        props.onClose();
        window.location.reload();
      }}
    />
  ) : (
    <Modal size="lg" show={props.isShowing} onHide={props.onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Advert Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col style={{ marginTop: 30 }}>
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    paddingLeft: 10,
                    paddingRight: 20,
                    fontWeight: '600',
                  }}
                >
                  Type:
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
                  checked={advertType === 'Sell'}
                />
                <Form.Check
                  inline
                  required
                  type="radio"
                  name="type"
                  id="Ask"
                  label="Ask"
                  onChange={props.advert ? () => {} : handleType}
                  value={'Ask'}
                  checked={advertType === 'Ask'}
                />
              </Form.Group>
            </Col>
            <Col
              style={{
                backgroundColor: encodedImage ? undefined : 'lightgray',
                width: matches ? 200 : 160,
                height: matches ? 200 : 160,
                position: 'absolute',
                right: matches ? 100 : 50,
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: 5,
              }}
            >
              <Form.Control
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleUploadImage}
                style={{
                  display: 'none',
                }}
                id="customFile"
              />

              <Image
                src={encodedImage}
                alt="Advert Image"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) =>
                  (e.currentTarget.src = defaultPostAdvertImage)
                }
                style={{
                  width: encodedImage ? '100%' : '30%',
                  maxHeight: 200,
                  objectFit: 'cover',
                  cursor: 'pointer',
                }}
                onClick={handleImageClick}
                fluid
              />
              {!encodedImage ? (
                <BodyText
                  style={{ fontSize: 15, cursor: 'pointer' }}
                  onClick={handleImageClick}
                >
                  Add photo
                </BodyText>
              ) : (
                <Image
                  src={trashIcon}
                  alt="delete icon"
                  style={{
                    width: 25,
                    objectFit: 'cover',
                    cursor: 'pointer',
                  }}
                  onClick={() => setEncodedImage('')}
                  fluid
                />
              )}
            </Col>
          </Row>
          <Row style={{ marginTop: 50 }}>
            <Col md={6}>
              <Form.Group>
                <Form.Label
                  style={{
                    paddingLeft: 10,
                    fontWeight: '600',
                  }}
                >
                  Product Name
                </Form.Label>
                <Form.Control
                  style={{
                    padding: 10,
                    color: palette.gray,
                    margin: 5,
                  }}
                  required
                  type="text"
                  placeholder="Product Name"
                  name="productname"
                  value={formData.productname}
                  onChange={handleChange}
                  isInvalid={!!errors.productname}
                ></Form.Control>
                <Form.Control.Feedback
                  style={{ paddingLeft: 10 }}
                  type="invalid"
                >
                  Product name is missing
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="category">
                <Form.Label
                  style={{
                    paddingLeft: 10,
                    fontWeight: '600',
                  }}
                >
                  Product Category
                </Form.Label>
                <Form.Select
                  style={{
                    padding: 10,
                    color: palette.gray,
                    margin: 5,
                  }}
                  required
                  placeholder="Product Category"
                  value={formData.category}
                  name="category"
                  onChange={(e) => {
                    handleChange(e);
                    setAttributeList(categoryToAttributes(e.target.value));
                  }}
                  isInvalid={!!errors.category}
                >
                  <option> -- Select Category -- </option>
                  {Object.values(ProductCategory)
                    .filter((key) => isNaN(Number(key)))
                    .map((c, index) => (
                      <option key={index}>{c}</option>
                    ))}
                </Form.Select>
                <Form.Control.Feedback
                  style={{ paddingLeft: 10 }}
                  type="invalid"
                >
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            {attributeList?.length &&
              attributeList.length > 0 &&
              attributes(attributeList[0], formData)}
          </Row>
          {attributeList?.length &&
            attributeList.length > 1 &&
            groupList(attributeList.slice(1), 2).map((g) => (
              <Row>
                {attributes(g[0], formData)}
                {g.length > 1 && attributes(g[1], formData)}
              </Row>
            ))}
          <Row>
            <Col>
              <Form.Group controlId="quantity">
                <Form.Label
                  style={{
                    paddingLeft: 10,
                    fontWeight: '600',
                  }}
                >
                  Quantity (pcs)
                </Form.Label>
                <Form.Control
                  style={{
                    padding: 10,
                    color: palette.gray,
                    margin: 5,
                  }}
                  type="number"
                  name="Quantity"
                  min={1}
                  step={1}
                  value={Number(formData.Quantity ?? '')}
                  onChange={handleChange}
                  required
                  isInvalid={!!errors.Quantity}
                ></Form.Control>
                <Form.Control.Feedback
                  style={{ paddingLeft: 10 }}
                  type="invalid"
                >
                  {errors.Quantity}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="price">
                <Form.Label
                  style={{
                    paddingLeft: 10,
                    fontWeight: '600',
                  }}
                >
                  Price (€)
                </Form.Label>
                <Form.Control
                  style={{
                    padding: 10,
                    color: palette.gray,
                    margin: 5,
                  }}
                  type="number"
                  name="Price"
                  min={1}
                  value={Number(formData.Price ?? '')}
                  onChange={handleChange}
                  required
                  isInvalid={!!errors.Price}
                ></Form.Control>
                <Form.Control.Feedback
                  style={{ paddingLeft: 10 }}
                  type="invalid"
                >
                  {errors.Price}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label
                  style={{
                    paddingLeft: 10,
                    fontWeight: '600',
                  }}
                >
                  Description
                </Form.Label>
                <Form.Control
                  style={{
                    padding: 10,
                    color: palette.gray,
                    margin: '5px',
                    overflow: 'hidden',
                  }}
                  as="textarea"
                  rows={2}
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
        {props.editMode ? (
          <Button
            style={{
              backgroundColor: palette.subSectionsBgAccent,
              border: 'none',
            }}
            onClick={handleCloseAdvert}
          >
            Close Advert
          </Button>
        ) : undefined}
        <Button
          style={{
            background: palette.green,
            border: 'none',
          }}
          onClick={handleSubmit}
        >
          {props.editMode ? 'Save' : 'Submit'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
