import React, {useEffect} from 'react'
import Link from "next/link";
//@ts-ignore
import {Fancybox} from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox.css';
import styles from './Modal-block.module.scss';
import {isBrowser} from '@utils/isBrowser'
import {getScrollbarWidth} from '@utils/getScrollbarWidth';
import classNames from "classnames";


const SortModal = () => {
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
    }, [])

    return (
        <div className={classNames(styles['modal'], styles['modal-sort'])} id="sort-modal" style={{display: 'none'}}>
            <div className={styles['modal__title']}>Сортировка</div>

            <div className={classNames(styles['modal__list'], styles['modal-list'])}>
                <button className={styles['modal-list__item']}>От дешевых к дорогим</button>

                <button className={styles['modal-list__item']}>От дорогих к дешевым</button>

                <button className={styles['modal-list__item']}>По отзывам</button>

                <button className={styles['modal-list__item']}>По новизне</button>
            </div>
        </div>
    )
}

export default SortModal;