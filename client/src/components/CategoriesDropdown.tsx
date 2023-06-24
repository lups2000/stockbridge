import React, { FC, useState } from 'react';
import { Image } from 'react-bootstrap';
import categoriesIcon from '../assets/categories.svg';
import { ProductCategory } from '../api/collections/advert';
import { palette } from '../utils/colors';

export const CategoriesDropdown: FC = () => {
  const productCategories: string[] = Object.values(ProductCategory);

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropDown = () => setDropdownOpen(!isDropdownOpen);

  const DropdownList = productCategories.map((el, index) => (
    <div
      key={index}
      // onClick={() => handleItemClick(el)}
      style={{
        cursor: 'pointer',
        textAlign: 'center',
        padding: 8,
        transition: 'background-color 0.3s',
        display: 'flex',
        alignItems: 'center',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#f1f1f1';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <span>{el}</span>
    </div>
  ));

  const handleDropdownMouseEnter = () => {
    setDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <>
      <div
        style={{ position: 'relative' }}
        onMouseEnter={handleDropdownMouseEnter}
        onMouseLeave={handleDropdownMouseLeave}
      >
        <div
          style={{
            border: '1px solid',
            borderColor: palette.borderBoostrap,
            borderRadius: 8,
            padding: 5,
            cursor: 'pointer',
          }}
          onClick={toggleDropDown}
        >
          <Image src={categoriesIcon} alt="user info" width={25} height={25} />
          <span style={{ marginLeft: 5 }}>CATEGORIES</span>
        </div>
        {isDropdownOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              backgroundColor: 'white',
              border: '1px solid gray',
              borderRadius: 10,
              overflow: 'auto',
              zIndex: 2,
              maxHeight: 300,
              minWidth: 300,
            }}
          >
            {DropdownList}
          </div>
        )}
      </div>
    </>
  );
};
