import React, {useEffect, useState} from 'react';
import styles from './ProductCategoryContent.module.scss';
import {useRouter} from "next/router";
import {convertToDefaultAttrs} from "@utils/stringHelper";
import Link from "next/link";
import {FilterAttrsProps} from "@components/ProductCategoryContent/ProductCategorySidebar";
import {If, Then} from "react-if";


interface ProductCategoryFiltersProps {
    category_filter: FilterAttrsProps[]
}

const ProductCategoryFilters:React.FC<ProductCategoryFiltersProps> = ({category_filter}) => {
    const router = useRouter();

    const current_link:string = router.query.subcategory_slug?.[0] && router.query.subcategory_slug?.[0] !== 'filter' ? `/${router.query.slug}/${router.query.subcategory_slug[0]}` : `/${router.query.slug}`;

    const filterStartIndex:number|undefined = router.query.subcategory_slug?.indexOf('filter');
    const filterEndIndex:number|undefined = router.query.subcategory_slug?.indexOf('apply');

    const [filterItems, setFilterItems] = useState<string[]|undefined>([]);
    const [filterLinkItems, setFilterLinkItems] = useState<string[]>([]);
    const [itemsFilterIsOpen, setItemsFilterIsOpen] = useState<FilterAttrsProps[]>(category_filter);
    const [filterStringValues, setFilterStringValues] = useState<string[]>([]);

    useEffect(()=>{
        const elements:FilterAttrsProps[] = [];

        filterItems?.forEach((item, i) => {
            const strArr:string[] = convertToDefaultAttrs(item).split('-');

            const curr_ellement:FilterAttrsProps = itemsFilterIsOpen.filter(subitem => subitem.slug === strArr[0])[0];

            curr_ellement.isChoosed = true;
            curr_ellement.values.forEach(element => {
                strArr.includes(element.slug) ? element.isChoosed = true : null;

                return element;
            });

            return item;
        });

        itemsFilterIsOpen.map(item => {elements.push(item); return item;});

        // setItemsFilterIsOpen(elements);

    }, [filterItems, itemsFilterIsOpen]);

    useEffect(()=>{

        if (filterStartIndex !== undefined && filterEndIndex !== undefined && filterStartIndex > 0 && filterEndIndex > 0)
        {
            setFilterItems(router.query.subcategory_slug?.slice(filterStartIndex+1, filterEndIndex).toString().split(','));
        }

    }, [filterEndIndex, filterStartIndex, router.query.subcategory_slug]);

    if (itemsFilterIsOpen.filter(item => item.isChoosed).length > 0)
    {
        return (
            <div className={styles['product-category-filters']}>
                <div className={styles['product-category-filters__text']}>Выбрано:</div>

                <div className={styles['product-category-filters__list']}>
                    <div className={styles['product-category-filters__text']}>Выбрано:</div>

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

                                                        <span className={styles['product-category-filters__item-icon']}>
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

                <Link
                    href={current_link}
                    className={styles['product-category-filters__btn']}
                >Сбросить все фильтры</Link>
            </div>
        )
    }
    else {
        return (<></>);
    }
}

export default ProductCategoryFilters;