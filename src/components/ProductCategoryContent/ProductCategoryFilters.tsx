import React, {useEffect, useState} from 'react';
import styles from './ProductCategoryContent.module.scss';
import {useRouter} from "next/router";
import {convertToDefaultAttrs, joinFilterItems, removeMultipleSlashes} from "@utils/stringHelper";
import Link from "next/link";
import {FilterAttrsProps} from "@components/ProductCategoryContent/ProductCategorySidebar";
import {If, Then} from "react-if";
import {useTranslation} from "next-i18next";


interface ProductCategoryFiltersProps {
    category_filter: FilterAttrsProps[]
}

const ProductCategoryFilters:React.FC<ProductCategoryFiltersProps> = ({category_filter}) => {
    const router = useRouter();

    const {t} = useTranslation('common');


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

    const removeAttrHandler = (category: string, cat_param: string):void => {
        let elements:string[][] = filterItems;
        let currentFilter:string[] = filterItems.filter((item) => item.includes(category))?.[0]?.filter((item) => item !== cat_param) ?? [];

        if (currentFilter.length > 1)
        {
            currentFilter = currentFilter.filter(item => item !== cat_param);
            elements = elements.filter((item, i) => item[0] !== category);
            elements.push(currentFilter);
        }
        else
        {
            elements = elements.filter((item, i) => item[0] !== category);
        }

        if (!elements.map(item => joinFilterItems(item).join('')).join('/'))
        {
            router.push({
                pathname: currUrl,
                query: {
                    ...(router.query?.order) && {'order': router.query.order},
                    ...(router.query?.orderBy) && {'orderBy': router.query.orderBy},
                }
            });
        }
        else {
            router.push({
                pathname: `/${currUrl}/filter/${elements.map(item => joinFilterItems(item).join('')).join('/')}/apply`,
                query: {
                    ...(router.query?.order) && {'order': router.query.order},
                    ...(router.query?.orderBy) && {'orderBy': router.query.orderBy},
                }
            });
        }
    }

    if (itemsFilterIsOpen.filter(item => item.isChoosed).length > 0)
    {
        return (
            <div className={styles['product-category-filters']}>
                <div className={styles['product-category-filters__text']}>{t('selected')}:</div>

                <div className={styles['product-category-filters__list']}>
                    <div className={styles['product-category-filters__text']}>{t('selected')}:</div>

                    {
                        itemsFilterIsOpen.map((item, i) => (
                            <If condition={item.isChoosed} key={i}>
                                <Then>
                                    {
                                        item.values.map((subitem, k) => (
                                            <If condition={subitem.isChoosed} key={k}>
                                                <Then>
                                                    <div className={styles['product-category-filters__item']}>
                                                        <span className={styles['product-category-filters__item-text']}>{subitem.value}</span>

                                                        <span className={styles['product-category-filters__item-icon']} onClick={()=>{removeAttrHandler(item.slug, subitem.slug)}}>
                                                            <span className={styles['product-category-filters__item-icon-inner']} />
                                                        </span>
                                                    </div>
                                                </Then>
                                            </If>
                                        ))
                                    }
                                </Then>
                            </If>
                        ))
                    }
                </div>

                <button
                    onClick={()=>router.push(`/${currUrl}`)}
                    className={styles['product-category-filters__btn']}
                >{t('resetFilters')}</button>
            </div>
        )
    }
    else {
        return (<></>);
    }
}

export default ProductCategoryFilters;