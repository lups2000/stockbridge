import React, { useContext, useEffect, useState } from 'react';
import { PopulatedOffer } from '../../../api/collections/offer';
import { Advert } from '../../../api/collections/advert';
import { User } from '../../../api/collections/user';
import {
  cancelOrder as cancelOrderAPI,
  NestedPopulatedOrder,
} from '../../../api/collections/order';
import { OrderBarUserProfileInfo } from './OrderBarUserProfileInfo';
import PendingOrderModal from './PendingOrderModal';
import { LoginContext } from '../../../contexts/LoginContext';
import PaymentElement, { PaymentType } from '../../Payment/PaymentElement';

type OrderBarUserProfileProps = {
  order: NestedPopulatedOrder;
  advert: Advert;
  outgoing: boolean;
  highlight: string;
};

/**
 * This is an order bar for the userinfo page. To avoid breaking the product overview functionality.
 * @param props
 * @returns
 */
const OrderBarUserProfile: React.FC<OrderBarUserProfileProps> = (props) => {
  const { user } = useContext(LoginContext);
  const [offerer, setOfferer] = useState({} as User);
  const [offeree, setOfferee] = useState({} as User);
  const [isPayer, setIsPayer] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    const fetchData = () => {
      try {
        setOfferer(props.order.offer?.offeror!);
        setOfferee(props.order.offer?.offeree!);
        if (props.advert.type === 'Ask') {
          // Offeree is the payer
          setIsPayer(props.order.offer?.offeree?._id === user?._id);
        } else {
          // Offeror is the payer
          setIsPayer(props.order.offer?.offeror?._id === user?._id);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Show order modal.
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const cancelOrder = async () => {
    await cancelOrderAPI(props.order._id);
    closeModal();
  };

  // Show payment modal.
  const [isPaymentModalShowing, setIsPaymentModalShowing] = useState(false);
  const [loadPaymentModal, setLoadPaymentModal] = useState(false);

  return (
    <>
      <OrderBarUserProfileInfo
        picture={props.advert?.imageurl}
        advert={props.advert}
        order={props.order}
        offer={props.order.offer as PopulatedOffer}
        outgoing={props.outgoing}
        highlight={props.highlight}
        onClick={openModal}
      />
      <PendingOrderModal
        show={showModal}
        handleClose={closeModal}
        isPayer={isPayer || false}
        body={
          isPayer
            ? 'You have a pending order. You can either pay or cancel the order'
            : 'Waiting for payment.'
        }
        onPay={() => {
          setIsPaymentModalShowing(true);
          setLoadPaymentModal(true);
          closeModal();
        }}
        onCancel={cancelOrder}
      />
      {isPayer && loadPaymentModal && (
        <PaymentElement
          show={isPaymentModalShowing}
          onHide={() => setIsPaymentModalShowing(false)}
          type={PaymentType.PAYMENT_INTENT}
          product={'offerId_' + props.order.offer?._id}
          amount={props.order.totalPrice}
        />
      )}
    </>
  );
};

export { OrderBarUserProfile };
