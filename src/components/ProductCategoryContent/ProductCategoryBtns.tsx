import React, {Dispatch, SetStateAction} from 'react'
import styles from './ProductCategoryContent.module.scss';
import sprite from '@icons/sprite.svg'
import {If, Then} from "react-if";
import classNames from "classnames";


interface ProductCategoryBtnsProps {
    isSearchPage: boolean,
    setIsOpenFilter: Dispatch<SetStateAction<boolean>>
}

const ProductCategoryBtns: React.FC<ProductCategoryBtnsProps> = ({isSearchPage, setIsOpenFilter}) => {
    return (
        <div className={styles['product-category-btns']}>
            <If condition={!isSearchPage}>
                <Then>
                    <div
                        className={styles['product-category-btns__item']}
                        onClick={() => setIsOpenFilter(true)}
                    >
                        <div className={styles['product-category-btns__item-icon']}>
                            <svg>
                                <use href={`${sprite.src}#filter`}/>
                            </svg>
                        </div>

                        <div className={styles['product-category-btns__item-text']}>Фильтр</div>
                    </div>
                </Then>
            </If>

            <div
                className={classNames(styles['product-category-btns__item'], isSearchPage ? styles['full-width'] : '')}
                data-fancybox="sort"
                data-src="#sort-modal"
            >
                <div className={styles['product-category-btns__item-icon']}>
                    <svg>
                        <use href={`${sprite}#sort`}/>
                    </svg>
                </div>

                <div className={styles['product-category-btns__item-text']}>Сортировка</div>
            </div>
        </div>
    )
}

export default ProductCategoryBtns;