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
import {convertToDefaultAttrs, removeMultipleSlashes} from "@utils/stringHelper";


interface ProductCategorySidebarProps {
    isSearchPage: boolean,
    isModalExist: boolean,
    isOpenFilter: boolean,
    setIsOpenFilter: Dispatch<SetStateAction<boolean>>,
    category_filter: FilterAttrsProps[]
}

// export interface FilterLinkProps {
//     slug: string,
//     values: string[]
// }

export interface FilterAttrsProps {
    name: string,
    slug: string,
    isOpen?: boolean,
    isChoosed?: boolean,
    values: FilterValuesProps[]
}

interface FilterValuesProps {
    id: number,
    slug: string,
    value: string,
    isChoosed?: boolean
}

const ProductCategorySidebar:React.FC<ProductCategorySidebarProps> = (props) => {
    const {
        isSearchPage,
        isModalExist,
        isOpenFilter,
        setIsOpenFilter,
        category_filter
    } = props;

    const [minPriceVal, setMinPriceVal] = useState<number>(0);
    const [maxPriceVal, setMaxPriceVal] = useState<number>(3000);

    const [globalFilterIsOpen, setGlobalFilterIsOpen] = useState<boolean>(false);
    const [itemsFilterIsOpen, setItemsFilterIsOpen] = useState<FilterAttrsProps[]>(category_filter);

    const router = useRouter();

    const filterStartIndex:number|undefined = router.query.subcategory_slug?.indexOf('filter');
    const filterEndIndex:number|undefined = router.query.subcategory_slug?.indexOf('apply');

    const [filterItems, setFilterItems] = useState<string[]|undefined>([]);

    // useEffect(()=>{
    //     const elements:FilterAttrsProps[] = [];
    //
    //     filterItems?.forEach((item, i) => {
    //         const strArr:string[] = convertToDefaultAttrs(item).split('-');
    //
    //         const curr_ellement:FilterAttrsProps = itemsFilterIsOpen.filter(subitem => subitem.slug === strArr[0])[0];
    //
    //         curr_ellement.isChoosed = true;
    //         curr_ellement.values.forEach(element => {
    //             strArr.includes(element.slug) ? element.isChoosed = true : null;
    //
    //             return element;
    //         });
    //
    //         return item;
    //     });
    //
    //     itemsFilterIsOpen.map(item => {elements.push(item); return item;});
    //
    //     setItemsFilterIsOpen(elements);
    //
    // }, [filterItems]);

    useEffect(()=>{
        setItemsFilterIsOpen(category_filter.map(item => {item.isOpen = true; return item;}));
    }, [category_filter]);

    useEffect(()=>{

        if (filterStartIndex !== undefined && filterEndIndex !== undefined && filterStartIndex > 0 && filterEndIndex > 0)
        {
            setFilterItems(router.query.subcategory_slug?.slice(filterStartIndex+1, filterEndIndex).toString().split(','));
        }

    }, [filterEndIndex, filterStartIndex, router.query.subcategory_slug]);

    useEffect(()=>{
        if (globalFilterIsOpen) setItemsFilterIsOpen(prev => prev.map(item => {item.isOpen = true; return item}));
    }, [globalFilterIsOpen]);

    const handleClick = (category: string, cat_param: string):void => {
        const linkItemsFilter:string|undefined = filterItems?.filter(item => item.includes(category))[0];
        const indexInFilterItems:number = filterItems?.findIndex(item => item.includes(category)) ?? 0;
        const linkItemsArray:string[] = linkItemsFilter ? linkItemsFilter.split('-') : [];

        const current_link:string = router.query.subcategory_slug?.[0] && router.query.subcategory_slug?.[0] !== 'filter' ? `/${router.query.slug}/${router.query.subcategory_slug[0]}` : `/${router.query.slug}`;

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
                setFilterItems([]);
                router.push(`${current_link}`);
            }
        }
    }

    const handleStatus = (slug: string):void => {
        setItemsFilterIsOpen(itemsFilterIsOpen.map(item => {item.slug === slug ? item.isOpen = !item.isOpen : null; return item}));
        setGlobalFilterIsOpen(false);
    }

    const ParamFilter = (attribute: FilterAttrsProps):ReactElement => {
        switch (attribute.slug)
        {
            case 'pa_price':
                return (
                    <>
                    </>
                );
            default:
                return (
                    <div className={styles['product-category-sidebar__item']}>
                        <div
                            className={classNames(styles['product-category-sidebar__head'], attribute?.isOpen ? styles['open'] : '')}
                            onClick={() => handleStatus(attribute.slug)}
                        >
                            <div className={styles['product-category-sidebar__head-text']}>{attribute.name}</div>

                            <div className={styles['product-category-sidebar__head-icon']}>
                                <svg>
                                    <use href={`${sprite.src}#big-item-arrow`}/>
                                </svg>
                            </div>
                        </div>

                        <div className={styles['product-category-sidebar__body']}>
                            <Collapse isOpened={attribute?.isOpen ?? true}>
                                <div className={styles['product-category-sidebar__body-inner']}>
                                    {
                                        attribute.values.map((item, i) => (
                                            <div
                                                key={i}
                                                className={styles['product-category-sidebar__body-item']}
                                                onClick={()=>handleClick(attribute.slug, item.slug)}
                                            >
                                                <input className={styles['product-category-sidebar__body-check']} type="checkbox" defaultChecked={item.isChoosed} id={item.slug} />

                                                <label className={styles['product-category-sidebar__body-label']} htmlFor={item.slug}>
                                                    <span className={styles['product-category-sidebar__body-icon']}>
                                                        <svg><use href={`${sprite.src}#check`}/></svg>
                                                    </span>

                                                    <span className={styles['product-category-sidebar__body-text']}>{item.value}</span>
                                                </label>
                                            </div>
                                        ))
                                    }
                                </div>
                            </Collapse>
                        </div>
                    </div>
                );
        }
    };

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

                                <div className={styles['product-category-sidebar__header-text']}>Фильтры</div>
                            </div>

                            <button className={styles['product-category-sidebar__header-btn']}>Сбросить все фильтры</button>
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

                            {
                                itemsFilterIsOpen.map((item, i) => (
                                    <ParamFilter
                                        key={i}
                                        name={item.name}
                                        slug={item.slug}
                                        values={item.values}
                                        isOpen={item.isOpen}
                                    />
                                ))
                            }
                        </div>
                    </Then>
                </If>

                <If condition={!isSearchPage}>
                    <Then>
                        <div className={styles['product-category-sidebar__btns']}>
                            <div className={styles['product-category-sidebar__btn-wrapper']}>
                                <button
                                    className={classNames(styles['product-category-sidebar__btn'], styles['product-category-sidebar__btn--show'])}
                                    onClick={()=>setGlobalFilterIsOpen(true)}
                                >
                                    Показать все фильтры
                                </button>
                            </div>

                            <div className={styles['product-category-sidebar__btn-wrapper']}>
                                <button className={classNames(styles['product-category-sidebar__btn'], styles['product-category-sidebar__btn--cancel'])}>Сбросить фильтры</button>
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