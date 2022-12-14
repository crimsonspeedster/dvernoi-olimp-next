import React, {Dispatch, SetStateAction} from 'react'
import styles from './Header.module.scss';
import sprite from '@icons/sprite.svg';
import classNames from "classnames";
import {useTranslation} from "next-i18next";


interface HeaderCatalogProps {
    openCatalog: boolean,
    setIsOpenCatalog: Dispatch<SetStateAction<boolean>>
}

const HeaderCatalog: React.FC<HeaderCatalogProps> = ({openCatalog, setIsOpenCatalog}) => {
    const {t} = useTranslation('common');

    return (
        <div className={classNames(styles['header__catalog'], styles['header-catalog'])}>
            <button
                className={classNames(styles['header-catalog__btn'], 'btn', openCatalog ? styles['active'] : '')}
                type="button"
                onClick={() => setIsOpenCatalog(prev => !prev)}
            >
                <span className={classNames(styles['header-catalog__btn-icon'], 'btn__icon')}>
                    <svg><use href={`${sprite.src}#catalog-btn`}/></svg>
                </span>

                <span className={classNames(styles['header-catalog__btn-text'], 'btn__text')}>{t('catalogTitle')}</span>
            </button>
        </div>
    )
}

export default HeaderCatalog