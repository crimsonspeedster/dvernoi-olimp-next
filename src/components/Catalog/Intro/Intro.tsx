import React from 'react'
import styles from './Intro.module.scss';
import CatalogCategories from './CatalogCategories'
import classNames from "classnames";


const CatalogIntro = () => {
    return (
        <section className={classNames(styles['catalog-intro'], 'intro')}>
            <div className="container">
                <h1 className={classNames(styles['catalog-intro__title'], 'title', 'title--dark')}>Каталог дверей</h1>

                <CatalogCategories />
            </div>
        </section>
    )
}

export default CatalogIntro;