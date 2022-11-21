import React, {useState, useEffect} from 'react'
import {isBrowser} from '@utils/isBrowser';
import sprite from '@icons/sprite.svg';
import classNames from "classnames";
import styles from './ProductCategoryContent.module.scss';
import {useRouter} from "next/router";


interface ProductCategoryDropdownProps {

}

export interface SortDropdownProps {
    id: number,
    title: string,
    order: string,
    orderBy: string,
    isActive: boolean
}

const ProductCategoryDropdown:React.FC<ProductCategoryDropdownProps> = ({}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const router = useRouter();

    const [dropdownList, setDropdownList] = useState<SortDropdownProps[]>([
        {
            id: 1,
            title: 'По новизне (от новых к старым)',
            order: 'desc',
            orderBy: 'date',
            isActive: router.query.order === 'desc' && router.query.orderBy === 'date'
        },
        {
            id: 2,
            title: 'По новизне (от старых к новым)',
            isActive: router.query.order === 'asc' && router.query.orderBy === 'date',
            order: 'asc',
            orderBy: 'date',
        },
        {
            id: 3,
            title: 'По цене (от меньшего к большему)',
            isActive: router.query.order === 'desc' && router.query.orderBy === 'price',
            order: 'desc',
            orderBy: 'price',
        },
        {
            id: 4,
            title: 'По цене (от большего к меньшему)',
            isActive: router.query.order === 'asc' && router.query.orderBy === 'price',
            order: 'asc',
            orderBy: 'price',
        },
    ]);

    useEffect(()=>{
        let falseItems:number = 0;

        dropdownList.map(item => {
            !item.isActive ? falseItems+=1 : null;

            return item;
        });

        if (falseItems === dropdownList.length)
        {
            setDropdownList(dropdownList.map(item => {
                return {
                    ...item,
                    isActive: item.id === 1
                }
            }));
        }
    }, []);

    // @ts-ignore
    const closeDropdown = (e:Event) => !e.target.closest('.dropdown') && setIsOpen(false)

    const changeActiveDropDownItem = (itemId:number):void => {
        setDropdownList(dropdownList.map(item => {
            return {
                ...item,
                isActive: item.id === itemId
            }
        }));

        const activeSort:SortDropdownProps = dropdownList.filter(item => item.id === itemId)[0];

        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                'order'     : activeSort.order,
                'orderBy'   : activeSort.orderBy
            }
        })

        setIsOpen(false);
    }

    // @ts-ignore
    useEffect(() => {
        isBrowser() && window.addEventListener('click', closeDropdown)

        return () => isBrowser() && window.removeEventListener('click', closeDropdown)
    }, [])

    return (
        <div className={classNames(styles['product-category-dropdown'], 'dropdown', isOpen ? 'open' : '')}>
            <div
                className={classNames(styles['product-category-dropdown__current'], 'dropdown__current')}
                onClick={() => setIsOpen(prev => !prev)}
            >
                <div className={classNames(styles['product-category-dropdown__text'], 'dropdown__text')}>{dropdownList.filter(item => item.isActive)?.[0]?.title ?? ''}</div>

                <div className={classNames(styles['product-category-dropdown__icon'], 'dropdown__icon')}>
                    <svg>
                        <use href={`${sprite.src}#big-item-arrow`}/>
                    </svg>
                </div>
            </div>

            <div className={classNames(styles['product-category-dropdown__list'], 'dropdown__list')}>
                {dropdownList.map(item => {
                    return (
                        <div
                            className={classNames(styles['product-category-dropdown__item'], 'dropdown__item', item.isActive ? 'active' : '')}
                            key={item.id}
                            onClick={() => changeActiveDropDownItem(item.id)}
                        >
                            {item.title}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductCategoryDropdown;