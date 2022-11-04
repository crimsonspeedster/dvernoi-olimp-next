import React, {useContext} from 'react';
import Link from "next/link";
import sprite from '@icons/sprite.svg'
import styles from './Header.module.scss';
import classNames from "classnames";

const MobileCatalog = () => {
    return (
        <div className={styles['mobile-catalog']}>
            <Link className={classNames(styles['mobile-catalog__btn'], 'btn')} href="/">
                <span className={classNames(styles['mobile-catalog__btn-icon'], 'btn__icon')}>
                  <svg><use href={`${sprite.src}#catalog-btn`}/></svg>
                </span>

                <span className={classNames(styles['mobile-catalog__btn-text'], 'btn__text')}>Каталог товаров</span>
            </Link>
        </div>
    )
}

export default MobileCatalog