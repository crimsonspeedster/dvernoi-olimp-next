import React from "react";
import styles from "@components/Cart/Intro.module.scss";
import Image from "next/image";
import classNames from "classnames";


interface CartItemProps {

}

const CartItem:React.FC<CartItemProps> = (props) => {
    const {

    } = props;

    return (
        <div className={styles['cart-list__item']}>
            <div className={styles['cart-list__item-inner']}>
                <div className={styles['cart-list__item-preview']}>
                    <div className={styles['cart-list__item-preview-inner']}>
                        {/*<Image src={} alt={} width={48} height={55} />*/}
                    </div>
                </div>

                <div className={styles['cart-list__item-info']}>
                    <h3 className={styles['cart-list__item-title']}></h3>

                    <div className={styles['cart-list__item-chars']}>
                        <div className={styles['cart-list__item-chars-elem']}>Размер двери:
                            610х2000 мм
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles['cart-list__item-inner']}>
                <div className="cart-list__item-current-price">14 780 грн</div>
            </div>

            <div className={styles['cart-list__item-inner']}>
                <div className={styles['cart-list__item-counter']}>
                    <button
                        className={classNames(styles['cart-list__item-counter-btn'], styles['cart-list__item-counter-btn--minus'])}
                    />

                    <input className={styles['cart-list__item-counter-inp']} type="text"
                           name="counter" autoComplete="off" value={0}/>

                    <button
                        className={classNames(styles['cart-list__item-counter-btn'], styles['cart-list__item-counter-btn--plus'])}
                    />
                </div>
            </div>

            <div className={styles['cart-list__item-inner']}>
                <div className={styles['cart-list__item-total-price']}>14 780 грн</div>
            </div>

            <span
                className={styles['cart-list__item-close']}
            />
        </div>
    );
}

export default CartItem;