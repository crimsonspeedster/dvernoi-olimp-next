import React from 'react'
import styles from './Intro.module.scss';
import BrandsIntroCategories from './IntroCategories'
import BrandsIntroList from './IntroList'
import BrandsIntroBtnLoad from './IntroBtnLoad'
import BrandsIntroPagination from './IntroPagination'
import classNames from "classnames";


const BrandsIntro = () => {
    return (
        <section className={classNames(styles.brands, 'intro')}>
            <div className="container">
                <div className={styles.brands__wrapper}>
                    <h1 className={classNames(styles.brands__title, 'title', 'title--dark')}>Бренды</h1>

                    <BrandsIntroCategories/>

                    <BrandsIntroList/>

                    <BrandsIntroBtnLoad/>

                    <BrandsIntroPagination/>
                </div>
            </div>
        </section>
    )
}

export default BrandsIntro;