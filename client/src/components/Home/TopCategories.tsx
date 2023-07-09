import React, { FC, useEffect, useState } from 'react';
import { BodyText } from '../Text/BodyText';
import { Image } from 'react-bootstrap';
import icon from '../../assets/howWorks1.svg'; // stupid icon just for testing
import { getPopularCategories } from '../../api/collections/advert';
import { useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { palette } from '../../utils/colors';

/**
 * This component displays the top categories, those with more adverts.
 */
export const TopCategories: FC = () => {
  const [topCategories, setTopCategories] = useState<string[]>();

  useEffect(() => {
    getPopularCategories()
      .then((res) => {
        setTopCategories(res.categories.map((el) => el._id));
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handleItemClick = (el: string) => {
    navigate(`/adverts?category[in]=${el}`);
  };

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
        {topCategories ? (
          topCategories.map((cat, index) => {
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
                  e.currentTarget.style.boxShadow =
                    '0 0 8px rgba(0, 0, 0, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.boxShadow = '0 0 0 rgba(0, 0, 0, 0.2)';
                }}
                onClick={() => handleItemClick(cat)}
              >
                <Image src={icon} alt="icon" width={100} height={100} />
                <span
                  style={{ paddingLeft: 10, paddingRight: 10, marginTop: 20 }}
                >
                  <BodyText
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      textAlign: 'center',
                    }}
                  >
                    {cat}
                  </BodyText>
                </span>
              </div>
            );
          })
        ) : (
          <FadeLoader color={palette.subSectionsBgAccent} />
        )}
      </div>
    </div>
  );
};
