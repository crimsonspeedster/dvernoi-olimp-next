import React, {Dispatch, memo, SetStateAction, useEffect, useState} from "react";
import styles from "@components/ProductCategoryContent/ProductCategoryContent.module.scss";
import classNames from "classnames";
import sprite from "@icons/sprite.svg";
import {Collapse} from "react-collapse";
import {DebounceInput} from "react-debounce-input";
import Nouislider from "nouislider-react";
import {FilterAttrsProps} from "@components/ProductCategoryContent/ProductCategorySidebar";
import {useRouter} from "next/router";
import {PriceRangeProps} from "@root/templates/CatalogCategoryTemplate";
import {joinFilterItems} from "@utils/stringHelper";


interface ParamFilterProps {
    attribute: FilterAttrsProps,
    priceRange?: PriceRangeProps,
    itemsFilterIsOpen: FilterAttrsProps[],
    setItemsFilterIsOpen: Dispatch<SetStateAction<FilterAttrsProps[]>>,
    setGlobalFilterIsOpen: Dispatch<SetStateAction<boolean>>,
    currUrlArr: string[],
    filterItems: string[][],
    currUrl: string,
}

const ParamFilter:React.FC<ParamFilterProps> = (props) => {
    const {
        attribute,
        priceRange,
        itemsFilterIsOpen,
        setItemsFilterIsOpen,
        setGlobalFilterIsOpen,
        filterItems,
        currUrl,
    } = props;

    const router = useRouter();

    const [minPriceVal, setMinPriceVal] = useState<number>(parseInt(priceRange?.min_price ?? '0'));
    const [maxPriceVal, setMaxPriceVal] = useState<number>(parseInt(priceRange?.max_price ?? '0'));

    const [currentMinVal, setCurrentMinVal] = useState<number>(parseInt(priceRange?.min_price ?? '0'));
    const [currentMaxVal, setCurrentMaxVal] = useState<number>(parseInt(priceRange?.max_price ?? '0'));

    useEffect(()=>{
        setMinPriceVal(parseInt(priceRange?.min_price ?? '0'));
        setMaxPriceVal(parseInt(priceRange?.max_price ?? '0'));

        setCurrentMinVal(parseInt(priceRange?.min_price ?? '0'));
        setCurrentMaxVal(parseInt(priceRange?.max_price ?? '0'));
    }, [priceRange]);

    const handleClick = (category: string, cat_param: string):void => {
        let elements:string[][] = filterItems;
        let currentFilter:string[] = filterItems.filter((item) => item.includes(category))?.[0]?.filter((item) => item !== cat_param) ?? [];

        if (currentFilter.length > 1)
        {
            currentFilter = currentFilter.filter(item => item !== cat_param);
            elements = elements.filter((item, i) => item[0] !== category);
            elements.push(currentFilter);
        }
        else if (currentFilter.length === 1)
        {
            elements = elements.filter((item, i) => item[0] !== category);
        }
        else {
            currentFilter.push(category);
            currentFilter.push(cat_param);
            elements.push(currentFilter);
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

    const handleStatus = (slug: string):void => {
        setItemsFilterIsOpen(itemsFilterIsOpen.map(item => {item.slug === slug ? item.isOpen = !item.isOpen : null; return item}));
        setGlobalFilterIsOpen(false);
    }

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
                                                onClick={()=>{
                                                    handleClick(attribute.slug, item.slug)
                                                }}
                                            >
                                                <input className={styles['product-category-sidebar__body-check']} type="checkbox" defaultChecked={item.isChoosed} id={item.slug} />

                                                <label className={styles['product-category-sidebar__body-label']}>
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
                                            onClick={()=>{
                                                handleClick(attribute.slug, item.slug)
                                            }}
                                        >
                                            <input className={styles['product-category-sidebar__body-check']} type="checkbox" defaultChecked={item.isChoosed} id={item.slug} />

                                            <label className={styles['product-category-sidebar__body-label']}>
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

export default memo(ParamFilter);