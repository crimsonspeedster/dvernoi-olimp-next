import React, {Dispatch, SetStateAction, useContext} from 'react';
import Link from "next/link";
import styles from './Intro.module.scss';
import productImg from '@images/single-product.jpg';
import classNames from "classnames";
import QuickModal from '@components/Modal/QuickModal';
import {CartItemProps, CartItemsProps} from "@pages/cart";
import {Else, If, Then} from "react-if";
import CartItem from "@components/Cart/CartItem";
import {useSelector} from "react-redux";
import cart, {selectCartAmountState} from "@store/cart";


interface CartIntroProps {
    title: string,
    items: CartItemsProps[],
    total_price: number,
    setTotalPrice: Dispatch<SetStateAction<number>>
}

const CartIntro:React.FC<CartIntroProps> = (props) => {
    const {
        title,
        items,
        total_price,
        setTotalPrice
    } = props;

    const cartAmountItems = useSelector(selectCartAmountState);

    return (
        <section className={classNames(styles['cart'], 'intro')}>
            <div className="container">
                <h1 className={classNames(styles['cart__title'], 'title', 'title--dark')}>{title}</h1>

                <If condition={cartAmountItems > 0}>
                    <Then>
                        <div className={styles['cart__table']}>
                            <div className={classNames(styles['cart__header'], styles['cart-header'])}>
                                <div className={styles['cart-header__item']}>Товары</div>

                                <div className={styles['cart-header__item']}>Цена</div>

                                <div className={styles['cart-header__item']}>Количество</div>

                                <div className={styles['cart-header__item']}>Сумма</div>
                            </div>

                            <div className={classNames(styles['cart__list'], styles['cart-list'])}>
                                {
                                    Object.keys(items).map((val, i) => (
                                        <CartItem
                                            key={items[val].hash}
                                            type={items[val].type}
                                            hash={items[val].hash}
                                            variation_product={items[val].variation_product}
                                            meta_data={items[val].meta_data}
                                            id={items[val].id}
                                            quantity={items[val].quantity}
                                            variation_id={items[val].variation_id}
                                            variation={items[val].variation}
                                            totals={items[val].totals}
                                            product={items[val].product}
                                            setTotalPrice={setTotalPrice}
                                        />
                                    ))
                                }
                            </div>

                            <div className={classNames(styles['cart__footer'], styles['cart-footer'])}>
                                <Link href="/catalog" className={classNames(styles['cart-footer__btn'], styles['cart-footer__btn--back'])}>
                                    Назад к покупкакам
                                </Link>

                                <div className={styles['cart-footer__total-price']}>
                                    <span>Итог:</span>

                                    {total_price} грн
                                </div>

                                <div className={styles['cart-footer__btns']}>
                                    <button
                                        className={classNames(styles['cart-footer__btn'], styles['cart-footer__btn--fast'])}
                                        type="button"
                                        data-fancybox="quick"
                                        data-src="#quick-modal"
                                    >
                                        Быстрый заказ
                                    </button>

                                    <Link
                                        href={`checkout/`}
                                        className={classNames(styles['cart-footer__btn'], styles['cart-footer__btn--checkout'])}
                                    >
                                        Перейти к оформлению
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Then>
                    <Else>
                        <div className={styles['cart-empty']}>
                            <p className={styles['cart-empty__title']}>Корзина пуста</p>

                            <Link className={classNames(styles['cart-footer__btn'], styles['cart-footer__btn--back'])} href="/catalog">Назад к покупкам</Link>
                        </div>
                    </Else>
                </If>
            </div>

            <QuickModal/>
        </section>
    );
}

export default CartIntro;