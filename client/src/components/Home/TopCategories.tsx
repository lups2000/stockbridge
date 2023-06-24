import React, { FC } from 'react';
import { BodyText } from '../Text/BodyText';
import { Image } from 'react-bootstrap';
import icon from '../../assets/howWorks1.svg'; // stupid icon just for testing

/**
 * This component displays the top categories, those with more adverts.
 */
export const TopCategories: FC = () => {
  //so far hardcoded, in the future the categories with more adverts
  const categories: string[] = [
    'Apparel & Accessories',
    'Electronics & Gadgets',
    'Home & Kitchen',
    'Furniture & Decor',
    'Health & Beauty',
    'Sports & Fitness',
  ];
  return (
    <div>
      <BodyText style={{ fontSize: 20, fontWeight: 600, paddingLeft: 25 }}>
        Most Popular Categories
      </BodyText>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 25,
          paddingLeft: 25,
          paddingRight: 25,
        }}
      >
        {categories.map((cat, index) => {
          return (
            <div
              key={index}
              style={{
                width: 'calc(33.33% - 50px)',
                maxWidth: 200,
                height: 200,
                borderRadius: 8,
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'box-shadow 0.3s ease',
                boxShadow: '0 0 0 rgba(0, 0, 0, 0.2)',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.boxShadow = '0 0 8px rgba(0, 0, 0, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.boxShadow = '0 0 0 rgba(0, 0, 0, 0.2)';
              }}
            >
              <Image
                src={icon}
                alt="icon"
                width={100}
                height={100}
              />
              <span
                style={{ paddingLeft: 10, paddingRight: 10, marginTop: 20 }}
              >
                <BodyText
                  style={{ fontSize: 15, fontWeight: 500, textAlign: 'center' }}
                >
                  {cat}
                </BodyText>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
