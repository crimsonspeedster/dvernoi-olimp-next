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
import Nouislider from "nouislider-react";
import 'nouislider/distribute/nouislider.css'
import {PriceRangeProps} from "@root/templates/CatalogCategoryTemplate";
import {DebounceInput} from "react-debounce-input";
import {useTranslation} from "next-i18next";


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

    let current_link:string = '';

    if (router.route === "/brand/[[...slug]]")
        current_link = `/brand/${router.query?.slug?.[0]}`;
    else
        current_link = router.query.subcategory_slug?.[0] && router.query.subcategory_slug?.[0] !== 'filter' ? `/${router.query.slug}/${router.query.subcategory_slug[0]}` : `/${router.query.slug}`;

    const filterStartIndex:number = router.route === "/brand/[[...slug]]" ? router.query.slug?.indexOf('filter') ?? -1 : router.query.subcategory_slug?.indexOf('filter') ?? -1;
    const filterEndIndex:number = router.route === "/brand/[[...slug]]" ?  router.query.slug?.indexOf('apply') ?? -1 : router.query.subcategory_slug?.indexOf('apply') ?? -1;

    const [filterItems, setFilterItems] = useState<string[]|undefined>(router.route === "/brand/[[...slug]]" ? router.query?.slug?.slice(filterStartIndex+1, filterEndIndex)?.toString()?.split(',') ?? [] : router.query?.subcategory_slug?.slice(filterStartIndex+1, filterEndIndex)?.toString()?.split(',') ?? []);

    const [minPriceVal, setMinPriceVal] = useState<number>(parseInt(priceRange?.min_price ?? '0'));
    const [maxPriceVal, setMaxPriceVal] = useState<number>(parseInt(priceRange?.max_price ?? '0'));

    const [currentMinVal, setCurrentMinVal] = useState<number>(parseInt(priceRange?.min_price ?? '0'));
    const [currentMaxVal, setCurrentMaxVal] = useState<number>(parseInt(priceRange?.max_price ?? '0'));

    const [globalFilterIsOpen, setGlobalFilterIsOpen] = useState<boolean>(false);
    const [itemsFilterIsOpen, setItemsFilterIsOpen] = useState<FilterAttrsProps[]>(category_filter);

    useEffect(()=>{
        setMinPriceVal(parseInt(priceRange?.min_price ?? '0'));
        setMaxPriceVal(parseInt(priceRange?.max_price ?? '0'));

        setCurrentMinVal(parseInt(priceRange?.min_price ?? '0'));
        setCurrentMaxVal(parseInt(priceRange?.max_price ?? '0'));
    }, [priceRange]);

    useEffect(()=>{
        setItemsFilterIsOpen(category_filter);
    }, [category_filter]);

    useEffect(()=>{

        if (filterStartIndex >= 0 && filterEndIndex > 0)
        {
            setFilterItems(router.route === "/brand/[[...slug]]" ? router.query?.slug?.slice(filterStartIndex+1, filterEndIndex)?.toString()?.split(',') : router.query?.subcategory_slug?.slice(filterStartIndex+1, filterEndIndex)?.toString()?.split(','));

            let min_price:string = '';
            let max_price:string = '';

            if (router.route === "/brand/[[...slug]]")
            {
                min_price = [router?.query?.slug]?.flat()?.filter(item => item?.includes('min_price'))?.[0] ?? '';
                max_price = [router?.query?.slug]?.flat()?.filter(item => item?.includes('max_price'))?.[0] ?? '';
            }
            else
            {
                min_price = [router?.query?.subcategory_slug]?.flat()?.filter(item => item?.includes('min_price'))?.[0] ?? '';
                max_price = [router?.query?.subcategory_slug]?.flat()?.filter(item => item?.includes('max_price'))?.[0] ?? '';
            }

            if (min_price)
            {
                setCurrentMinVal(parseInt(min_price.replace('min_price-is-', '')));
            }

            if (max_price)
            {
                setCurrentMaxVal(parseInt(max_price.replace('max_price-is-', '')));
            }
        }
        else {
            setFilterItems([]);
        }

    }, [filterEndIndex, filterStartIndex, router.query.slug, router.query.subcategory_slug]);

    useEffect(()=>{
        if (globalFilterIsOpen) setItemsFilterIsOpen(prev => prev.map(item => {item.isOpen = true; return item}));
    }, [globalFilterIsOpen]);

    const handleClick = (category: string, cat_param: string):void => {
        const linkItemsFilter:string|undefined = filterItems?.filter(item => item.includes(category))[0];
        const indexInFilterItems:number = filterItems?.findIndex(item => item.includes(category)) ?? 0;
        const linkItemsArray:string[] = linkItemsFilter ? linkItemsFilter.split('-') : [];

        if (linkItemsFilter && !linkItemsArray.includes(cat_param))
        {
            if (category === 'min_price' || category === 'max_price')
            {
                filterItems && filterItems.length > 0 ? router.push(removeMultipleSlashes(`${current_link}/filter/${[...filterItems.filter(item => !item.includes(category)), `${category}-is-${cat_param}`]?.join('/')}/apply`)) : router.push(removeMultipleSlashes(`${current_link}/filter/${category}-is-${cat_param}/apply`));
            }
            else {
                filterItems && filterItems.length > 0 ? router.push(removeMultipleSlashes(`${current_link}/filter/${[...filterItems.filter((item) => item !== linkItemsFilter), `${linkItemsFilter}-or-${cat_param}`]?.join('/')}/apply`)) : router.push(removeMultipleSlashes(`${current_link}/filter/${linkItemsFilter}-or-${cat_param}/apply`));
            }
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

                                        <div className={classNames(styles['product-category-sidebar__body-item'], styles['product-category-sidebar__body-item--price'])}>
                                            <div className={styles['product-category-sidebar__body-inp-wrapper']}>
                                                <DebounceInput
                                                    className={styles['product-category-sidebar__body-inp']}
                                                    minLength={0}
                                                    autoComplete={'off'}
                                                    debounceTimeout={500}
                                                    min={minPriceVal}
                                                    max={maxPriceVal-1}
                                                    value={currentMinVal}
                                                    onChange={e => {
                                                        setCurrentMinVal(parseInt(e.target.value ?? '1'));
                                                        handleClick('min_price', e.target.value ?? '1');
                                                    }}
                                                />
                                            </div>

                                            <div className={styles['product-category-sidebar__body-inp-wrapper']}>
                                                <DebounceInput
                                                    className={styles['product-category-sidebar__body-inp']}
                                                    autoComplete="off"
                                                    debounceTimeout={500}
                                                    value={currentMaxVal}
                                                    max={maxPriceVal}
                                                    min={minPriceVal+1}
                                                    onChange={e => {
                                                        setCurrentMaxVal(parseInt(e.target.value ?? '1'));
                                                        handleClick('max_price', e.target.value ?? '1');
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div className={classNames(styles['product-category-sidebar__body-item'], styles['product-category-sidebar__body-item--slider'])}>
                                            <Nouislider
                                                range={{min: minPriceVal, max: maxPriceVal}}
                                                start={[currentMinVal, currentMaxVal]}
                                                connect
                                                step={1}
                                                onChange={(value)=>{
                                                    setCurrentMinVal(parseInt(value[0]));
                                                    setCurrentMaxVal(parseInt(value[1]));

                                                    if (parseInt(value[0]) !== currentMinVal)
                                                    {
                                                        handleClick('min_price', parseInt(value[0]).toString());
                                                    }
                                                    else if (parseInt(value[1]) !== currentMaxVal)
                                                    {
                                                        handleClick('max_price', parseInt(value[1]).toString());
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                        </div>
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

                                <div className={styles['product-category-sidebar__header-text']}>{t('filters')}</div>
                            </div>

                            <button
                                onClick={()=>{
                                    router.push(current_link);
                                }}
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

                            <If condition={itemsFilterIsOpen.length > 0}>
                                <Then>
                                    {
                                        itemsFilterIsOpen.map((item, i) => (
                                            <ParamFilter
                                                key={i}
                                                name={item.name}
                                                slug={item.slug}
                                                values={item.values}
                                                isOpen={item.isOpen}
                                                isChoosed={item.isChoosed}
                                            />
                                        ))
                                    }
                                </Then>
                            </If>
                        </div>
                    </Then>
                </If>

                <If condition={!isSearchPage && itemsFilterIsOpen.length > 0}>
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
                                    onClick={()=>{router.push(current_link)}}
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