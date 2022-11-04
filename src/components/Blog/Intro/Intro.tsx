import React, {useState, useCallback} from 'react'
import BlogIntroCategories from './BlogIntroCategories';
import BlogIntroList from './BlogIntroList';
import BlogIntroBtn from './BlogIntroBtn';
import BlogIntroPagination from './BlogIntroPagination';

import styles from './Intro.module.scss';
import classNames from "classnames";

const BLogIntro = () => {
    const [categories, setCategories] = useState([
        {
            id: 1,
            title: 'Все категории',
            isActive: true
        },
        {
            id: 2,
            title: 'Название категории',
            isActive: false
        },
        {
            id: 3,
            title: 'Название категории',
            isActive: false
        },
        {
            id: 4,
            title: 'Название категории',
            isActive: false
        },
        {
            id: 5,
            title: 'Название категории',
            isActive: false
        },
        {
            id: 6,
            title: 'Название категории',
            isActive: false
        },
        {
            id: 7,
            title: 'Название категории',
            isActive: false
        },
    ])

    const changeCategory = useCallback((catId: number) => {
        setCategories(categories.map((item) => {
            return {
                ...item,
                isActive: item.id === catId
            }
        }))
    }, [categories]);

    return (
        <section className={classNames(styles['blog-intro'], 'intro')}>
            <div className="container">
                <div className={styles['blog-intro__wrapper']}>
                    <h1 className={classNames(styles['blog-intro__title'], 'title', 'title--dark')}>Блог</h1>

                    <BlogIntroCategories categories={categories} changeCategory={changeCategory} />

                    <BlogIntroList />

                    <BlogIntroBtn />

                    <BlogIntroPagination />
                </div>
            </div>
        </section>
    )
}

export default BLogIntro