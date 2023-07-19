import { AdvertStatus, PopulatedAdvert } from '../../api/collections/advert';
import { BodyText } from '../Text/BodyText';
import { ProductAttribute } from './ProductAttribute';
import { Image } from 'react-bootstrap';
import { FC, useState, useEffect } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import { palette } from '../../utils/colors';
import { categoryToAttributes, groupList } from './EditAdvertModal';
import closedTag from '../../assets/closed-tag.svg';
import { mapIcon } from '../Home/TopCategories';

interface ProductDetailsProps {
  advert: PopulatedAdvert;
}

export const ProductDetails: FC<ProductDetailsProps> = (props) => {
  const { advert } = props;
  const [isColumn, setIsColumn] = useState(false);
  const matches2 = useMediaQuery('(min-width: 990px)');
  const [defaultIcon, setDefaultIcon] = useState<string>();
  useEffect(() => {
    setDefaultIcon(mapIcon(props.advert.category ?? ''));
    const handleResize = () => {
      setIsColumn(window.innerWidth <= 990);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [props.advert.category]);
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: isColumn ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'start',
          gap: 50,
          paddingLeft: 100,
        }}
      > 
          {
          (advert.imageurl) &&
          <Image
            style={{
              maxWidth: matches2 ? 350 : 200,
              maxHeight: matches2 ? 350 : 200,
              width: '100%',
              height: 'auto',
              borderRadius: 30,
              borderColor: 'transparent',
              objectFit: 'contain',
            }}
            src={advert?.imageurl ?? defaultIcon}
          />
          }
          <div style={{ width: !isColumn ? '70em' : undefined }}>
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
                {advert.prioritized &&
                advert.status === AdvertStatus.Ongoing ? (
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
            <div style={{
              marginBottom: 30
            }}>
            <ProductAttribute
              name="category"
              value={advert.category ? advert.category : ''}
              nameWidth='20%'
            /></div>
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
                      marginTop: 10,
                      width: 'auto',
                      gap: 50,
                    }}
                  >
                    {g.map((attribute) => {
                      let attributeValue = (advert as any)[attribute];
                      let value = '';
                      if (attributeValue) {
                        value = [
                          'purchaseDate',
                          'expirationDate',
                          'createdAt',
                        ].includes(attribute)
                          ? attributeValue.toString().substring(0, 10)
                          : attribute === 'color'
                            ? (attributeValue.name ? attributeValue.name !== '' ? attributeValue.name : attributeValue.hex : attributeValue.hex)
                            : attributeValue
                      }
                      return (
                        attribute in advert &&
                        value && value !== '' && (
                          <div
                            style={{
                              width: isColumn ? '100%' : '50%',
                            }}
                          >
                            <ProductAttribute
                              name={attribute}
                              value={
                                value
                              }
                              color={attributeValue.hex}
                              padding={'5px'}
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
                gap: !isColumn ? 50 : 0,
                alignItems: 'start',
                justifyContent: 'start',
                marginTop: 30,
                width: 'auto',
              }}
            >
              <div style={{ width: '100%' }}>
                <ProductAttribute
                  name="quantity"
                  value={advert?.quantity}
                  padding={'5px 25px'}
                />
              </div>
              <div style={{ width: '100%' }}>
                <ProductAttribute
                  name="price"
                  value={advert?.price}
                  padding={'5px 25px'}
                />
              </div>
            </div>
          </div>
          {advert.status === AdvertStatus.Closed && (
            <Image
              src={closedTag}
              style={{
                width: '11%',
                height: '10%',
                position: 'relative',
                top: -40,
                right: -70,
              }}
            />
          )}
      </div>
    </>
  );
};
