import React, { FC, useState } from 'react';
import { Image } from 'react-bootstrap';
import categoriesIcon from '../assets/categories.svg';
import { ProductCategory } from '../api/collections/advert';

export const CategoriesDropdown: FC = () => {
  const productCategories: string[] = Object.values(ProductCategory);

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropDown = () => setDropdownOpen(!isDropdownOpen);

  const DropdownList = productCategories.map((el, index) => (
    <div
      key={index}
      //onClick={() => handleItemClick(el)}
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

  return (
    <>
      <div style={{ position: 'relative' }}>
        <div
          style={{
            border: '2px solid black',
            borderRadius: 8,
            padding: 8,
            cursor: 'pointer',
          }}
          onClick={toggleDropDown}
        >
          <Image src={categoriesIcon} alt="user info" width={25} height={25} />
          <span>CATEGORIES</span>
        </div>
        {isDropdownOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              right: 0,
              marginTop: 5,
              backgroundColor: 'white',
              border: '1px solid gray',
              borderRadius: 10,
              //padding: '10px',
              overflow: 'auto',
              width: 150,
              zIndex: 2,
            }}
          >
            {DropdownList}
          </div>
        )}
      </div>
      {/*<Nav className="justify-content-end flex-grow-1 pe-3">
      <NavDropdown
        title={
          <span style={{ padding: 10, fontWeight: '500' }}>
            <Image
              alt="cat"
              src={categoriesIcon}
              width={25}
              height={25}
              className="d-inline-block align-top"
              style={{ marginRight: 10 }}
            />
            CATEGORIES
          </span>
        }
        style={{ border: '2px solid black', borderRadius: 8 }}
      >
        {productCategories.map((category, index) => {
          return <NavDropdown.Item key={index}>{category}</NavDropdown.Item>;
        })}
      </NavDropdown>
    </Nav>*/}
    </>
  );
};
