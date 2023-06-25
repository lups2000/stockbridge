import React from 'react';
import { Button, Card as BootStrapCard } from 'react-bootstrap';
import { palette } from '../../../utils/colors';

export interface CardProps {
  header: string;
  price: number;
  features: string[];
  buttonLabel: string;
  outline: boolean;
  buttonOnClick?: (amount: number, product: string) => () => void;
  disabled: boolean;
}
const Card = (props: CardProps) => {
  return (
    <BootStrapCard
      className={
        'shadow-sm p-0 m-auto text-center' +
        (props.outline ? '' : ' opacity-50')
      }
      style={{ width: '18rem' }}
    >
      <BootStrapCard.Header>
        <h4>{props.header}</h4>
      </BootStrapCard.Header>
      <BootStrapCard.Body>
        <BootStrapCard.Title className="pricing-card-title">
          {`${props.price}€`}
          <small className="text-muted"> /mo</small>
        </BootStrapCard.Title>
        <ul className="list-unstyled mt-3 mb-4">
          {props.features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
        <Button
          type="button"
          disabled={props.disabled}
          onClick={props.buttonOnClick!(props.price, props.header)}
          className={'btn btn-lg btn-block mb-2'}
          style={{
            width: '100%',
            border: 'none',
            backgroundColor: palette.subSectionsBgAccent,
            borderRadius: 15,
          }}
        >
          {props.buttonLabel}
        </Button>
      </BootStrapCard.Body>
    </BootStrapCard>
  );
};

export default Card;
