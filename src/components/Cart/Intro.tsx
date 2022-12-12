import React, {useContext} from 'react';
import Link from "next/link";
import styles from './Intro.module.scss';
import productImg from '@images/single-product.jpg';
import classNames from "classnames";
import QuickModal from '@components/Modal/QuickModal';


interface CartIntroProps {
    title: string
}

const CartIntro:React.FC<CartIntroProps> = (props) => {
    const {
        title,
    } = props;

    return (
        <section className={classNames(styles['cart'], 'intro')}>
            <div className="container">
                <h1 className={classNames(styles['cart__title'], 'title', 'title--dark')}>{title}</h1>

                <div className={styles['cart__table']}>
                    <div className={classNames(styles['cart__header'], styles['cart-header'])}>
                        <div className={styles['cart-header__item']}>Товары</div>

                        <div className={styles['cart-header__item']}>Цена</div>

                        <div className={styles['cart-header__item']}>Количество</div>

                        <div className={styles['cart-header__item']}>Сумма</div>
                    </div>

                    <div className={classNames(styles['cart__list'], styles['cart-list'])}>

                    </div>

                    <div className={classNames(styles['cart__footer'], styles['cart-footer'])}>
                        <Link href="/" className={classNames(styles['cart-footer__btn'], styles['cart-footer__btn--back'])}>
                            Назад к покупкакам
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

                            <Link
                                href={`checkout/`}
                                className={classNames(styles['cart-footer__btn'], styles['cart-footer__btn--checkout'])}
                            >
                                Перейти к оформлению
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