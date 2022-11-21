import React, {useEffect, useState} from 'react'
import Link from "next/link";
//@ts-ignore
import {Fancybox} from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox.css';
import styles from './Modal-block.module.scss';
import {isBrowser} from '@utils/isBrowser'
import {getScrollbarWidth} from '@utils/getScrollbarWidth';
import classNames from "classnames";
import {useRouter} from "next/router";
import {SortDropdownProps} from "@components/ProductCategoryContent/ProductCategoryDropdown";


const SortModal = () => {
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

    useEffect(() => {
        Fancybox.bind("[data-fancybox='sort']", {
            showClass: 'fancybox-fadeIn',
            hideClass: 'fancybox-fadeOut',
            dragToClose: false,
            parentEl: isBrowser() && document.querySelector('#__next'),
            on: {
                init: () => {
                    // @ts-ignore
                    if (isBrowser()) document.querySelector('.header').style.paddingRight = getScrollbarWidth();
                },
                destroy: () => {
                    // @ts-ignore
                    if (isBrowser()) document.querySelector('.header').style.paddingRight = '0';
                }
            }
        })

        return () => {
            Fancybox.destroy();
        }
    }, []);

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
        });

        Fancybox.close();
    }


    return (
        <div className={classNames(styles['modal'], styles['modal-sort'])} id="sort-modal" style={{display: 'none'}}>
            <div className={styles['modal__title']}>Сортировка</div>

            <div className={classNames(styles['modal__list'], styles['modal-list'])}>
                {
                    dropdownList.map(item => (
                        <button key={item.id} onClick={()=>changeActiveDropDownItem(item.id)} className={styles['modal-list__item']}>{item.title}</button>
                    ))
                }
            </div>
        </div>
    )
}

export default SortModal;