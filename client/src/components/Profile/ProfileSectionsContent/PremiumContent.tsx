import React, { useContext, useEffect, useState } from 'react';
import Card, { CardProps } from '../Premium/Card';
import { Container, Row } from 'react-bootstrap';
import PaymentElement, { PaymentType } from '../../Payment/PaymentElement';
import { LoginContext } from '../../../contexts/LoginContext';
import {
  cancelSubscription,
  getInvoiceLink,
} from '../../../api/collections/payment';
import { SubscriptionStatus } from '../../../api/collections/user';

const prioTickets: CardProps[] = [
  {
    header: 'Basic Pack',
    price: 5,
    features: ['5 Tickets'],
    buttonLabel: 'Purchase',
    outline: true,
    disabled: false,
  },
  {
    header: 'Advanced Pack',
    price: 10,
    features: ['10 Tickets'],
    buttonLabel: 'Purchase',
    outline: true,
    disabled: false,
  },
  {
    header: 'Premium Pack',
    price: 15,
    features: ['20 Tickets'],
    buttonLabel: 'Purchase',
    outline: true,
    disabled: false,
  },
];

const subscriptionPlans: CardProps[] = [
  {
    header: 'Basic Subscription',
    price: 10,
    features: ['10 Adverts/Week', '3 Priority Adverts/Week', '24/7 Support'],
    buttonLabel: 'Purchase',
    outline: true,
    disabled: false,
  },
  {
    header: 'Advanced Subscription',
    price: 15,
    features: ['15 Adverts/Week', '5 Priority Adverts/Week', '24/7 Support'],
    buttonLabel: 'Purchase',
    outline: true,
    disabled: false,
  },
  {
    header: 'Premium Subscription',
    price: 30,
    features: [
      'Unlimited Adverts/Week',
      '10 Priority Adverts/Week',
      '24/7 Support',
    ],
    buttonLabel: 'Purchase',
    outline: true,
    disabled: false,
  },
];

const PremiumContent = () => {
  const [showModal, setShowModal] = useState(false);
  const [amount, setAmount] = useState(0);
  const [product, setProduct] = useState('');
  const [promptPay, setPromptPay] = useState<boolean>(false);
  const [invoiceLink, setInvoiceLink] = useState<string>('');
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useContext(LoginContext);
  if (
    user?.subscription &&
    [
      SubscriptionStatus.UNPAID,
      SubscriptionStatus.PAST_DUE,
      SubscriptionStatus.ACTIVE,
    ].includes(user?.subscription?.status)
  ) {
    subscriptionPlans.forEach((obj) => {
      if (obj.header === user?.subscription?.type) {
        obj.buttonLabel = 'Cancel Subscription';
        obj.outline = true;
        obj.disabled = false;
        obj.buttonOnClick = (amount: number, product: string) => () => {
          setShowModal(false);
          cancelSubscription().then(() => {
            window.location.reload();
          });
        };
      } else {
        obj.buttonLabel = 'Purchase';
        obj.outline = false;
        obj.disabled = true;
      }
    });
  }
  useEffect(() => {
    if (
      user?.subscription &&
      [SubscriptionStatus.UNPAID, SubscriptionStatus.PAST_DUE].includes(
        user?.subscription?.status,
      )
    ) {
      setPromptPay(true);
      getInvoiceLink().then((link) => setInvoiceLink(link));
    }
  }, [user]);

  const plans = subscriptionPlans.map((obj, i) => {
    return (
      <Card
        key={obj.header}
        header={obj.header}
        price={obj.price}
        features={obj.features}
        buttonLabel={obj.buttonLabel}
        outline={obj.outline}
        buttonOnClick={
          obj.buttonOnClick
            ? obj.buttonOnClick
            : (amount: number, product: string) => () => {
                setShowModal(true);
                setAmount(amount);
                setProduct(product);
              }
        }
        disabled={obj.disabled}
      />
    );
  });

  const tickets = prioTickets.map((obj, i) => {
    return (
      <Card
        key={obj.header}
        header={obj.header}
        price={obj.price}
        features={obj.features}
        buttonLabel={obj.buttonLabel}
        outline={obj.outline}
        buttonOnClick={(amount: number, product: string) => () => {
          setShowModal(true);
          setAmount(amount);
          setProduct(product);
        }}
        disabled={obj.disabled}
      />
    );
  });

  return (
    <>
      <Container fluid className="py-2 overflow-hidden ">
        <Row className="mb-5 justify-content-center text-center">
          <h2> Subscription Plans </h2>
        </Row>
        {promptPay && (
          <Row className="mb-5 justify-content-center text-center">
            <h4>
              You have an unpaid invoice. Please pay the invoice before
              purchasing a new subscription.
            </h4>
            <a href={invoiceLink} target="_blank" rel="noreferrer">
              {' '}
              Click here to pay the invoice{' '}
            </a>
          </Row>
        )}
        <Row className="d-flex flex-row flex-nowrap overflow-auto justify-content-center">
          {plans}
        </Row>
        <Row className="my-5 justify-content-center text-center">
          <h2> Prioritization Tickets </h2>
        </Row>
        <Row className="d-flex flex-row flex-nowrap overflow-auto justify-content-center">
          {tickets}
        </Row>
      </Container>
      {amount > 0 && product && (
        <PaymentElement
          amount={amount * 100}
          show={showModal}
          onHide={() => setShowModal(false)}
          product={product}
          type={
            product.toLowerCase().includes('subscription')
              ? PaymentType.SUBSCRIPTION
              : PaymentType.PAYMENT_INTENT
          }
        />
      )}
    </>
  );
};

export default PremiumContent;
