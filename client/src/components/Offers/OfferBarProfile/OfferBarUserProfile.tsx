import React, { useContext, useEffect, useState } from 'react';
import { PopulatedOffer } from '../../../api/collections/offer';
import { PopulatedAdvert } from '../../../api/collections/advert';
import { OfferModal } from '../OfferModal';
import { User } from '../../../api/collections/user';
import { OfferBarUserProfileInfo } from './OfferBarUserProfileInfo';

type OfferBarUserProfileProps = {
    offer: PopulatedOffer;
    advert: PopulatedAdvert;
    outgoing: boolean;
};

/**
 * This is an offer bar for the userinfo page. To avoid breaking the product overview functionality. TODO: refactor
 * @param props 
 * @returns 
 */
const OfferBarUserProfile: React.FC<OfferBarUserProfileProps> = (props) => {
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
                setOfferer(props.offer.offeror!);
                setOfferee(props.offer.offeree!);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
                <OfferBarUserProfileInfo
                    onClick={openModal}
                    picture = {props.advert.imageurl}
                    advert={props.advert}
                    offer={props.offer}
                    outgoing = {props.outgoing}
                />
                {showModal && (
                    <OfferModal
                        isShowing={showModal}
                        onClose={closeModal}
                        onSave={closeModalOnSave}
                        advert={props.advert}
                        offer={props.offer}
                        storeName={offeree.name!}
                        rating={offeree.rating!}
                    />
                )}
        </>
    );
};

export { OfferBarUserProfile };
