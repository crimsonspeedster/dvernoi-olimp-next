import React from 'react';
import styles from './Intro.module.scss';
import classNames from "classnames";

interface BlogIntroCategoriesProps {
    categories: categoriesArr[],
    changeCategory: any
}

interface categoriesArr {
    id: number,
    title: string,
    isActive: boolean
}

const BlogIntroCategories:React.FC<BlogIntroCategoriesProps> = ({categories, changeCategory}) => {
    return (
        <div className={classNames(styles['blog-intro__categories'], styles['blog-intro-categories'])}>
            {
                categories.map((item) => (
                      <button
                          className={classNames(styles['blog-intro-categories__item'], item.isActive ? styles.active : '')}
                          key={item.id}
                          onClick={() => changeCategory(item.id)}
                      >
                          {item.title}
                      </button>
                ))
            }
        </div>
    );
}

export default BlogIntroCategories;