import React, {useContext, useEffect, useState} from 'react'
import styles from './Intro.module.scss';
import BrandsIntroCategories from './IntroCategories'
import BrandsIntroList from './IntroList'
import BrandsIntroBtnLoad from './IntroBtnLoad'
import classNames from "classnames";
import {categoriesProps} from "@components/Blog/Intro/BlogIntroCategories";
import {BrandProp} from "@components/Cards/BrandCard/BrandCard";
import {SettingsContext} from "@pages/_app";
import {If, Then} from "react-if";
import CustomPagination from "@components/CustomPagination/CustomPagination";
import {useRouter} from "next/router";
import {isNaN} from "formik";


interface BrandsIntroProps {
    title: string,
    categories: categoriesProps[],
    posts: BrandProp[],
    updatePosts: React.Dispatch<React.SetStateAction<BrandProp[]>>
}

const BrandsIntro:React.FC<BrandsIntroProps> = ({title, categories, posts, updatePosts}) => {
    const settingsCtx = useContext(SettingsContext);
    const router = useRouter();

    const [page, setPage] = useState<number>(!isNaN(parseInt(router.query.slug?.[router.query.slug?.length-1]?.toString() ?? '1')) ? parseInt(router.query.slug?.[router.query.slug?.length-1]?.toString() ?? '1') - 1 : 0);

    const handlePageClick = (selectedItem: {selected: number}):void => {
        if (router.route === "/proizvoditeli-dverey/[[...slug]]")
        {
            selectedItem.selected + 1 === 1 ? router.push('/proizvoditeli-dverey') : router.push(`/proizvoditeli-dverey/page/${selectedItem.selected + 1}`);
        }
        else {
            selectedItem.selected + 1 === 1 ? router.push(`/brands-category/${router?.query?.slug?.[0]}`) : router.push(`/brands-category/${router?.query?.slug?.[0]}/page/${selectedItem.selected + 1}`);
        }
    }

    return (
        <section className={classNames(styles.brands, 'intro')}>
            <div className="container">
                <div className={styles.brands__wrapper}>
                    <h1 className={classNames(styles.brands__title, 'title', 'title--dark')}>{title}</h1>

                    <BrandsIntroCategories
                        categories={categories}
                    />

                    <BrandsIntroList
                        posts={posts}
                    />

                    <If condition={settingsCtx.total_pages > 1}>
                        <Then>
                            <BrandsIntroBtnLoad
                                updatePosts={updatePosts}
                            />

                            <CustomPagination pages={settingsCtx.total_pages} initialPage={page} handlePageClick={handlePageClick} />
                        </Then>
                    </If>
                </div>
            </div>
        </section>
    )
}

export default BrandsIntro;