import imagePlaceholder from '../../../assets/product-placeholder.png';
import {

  OfferStatus
} from '../../../api/collections/offer';

import React from 'react';
import { ProfileProdcutAttribute } from '../../Profile/ProfileProdcutAttribute';
import { Advert, PopulatedAdvert } from '../../../api/collections/advert';
import { PopulatedOffer } from '../../../api/collections/offer';
import { Image } from 'react-bootstrap';
require('./OfferBarUserProfile.scss');

type OrderBarUserProfileInfoProps = {
    picture: string | undefined
    advert: PopulatedAdvert | Advert;
    offer: PopulatedOffer;
    outgoing: boolean;
    highlight: string;
    onClick: () => void;
};

const OrderBarUserProfileInfo: React.FC<OrderBarUserProfileInfoProps> = (props) => {
  const getOfferIcon = function() : [string,string]
  {
    return ["bi-check-circle", "#4ECBA9"];
    switch (props.offer.status) {
      case OfferStatus.ACCEPTED:
        return ["bi-check-circle", "#4ECBA9"]

      case OfferStatus.REJECTED:
        return ["bi-x-circle", "red"]

      case OfferStatus.OPEN:
        return ["bi-clock-history", "#4285F4"];

      case OfferStatus.CANCELED_USER:
        return ["bi-dash-circle", "#ffc071"]
      default:
        return ["bi-dash-circle", "#ffc071"]
    }
  }
  
  return (
    <li className="product-bar offer row" style={{backgroundColor: 'white'}} onClick={props.onClick}>
      <div className="product-image col-2">
      <Image
          style={{
            width: '10em',
            height: '10em',
            borderRadius: '3em',
            borderColor: 'transparent',
            objectFit: 'fill',
            marginLeft: '3%'
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
            value={"story"} //props.outgoing ? props.offer.offeree?.name : props.offer.offeror?.name}
          ></ProfileProdcutAttribute></div>

          <div className="div2">  <ProfileProdcutAttribute
            name="Date"
            value={"21.03.2023"}//props.offer.createdAt?.toString().substring(0, 10)}
          ></ProfileProdcutAttribute></div>
         
          <div className="div3">  <ProfileProdcutAttribute
            name="Quantity"
            value={5}//props.offer.quantity}
          ></ProfileProdcutAttribute></div>

          <div className="div4">  <ProfileProdcutAttribute
            name="Price"
            value={4}//props.offer.price}
            unit='€'
          ></ProfileProdcutAttribute></div>
        </div>
      </div>
      <div className="status col-1">
      <div className='offer-status-icon'>
        <i className={`bi ${getOfferIcon()[0]}`} 
        style={{ color: getOfferIcon()[1] , fontSize: "3em"}}></i>
      </div>
      </div>
    </li>
  );
};


export { OrderBarUserProfileInfo };
