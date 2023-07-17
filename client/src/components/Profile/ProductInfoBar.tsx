import React from 'react';
import { Image } from 'react-bootstrap';
import imagePlaceholder from '../../assets/product-placeholder.png';
import { ProfileProdcutAttribute } from './ProfileProdcutAttribute';
import { useNavigate } from 'react-router-dom';
import closedTag from '../../assets/closed-tag.svg'
import { AdvertStatus } from '../../api/collections/advert';
require('./profile.scss');

type ProductProps = {
  productId: string | undefined;
  imageUrl: string | undefined;
  name: string | undefined;
  date: string | undefined;
  quantity: number | undefined;
  price: number | undefined;
  highlight: string;
  status: string|undefined;
};

const ProductInfoBar: React.FC<ProductProps> = ({
  productId,
  imageUrl,
  name,
  date,
  quantity,
  price,
  highlight,
  status
}) => {
  const navigate = useNavigate();
  return (
    <li
      className="product-bar row"
      onClick={() => navigate(`/productoverview/${productId}`)}
    >
      {status === AdvertStatus.Closed && 
      <Image
      src={closedTag}
      alt="Corner Image"
      className="corner-image"
    />}

      
      <div className="product-image col-2">
        <Image
          style={{
            width: '10em',
            height: '10em',
            borderRadius: '3em',
            borderColor: 'transparent',
            objectFit: 'fill',
            marginLeft: '3%',
          }}
          src={imageUrl ? imageUrl : imagePlaceholder}
        />
      </div>
      <div className="product-info col-10">
        <div className="product-details row">
          <div className="div1">
            <ProfileProdcutAttribute
              name="Product"
              value={name}
              highlight= {highlight}
            ></ProfileProdcutAttribute>{' '}
          </div>

          <div className="div2"> 
            <ProfileProdcutAttribute
              name="Date"
              value={date}
            ></ProfileProdcutAttribute>
          </div>
          <div className="div3">
            <ProfileProdcutAttribute
              name="Quantity"
              value={quantity}
            ></ProfileProdcutAttribute>
          </div>

          <div className="div4">
            {' '}
            <ProfileProdcutAttribute
              name="Price"
              value={price}
              unit="€"
            ></ProfileProdcutAttribute>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ProductInfoBar;
