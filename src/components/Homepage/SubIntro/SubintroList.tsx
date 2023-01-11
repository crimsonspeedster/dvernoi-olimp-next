import React from 'react';
import Link from "next/link";
import sprite from '@icons/sprite.svg';
import {categories_repeaterProps} from "@components/Homepage/SubIntro/SubIntro";
import styles from './Subintro.module.scss';
import classNames from "classnames";
import {useTranslation} from "next-i18next";


interface SubintroListProps {
    repeater: categories_repeaterProps[]
}

const SubintroList: React.FC<SubintroListProps> = ({repeater}) => {
    const {t} = useTranslation('common');

    console.log(repeater);

    return (
        <div className={styles['main-subintro__inner']}>
            {
                repeater.map((item, i) => (
                    <div key={i} className={classNames(styles['main-subintro__item'], styles['filter-item'])} style={{backgroundImage: `url(${item.block_background.url})`}}>
                        <h3 className={classNames(styles['main-subintro__item-title'], styles['filter-item__title'])}>{item.main_category.name}</h3>

                        <div className={classNames(styles['main-subintro__item-links'], styles['filter-item__links'])}>
                            {
                                item.subcategories && item.subcategories.map((category, index) => (
                                    <Link key={index} className={classNames(styles['main-subintro__item-link'], styles['filter-item__link'])} href={`/${category.link ?? ''}`}>
                                        <span className={classNames(styles['main-subintro__item-text'], styles['filter-item__text'])}>{category.name}</span>

                                        <span className={classNames(styles['main-subintro__item-icon'], styles['filter-item__icon'])}>
                                            <svg><use href={`${sprite.src}#big-item-arrow`}/></svg>
                                        </span>
                                    </Link>
                                ))
                            }
                        </div>

                        <div className={classNames(styles['main-subintro__item-btn-wrapper'], styles['filter-item__btn-wrapper'])}>
                            <Link className={classNames(styles['main-subintro__item-btn'], 'btn', styles['filter-item__btn'])} href={`/${item.main_category.slug ?? ''}`}>
                                <span className={classNames(styles['main-subintro__item-btn'], 'btn__text', styles['filter-item__btn-text'])}>{t('watchMore')}</span>
                            </Link>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default SubintroList;