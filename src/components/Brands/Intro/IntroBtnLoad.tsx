import React, {useContext, useEffect, useState} from 'react'
import sprite from '@icons/sprite.svg';
import styles from './Intro.module.scss';
import classNames from "classnames";
import {useRouter} from "next/router";
import {SettingsContext} from "@pages/_app";
import axios from "axios";
import {BrandProp} from "@components/Cards/BrandCard/BrandCard";


interface BrandsIntroBtnLoadProps {
    updatePosts: React.Dispatch<React.SetStateAction<BrandProp[]>>
}

const BrandsIntroBtnLoad:React.FC<BrandsIntroBtnLoadProps> = ({updatePosts}) => {
    const router = useRouter();
    const settingsCtx = useContext(SettingsContext);

    const [page, setPage] = useState<number>(!isNaN(parseInt(router?.query?.slug?.[router?.query?.slug?.length-1]?.toString() ?? '1') + 1) ? parseInt(router?.query?.slug?.[router?.query?.slug?.length-1]?.toString() ?? '1') + 1 : 2);
    const [postsUpdated, setPostsUpdated] = useState<boolean>(false);

    useEffect(()=>{
        setPage(!isNaN(parseInt(router?.query?.slug?.[router?.query?.slug?.length-1]?.toString() ?? '1') + 1) ? parseInt(router?.query?.slug?.[router?.query?.slug?.length-1]?.toString() ?? '1') + 1 : 2);
    }, [router.query]);

    const getMoreHandler = ():void => {
        setPostsUpdated(true);

        if (router.route === "/brands/[[...slug]]")
        {
            axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/brend/`, {
                params: {
                    per_page: process.env.NEXT_PUBLIC_ENV_BRAND_PER_PAGE,
                    page,
                    parent: 0,
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
            axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/brend/`, {
                params: {
                    per_page: process.env.NEXT_PUBLIC_ENV_BRAND_PER_PAGE,
                    page,
                    lang: router.locale,
                    _embed: true,
                    parent: 0,
                    order: 'asc',
                    tax_name: 'product_cat',
                    category_slug: router?.query?.slug?.[0] ?? ''
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

    if (page <= settingsCtx.total_pages) {
        return (
            <div className={classNames(styles['brands__btn-wrapper'], 'load-btn-wrapper')}>
                <button
                    className={classNames(styles['brands__btn'], 'load-btn')}
                    onClick={getMoreHandler}
                    disabled={postsUpdated}
                >
                    <span className={classNames(styles['brands__btn-icon'], 'load-btn__icon')}>
                        <svg>
                            <use href={`${sprite.src}#load-arrow`} />
                        </svg>
                    </span>

                    <span className={classNames(styles['brands__btn-text'], 'load-btn__text')}>Загрузить еще</span>
                </button>
            </div>
        );
    }
    else {
        return (<></>);
    }
}

export default BrandsIntroBtnLoad;