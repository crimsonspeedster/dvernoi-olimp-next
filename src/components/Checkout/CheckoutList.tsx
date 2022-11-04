import React, {useState} from 'react';
import {Collapse} from 'react-collapse';
import productImg from '@images/single-product.jpg';
import styles from './Intro.module.scss';
import classNames from "classnames";

const CheckoutList = () => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    return (
        <div className={classNames(styles['checkout-content__list'], isOpen ? styles['open'] : '')}>
            <div
                className={styles['checkout-content__list-header']}
                onClick={() => setIsOpen(prev => !prev)}
            >
                <div className={styles['checkout-content__list-header-title']}>Ваш выбор</div>

                <div className={styles['checkout-content__list-header-icon']} />
            </div>

            <Collapse isOpened={isOpen}>
                <div className={styles['checkout-content__list-inner']}>
                    {
                        new Array(2).fill('').map((_, index) => {
                            return (
                                <div className={styles['checkout-content__list-item']} key={index}>
                                    <div className={styles['checkout-content__list-top']}>
                                        <div className={styles['checkout-content__list-info']}>
                                            <div className={styles['checkout-content__list-preview']}>
                                                <div className={styles['checkout-content__list-preview-inner']}>
                                                    <img src={productImg.src} alt="" width={48} height={55} />
                                                </div>
                                            </div>

                                            <div className={styles['checkout-content__list-title']}>Входные двери B 3.11 Венге/Белый супермат М2, Mottura. БЕРИСЛАВ</div>
                                        </div>

                                        <div className={styles['checkout-content__list-count']}>х1</div>

                                        <div className={styles['checkout-content__list-price']}>114 303 грн</div>
                                    </div>

                                    <div className={styles['checkout-content__list-chars']}>
                                        <div className={styles['checkout-content__list-chars-item']}>
                                            <div className={styles['checkout-content__list-chars-title']}>Размер двери:</div>

                                            <div className={styles['checkout-content__list-chars-value']}>610х2000 мм</div>
                                        </div>

                                        <div className={styles['checkout-content__list-chars-item']}>
                                            <div className={styles['checkout-content__list-chars-title']}>Коробка:</div>

                                            <div className={styles['checkout-content__list-chars-value']}>80 мм (1 к-т)</div>
                                        </div>

                                        <div className={styles['checkout-content__list-chars-item']}>
                                            <div className={styles['checkout-content__list-chars-title']}>Добор:</div>

                                            <div className={styles['checkout-content__list-chars-value']}>100 мм z</div>
                                        </div>

                                        <div className={styles['checkout-content__list-chars-item']}>
                                            <div className={styles['checkout-content__list-chars-title']}>Наличник:</div>

                                            <div className={styles['checkout-content__list-chars-value']}>на одну сторону 70 мм</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Collapse>
        </div>
    )
}

export default CheckoutList