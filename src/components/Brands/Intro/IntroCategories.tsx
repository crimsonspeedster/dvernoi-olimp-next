import React from 'react';
import styles from './Intro.module.scss';
import classNames from "classnames";
import {categoriesProps} from "@components/Blog/Intro/BlogIntroCategories";
import Link from "next/link";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";


interface BrandsIntroCategoriesProps {
    categories: categoriesProps[],
}

const BrandsIntroCategories:React.FC<BrandsIntroCategoriesProps> = ({categories}) => {
    const router = useRouter();
    const {t} = useTranslation('common');

    return (
        <div className={classNames(styles['brands__categories'], styles['brands-categories'])}>
            <Link
                href={"/proizvoditeli-dverey"}
                className={classNames(styles['brands-categories__item'], router.pathname === "/proizvoditeli-dverey/[[...slug]]" ? styles.active : '')}
            >
                {t('allCategories')}
            </Link>

            {
                categories.map((item, i) => (
                    <Link
                        href={`/brands-category/${item.slug}`}
                        key={i}
                        className={classNames(styles['brands-categories__item'], router.query?.slug?.[0] === item.slug ? styles.active : '')}
                    >
                        {item.name}
                    </Link>
                ))
            }
        </div>
    );
}

export default BrandsIntroCategories;