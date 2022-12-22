import React from 'react';
import Link from "next/link";
import sprite from '@icons/sprite.svg';
import styles from './Thanks.module.scss';
import classNames from "classnames";
import {If, Then} from "react-if";
import {useRouter} from "next/router";

const ThanksIntro = () => {
    const router = useRouter();

    return (
        <section className={styles['thanks']}>
            <div className="container">
                <div className={styles['thanks__inner']}>
                    <div className={styles['thanks__icon']}>
                        <svg>
                            <use href={`${sprite.src}#thanks-check`}/>
                        </svg>
                    </div>

                    <If condition={router.query?.order && router.query?.order?.length > 0}>
                        <Then>
                            <div className={styles['thanks__number']}>
                                Заказ № <span>{router.query?.order}</span>
                            </div>
                        </Then>
                    </If>

                    <h1 className={styles['thanks__title']}>Спасибо что выбрали нас</h1>

                    <p className={styles['thanks__desc']}>Наши менеджеры свяжутся с вами в ближайшее время</p>

                    <div className={styles['thanks__btn-wrapper']}>
                        <Link className={classNames(styles['thanks__btn'], 'btn')} href={'/'}>
                            <span className={classNames(styles['thanks__btn-text'], 'btn__text')}>На главную</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ThanksIntro;