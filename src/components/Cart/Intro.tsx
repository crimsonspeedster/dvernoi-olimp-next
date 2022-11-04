import React, {useContext} from 'react';
import Link from "next/link";
import styles from './Intro.module.scss';
import QuickModal from '@components/Modal/QuickModal';
import {PrefixContext} from '@components/context/PrefixContext';
import productImg from '@images/single-product.jpg';
import classNames from "classnames";

const CartIntro = () => {
    let prefix = useContext(PrefixContext);

    return (
        <section className={classNames(styles['cart'], 'intro')}>
            <div className="container">
                <h1 className={classNames(styles['cart__title'], 'title', 'title--dark')}>Моя корзина</h1>

                <div className={styles['cart__table']}>
                    <div className={classNames(styles['cart__header'], styles['cart-header'])}>
                        <div className={styles['cart-header__item']}>Товары</div>

                        <div className={styles['cart-header__item']}>Цена</div>

                        <div className={styles['cart-header__item']}>Количество</div>

                        <div className={styles['cart-header__item']}>Сумма</div>
                    </div>
                    <div className={classNames(styles['cart__list'], styles['cart-list'])}>
                        {
                            new Array(2).fill('').map((_, index) => {
                                return (
                                    <div className={styles['cart-list__item']} key={index}>
                                        <div className={styles['cart-list__item-inner']}>
                                            <div className={styles['cart-list__item-preview']}>
                                                <div className={styles['cart-list__item-preview-inner']}>
                                                    <img src={productImg.src} alt="" width={48} height={55}/>
                                                </div>
                                            </div>

                                            <div className={styles['cart-list__item-info']}>
                                                <div className={styles['cart-list__item-title']}>Входные двери B 3.11 Венге/Белый супермат М2, Mottura. БЕРИСЛАВ</div>

                                                <div className={styles['cart-list__item-chars']}>
                                                    <div className={styles['cart-list__item-chars-elem']}>Размер двери: 610х2000 мм</div>

                                                    <div className={styles['cart-list__item-chars-elem']}>Коробка: 80 мм (1 к-т)</div>

                                                    <div className={styles['cart-list__item-chars-elem']}>Наличник: на одну сторону 70 мм</div>

                                                    <div className={styles['cart-list__item-chars-elem']}>Добор: 100 мм</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles['cart-list__item-inner']}>
                                            <div className="cart-list__item-current-price">14 780 грн</div>
                                        </div>

                                        <div className={styles['cart-list__item-inner']}>
                                            <div className={styles['cart-list__item-counter']}>
                                                <button className={classNames(styles['cart-list__item-counter-btn'], styles['cart-list__item-counter-btn--minus'])} />

                                                <input className={styles['cart-list__item-counter-inp']} type="text" name="counter" autoComplete="off" value={0}/>

                                                <button className={classNames(styles['cart-list__item-counter-btn'], styles['cart-list__item-counter-btn--plus'])} />
                                            </div>
                                        </div>

                                        <div className={styles['cart-list__item-inner']}>
                                            <div className={styles['cart-list__item-total-price']}>14 780 грн</div>
                                        </div>

                                        <div className={styles['cart-list__item-close']} />
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className={classNames(styles['cart__footer'], styles['cart-footer'])}>
                        <Link href={`${prefix}/`}>
                          <a className={classNames(styles['cart-footer__btn'], styles['cart-footer__btn--back'])}>Назад к покупкакам</a>
                        </Link>

                        <div className={styles['cart-footer__total-price']}>
                            <span>Итог:</span>

                            14 780 грн
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

                            <Link href={`${prefix}checkout/`}>
                              <a className={classNames(styles['cart-footer__btn'], styles['cart-footer__btn--checkout'])}>Перейти к оформлению</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <QuickModal/>
        </section>
    );
}

export default CartIntro;