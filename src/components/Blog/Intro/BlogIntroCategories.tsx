import React from 'react';
import styles from './Intro.module.scss';
import classNames from "classnames";
import {useRouter} from "next/router";
import Link from "next/link";
import {useTranslation} from "next-i18next";

interface BlogIntroCategoriesProps {
    categories: categoriesProps[],
}

export interface categoriesProps {
    term_id: number,
    name: string,
    slug: string,
    taxonomy: string,
    featured_image?: string,
    link: string
}

const BlogIntroCategories:React.FC<BlogIntroCategoriesProps> = ({categories}) => {
    const router = useRouter();
    const {t} = useTranslation('common');

    return (
        <div className={classNames(styles['blog-intro__categories'], styles['blog-intro-categories'])}>
            <Link
                className={classNames(styles['blog-intro-categories__item'], router.route === "/poleznoe/[[...slug]]" ? styles.active : '')}
                href={"/poleznoe"}
                locale={router.locale}
            >
                {t('allCategories')}
            </Link>

            {
                categories.map((item, i) => (
                        <Link
                            key={i}
                            className={classNames(styles['blog-intro-categories__item'], item.slug === router.query?.slug?.[0] ? styles.active : '')}
                            href={`/category/${item.slug}`}
                            locale={router.locale}
                        >
                            {item.name}
                        </Link>
                ))
            }
        </div>
    );
}

export default BlogIntroCategories;