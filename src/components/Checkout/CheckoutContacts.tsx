import React from 'react'
import CheckoutList from './CheckoutList';
import styles from './Intro.module.scss';
import {If, Then} from 'react-if';


interface CheckoutContactsProps {
    isMobileList: boolean
}

const CheckoutContacts: React.FC<CheckoutContactsProps> = ({isMobileList}) => {
    return (
        <div className={styles['checkout-info__item']}>
            <div className={styles['checkout-info__header']}>
                <div className={styles['checkout-info__header-number']}>1</div>

                <div className={styles['checkout-info__header-title']}>Контактные данные</div>
            </div>

            <div className={styles['checkout-info__inps']}>
                <div className={styles['checkout-info__inp-wrapper']}>
                    <label className={styles['checkout-info__label']} htmlFor="checkout-first-name">Имя</label>

                    <div className={styles['checkout-info__inp-inner']}>
                        <input
                            className={styles['checkout-info__inp']}
                            id="checkout-first-name"
                            name="first-name"
                            autoComplete="off"
                            placeholder="Ваше имя"
                            type="text"
                        />
                    </div>
                </div>

                <div className={styles['checkout-info__inp-wrapper']}>
                    <label className={styles['checkout-info__label']} htmlFor="checkout-last-name">Фамилия</label>

                    <div className={styles['checkout-info__inp-inner']}>
                        <input
                            className={styles['checkout-info__inp']}
                            id="checkout-last-name"
                            name="last-name"
                            autoComplete="off"
                            placeholder="Ваша фамилия"
                            type="text"
                        />
                    </div>
                </div>

                <div className={styles['checkout-info__inp-wrapper']}>
                    <label className={styles['checkout-info__label']} htmlFor="checkout-phone">Мобильный телефон</label>

                    <div className={styles['checkout-info__inp-inner']}>
                        <input
                            className={styles['checkout-info__inp']}
                            id="checkout-phone"
                            name="phone"
                            autoComplete="off"
                            placeholder="+38 (000) ___ __ __"
                            type="tel"
                        />
                    </div>
                </div>

                <div className={styles['checkout-info__inp-wrapper']}>
                    <label className={styles['checkout-info__label']} htmlFor="checkout-email">Email</label>

                    <div className={styles['checkout-info__inp-inner']}>
                        <input
                            className={styles['checkout-info__inp']}
                            id="checkout-email"
                            name="email"
                            autoComplete="off"
                            placeholder="Email"
                            type="text"
                        />
                    </div>
                </div>
            </div>

            <If condition={isMobileList}>
                <Then>
                    <CheckoutList />
                </Then>
            </If>
        </div>
    )
}

export default CheckoutContacts