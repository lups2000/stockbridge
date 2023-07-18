import { PopulatedAdvert } from '../../api/collections/advert';
import { BodyText } from '../Text/BodyText';
import { ProductAttribute } from './ProductAttribute';
import { Image } from 'react-bootstrap';
import imagePlaceholder from '../../assets/product-placeholder.png';
import { FC } from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import { palette } from '../../utils/colors';
import { categoryToAttributes, groupList } from './EditAdvertModal';



interface ProductDetailsProps {
  advert: PopulatedAdvert;
}

export const ProductDetails: FC<ProductDetailsProps> = (props) => {
  const { advert } = props;
  const matches2 = useMediaQuery('(min-width: 850px)');

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection:  'column',
          alignItems: 'start',
          justifyContent: matches2 ? undefined : 'center',
          gap: 50,
          marginLeft: 30,
          position: 'relative',
        }}
      >
        <div style={{
          display: 'flex', 
          flexDirection: 'row',
          gap: 100
        }}>
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
      <div>
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
              {advert.productname ? advert.productname : 'N.S*'}
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
                {advert.type ? advert.type : 'N.S*'}
              </BodyText>
            </div>
            {advert.prioritized ? (
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
            value={advert.category ? advert.category : 'N.S*'}
          />
        {
          groupList(categoryToAttributes(advert.category!) ?? [], 2).map((g) =>  { 
            return (<div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '20%',
              alignItems: 'start',
              justifyContent: 'start',
              marginTop: '5%',
              width: 'auto',
            }}
          > {
            g.map((attribute) => {
            const value = (advert as any)[attribute]
            return (
              attribute in advert && value &&  <ProductAttribute
              name={attribute}
              value={['purchaseDate', 'expirationDate', 'createdAt'].includes(attribute) ? value.toString().substring(0, 10) : attribute === 'color' ? value.name :value}
              color={value.hex}
            ></ProductAttribute>
            )
            
          })
        }
        </div>)})}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '20%',
            alignItems: 'start',
            justifyContent: 'start',
            marginTop: '5%',
            width: 'auto',
          }}
        >
          <ProductAttribute
            name="quantity"
            value={advert?.quantity}
          ></ProductAttribute>
          <ProductAttribute
            name="price"
            value={advert?.price}
          ></ProductAttribute>
        </div>
      </div>
      </div>
      </div>
      {!advert.expirationDate || !advert.purchaseDate || !advert.color ? (
        <BodyText style={{ position: 'absolute', bottom: 25, left: 15 }}>
          *Not specified
        </BodyText>
      ) : undefined}
    </>
  );
};
