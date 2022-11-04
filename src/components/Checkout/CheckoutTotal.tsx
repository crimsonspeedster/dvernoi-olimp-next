import React from 'react';
import styles from './Intro.module.scss';
import sprite from '@icons/sprite.svg';
import classNames from "classnames";


const CheckoutTotal = () => {
    return (
        <div className={styles['checkout-content__total']}>
            <div className={styles['checkout-content__total-section']}>
                <div className={styles['checkout-content__total-item']}>
                    <div className={styles['checkout-content__total-title']}>Вместе:</div>

                    <div className={styles['checkout-content__total-value']}>2 товар на сумму</div>
                </div>

                <div className={styles['checkout-content__total-item']}>
                    <div className={styles['checkout-content__total-title']}>Цена доставки:</div>

                    <div className={styles['checkout-content__total-value']}>Бесплатно</div>
                </div>

                <div className={styles['checkout-content__total-item']}>
                    <div className={styles['checkout-content__total-title']}>Итого:</div>

                    <div className={styles['checkout-content__total-value']}>4 303 грн</div>
                </div>
            </div>

            <div className={styles['checkout-content__total-privacy']}>
                <input className={styles['checkout-content__total-privacy-check']} id="checkout-privacy" type="checkbox" name="privacy"/>

                <label className={styles['checkout-content__total-privacy-btn']} htmlFor="checkout-privacy">
                    <span className={styles['checkout-content__total-privacy-icon']}>
                        <svg>
                            <use href={`${sprite.src}#check`} />
                        </svg>
                    </span>

                    <span className={styles['checkout-content__total-privacy-text']}>
                        Подтверждая заказ, я согласен с <a href="#" target="_blank" rel="noreferrer nofollow">пользовательским соглашением</a>
                    </span>
                </label>
            </div>

            <div className={styles['checkout-content__total-btn-wrapper']}>
                <button className={classNames(styles['checkout-content__total-btn'], 'btn')}>
                    <span className={classNames(styles['checkout-content__total-btn-text'], 'btn__text')}>Оформить заказ</span>
                </button>
            </div>
        </div>
    )
}

export default CheckoutTotal