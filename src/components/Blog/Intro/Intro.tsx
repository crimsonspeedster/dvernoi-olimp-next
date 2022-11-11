import React, {useContext, useEffect, useState} from 'react'
import BlogIntroCategories, {categoriesProps} from './BlogIntroCategories';
import BlogIntroList from './BlogIntroList';
import BlogIntroBtn from './BlogIntroBtn';
import styles from './Intro.module.scss';
import classNames from "classnames";
import {PostProp} from "@components/Homepage/Posts/Posts";
import {SettingsContext} from "@pages/_app";
import {If, Then} from "react-if";
import {useRouter} from "next/router";
import CustomPagination from "@components/CustomPagination/CustomPagination";


interface BLogIntroProps {
    title: string,
    categories: categoriesProps[],
    posts: PostProp[],
    updatePosts: React.Dispatch<React.SetStateAction<PostProp[]>>
}

const BLogIntro:React.FC<BLogIntroProps> = ({title, categories, posts, updatePosts}) => {
    const settingsCtx = useContext(SettingsContext);
    const router = useRouter();

    const [page, setPage] = useState<number>(!isNaN(parseInt(router.query.slug?.[router.query.slug?.length-1]?.toString() ?? '1')) ? parseInt(router.query.slug?.[router.query.slug?.length-1]?.toString() ?? '1') - 1 : 0);

    // useEffect(()=>{
    //     setPage(parseInt(router.query.slug?.[router.query.slug?.length-1]?.toString() ?? '1') - 1);
    // }, [router.query]);

    const handlePageClick = (selectedItem: {selected: number}):void => {
        if (router.route === "/blog/[[...slug]]")
        {
            selectedItem.selected + 1 === 1 ? router.push('/blog') : router.push(`/blog/page/${selectedItem.selected + 1}`);
        }
        else {
            selectedItem.selected + 1 === 1 ? router.push(`/category/${router?.query?.slug?.[0]}`) : router.push(`/category/${router?.query?.slug?.[0]}/page/${selectedItem.selected + 1}`);
        }
    }

    return (
        <section className={classNames(styles['blog-intro'], 'intro')}>
            <div className="container">
                <div className={styles['blog-intro__wrapper']}>
                    <h1 className={classNames(styles['blog-intro__title'], 'title', 'title--dark')}>{title}</h1>

                    <BlogIntroCategories
                        categories={categories}
                    />

                    <BlogIntroList
                        posts={posts}
                    />

                    <If condition={settingsCtx.total_pages > 1}>
                        <Then>
                            <BlogIntroBtn
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

export default BLogIntro