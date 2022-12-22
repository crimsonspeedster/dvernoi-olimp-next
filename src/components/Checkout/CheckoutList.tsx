import React, {useState} from 'react';
import {Collapse} from 'react-collapse';
import productImg from '@images/single-product.jpg';
import styles from './Intro.module.scss';
import classNames from "classnames";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {selectAllCartData} from "@store/cart";
import Link from "next/link";


interface CheckoutListProps {
    classStr: string,
}

const CheckoutList:React.FC<CheckoutListProps> = (props) => {
    const {
        classStr
    } = props;

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const cartData = useSelector(selectAllCartData);

    return (
        <div className={classNames(styles['checkout-content__list'], isOpen ? styles['open'] : '', styles[classStr])}>
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
                        Object.keys(cartData.items).map(val => (
                            <div className={styles['checkout-content__list-item']} key={cartData.items[val].hash}>
                                <div className={styles['checkout-content__list-top']}>
                                    <Link href={cartData.items[val].product.slug} className={styles['checkout-content__list-info']}>
                                        <div className={styles['checkout-content__list-preview']}>
                                            <div className={styles['checkout-content__list-preview-inner']}>
                                                <Image src={productImg.src} alt="" width={48} height={55} />
                                            </div>
                                        </div>

                                        <div className={styles['checkout-content__list-title']}>Входные двери B 3.11 Венге/Белый супермат М2, Mottura. БЕРИСЛАВ</div>
                                    </Link>

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
                        ))
                    }
                </div>
            </Collapse>
        </div>
    )
}

export default CheckoutList