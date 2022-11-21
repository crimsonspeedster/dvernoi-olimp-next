import React, {useContext, useEffect, useState} from 'react'
import sprite from "@icons/sprite.svg";
import styles from './ProductCategoryContent.module.scss';
import classNames from "classnames";
import {useRouter} from "next/router";
import {SettingsContext} from "@pages/_app";
import {ProductCardProps} from "@components/Cards/ProductCard/ProductCard";
import axios from "axios";


interface ProductLoadBtnProps {
    updatePosts: React.Dispatch<React.SetStateAction<ProductCardProps[]>>
}

const ProductCategoryLoadBtn:React.FC<ProductLoadBtnProps> = ({updatePosts}) => {
    const router = useRouter();

    const [postsUpdated, setPostsUpdated] = useState<boolean>(false);

    const settings = useContext(SettingsContext);
    const total_pages = settings.total_pages;
    const [page, setPage] = useState<number>(settings.page + 1);

    useEffect(()=>{
        setPage(parseInt(router.query.page?.toString() ?? '1') + 1);
    }, [router.query]);

    const getMoreHandler = ():void => {
        setPostsUpdated(true);

        if (router.route === "/search")
        {
            axios.get(`${process.env.NEXT_PUBLIC_ENV_WOO_API}/products`, {
                params: {
                    lang: router.locale,
                    search: router.query.s ?? '',
                    consumer_key: process.env.NEXT_PUBLIC_ENV_CONSUMER_KEY,
                    consumer_secret: process.env.NEXT_PUBLIC_ENV_CONSUMER_SECRET,
                    acf_format: 'standard',
                    per_page: process.env.NEXT_PUBLIC_ENV_PRODUCTS_PER_PAGE,
                    page
                }
            })
                .then((res) => {
                    updatePosts(prev => [...prev, ...res.data]);
                    setPage(prev => prev+1);
                    setPostsUpdated(false);
                })
                .catch((err) => {
                    console.log(err);

                    setPostsUpdated(false);
                });
        }
    }

    if(page-1 < total_pages)
    {
        return (
            <div className={classNames(styles['product-category-btn-wrapper'], 'load-btn-wrapper')}>
                <button className={classNames(styles['product-category__btn'], 'load-btn')} onClick={getMoreHandler} disabled={postsUpdated}>
                    <span className={classNames(styles['product-category__btn-icon'], 'load-btn__icon')}>
                        <svg>
                            <use href={`${sprite.src}#load-arrow`}/>
                        </svg>
                    </span>

                    <span className={classNames(styles['product-category__btn-text'], 'load-btn__text')}>Загрузить еще</span>
                </button>
            </div>
        );
    }
    else {
        return (<></>);
    }
}

export default ProductCategoryLoadBtn;