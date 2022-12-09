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
        setPage(!isNaN(parseInt(router?.query?.slug?.[router?.query?.slug?.length-1]?.toString() ?? '1') + 1) ? parseInt(router?.query?.slug?.[router?.query?.slug?.length-1]?.toString() ?? '1') + 1 : 2);
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
        else if (router.route === '/[slug]/[[...subcategory_slug]]') {
            let filter_items:string[]|undefined = [];

            const filterStartIndex:number = router.query.subcategory_slug?.indexOf('filter') ?? -1;
            const filterEndIndex:number = router.query.subcategory_slug?.indexOf('apply') ?? -1;

            const productsRequestParams:any = {
                lang: router.locale,
                category: router.query.subcategory_slug?.[0] === 'filter' || router.query.subcategory_slug?.[0] === 'page' ? router.query.slug : router.query.subcategory_slug?.[0] ?? router.query.slug,
                consumer_key: process.env.NEXT_PUBLIC_ENV_CONSUMER_KEY,
                consumer_secret: process.env.NEXT_PUBLIC_ENV_CONSUMER_SECRET,
                per_page: process.env.NEXT_PUBLIC_ENV_PRODUCTS_PER_PAGE,
                page,
                acf_format: 'standard',
                ...(router.query.order) && {order: router.query.order},
                ...(router.query.orderBy) && {orderby: router.query.orderBy}
            };

            if (filterStartIndex >= 0 && filterEndIndex > 0)
            {
                filter_items = router.query.subcategory_slug?.slice(filterStartIndex+1, filterEndIndex).toString().split(',');

                filter_items?.map(item => item.split('-').filter(item => item !== 'is' && item !== 'or'))?.map(item => {
                    productsRequestParams[`filter[${item[0]}]`] = item.filter(subitem => subitem !== item[0]).join(', ');

                    return item;
                });
            }

            axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/products`, {
                params: productsRequestParams
            })
                .then((res) => {
                    updatePosts(prev => [...prev, ...res.data.products]);
                    setPage(prev => prev+1);
                    setPostsUpdated(false);
                })
                .catch((err) => {
                    console.log(err);

                    setPostsUpdated(false);
                });
        }
        else {
            let filter_items:string[]|undefined = [];

            const filterStartIndex:number = router.query.slug?.indexOf('filter') ?? -1;
            const filterEndIndex:number = router.query.slug?.indexOf('apply') ?? -1;

            const productsRequestParams:any = {
                lang: router.locale,
                category: settings.products_category,
                consumer_key: process.env.NEXT_PUBLIC_ENV_CONSUMER_KEY,
                consumer_secret: process.env.NEXT_PUBLIC_ENV_CONSUMER_SECRET,
                per_page: process.env.NEXT_PUBLIC_ENV_PRODUCTS_PER_PAGE,
                page,
                acf_format: 'standard',
                ...(router.query.order) && {order: router.query.order},
                ...(router.query.orderBy) && {orderby: router.query.orderBy}
            };

            if (filterStartIndex >= 0 && filterEndIndex > 0)
            {
                filter_items = router.query.slug?.slice(filterStartIndex+1, filterEndIndex).toString().split(',');

                filter_items?.map(item => item.split('-').filter(item => item !== 'is' && item !== 'or'))?.map(item => {
                    productsRequestParams[`filter[${item[0]}]`] = item.filter(subitem => subitem !== item[0]).join(', ');

                    return item;
                });
            }

            axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/products`, {
                params: productsRequestParams
            })
                .then((res) => {
                    updatePosts(prev => [...prev, ...res.data.products]);
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