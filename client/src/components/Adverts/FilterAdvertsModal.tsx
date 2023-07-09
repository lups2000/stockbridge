import React, { ChangeEvent, FC, useState } from 'react';
import { Button, Dropdown, Form, Modal } from 'react-bootstrap';
import { palette } from '../../utils/colors';
import { BodyText } from '../Text/BodyText';
import Slider from '@mui/material/Slider';
import { ProductCategory } from '../../api/collections/advert';
import { useSearchParams } from 'react-router-dom';
import "../override.css"

interface FilterAdvertsModalProps {
  isOpen: boolean;
  setIsOpen: (status: boolean) => void;
  filters: {
    category: {
      value: string;
      setValue: (newValue: string) => void;
    };
    rangePrice: {
      value: number[];
      setValue: (newValue: number[]) => void;
    };
    rangeQuantity: {
      value: number[];
      setValue: (newValue: number[]) => void;
    };
    radius: {
      value: number;
      setValue: (newValue: number) => void;
    };
  };
}

/**
 * Component that manages the filters in case the screen is small. It's a modal
 * @returns 
 */
export const FilterAdvertsModal: FC<FilterAdvertsModalProps> = (props) => {
  const { filters } = props;

  const [category, setCategory] = useState<string>(filters.category.value);
  const [rangePrice, setRangePrice] = useState<number[]>(
    filters.rangePrice.value,
  );
  const [rangeQuantity, setRangeQuantity] = useState<number[]>(
    filters.rangeQuantity.value,
  );
  const [radius, setRadius] = useState<number>(filters.radius.value);

  const [search, setSearch] = useSearchParams();

  const handleClose = () => {
    //set previous state
    setCategory(filters.category.value);
    setRangePrice(filters.rangePrice.value);
    setRangeQuantity(filters.rangeQuantity.value);
    setRadius(filters.radius.value);
    props.setIsOpen(false);
  };

  const saveResults = () => {
    filters.category.setValue(category);
    filters.rangePrice.setValue(rangePrice);
    filters.rangeQuantity.setValue(rangeQuantity);
    filters.radius.setValue(radius);
    props.setIsOpen(false);
  };

  const handleConfirm = () => {
    saveResults();
    if (category) {
      console.log(category);
      search.set('category[in]', category);
      setSearch(search, { replace: true });
    }

    if (rangePrice) {
      const minPrice = rangePrice[0];
      const maxPrice = rangePrice[1];
      search.set('price[gte]', minPrice.toString());
      search.set('price[lte]', maxPrice.toString());
      setSearch(search, { replace: true });
    }

    if (rangeQuantity) {
      const minQuantity = rangeQuantity[0];
      const maxQuantity = rangeQuantity[1];
      search.set('quantity[gte]', minQuantity.toString());
      search.set('quantity[lte]', maxQuantity.toString());
      setSearch(search, { replace: true });
    }

    if (radius) {
      search.set('radius', radius.toString()); //to check
      setSearch(search, { replace: true });
    }
  };

  const handleReset = () => {
    //reset internal state
    setCategory('');
    setRangePrice([0, 1000]);
    setRangeQuantity([0, 1000]);
    setRadius(0);
    //reset external state
    filters.category.setValue('');
    filters.rangePrice.setValue([0, 1000]);
    filters.rangeQuantity.setValue([0, 1000]);
    filters.radius.setValue(0);
  };

  return (
    <Modal show={props.isOpen} onHide={handleClose} className='no-padding-right'>
      <Modal.Header closeButton>
        <Modal.Title>Filters</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Dropdown style={{ marginTop: 30 }}>
          <Dropdown.Toggle
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: 'black',
              width: 200,
              fontFamily: 'Poppins',
              fontWeight: 500,
            }}
            id="dropdown-basic"
            defaultValue={'Categories'}
          >
            {category || 'Categories'}
          </Dropdown.Toggle>
          <Dropdown.Menu
            style={{ maxHeight: 200, overflowY: 'scroll' }}
            className="hide-scrollbar"
          >
            {Object.values(ProductCategory)
              .filter((key) => isNaN(Number(key)))
              .map((c, index) => (
                <Dropdown.Item key={index} onClick={() => setCategory(c)}>
                  {c}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
        <div style={{ width: 190, marginTop: 20 }}>
          <BodyText style={{ textAlign: 'center', fontWeight: 500 }}>
            Price:
          </BodyText>
          <Slider
            style={{ color: 'gray', marginTop: -20 }}
            size="small"
            value={rangePrice}
            onChange={(_, newRange) => setRangePrice(newRange as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            step={1}
          />
        </div>
        <div style={{ width: 190 }}>
          <BodyText style={{ textAlign: 'center', fontWeight: 500 }}>
            Quantity:
          </BodyText>
          <Slider
            style={{ color: 'gray', marginTop: -20 }}
            size="small"
            value={rangeQuantity}
            onChange={(_, newRange) => setRangeQuantity(newRange as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            step={1}
          />
        </div>
        <div style={{ width: 200 }}>
          <BodyText style={{ textAlign: 'center', fontWeight: 500 }}>
            Range(km):
          </BodyText>
          <Form.Control
            style={{ color: '#918383' }}
            type="number"
            value={radius ?? 0}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setRadius(Number(event.target.value))
            }
            min={0}
            max={10000}
            step={10}
            isInvalid={radius < 0 || radius > 10000}
          />
          <Form.Control.Feedback type="invalid">
            Must be between 0 and 10000
          </Form.Control.Feedback>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
        <Button
          style={{
            backgroundColor: palette.subSectionsBgAccent,
            border: 'none',
          }}
          onClick={handleConfirm}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
