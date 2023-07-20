import React, { useState } from 'react';
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
  mutedText?: string;
}

const Card = (props: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const isPlan = props.header.includes('Subscription');

  const color = isPlan
    ? props.header.includes('Basic')
      ? palette.basicSub
      : props.header.includes('Advanced')
      ? palette.advancedSub
      : palette.premiumSub
    : palette.subSectionsBgAccent;

  const paleColor = `${color}40`; // Here, '40' represents 40% opacity

  const selectedCard = props.buttonLabel.includes('Cancel');

  return (
    <BootStrapCard
      className={
        'shadow-sm p-0 m-auto text-center mb-5' +
        (props.outline ? '' : ' opacity-50')
      }
      style={{
        width: '18rem',
        borderRadius: 20,
        borderColor: isHovered ? color : undefined,
        transition: 'transform 0.3s, box-shadow 0.3s',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isHovered ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
        backgroundColor: selectedCard ? paleColor : undefined,
      }}
      onMouseEnter={() => (!props.disabled ? setIsHovered(true) : undefined)}
      onMouseLeave={() => (!props.disabled ? setIsHovered(false) : undefined)}
    >
      <BootStrapCard.Body>
        <h4 style={{ marginBottom: 50 }}>{props.header}</h4>
        <BootStrapCard.Title
          className="pricing-card-title"
          style={{ marginBottom: 50 }}
        >
          {`${props.price}€`}
          <small className="text-muted"> {props.mutedText || ''}</small>
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
            backgroundColor: color,
            opacity: isPlan
              ? selectedCard
                ? 0.8
                : isHovered
                ? isPlan
                  ? 0.8
                  : 1.0
                : 0.6
              : 1.0,
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
