import React from 'react'
import classNames from "classnames";
import styles from './Intro.module.scss';

const BrandsIntroPagination = () => {
    return (
        <div className={classNames(styles['brands__pagination'], 'blog-intro-pagination', 'pagination')}>Pagination</div>
    );
}

export default BrandsIntroPagination