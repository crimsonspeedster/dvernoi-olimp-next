import React from 'react';
import styles from './Subintro.module.scss';
import SubintroTop from './SubintroTop'
import SubintroList from './SubintroList'
import {PhotoProps} from "@components/About/Intro/Intro";
import {categoriesProps} from "@components/Blog/Intro/BlogIntroCategories";


export interface MainSubIntroProps {
    title: string,
    description: string,
    categories_repeater: categories_repeaterProps[],
}

export interface categories_repeaterProps {
    block_background: PhotoProps,
    main_category: categoriesProps,
    subcategories: categoriesProps[]
}

const MainSubIntro:React.FC<MainSubIntroProps> = ({title, description, categories_repeater}) => {
    return (
        <div className={styles['main-subintro']}>
            <div className="container">
                <SubintroTop title={title} description={description} />

                <SubintroList repeater={categories_repeater} />
            </div>
        </div>
    )
}

export default MainSubIntro;