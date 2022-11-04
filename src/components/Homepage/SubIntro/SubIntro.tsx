import React from 'react';
import styles from './Subintro.module.scss';
import SubintroTop from './SubintroTop'
import SubintroList from './SubintroList'
import {PhotoProps} from "@components/About/Intro/Intro";


export interface MainSubIntroProps {
    title: string,
    description: string,
    categories_repeater: categories_repeaterProps[],
}

export interface categories_repeaterProps {
    block_background: PhotoProps,
    main_category: categoryProps,
    subcategories: categoryProps[]
}

export interface categoryProps {
    name: string,
    slug: string,
    term_id: number,
    taxonomy: string
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