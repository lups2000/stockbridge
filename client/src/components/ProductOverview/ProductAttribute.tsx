import _ from 'lodash';
import React from 'react';
import { BodyText } from '../Text/BodyText';

type ProductAttributeProps = {
  name: string;
  value?: string | number | Date;
  unit?: string;
  border?: boolean;
  margin?: string;
  fontSize?: string;
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
const ProductAttribute: React.FC<ProductAttributeProps> = (props) => {
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
        justifyContent: 'center',

        gap: '30px',
        color: 'black',
      }}
    >
      <BodyText
        style={{
          fontWeight: 'bold',
          fontFamily: 'Poppins',
          width: '150px',
          fontSize: props.fontSize ? props.fontSize : '20px',
        }}
      >
        {mapAttributeName(props.name)}:
      </BodyText>
      <BodyText
        style={{
          width: '150px',
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
        {`${props?.value} ${unit ?? ''}`}
      </BodyText>
    </div>
  );
};

export { ProductAttribute };
