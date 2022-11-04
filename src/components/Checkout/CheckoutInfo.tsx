import React from 'react';
import CheckoutContacts from './CheckoutContacts';
import CheckoutDelivery from './CheckoutDelivery';
import CheckoutPay from './CheckoutPay';
import styles from './Intro.module.scss';
import classNames from "classnames";


interface CheckoutInfoProps {
    isMobileList: boolean
}

const CheckoutInfo:React.FC<CheckoutInfoProps> = ({isMobileList}) => {
    return (
        <div className={classNames(styles['checkout__info'], styles['checkout-info'])}>
            <CheckoutContacts isMobileList={isMobileList} />

            <CheckoutDelivery />

            <CheckoutPay />
        </div>
    )
}

export default CheckoutInfo