import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import {
  PaymentIntentResult,
  StripePaymentElementOptions,
} from '@stripe/stripe-js';
import { Modal, Spinner } from 'react-bootstrap';
import { PaymentProps, PaymentType } from './PaymentElement';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PaymentModal(props: PaymentProps) {
  const stripe = useStripe();
  const elements = useElements();
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  let buttonText = 'Pay now';
  switch (props.type) {
    case PaymentType.PAYMENT_INTENT:
      buttonText = 'Pay now';
      break;
    case PaymentType.SETUP_INTENT:
      buttonText = 'Set up';
      break;
    case PaymentType.SUBSCRIPTION:
      buttonText = 'Subscribe';
      break;
  }

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret',
    );

    if (!clientSecret) {
      return;
    }
    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }: PaymentIntentResult) => {
        if (!paymentIntent) {
          return setMessage('Payment intent not found.');
        }
        switch (paymentIntent.status) {
          case 'succeeded':
            setMessage('Payment succeeded!');
            break;
          case 'processing':
            setMessage('Your payment is processing.');
            break;
          case 'requires_payment_method':
            setMessage('Your payment was not successful, please try again.');
            break;
          default:
            setMessage('Something went wrong.');
            break;
        }
      });
  }, [stripe]);

  let notify: () => void;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    let error;
    switch (props.type) {
      case PaymentType.SUBSCRIPTION:
      case PaymentType.PAYMENT_INTENT:
        ({ error } = await stripe.confirmPayment({
          elements,
          redirect: 'if_required',
          confirmParams: {
            // Make sure to change this to your payment completion page
            return_url: 'http://localhost:3000/userInfo',
          },
        }));
        break;
      case PaymentType.SETUP_INTENT:
        ({ error } = await stripe.confirmSetup({
          elements,
          redirect: 'if_required',
          confirmParams: {
            return_url: 'http://localhost:3000/userInfo',
          },
        }));
        break;
      default:
        notify = () =>
          toast.error('Invalid type', {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        throw new Error('Invalid type');
    }

    if (!error) {
      props.onHide();
      setIsLoading(false);
      setMessage('');
      if (props.onSuccess) {
        props.onSuccess();
        if (props.type !== PaymentType.SETUP_INTENT) {
          await sleep(2000);
          window.location.reload();
        }
      }
      toast.success('Succeeded!', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }
    let errorMessage: string;
    if (error!.type === 'card_error' || error!.type === 'validation_error') {
      setMessage(error!.message!);
      errorMessage = error!.message!;
    } else {
      setMessage('An unexpected error occurred.');
      errorMessage = 'An unexpected error occurred.';
    }

    notify = () =>
      toast.error(errorMessage, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    notify();
    setIsLoading(false);
  };

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: 'tabs',
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={() => {
          props.onHide();
          setMessage('');
        }}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '16px',
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            padding: '0',
            // height: '100vh',
            // width: '100vw',
          }}
        >
          <form
            id="payment-form"
            onSubmit={handleSubmit}
            style={{
              width: '30vw',
              minWidth: '500px',
              alignSelf: 'center',
              // boxShadow:
              //   '0px 0px 0px 0.5px rgba(50, 50, 93, 0.1), 0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07)',
              borderRadius: '7px',
              padding: '20px 40px',
            }}
          >
            <PaymentElement
              id="payment-element"
              options={paymentElementOptions}
            />
            <button
              disabled={isLoading || !stripe || !elements}
              id="submit"
              style={{
                background: '#5469d4',
                fontFamily: 'Arial, sans-serif',
                color: '#ffffff',
                borderRadius: '4px',
                border: 0,
                padding: '12px 16px',
                marginTop: '16px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'block',
                transition: 'all 0.2s ease',
                boxShadow: '0px 4px 5.5px 0px rgba(0, 0, 0, 0.07)',
                width: '100%',
              }}
            >
              <span id="button-text">
                {isLoading ? <Spinner animation="grow" /> : buttonText}
              </span>
            </button>
            {/* Show any error or success messages */}
            {message && (
              <div
                id="payment-message"
                style={{
                  color: 'rgb(105, 115, 134)',
                  fontSize: '16px',
                  lineHeight: '20px',
                  paddingTop: '12px',
                  textAlign: 'center',
                }}
              >
                {message}
              </div>
            )}
          </form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </>
  );
}
