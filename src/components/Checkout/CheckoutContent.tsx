import React from 'react';
import CheckoutList from './CheckoutList';
import CheckoutCode from './CheckoutCode';
import CheckoutTotal from './CheckoutTotal';
import {If, Then} from 'react-if';
import styles from './Intro.module.scss';
import classNames from "classnames";


interface CheckoutContentProps {
    isMobileList: boolean
}

const CheckoutContent:React.FC<CheckoutContentProps> = ({isMobileList}) => {
    return (
        <div className={classNames(styles['checkout__content'], 'checkout-content')}>
            <div className={styles['checkout-content__inner']}>
                <If condition={!isMobileList}>
                    <Then>
                        <CheckoutList/>
                    </Then>
                </If>

                <CheckoutCode />

                <CheckoutTotal />
            </div>
        </div>
    );
}

export default CheckoutContent;