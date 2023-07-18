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
        paddingTop: 15,
      }}
    >
      <BodyText
        style={{
          fontSize: 30,
          fontWeight: 600,
          paddingLeft: 15,
        }}
      >
        {props.section}
      </BodyText>
      {props.children}
    </div>
  );
};

export { ReviewOfferSection };
