import React, {useContext} from 'react';
import Link from "next/link";
import styles from './Intro.module.scss';
import brandsLogo from '@images/brands-logo.png';
import classNames from "classnames";

const BrandsIntroList = () => {
    return (
        <div className={styles['brands__inner']}>
            {
                new Array(21).fill('').map((_, index) => {
                    return (
                        <div className={classNames(styles['brands__item'], styles['brands-item'])} key={index}>
                            <div className={styles['brands-item__inner']}>
                                <div className={styles['brands-item__logo']}>
                                    <img src={brandsLogo.src} width={245} height={65} alt=""/>
                                </div>

                                <div className={styles['brands-item__title']}>Папа Карло</div>

                                <p className={styles['brands-item__desc']}>Нас знают и любят благодаря тому, что фабрика дверей Папа Карло зарекомендовала себя как производитель дверей №1 на рынке</p>

                                <div className={styles['brands-item__btn-wrapper']}>
                                    <Link href={`single-brand/`}>
                                      <a className={styles['brands-item__btn']}>Узнать больше</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default BrandsIntroList;