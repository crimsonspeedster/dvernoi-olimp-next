import React from 'react'
import styles from './Intro.module.scss';
import {useRouter} from "next/router";
import classNames from "classnames";


interface SearchIntroProps {
    title: string
}

const SearchIntro:React.FC<SearchIntroProps> = ({title}) => {
    const router = useRouter();

    return (
        <section className={styles['search-intro']}>
            <div className="container">
                <h1 className={classNames(styles['search-intro__title'], 'title', 'title--dark')}>{title} <span>«{router.query.s ?? ''}»</span></h1>
            </div>
        </section>
    )
}

export default SearchIntro