import React, { FC } from 'react';
import _ from 'lodash';
import { BodyText } from '../Text/BodyText';

type ProductAttributeProps = {
  name: string;
  value?: string | number | Date;
  color?: string;
  unit?: string;
  border?: boolean;
  margin?: string;
  fontSize?: string;
  width?: number
};
    
function mapAttributeName(name: string): string {
  switch (name) {
    case 'color': 
    return 'Color';
    case 'expirationDate': 
      return 'Expires On';
    case 'purchaseDate': 
      return 'Purchased On';
    case 'quantity':
      return 'Quantity';
    case 'price': 
      return 'Price';
    case 'size': 
      return 'Size';
    case 'fabric': 
    return 'Fabric';
    case 'length':
      return 'Length';
    case 'width':
      return 'Width';
      case 'height':
      return 'Height';
      case 'weight':
      return 'Weight';
      case 'pages':
        return 'Pages';
        case 'volume':
        return 'Volume';
        case 'material':
          return 'Material';
          case 'sustainable':
          return 'Sustainable';
          case 'crueltyFree':
          return 'Cruelty Free';
          case 'recyclable':
          return 'Recyclable';
          case 'energyClass':
          return 'Energy Class';
    case 'category':
      return 'Category'
    default: 
      return '';

  }
}

function getUnit(attribute: string) {
  switch(attribute) {
    case 'volume': 
      return 'ml';
    case 'weight': 
      return 'Kg';
    case 'height':
    case 'length':
    case 'width':
      return 'cm';
    case 'quantity':
      return'pcs';
    case 'price':
      return '€';
  }
}
const ProductAttribute: FC<ProductAttributeProps> = (props) => {
  const unit = getUnit(props.name);
  const border = !_.isNil(unit)
  return (
    <div
      style={{
        marginTop: props.margin ? props.margin : '',
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'start',
        alignItems: 'center',
        gap: 30,
        justifyContent: 'center',
        color: 'black',
      }}
    >
      <BodyText
        style={{
          fontWeight: 600,
          fontSize: props.fontSize ? props.fontSize : 20,
        }}
      >
        {mapAttributeName(props.name)}:
      </BodyText>
      {props.color && <div style={{
        backgroundColor: props.color, 
        width: '3.5em', 
        height: '2em',
        borderRadius: '10px',
        position: 'relative',
        bottom: '0.4em',
        marginRight: '2%'
        
      }}/>}
      <BodyText
        style={{
          width: props.color ? '4.5em' : '7.5em',
          height: border ? '40px' : '',
          borderRadius: '10px',
          border: border ? '3px solid black' : '',
          textAlign:border ? 'center' : 'start',
          justifyContent: 'start',
          fontFamily: 'Poppins',
          font: 'light',
          fontSize: props.fontSize ? props.fontSize : '20px',
        }}
      >
        {`${props?.value ?? ''} ${unit ?? ''}`}
      </BodyText>
    </div>
  );
};

export { ProductAttribute };
