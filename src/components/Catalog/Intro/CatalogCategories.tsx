import React from 'react';
import Link from "next/link";
import sprite from '@icons/sprite.svg';
import catalogCat from '@images/catalog-cat-1.svg';
import subintro1 from '@images/main-subintro-1.png';
import classNames from "classnames";
import styles from './Intro.module.scss';

const CatalogCategories = () => {
    return (
        <div className={classNames(styles['catalog-intro__categories'], styles['catalog-intro-categories'])}>
            <div className={styles['catalog-intro-categories__item']}>
                <div className={styles['catalog-intro-categories__title']}>
                    <div className={styles['catalog-intro-categories__title-icon']}>
                        <img src={catalogCat.src} alt=""/>
                    </div>

                    <div className={styles['catalog-intro-categories__title-text']}>
                        Каталог межкомнатных дверей
                    </div>
                </div>

                <div className={styles['catalog-intro-categories__inner']}>
                    <div className={classNames(styles['catalog-intro-categories__filter'], 'filter-item')}>
                        <div className={classNames(styles['catalog-intro-categories__filter-inner'], 'filter-item__inner')}>
                            <img src={subintro1.src} alt="" width={385} height={360}/>

                            <div className={classNames(styles['catalog-intro-categories__filter-info'], 'filter-item__info')}>
                                <div className={classNames(styles['catalog-intro-categories__filter-title'], 'filter-item__title')}>Тип</div>

                                <div className={classNames(styles['catalog-intro-categories__filter-links'], 'filter-item__links')}>
                                    <Link href="/" className={classNames(styles['catalog-intro-categories__filter-link'], 'filter-item__link')}>
                                        <span className={classNames(styles['catalog-intro-categories__filter-text'], 'filter-item__text')}>Раздвижные двери</span>

                                        <span className={classNames(styles['catalog-intro-categories__filter-icon'], 'filter-item__icon')}>
                                            <svg>
                                                <use href={`${sprite.src}#big-item-arrow`}/>
                                            </svg>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles['catalog-intro-categories__select']}>
                    <div className={styles['catalog-intro-categories__select-item']}>
                        <div className={styles['catalog-intro-categories__select-title']}>Выберите Ваш город:</div>

                        <ul className={styles['catalog-intro-categories__select-list']}>
                            <li className={styles['catalog-intro-categories__select-elem']}>Одесса</li>

                            <li className={styles['catalog-intro-categories__select-elem']}>Борисполь</li>
                        </ul>
                    </div>

                    <div className={styles['catalog-intro-categories__select-item']}>
                        <div className={styles['catalog-intro-categories__select-title']}>Дополнительные параметры выбора:</div>

                        <ul className={styles['catalog-intro-categories__select-list']}>
                            <li className={styles['catalog-intro-categories__select-elem']}>На складе</li>

                            <li className={styles['catalog-intro-categories__select-elem']}>Нестандартный размер</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CatalogCategories