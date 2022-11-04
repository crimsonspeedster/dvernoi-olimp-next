import React from 'react';
import sprite from '@icons/sprite.svg';
import styles from './Intro.module.scss';
import classNames from "classnames";

const CheckoutDelivery = () => {
    return (
        <div className={styles['checkout-info__item']}>
            <div className={styles['checkout-info__header']}>
                <div className={styles['checkout-info__header-number']}>2</div>

                <div className={styles['checkout-info__header-title']}>Доставка</div>
            </div>

            <div className={classNames(styles['checkout-info__delivery'], styles['checkout-info__select'])}>
                <span className={styles['checkout-info__label']}>Выберите способ доставки:</span>

                <div className={styles['checkout-info__inner']}>
                    <div className={styles['checkout-info__select-item']}>
                        <input className={styles['checkout-info__select-radio']} id="checkout-delivery-1" type="radio" name="checkout-delivery" value="store"/>

                        <label className={styles['checkout-info__select-btn']} htmlFor="checkout-delivery-1">
                            <span className={styles['checkout-info__select-icon']}>
                                <svg>
                                    <use href={`${sprite.src}#user`}/>
                                </svg>
                            </span>

                            <span className={styles['checkout-info__select-check']} />

                            <span className={styles['checkout-info__select-text']}>Самовывоз из магазина</span>
                        </label>
                    </div>

                    <div className={styles['checkout-info__select-item']}>
                        <input className={styles['checkout-info__select-radio']} id="checkout-delivery-2" type="radio" name="checkout-delivery" value="branch"/>

                      <label className={styles['checkout-info__select-btn']} htmlFor="checkout-delivery-2">
                            <span className={styles['checkout-info__select-icon']}>
                                <svg>
                                    <use href={`${sprite.src}#newpost`}/>
                                </svg>
                            </span>

                            <span className={styles['checkout-info__select-check']} />

                            <span className={styles['checkout-info__select-desc']}>
                                <span className={styles['checkout-info__select-text']}>В отделение «Новая Почта»</span>

                                <span className={styles['checkout-info__select-subtext']}>Доставка от +350 грн»</span>
                            </span>
                        </label>
                    </div>

                    <div className={styles['checkout-info__select-item']}>
                        <input className={styles['checkout-info__select-radio']} id="checkout-delivery-3" type="radio" name="checkout-delivery" value="courier"/>

                        <label className={styles['checkout-info__select-btn']} htmlFor="checkout-delivery-3">
                            <span className={styles['checkout-info__select-icon']}>
                                <svg>
                                    <use href={`${sprite.src}#newpost`}/>
                                </svg>
                            </span>

                            <span className={styles['checkout-info__select-check']} />

                            <span className={styles['checkout-info__select-desc']}>
                                <span className={styles['checkout-info__select-text']}>Курьером по адресу</span>

                                <span className={styles['checkout-info__select-subtext']}>Доставка от +450 грн</span>
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutDelivery