import React from 'react';
import sprite from '@icons/sprite.svg';
import styles from './Intro.module.scss';
import classNames from "classnames";

const CheckoutPay = () => {
    return (
        <div className={styles['checkout-info__item']}>
            <div className={styles['checkout-info__header']}>
                <div className={styles['checkout-info__header-number']}>3</div>

                <div className={styles['checkout-info__header-title']}>Метод оплаты</div>
            </div>

            <div className={classNames(styles['checkout-info__pay'], styles['checkout-info__select'])}>
                <span className={styles['checkout-info__label']}>Выберите метод оплаты</span>

                <div className={styles['checkout-info__inner']}>
                    <div className={styles['checkout-info__select-item']}>
                        <input className={styles['checkout-info__select-radio']} id="checkout-pay-1" type="radio" name="checkout-pay" value="cash"/>

                        <label className={styles['checkout-info__select-btn']} htmlFor="checkout-pay-1">
                            <span className={classNames(styles['checkout-info__select-icon'], styles['checkout-info__select-icon--small'])}>
                                <svg>
                                    <use href={`${sprite.src}#money`}/>
                                </svg>
                            </span>

                            <span className={styles['checkout-info__select-check']} />

                            <span className={styles['checkout-info__select-text']}>Наличными</span>
                        </label>
                    </div>

                    <div className={styles['checkout-info__select-item']}>
                        <input className={styles['checkout-info__select-radio']} id="checkout-pay-2" type="radio" name="checkout-pay" value="card"/>

                        <label className={styles['checkout-info__select-btn']} htmlFor="checkout-pay-2">
                            <span className={classNames(styles['checkout-info__select-icon'], styles['checkout-info__select-icon--big'])}>
                                <svg>
                                    <use href={`${sprite.src}#paymethods`} />
                                </svg>
                            </span>

                            <span className={styles['checkout-info__select-check']} />

                            <span className={styles['checkout-info__select-text']}>Картой на сайте»</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className={styles['checkout-info__textarea-wrapper']}>
                <label className={styles['checkout-info__label']} htmlFor="checkout-message">Добавить комментарий</label>

                <div className={styles['checkout-info__textarea-inner']}>
                    <textarea
                        className={styles['checkout-info__textarea']}
                        id="checkout-message"
                        name="message"
                        autoComplete="off"
                        placeholder="Напишите что считаете важным"
                    />
                </div>
            </div>
        </div>
    )
}

export default CheckoutPay