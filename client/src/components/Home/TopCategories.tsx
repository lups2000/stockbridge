import { FC, useEffect, useState } from 'react';
import { BodyText } from '../Text/BodyText';
import { Image } from 'react-bootstrap';
import {
  getPopularCategories,
  ProductCategory,
} from '../../api/collections/advert';
import { useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { palette } from '../../utils/colors';
import { categories } from './icons';
/**
 * This component displays the top categories, those with more adverts.
 */

export const mapIcon = (category: string) => {
  switch (category) {
    case ProductCategory.Apparel_And_Accessories:
      return categories.apparel_and_accessories;
    case ProductCategory.Electronics_And_Gadgets:
      return categories.electronics;
    case ProductCategory.Home_And_Kitchen:
      return categories.kitchen;
    case ProductCategory.Furniture_And_Decor:
      return categories.furniture;
    case ProductCategory.Health_And_Beauty:
      return categories.cosmetics;
    case ProductCategory.Sports_And_Fitness:
      return categories.fitness;
    case ProductCategory.Books_And_Media:
      return categories.books;
    case ProductCategory.Toys_And_Games:
      return categories.toys;
    case ProductCategory.Automotive_Parts:
      return categories.automotive;
    case ProductCategory.Food_And_Beverages:
      return categories.food;
    case ProductCategory.Office_Supplies:
      return categories.office;
    case ProductCategory.Tools_And_Hardware:
      return categories.tools;
    case ProductCategory.Pet_Supplies:
      return categories.pet_supplies;
    case ProductCategory.Babies_And_Kids_Products:
      return categories.babies;
    case ProductCategory.Jewelry_And_Accessories:
      return categories.jewelry;
    case ProductCategory.Gardening_Supplies:
      return categories.gardening;
    case ProductCategory.Art_And_Craft_Supplies:
      return categories.arts_and_crafts;
    case ProductCategory.Musical_Instruments:
      return categories.musical;
    case ProductCategory.Travel_And_Luggage:
      return categories.travel;
    case ProductCategory.Flowers_And_Bouquets:
      return categories.flowers;
    default:
      return categories.default_category;
  }
};
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
                <Image src={mapIcon(cat)} alt="icon" width={100} height={100} />
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
