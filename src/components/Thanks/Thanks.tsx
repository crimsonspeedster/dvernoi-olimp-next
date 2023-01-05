import React from 'react';
import Link from "next/link";
import sprite from '@icons/sprite.svg';
import styles from './Thanks.module.scss';
import classNames from "classnames";
import {If, Then} from "react-if";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";

const ThanksIntro = () => {
    const router = useRouter();
    const {t} = useTranslation('thanks');

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
                                {t('order')} № <span>{router.query?.order}</span>
                            </div>
                        </Then>
                    </If>

                    <h1 className={styles['thanks__title']}>{t('thanks_title')}</h1>

                    <p className={styles['thanks__desc']}>{t('thanks_desc')}</p>

                    <div className={styles['thanks__btn-wrapper']}>
                        <Link className={classNames(styles['thanks__btn'], 'btn')} href={'/'}>
                            <span className={classNames(styles['thanks__btn-text'], 'btn__text')}>{t('thanks_btn')}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ThanksIntro;