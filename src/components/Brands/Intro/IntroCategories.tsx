import React from 'react';
import styles from './Intro.module.scss';
import classNames from "classnames";

const BrandsIntroCategories = () => {
    return (
        <div className={classNames(styles['brands__categories'], styles['brands-categories'])}>
            <div className={classNames(styles['brands-categories__item'], styles.active)}>Все категории</div>

            <div className={styles['brands-categories__item']}>Межкомнатные двери</div>

            <div className={styles['brands-categories__item']}>Входные двери</div>

            <div className={styles['brands-categories__item']}>Фурнитура</div>
        </div>
    );
}

export default BrandsIntroCategories;