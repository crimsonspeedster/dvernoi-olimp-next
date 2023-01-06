import React, {Dispatch, SetStateAction, useContext, useEffect} from 'react';
import Link from "next/link";
import styles from './Intro.module.scss';
import productImg from '@images/single-product.jpg';
import classNames from "classnames";
import QuickModal from '@components/Modal/QuickModal';
import {CartItemProps, CartItemsProps} from "@pages/cart";
import {Else, If, Then} from "react-if";
import CartItem from "@components/Cart/CartItem";
import {useSelector} from "react-redux";
import {selectAllCartData, selectCartAmountState, selectCartTotalPrice} from "@store/cart";
import {useTranslation} from "next-i18next";


interface CartIntroProps {
    title: string
}

const CartIntro:React.FC<CartIntroProps> = (props) => {
    const {
        title,
    } = props;

    const cartData = useSelector(selectAllCartData);
    const {t} = useTranslation('common');

    return (
        <section className={classNames(styles['cart'], 'intro')}>
            <div className="container">
                <h1 className={classNames(styles['cart__title'], 'title', 'title--dark')}>{title}</h1>

                <If condition={cartData.total_amount > 0}>
                    <Then>
                        <div className={styles['cart__table']}>
                            <div className={classNames(styles['cart__header'], styles['cart-header'])}>
                                <div className={styles['cart-header__item']}>{t('productsTitle')}</div>

                                <div className={styles['cart-header__item']}>{t('priceTitle')}</div>

                                <div className={styles['cart-header__item']}>{t('amountTitle')}</div>

                                <div className={styles['cart-header__item']}>{t('sumTitle')}</div>
                            </div>

                            <div className={classNames(styles['cart__list'], styles['cart-list'])}>
                                {
                                    Object.keys(cartData.items).map((val, i) => (
                                        <CartItem
                                            key={cartData.items[val].hash}
                                            type={cartData.items[val].type}
                                            hash={cartData.items[val].hash}
                                            variation_product={cartData.items[val].variation_product}
                                            meta_data={cartData.items[val].meta_data}
                                            id={cartData.items[val].id}
                                            quantity={cartData.items[val].quantity}
                                            variation_id={cartData.items[val].variation_id}
                                            variation={cartData.items[val].variation}
                                            totals={cartData.items[val].totals}
                                            product={cartData.items[val].product}
                                        />
                                    ))
                                }
                            </div>

                            <div className={classNames(styles['cart__footer'], styles['cart-footer'])}>
                                <Link href="/catalog" className={classNames(styles['cart-footer__btn'], styles['cart-footer__btn--back'])}>
                                    {t('backToBuy')}
                                </Link>

                                <div className={styles['cart-footer__total-price']}>
                                    <span>{t('totle')}:</span>

                                    {cartData.total_price} грн
                                </div>

                                <div className={styles['cart-footer__btns']}>
                                    <button
                                        className={classNames(styles['cart-footer__btn'], styles['cart-footer__btn--fast'])}
                                        type="button"
                                        data-fancybox="quick"
                                        data-src="#quick-modal"
                                    >
                                        {t('fastOrderTitle')}
                                    </button>

                                    <Link
                                        href={`checkout/`}
                                        className={classNames(styles['cart-footer__btn'], styles['cart-footer__btn--checkout'])}
                                    >
                                        {t('toCheckout')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Then>
                    <Else>
                        <div className={styles['cart-empty']}>
                            <p className={styles['cart-empty__title']}>{t('cartEmpty')}</p>

                            <Link className={classNames(styles['cart-footer__btn'], styles['cart-footer__btn--back'])} href="/catalog">{t('backToBuy')}</Link>
                        </div>
                    </Else>
                </If>
            </div>

            <QuickModal />
        </section>
    );
}

export default CartIntro;