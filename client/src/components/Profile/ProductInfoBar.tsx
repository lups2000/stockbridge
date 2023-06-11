import React from 'react';
require('./profile.scss');

type ProductProps = {
  imageUrl: string;
  name: string;
  date: string;
  quantity: number;
  price: number;
};

const ProductInfoBar: React.FC<ProductProps> = ({
  imageUrl,
  name,
  date,
  quantity,
  price,
}) => {
  return (
    <li className="product-bar row">
      <div className="product-image col-2">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="product-info col-10">
        <div className="product-details row">
          <div className="div1"> Name: {name} </div>
          <div className="div2"> Date:{date}</div>
          <div className="div3"> Quantity: {quantity}</div>
          <div className="div4"> Price: {price}</div>
        </div>
      </div>
    </li>
  );
};

export default ProductInfoBar;
