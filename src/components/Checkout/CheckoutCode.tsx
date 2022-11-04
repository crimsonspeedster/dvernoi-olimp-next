import React from 'react';
import styles from './Intro.module.scss';

const CheckoutCode = () => {
    return (
        <div className={styles['checkout-content__code']}>
            <label className={styles['checkout-content__code-label']} htmlFor="checkout-code">Промокод</label>

            <div className={styles['checkout-content__code-inp-wrapper']}>
                <input
                    className={styles['checkout-content__code-inp']}
                    id="checkout-code"
                    name="code"
                    autoComplete="off"
                    placeholder="Есть промокод? А если найду?"
                    type="text"
                />
            </div>
        </div>
    )
}

export default CheckoutCode;