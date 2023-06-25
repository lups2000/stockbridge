import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Advert } from '../../api/collections/advert';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { ProductAttribute } from '../ProductOverview/ProductAttribute';
import { BodyText } from '../Text/BodyText';

type AdvertsGridProps = {
  adverts: Advert[];
};
const AdvertsGrid: FC<AdvertsGridProps> = (props) => {
  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  const x = Math.round((screenWidth * 0.8) / 370);
  const grouped: Advert[][] = [];
  const adverts = props.adverts.slice(0, x * 2);
  for (let i = 0; i < adverts.length / x; i += 1) {
    grouped.push(adverts.slice(i * x, x * (i + 1)));
  }

  useEffect(() => {
    const handleResize = () => {
      window.location.reload();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <Container>
        {grouped.map((g) => (
          <Row
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '3%',
              marginTop: '2%',
              marginBottom: '2%',
            }}
          >
            {g.map((a) => (
              <Col
                md={x}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  height: '350px',
                  width: '300px',
                  background: 'transparent',
                  border: 'solid 1px black',
                  borderRadius: '15px',
                  padding: '20px',
                  cursor: 'pointer',
                  marginBottom: '2%',
                }}
                onClick={() => navigate(`/productoverview/${a._id}`)}
              >
                <div
                  style={{
                    width: '80%',
                    height: '40%',
                    marginTop: '5px',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {a.imageurl ? (
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'relative',
                        left: 20,
                        right: 20,
                      }}
                      src={a.imageurl}
                    />
                  ) : (
                    <BodyText
                      style={{
                        fontFamily: 'Poppins',
                        fontSize: '32px',
                        color: 'black',
                        position: 'relative',
                        textAlign: 'center',
                        top: 50,
                      }}
                    >
                      {a.productname}
                    </BodyText>
                  )}
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: a.imageurl ? 'row' : 'column',
                    justifyContent: 'start',
                    alignItems: 'start',
                    marginTop: '30px',
                    gap: '10%',
                    width: '100%',
                  }}
                >
                  {a.imageurl && (
                    <BodyText
                      style={{
                        fontFamily: 'Poppins',
                        fontSize: '18px',
                        color: 'black',
                      }}
                    >
                      {a.productname}
                    </BodyText>
                  )}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '80%',
                    }}
                  >
                    <ProductAttribute
                      name="Quantity"
                      value={a.quantity}
                      unit="pcs"
                      fontSize="16px"
                    />
                    <ProductAttribute
                      name="Price"
                      value={a.price}
                      unit="$"
                      fontSize="16px"
                    />
                  </div>
                </div>

                <BodyText
                  style={{
                    fontFamily: 'Poppins',
                    fontSize: '16px',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    color: 'GrayText',
                    height: '20px',
                  }}
                >
                  {a.description}
                </BodyText>
                <BodyText
                  style={{
                    fontFamily: 'Poppins',
                    fontSize: '12px',
                    color: 'GrayText',
                    position: 'relative',
                    left: '75%',
                  }}
                >
                  {a.createdAt?.toString().substring(0, 10)}
                </BodyText>
              </Col>
            ))}
          </Row>
        ))}
      </Container>
    </>
  );
};

export { AdvertsGrid };
