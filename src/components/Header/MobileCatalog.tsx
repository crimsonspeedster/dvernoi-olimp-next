import React, {useContext} from 'react';
import Link from "next/link";
import sprite from '@icons/sprite.svg'
import styles from './Header.module.scss';
import classNames from "classnames";
import {useTranslation} from "next-i18next";

const MobileCatalog = () => {
    const {t} = useTranslation('common');

    return (
        <div className={styles['mobile-catalog']}>
            <Link className={classNames(styles['mobile-catalog__btn'], 'btn')} href="/">
                <span className={classNames(styles['mobile-catalog__btn-icon'], 'btn__icon')}>
                    <svg><use href={`${sprite.src}#catalog-btn`}/></svg>
                </span>

                <span className={classNames(styles['mobile-catalog__btn-text'], 'btn__text')}>{t('catalogTitle')}</span>
            </Link>
        </div>
    )
}

export default MobileCatalog