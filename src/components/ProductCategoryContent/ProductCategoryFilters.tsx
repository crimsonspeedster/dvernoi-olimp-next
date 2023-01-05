import React, {useEffect, useState} from 'react';
import styles from './ProductCategoryContent.module.scss';
import {useRouter} from "next/router";
import {convertToDefaultAttrs, removeMultipleSlashes} from "@utils/stringHelper";
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

    let current_link:string = '';

    if (router.route === "/brand/[[...slug]]")
        current_link = `/brand/${router.query?.slug?.[0]}`;
    else
        current_link = router.query.subcategory_slug?.[0] && router.query.subcategory_slug?.[0] !== 'filter' ? `/${router.query.slug}/${router.query.subcategory_slug[0]}` : `/${router.query.slug}`;

    const filterStartIndex:number = router.route === "/brand/[[...slug]]" ? router.query.slug?.indexOf('filter') ?? -1 : router.query.subcategory_slug?.indexOf('filter') ?? -1;
    const filterEndIndex:number = router.route === "/brand/[[...slug]]" ?  router.query.slug?.indexOf('apply') ?? -1 : router.query.subcategory_slug?.indexOf('apply') ?? -1;

    const [filterItems, setFilterItems] = useState<string[]|undefined>([]);
    const [itemsFilterIsOpen, setItemsFilterIsOpen] = useState<FilterAttrsProps[]>(category_filter);

    useEffect(()=>{
        setItemsFilterIsOpen(category_filter);
    }, [category_filter]);

    useEffect(()=>{

        if (filterStartIndex >= 0 && filterEndIndex > 0)
        {
            setFilterItems(router.route === "/brand/[[...slug]]" ? router.query?.slug?.slice(filterStartIndex+1, filterEndIndex)?.toString()?.split(',') : router.query?.subcategory_slug?.slice(filterStartIndex+1, filterEndIndex)?.toString()?.split(','));
        }
        else {
            setFilterItems([]);
        }

    }, [filterEndIndex, filterStartIndex, router.query.slug, router.query.subcategory_slug]);

    const removeAttrHandler = (category: string, cat_param: string):void => {
        const linkItemsFilter:string|undefined = filterItems?.filter(item => item.includes(category))[0];
        const indexInFilterItems:number = filterItems?.findIndex(item => item.includes(category)) ?? 0;
        const linkItemsArray:string[] = linkItemsFilter ? linkItemsFilter.split('-') : [];

        if (linkItemsFilter && !linkItemsArray.includes(cat_param))
        {
            filterItems && filterItems.length > 0 ? router.push(removeMultipleSlashes(`${current_link}/filter/${[...filterItems.filter((item) => item !== linkItemsFilter), `${linkItemsFilter}-or-${cat_param}`]?.join('/')}/apply`)) : router.push(removeMultipleSlashes(`${current_link}/filter/${linkItemsFilter}-or-${cat_param}/apply`));
        }
        else if (!linkItemsFilter && !linkItemsArray.includes(cat_param)) {
            filterItems && filterItems.length > 0 ? router.push(removeMultipleSlashes(`${current_link}/filter/${[...filterItems, `${category}-is-${cat_param}`]?.join('/')}/apply`)) : router.push(removeMultipleSlashes(`${current_link}/filter/${category}-is-${cat_param}/apply`));
        }
        else if (linkItemsArray.includes(cat_param)) {
            const stringWithoutParam:string = linkItemsArray.filter(item => item !== cat_param).join('-');
            let filtered_param:string|boolean = false;

            if (stringWithoutParam === `${category}-is` || stringWithoutParam === `${category}-or`)
            {
                filtered_param = false;
            }
            else if (stringWithoutParam.endsWith('or'))
            {
                filtered_param = stringWithoutParam.slice(0, -3);
            }
            else if (stringWithoutParam.includes('is-or'))
            {
                filtered_param = stringWithoutParam.replace('is-or', 'is');
            }
            else if(stringWithoutParam.includes('or-or'))
            {
                filtered_param = stringWithoutParam.replace('or-or', 'or');
            }

            const filterString:string[]|undefined = filterItems?.filter((item, i) => i !== indexInFilterItems);

            if (filtered_param)
            {
                filterString?.push(filtered_param);
            }

            if (filterString && filterString.length > 0)
            {
                router.push(removeMultipleSlashes(`${current_link}/filter/${filterString.join('/')}/apply`));
            }
            else {
                router.push(`${current_link}`);
            }
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
                    onClick={()=>{
                        router.push(current_link);
                    }}
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