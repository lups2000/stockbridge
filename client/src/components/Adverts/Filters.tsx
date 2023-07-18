import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Title } from '../Text/Title';
import { palette } from '../../utils/colors';
import { Button, Dropdown, Form, Image } from 'react-bootstrap';
import Slider from '@mui/material/Slider';
import { BodyText } from '../Text/BodyText';
import useMediaQuery from '../../hooks/useMediaQuery';
import { ProductCategory } from '../../api/collections/advert';
import { ColoredLine } from '../ColoredLine';
import filtersIcon from '../../assets/filters.svg';
import { FilterAdvertsModal } from './FilterAdvertsModal';
import { useSearchParams } from 'react-router-dom';
import '../../components/override.css';
import deleteIcon from '../../assets/deleteX.svg';

/**
 * This components represents the filters section in the home page.
 */
export const Filters: FC = () => {
  const [search, setSearch] = useSearchParams();
  const [rangePrice, setRangePrice] = useState<number[]>([0, 1000]);
  const [rangeQuantity, setRangeQuantity] = useState<number[]>([0, 1000]);
  const [radius, setRadius] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const matches = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    const categories = search.get('category[in]')?.split(',');
    if (categories !== null && categories) {
      setSelectedCategories(categories);
    } else {
      setSelectedCategories([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.get('category[in]')]);

  const handleReset = () => {
    setSelectedCategories([]);
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
    if (selectedCategories && selectedCategories.length > 0) {
      const categories = selectedCategories.join(',');
      search.set('category[in]', categories);
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

  const handleButtonClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCategoryClick = (category: string) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleDeleteCategory = (category: string) => {
    const updatedCategories = selectedCategories.filter((c) => c !== category);
    setSelectedCategories(updatedCategories);
  };

  if (!matches) {
    // if the screen is small
    return (
      <div style={{ marginTop: -13, marginLeft: 10, zIndex: 1000 }}>
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
            categories: {
              value: selectedCategories,
              setValue: setSelectedCategories,
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
      <div>
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
          >
            Select Category
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
                <Dropdown.Item
                  key={index}
                  onClick={() => handleCategoryClick(c)}
                >
                  {c}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>

        {selectedCategories.length > 0 && (
          <div
            style={{
              marginTop: 5,
              borderRadius: 10,
              backgroundColor: palette.subSectionsBgLighter,
              padding: '5px 10px',
              maxHeight: 150,
              overflowY: 'scroll',
            }}
            className="hide-scrollbar"
          >
            <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
              {selectedCategories.map((category, index) => {
                return (
                  <li
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 5,
                    }}
                  >
                    <span
                      style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                    >
                      {category}
                    </span>
                    <Image
                      src={deleteIcon}
                      style={{
                        width: 20,
                        height: 20,
                        cursor: 'pointer',
                      }}
                      onClick={() => handleDeleteCategory(category)}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
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
