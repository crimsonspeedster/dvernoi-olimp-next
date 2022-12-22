import React, {useContext, useEffect, useState} from 'react'
import sprite from '@icons/sprite.svg';
import styles from './Intro.module.scss';
import classNames from "classnames";
import {PostProp} from "@components/Homepage/Posts/Posts";
import {useRouter} from "next/router";
import axios from "axios";
import {SettingsContext} from "@pages/_app";


interface PostLoadMoreProps {
    updatePosts: React.Dispatch<React.SetStateAction<PostProp[]>>
}

const BlogIntroBtn: React.FC<PostLoadMoreProps> = ({updatePosts}) => {
    const router = useRouter();
    const settingsCtx = useContext(SettingsContext);

    const [page, setPage] = useState<number>(!isNaN(parseInt(router?.query?.slug?.[router?.query?.slug?.length-1]?.toString() ?? '1') + 1) ? parseInt(router?.query?.slug?.[router?.query?.slug?.length-1]?.toString() ?? '1') + 1 : 2);
    const [postsUpdated, setPostsUpdated] = useState<boolean>(false);

    useEffect(()=>{
        setPage(!isNaN(parseInt(router?.query?.slug?.[router?.query?.slug?.length-1]?.toString() ?? '1') + 1) ? parseInt(router?.query?.slug?.[router?.query?.slug?.length-1]?.toString() ?? '1') + 1 : 2);
    }, [router.query]);

    const getMoreHandler = ():void => {
        setPostsUpdated(true);

        if (router.route === "/poleznoe/[[...slug]]")
        {
            axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/posts/`, {
                params: {
                    per_page: process.env.NEXT_PUBLIC_ENV_POSTS_PER_PAGE,
                    page,
                    lang: router.locale,
                    _embed: true,
                    order: 'asc',
                }
            })
                .then((res) => {
                    updatePosts((prev) => [...prev, ...res.data]);
                    setPage(page+1);
                    setPostsUpdated(false);
                })
                .catch((error) => console.log(error));
        }
        else {
            axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/posts/`, {
                params: {
                    per_page: process.env.NEXT_PUBLIC_ENV_POSTS_PER_PAGE,
                    page,
                    lang: router.locale,
                    _embed: true,
                    order: 'asc',
                    tax_name: 'category',
                    category_slug: router?.query?.slug?.[0] ?? 'uncategorized'
                }
            })
                .then((res) => {
                    updatePosts((prev) => [...prev, ...res.data]);
                    setPage(page+1);
                    setPostsUpdated(false);
                })
                .catch((error) => console.log(error));
        }


    }

    if (page <= settingsCtx.total_pages)
    {
        return (
            <div className={classNames(styles['blog-intro__btn-wrapper'], 'load-btn-wrapper')}>
                <button
                    disabled={postsUpdated}
                    className={classNames(styles['blog-intro__btn'], 'load-btn')}
                    onClick={getMoreHandler}
                >
                        <span className={classNames(styles['blog-intro__btn-icon'], 'load-btn__icon')}>
                             <svg>
                                 <use href={`${sprite.src}#load-arrow`}/>
                             </svg>
                        </span>

                    <span className={classNames(styles['blog-intro__btn-text'], 'load-btn__text')}>Загрузить еще</span>
                </button>
            </div>
        );
    }
    else {
        return (<></>);
    }
}

export default BlogIntroBtn;