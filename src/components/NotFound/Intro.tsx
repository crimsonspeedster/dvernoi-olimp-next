import React from 'react';
import Link from "next/link";
import styles from './Intro.module.scss';
import bgImg from '@images/not-fount-bg.jpg';
import classNames from "classnames";
import Image from "next/image";
import {useTranslation} from "next-i18next";

const NotFountIntro = () => {
    const {t} = useTranslation('404');

    return (
        <section className={styles['not-found']}>
            <div className={styles['not-found__img']}>
                <Image src={bgImg.src} alt="404" width={1920} height={680}/>
            </div>

            <div className={styles['not-found__content']}>
                <p className={styles['not-found__desc']}>{t('not_found')}</p>

                <div className={styles['not-found__btn-wrapper']}>
                    <Link className={classNames(styles['not-found__btn'], 'btn')} href="/">
                        <span className={classNames(styles['not-found__btn-text'], 'btn__text')}>{t('home_title')}</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default NotFountIntro;