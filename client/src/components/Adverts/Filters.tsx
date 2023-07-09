import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Title } from '../Text/Title';
import { palette } from '../../utils/colors';
import { Button, Dropdown, Form, Image } from 'react-bootstrap';
import Slider from '@mui/material/Slider';
import { BodyText } from '../Text/BodyText';
import useMediaQuery from '../../hooks/useMediaQuery';
import { ProductCategory } from '../../api/collections/advert';
import { ColoredLine } from '../ColoredLine';
//import { DatePicker } from '../DatePicker';
import filtersIcon from '../../assets/filters.svg';
import { FilterAdvertsModal } from './FilterAdvertsModal';
import { useSearchParams } from 'react-router-dom';
import '../../components/override.css';

/**
 * This components represents the filters section in the home page.
 */
export const Filters: FC = () => {
  const [search, setSearch] = useSearchParams();
  const [category, setCategory] = useState<string>('');
  const [rangePrice, setRangePrice] = useState<number[]>([0, 1000]);
  const [rangeQuantity, setRangeQuantity] = useState<number[]>([0, 1000]);
  const [radius, setRadius] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const matches = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    const cat = search.get('category[in]');
    if (cat !== null) {
      setCategory(cat);
    } else {
      setCategory('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.get('category[in]')]);

  const handleReset = () => {
    setCategory('');
    setRangePrice([0, 1000]);
    setRangeQuantity([0, 1000]);
    setRadius(0);
    search.delete('category[in]');
    search.delete('price[gte]');
    search.delete('quantity[gte]');
    search.delete('price[lte]');
    search.delete('quantity[lte]');
    search.delete('radius');
    setSearch(search, { replace: true });
  };

  const handleConfirm = () => {
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
      search.set('radius', radius.toString());
      setSearch(search, { replace: true });
    }
  };

  const handleCategoryClick = (category: string) => {
    setCategory(category);
  };

  const handleButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (!matches) {
    // if the screen is small
    return (
      <div style={{ marginTop: -10, marginLeft: 10, zIndex: 1000 }}>
        <Button
          style={{ border: 'none', backgroundColor: 'white' }}
          onClick={handleButtonClick}
        >
          <Image src={filtersIcon} alt="filters" width={50} height={50} />
        </Button>
        <FilterAdvertsModal
          isOpen={isModalOpen}
          setIsOpen={(status) => setIsModalOpen(status)}
          filters={{
            category: {
              value: category,
              setValue: setCategory,
            },
            rangePrice: {
              value: rangePrice,
              setValue: setRangePrice,
            },
            rangeQuantity: {
              value: rangeQuantity,
              setValue: setRangeQuantity,
            },
            radius: {
              value: radius,
              setValue: setRadius,
            },
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        left: 0,
        padding: 40,
        paddingTop: '30px',
        borderRadius: 15,
        backgroundColor: palette.subSectionsBgLighter,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Title style={{ fontSize: 30, marginTop: 30, fontWeight: 600 }}>
        Filters
      </Title>
      <ColoredLine height={1} width={100} color="black" />
      <Dropdown style={{ marginTop: 30 }}>
        <Dropdown.Toggle
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: 'black',
            width: 200,
            fontFamily: 'Poppins',
            textAlign: 'left',
            fontWeight: 500,
            paddingLeft: 0,
          }}
          id="dropdown-basic"
          defaultValue={'Categories'}
        >
          {category || 'Categories'}
        </Dropdown.Toggle>
        <Dropdown.Menu
          style={{
            maxHeight: 200,
            overflowY: 'scroll',
          }}
          className="hide-scrollbar"
        >
          {Object.values(ProductCategory)
            .filter((key) => isNaN(Number(key)))
            .map((c, index) => (
              <Dropdown.Item key={index} onClick={() => handleCategoryClick(c)}>
                {c}
              </Dropdown.Item>
            ))}
        </Dropdown.Menu>
      </Dropdown>
      <div style={{ width: 190, marginTop: 20 }}>
        <BodyText style={{ fontWeight: 500 }}>Price:</BodyText>
        <Slider
          style={{ color: '#918383', marginTop: -20, marginLeft: 5 }}
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
        <BodyText style={{ fontWeight: 500 }}>Quantity:</BodyText>
        <Slider
          style={{ color: '#918383', marginTop: -20, marginLeft: 5 }}
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
        <BodyText style={{ fontWeight: 500 }}>Range(km):</BodyText>
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
      <div style={{ marginTop: 30, display: 'flex', justifyContent: 'center' }}>
        <Button variant="secondary" onClick={handleReset}>
          Reset
        </Button>
        <Button
          onClick={handleConfirm}
          style={{
            marginLeft: 10,
            backgroundColor: palette.subSectionsBgAccent,
            border: 'none',
          }}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};
