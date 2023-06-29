import { fontSize } from '@mui/system';
import React from 'react';
import { BodyText } from '../Text/BodyText';

type ProfileProdcutAttributeProps = {
  name: string;
  value?: string | number | Date;
  unit?: string;
  border?: boolean;
  margin?: string;
  fontSize?: string;
};
const ProfileProdcutAttribute: React.FC<ProfileProdcutAttributeProps> = (props) => {
  return (
    <div
      style={{
        marginTop: props.margin ? props.margin : '',
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'start',
        alignItems: 'center',
        justifyContent: 'center',

        gap: '3em',
        color: 'black',
      }}
    >
      <BodyText
        style={{
          fontWeight: 'bold',
          fontFamily: 'Poppins',
          //width: '100%',
          fontSize: props.fontSize ? props.fontSize : '20px',
        }}
      >
        {props.name}:
      </BodyText>
      <BodyText
        style={{
          width: '100%',
          //height: props.border ? '40px' : '',
          //borderRadius: '10px',
          //border: props?.border ? '3px solid black' : '',
          //textAlign: props.border ? 'center' : 'start',
          //justifyContent: 'start',
          fontFamily: 'Poppins',
          font: 'light',
          fontSize: props.fontSize ? props.fontSize : '20px',
        }}
      >
        {`${props?.value} ${props?.unit ? props?.unit : ''}`}
      </BodyText>
    </div>
  );
};

export { ProfileProdcutAttribute };