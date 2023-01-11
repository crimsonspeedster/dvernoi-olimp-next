import React, {Dispatch, ReactElement, SetStateAction, useEffect, useState} from 'react';
import {Collapse} from 'react-collapse';
import 'nouislider/distribute/nouislider.css';
import Banner from '@components/Banner/Banner'
import ProductCategoryFilters from './ProductCategoryFilters';
import sprite from '@icons/sprite.svg';
import styles from './ProductCategoryContent.module.scss';
import classNames from "classnames";
import {If, Then} from "react-if";
import {useRouter} from "next/router";
import {convertToDefaultAttrs, joinFilterItems, removeMultipleSlashes} from "@utils/stringHelper";
import Nouislider from "nouislider-react";
import 'nouislider/distribute/nouislider.css'
import {PriceRangeProps} from "@root/templates/CatalogCategoryTemplate";
import {DebounceInput} from "react-debounce-input";
import {useTranslation} from "next-i18next";
import ParamFilter from "@components/ProductCategoryContent/ProductCategoryParam";


interface ProductCategorySidebarProps {
    isSearchPage: boolean,
    isModalExist: boolean,
    isOpenFilter: boolean,
    setIsOpenFilter: Dispatch<SetStateAction<boolean>>,
    category_filter: FilterAttrsProps[],
    priceRange?: PriceRangeProps
}

export interface FilterAttrsProps {
    name: string,
    slug: string,
    isOpen: boolean,
    isChoosed: boolean,
    values: FilterValuesProps[]
}

export interface FilterValuesProps {
    id: number,
    slug: string,
    value: string,
    isChoosed: boolean
}

const ProductCategorySidebar:React.FC<ProductCategorySidebarProps> = (props) => {
    const {
        isSearchPage,
        isModalExist,
        isOpenFilter,
        setIsOpenFilter,
        category_filter,
        priceRange
    } = props;

    const router = useRouter();
    const {t} = useTranslation('common');

    const [globalFilterIsOpen, setGlobalFilterIsOpen] = useState<boolean>(false);
    const [itemsFilterIsOpen, setItemsFilterIsOpen] = useState<FilterAttrsProps[]>(category_filter);
    const [currUrlArr, setCurrUrlArr] = useState<string[]>(router.asPath.split(/[?#]/)[0].split('/').filter(item => item !== '' && item !== '/'));
    const [filterStartIndex, setFilterStartIndex] = useState<number>(currUrlArr.findIndex(item => item === 'filter'));
    const [filterEndIndex, setFilterEndIndex] = useState<number>(currUrlArr.findIndex(item => item === 'apply'));
    const [pageStartIndex, setPageStartIndex] = useState<number>(currUrlArr.findIndex(item => item === 'page'));
    const [filterItems, setFilterItems] = useState<string[][]>(filterStartIndex > 0 && filterEndIndex > 0 ? currUrlArr.slice(filterStartIndex+1, filterEndIndex).map(item => item.split(/-is-|-or-/)) : []);
    const [currUrl, setCurrUrl] = useState<string>(router.asPath);

    useEffect(()=>{
        const currArrUrl:string[] = router.asPath.split(/[?#]/)[0].split('/').filter(item => item !== '' && item !== '/');
        const filterIndex:number = currArrUrl.findIndex(item => item === 'filter');
        const applyIndex:number = currArrUrl.findIndex(item => item === 'apply');
        const pageIndex:number = currArrUrl.findIndex(item => item === 'page');

        setCurrUrlArr(currArrUrl);
        setFilterStartIndex(filterIndex);
        setFilterEndIndex(applyIndex);
        setPageStartIndex(pageIndex);
        setFilterItems(filterIndex > 0 && applyIndex > 0 ? currArrUrl.slice(filterIndex+1, applyIndex).map(item => item.split(/-is-|-or-/)) : []);

        if (filterIndex > 0)
        {
            setCurrUrl(currArrUrl.slice(0, filterIndex).join('/'));
        }
        else if (pageIndex > 0)
        {
            setCurrUrl(currArrUrl.slice(0, pageIndex).join('/'));
        }
        else {
            setCurrUrl(currArrUrl.join('/'))
        }
    }, [router.asPath]);

    useEffect(()=>{
        setItemsFilterIsOpen(category_filter);
    }, [category_filter]);

    useEffect(()=>{
        if (globalFilterIsOpen) setItemsFilterIsOpen(prev => prev.map(item => {item.isOpen = true; return item}));
    }, [globalFilterIsOpen]);

    return (
        <aside className={classNames(styles['product-category-sidebar'], isOpenFilter ? styles['open'] : '')}>
            <div className={styles['product-category-sidebar__inner']}>
                <If condition={!isSearchPage && isModalExist}>
                    <Then>
                        <div className={styles['product-category-sidebar__header']}>
                            <div
                                className={styles['product-category-sidebar__header-title']}
                                onClick={() => setIsOpenFilter(false)}
                            >
                                <div className={styles['product-category-sidebar__header-icon']}>
                                    <svg>
                                        <use href={`${sprite.src}#catalog-arrow`}/>
                                    </svg>
                                </div>

                                <div className={styles['product-category-sidebar__header-text']}>{t('filters')}</div>
                            </div>

                            <button
                                onClick={()=>router.push(`/${currUrl}`)}
                                className={styles['product-category-sidebar__header-btn']}
                            >
                                {t('resetFilters')}
                            </button>
                        </div>
                    </Then>
                </If>

                <If condition={!isSearchPage}>
                    <Then>
                        <div className={styles['product-category-sidebar__overflow']}>
                            <If condition={isModalExist}>
                                <Then>
                                    <ProductCategoryFilters
                                        category_filter={category_filter}
                                    />
                                </Then>
                            </If>

                            <If condition={category_filter.length > 0}>
                                <Then>
                                    {
                                        category_filter.map((item, i) => (
                                            <ParamFilter
                                                key={i}
                                                attribute={item}
                                                filterItems={filterItems}
                                                priceRange={priceRange}
                                                itemsFilterIsOpen={itemsFilterIsOpen}
                                                setItemsFilterIsOpen={setItemsFilterIsOpen}
                                                setGlobalFilterIsOpen={setGlobalFilterIsOpen}
                                                currUrlArr={currUrlArr}
                                                currUrl={currUrl}
                                            />
                                        ))
                                    }
                                </Then>
                            </If>
                        </div>
                    </Then>
                </If>

                <If condition={!isSearchPage && category_filter.length > 0}>
                    <Then>
                        <div className={styles['product-category-sidebar__btns']}>
                            <div className={styles['product-category-sidebar__btn-wrapper']}>
                                <button
                                    className={classNames(styles['product-category-sidebar__btn'], styles['product-category-sidebar__btn--show'])}
                                    onClick={()=>setGlobalFilterIsOpen(true)}
                                >
                                    {t('showFilters')}
                                </button>
                            </div>

                            <div className={styles['product-category-sidebar__btn-wrapper']}>
                                <button
                                    onClick={()=>router.push(`/${currUrl}`)}
                                    className={classNames(styles['product-category-sidebar__btn'], styles['product-category-sidebar__btn--cancel'])}
                                >{t('resetFilters')}</button>
                            </div>
                        </div>
                    </Then>
                </If>

                <Banner className={'product-category-sidebar__banner'} />
            </div>
        </aside>
    )
}

export default ProductCategorySidebar;