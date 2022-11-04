import React from 'react';
import classNames from "classnames";
import styles from './Intro.module.scss';

interface BlogIntroPaginationProps {

}

const BlogIntroPagination:React.FC<BlogIntroPaginationProps> = () => (
    <div className={classNames(styles['blog-intro__pagination'], styles['blog-intro-pagination'], 'pagination')}>Pagination</div>
)

export default BlogIntroPagination;