import { AdvertStatus, PopulatedAdvert } from '../../api/collections/advert';
import { BodyText } from '../Text/BodyText';
import { ProductAttribute } from './ProductAttribute';
import { Image } from 'react-bootstrap';
import imagePlaceholder from '../../assets/product-placeholder.png';
import { FC, useState, useEffect } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import { palette } from '../../utils/colors';
import { categoryToAttributes, groupList } from './EditAdvertModal';
import closedTag from '../../assets/closed-tag.svg';
interface ProductDetailsProps {
  advert: PopulatedAdvert;
}

export const ProductDetails: FC<ProductDetailsProps> = (props) => {
  const { advert } = props;
  const [isColumn, setIsColumn] = useState(false);
  const matches2 = useMediaQuery('(min-width: 990px)');

  useEffect(() => {
    const handleResize = () => {
      setIsColumn(window.innerWidth <= 990);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: isColumn ? 'column' : 'row',
          alignItems: isColumn ? 'center' : 'start',
          gap: 50,
          marginLeft: 30,
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: isColumn ? 'column' : 'row',
            alignItems: isColumn ? 'center' : undefined,
            gap: 50,
          }}
        >
          <Image
            style={{
              maxWidth: matches2 ? 350 : 200,
              maxHeight: matches2 ? 350 : 200,
              width: '100%',
              height: 'auto',
              borderRadius: !advert.imageurl ? 30 : undefined,
              borderColor: 'transparent',
              objectFit: 'cover',
            }}
            src={advert?.imageurl ? advert?.imageurl : imagePlaceholder}
          />
          <div style={{ width: !isColumn ? 700 : undefined }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 50,
                  alignItems: 'center',
                }}
              >
                <BodyText
                  style={{
                    fontSize: 28,
                    fontWeight: 600,
                  }}
                >
                  {advert.productname ? advert.productname : 'N.S'}
                </BodyText>
                <div
                  style={{
                    backgroundColor: palette.subSectionsBgAccent,
                    borderRadius: 15,
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 25,
                    paddingRight: 25,
                    height: 30,
                    marginBottom: 16,
                  }}
                >
                  <BodyText
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: 'white',
                      marginBottom: 0,
                    }}
                  >
                    {advert.type ? advert.type : ''}
                  </BodyText>
                </div>
                {(advert.prioritized && advert.status === AdvertStatus.Ongoing) ? (
                  <div
                    style={{
                      backgroundColor: palette.subSectionsBgAccent,
                      borderRadius: 15,
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: 25,
                      paddingRight: 25,
                      height: 30,
                      marginBottom: 16,
                      marginLeft: -30,
                    }}
                  >
                    <BodyText
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        color: 'white',
                        marginBottom: 0,
                      }}
                    >
                      Prioritized
                    </BodyText>
                  </div>
                ) : undefined}
              </div>
              <BodyText
                style={{
                  color: 'gray',
                  fontSize: 16,
                  fontWeight: 300,
                  marginTop: -16,
                  marginBottom: 10,
                  wordBreak: 'break-all',
                }}
              >
                {advert?.description ? advert.description : ''}
              </BodyText>
            </div>
            <ProductAttribute
              name="category"
              value={advert.category ? advert.category : ''}
            />
            {groupList(categoryToAttributes(advert.category!) ?? [], 2).map(
              (g, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      flexDirection: isColumn ? 'column' : 'row',
                      alignItems: 'start',
                      justifyContent: 'start',
                      marginTop: '5%',
                      width: 'auto',
                      gap: 50,
                    }}
                  >
                    {g.map((attribute) => {
                      const value = (advert as any)[attribute];
                      return (
                        attribute in advert &&
                        value && (
                          <div
                            style={{
                              width: isColumn ? '100%' : '50%',
                            }}
                          >
                            <ProductAttribute
                              name={attribute}
                              value={
                                [
                                  'purchaseDate',
                                  'expirationDate',
                                  'createdAt',
                                ].includes(attribute)
                                  ? value.toString().substring(0, 10)
                                  : attribute === 'color'
                                  ? value.name
                                  : value
                              }
                              color={value.hex}
                              padding={'5px 25px'}
                            ></ProductAttribute>
                          </div>
                        )
                      );
                    })}
                  </div>
                );
              },
            )}
            <div
              style={{
                display: 'flex',
                flexDirection: isColumn ? 'column' : 'row',
                gap: 50,
                alignItems: 'start',
                justifyContent: 'start',
                marginTop: '5%',
                width: 'auto',
              }}
            >
              <div style={{ width: '50%' }}>
                <ProductAttribute
                  name="quantity"
                  value={advert?.quantity}
                  padding={'5px 25px'}
                />
              </div>
              <div style={{ width: '50%' }}>
                <ProductAttribute
                  name="price"
                  value={advert?.price}
                  padding={'5px 25px'}
                />
              </div>
            </div>
          </div>
          {advert.status === AdvertStatus.Closed && (
        <Image src={closedTag} style={{
          width: '11%', 
          height: '10%',
          position: 'relative', 
          top: -40,
          right: -70
        }}/>
          )}
        </div>
      </div>
    </>
  );
};
