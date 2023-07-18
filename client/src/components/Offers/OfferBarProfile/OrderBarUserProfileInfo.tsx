import imagePlaceholder from '../../../assets/product-placeholder.png';

import React, { useState } from 'react';
import { ProfileProdcutAttribute } from '../../Profile/ProfileProdcutAttribute';
import { Advert, PopulatedAdvert } from '../../../api/collections/advert';
import { PopulatedOffer } from '../../../api/collections/offer';
import { Image } from 'react-bootstrap';
import { NestedPopulatedOrder, OrderStatus } from '../../../api/collections/order';
require('./OfferBarUserProfile.scss');

type OrderBarUserProfileInfoProps = {
    picture: string | undefined
    advert: PopulatedAdvert | Advert;
    offer: PopulatedOffer;
    order: NestedPopulatedOrder;
    outgoing: boolean;
    highlight: string;
};

const OrderBarUserProfileInfo: React.FC<OrderBarUserProfileInfoProps> = (props) => {
  const getOfferIcon = function() : [string,string, string]
  {
    switch (props.order.status) {
      case OrderStatus.RECEIVED:
        return ["bi-check-circle", "#4ECBA9", "Received"]
      case OrderStatus.PAYMENT_PENDING:
        return ["bi-credit-card", "#4285F4", "Payment pending"];
      case OrderStatus.SHIPMENT_PENDING:
        return ["bi-bi-truck", "#4285F4", "Shipment pending"];
      default:
        return ["bi-credit-card", "#4285F4", "Payment pending"]
    }
  }

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseOver = () => {
    setIsHovered(true);
  }

  const handleMouseOut = () => {
    setIsHovered(false);
  }


  return (
    <li className="product-bar offer non-clickable row" style={{backgroundColor: 'white'}}>
      <div className="product-image col-2">
      <Image
          style={{
            width: '10em',
            height: '10em',
            borderRadius: '3em',
            borderColor: 'transparent',
            objectFit: 'fill',
            marginRight: '1em',
          }}
          src={props.picture ? props.picture : imagePlaceholder}
        />
      </div>
      <div className="product-info col-9">
        <div className="product-details row">
          <div className="div1">  <ProfileProdcutAttribute
            name="Product"
            value={props.advert?.productname ?? "No name found"}
            highlight= {props.highlight}
          ></ProfileProdcutAttribute> </div>
          
          <div className="div2">  <ProfileProdcutAttribute
            name="Store"
            value={props.outgoing ? props.offer.offeree?.name : props.offer.offeror?.name}
          ></ProfileProdcutAttribute></div>

          <div className="div2">  <ProfileProdcutAttribute
            name="Date"
            value={props.offer.createdAt?.toString().substring(0, 10)}
          ></ProfileProdcutAttribute></div>
         
          <div className="div3">  <ProfileProdcutAttribute
            name="Quantity"
            value={props.order.quantity}
          ></ProfileProdcutAttribute></div>

          <div className="div4">  <ProfileProdcutAttribute
            name="Total Price"
            value={props.order.totalPrice}
            unit='€'
          ></ProfileProdcutAttribute></div>
        </div>
      </div>
      <div className="status col-1">
      <div className='offer-status-icon'         
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}>
        <i className={`bi ${getOfferIcon()[0]}`} 
        style={{ color: getOfferIcon()[1] , fontSize: "3em"}}></i>
      </div>
        {isHovered &&
          <div className={'hover-text'}>
            {getOfferIcon()[2]}
        </div>
      }
      </div>
    </li>
  );
};


export { OrderBarUserProfileInfo };
