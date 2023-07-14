import React, { useContext, useEffect, useState } from 'react';
import { PopulatedOffer } from '../../../api/collections/offer';
import { Advert, PopulatedAdvert } from '../../../api/collections/advert';
import { OfferModal } from '../OfferModal';
import { User } from '../../../api/collections/user';
import { OfferBarUserProfileInfo } from './OfferBarUserProfileInfo';
import { NestedPopulatedOrder } from '../../../api/collections/order';
import { OrderBarUserProfileInfo } from './OrderBarUserProfileInfo';

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
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        setShowModal(false);
    };

    const closeModalOnSave = () => {
        setShowModal(false);
        //change to set Advert
        window.location.reload();
    };

    const openModal = () => {
        setShowModal(true);
    };
    const [offerer, setOfferer] = useState({} as User);
    const [offeree, setOfferee] = useState({} as User);
    useEffect(() => {
        const fetchData = () => {
            try {
                setOfferer(props.order.offer?.offeror!);
                setOfferee(props.order.offer?.offeree!);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
                <OrderBarUserProfileInfo
                    onClick={() => {}}
                    picture = {props.advert?.imageurl}
                    advert={props.advert}
                    offer={props.order.offer as PopulatedOffer}
                    outgoing = {props.outgoing}
                    highlight= {props.highlight}
                />
                {/* {showModal && (
                    <OfferModal
                        isShowing={showModal}
                        onClose={closeModal}
                        onSave={closeModalOnSave}
                        advert={props.advert}
                        offer={props.order.offer as PopulatedOffer}
                        storeName={offerer}
                        rating={3}
                    />
                )} */}
        </>
    );
};

export { OrderBarUserProfile };
