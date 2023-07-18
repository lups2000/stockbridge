import { FC } from 'react';
import { PopulatedAdvert } from '../../api/collections/advert';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AdvertCard } from '../Adverts/AdvertCard';

type AdvertsTabContentProps = {
  adverts: PopulatedAdvert[];
};
const AdvertsTabContent: FC<AdvertsTabContentProps> = (props) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container>
          <Row
            style={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            {props.adverts.map((item, index) => (
              <Col
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  marginBottom: 50,
                }}
                onClick={() => navigate(`/productoverview/${item._id}`)}
              >
                <AdvertCard
                  id={item._id}
                  name={item.productname}
                  price={item.price}
                  quantity={item.quantity}
                  icon={item.imageurl}
                  description={item.description}
                  prioritized={item.prioritized}
                  creationDate={item.createdAt}
                  fancyEffect={true}
                  category={item.category}
                />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export { AdvertsTabContent };
