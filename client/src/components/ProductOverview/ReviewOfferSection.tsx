import { FC } from 'react';
import { BodyText } from '../Text/BodyText';

type ReviewOfferSectionProps = {
  children: any;
  section: string;
};
const ReviewOfferSection: FC<ReviewOfferSectionProps> = (props) => {
  return (
    <div
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: '60px',
        width: 'full',
        marginBottom: '2%',
      }}
    >
      <BodyText
        style={{
          fontFamily: 'poppins',
          color: 'black',
          fontSize: '36px',
          fontWeight: 600,
          paddingLeft: '10px',
        }}
      >
        {props.section}
      </BodyText>
      {props.children}
    </div>
  );
};

export { ReviewOfferSection };
