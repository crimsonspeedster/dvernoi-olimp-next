import React from 'react';
import Link from "next/link";
import sprite from '@icons/sprite.svg';
import {categories_repeaterProps} from "@components/Homepage/SubIntro/SubIntro";
import styles from './Subintro.module.scss';
import classNames from "classnames";


interface SubintroListProps {
    repeater: categories_repeaterProps[]
}

const SubintroList: React.FC<SubintroListProps> = ({repeater}) => {
    return (
        <div className={styles['main-subintro__inner']}>
            {
                repeater.map((item, i) => (
                    <div key={i} className={classNames(styles['main-subintro__item'], styles['filter-item'])} style={{backgroundImage: `url(${item.block_background.url})`}}>
                        <div className={classNames(styles['main-subintro__item-inner'], styles['filter-item__inner'])}>
                            <div className={classNames(styles['main-subintro__item-info'], styles['filter-item__info'])}>
                                <h3 className={classNames(styles['main-subintro__item-title'], styles['filter-item__title'])}>{item.main_category.name}</h3>

                                <div className={classNames(styles['main-subintro__item-links'], styles['filter-item__links'])}>
                                    {
                                        item.subcategories.map((category, index) => (
                                            <Link key={index} className={classNames(styles['main-subintro__item-link'], styles['filter-item__link'])} href="/">
                                                <span className={classNames(styles['main-subintro__item-text'], styles['filter-item__text'])}>{category.name}</span>

                                                <span className={classNames(styles['main-subintro__item-icon'], styles['filter-item__icon'])}>
                                                    <svg><use href={`${sprite.src}#big-item-arrow`}/></svg>
                                                </span>
                                            </Link>
                                        ))
                                    }
                                </div>

                                <div className={classNames(styles['main-subintro__item-btn-wrapper'], 'filter-item__btn-wrapper')}>
                                    <Link className={classNames(styles['main-subintro__item-btn btn'], 'filter-item__btn')} href="/">
                                        <span className={classNames(styles['main-subintro__item-btn btn__text'], 'filter-item__btn-text')}>Узнать больше</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default SubintroList;