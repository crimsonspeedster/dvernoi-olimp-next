import React from 'react';
import styles from './Subintro.module.scss';
import classNames from "classnames";


export interface SubintroTopProps {
    title: string,
    description: string
}

const SubintroTop:React.FC<SubintroTopProps> = ({title, description}) => {
    return (
        <div className={styles['main-subintro__top']}>
            <h2 className={classNames(styles['main-subintro__title'], 'title', 'title--dark')}>{title}</h2>

            <p className={styles['main-subintro__desc']}>{description}</p>
        </div>
    )
}

export default SubintroTop