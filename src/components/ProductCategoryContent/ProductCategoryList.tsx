import React, {useContext, useEffect, useState} from 'react'
import Link from "next/link";
import ProductCategoryLoadBtn from './ProductCategoryLoadBtn'
import ProductCategoryPagination from './ProductCategoryPagination'
import Banner from '@components/Banner/Banner';
import sprite from '@icons/sprite.svg';
import Image from "next/image";
import styles from './ProductCategoryContent.module.scss';
import ProductCard, {ProductCardProps} from "@components/Cards/ProductCard/ProductCard";
import {SettingsContext} from "@pages/_app";
import {useRouter} from "next/router";
import {If, Then} from "react-if";
import CustomPagination from "@components/CustomPagination/CustomPagination";


interface ProductCategoryListProps {
    products: ProductCardProps[],
    setProductItems: React.Dispatch<React.SetStateAction<ProductCardProps[]>>
}

const ProductCategoryList:React.FC<ProductCategoryListProps> = (props) => {
    const {
        products,
        setProductItems
    } = props;

    const router = useRouter();
    const settings = useContext(SettingsContext);
    const total_pages = settings.total_pages;

    const [page, setPage] = useState<number>(settings.page-1);

    useEffect(()=>{
        setPage(settings.page-1);
    }, [settings]);

    const handlePageClick = (selectedItem: {selected: number}):void => {
        const queryParams = router.query;

        if (router.route === '/search')
        {
            selectedItem.selected + 1 === 1 ? delete queryParams['page'] : queryParams['page'] = (selectedItem.selected + 1).toString();

            router.push({
                pathname: router.pathname,
                query: queryParams
            });
        }
        else if (router.route === '/[slug]/[[...subcategory_slug]]') {
            let updated_url:string = '';

            if (router?.query?.subcategory_slug && router?.query?.subcategory_slug?.length > 0)
            {
                if (router?.query?.subcategory_slug?.[0] === 'page')
                {
                    //@ts-ignore
                    updated_url = selectedItem.selected+1 === 1 ? `/${router.query.slug}` : `/${router.query.slug}/page/${selectedItem.selected+1}`;
                }
                else {
                    //@ts-ignore
                    updated_url = selectedItem.selected+1 === 1 ? `/${router.query.slug}/${router?.query?.subcategory_slug?.filter((item, i, arr) => item !== 'page' && arr[i-1] !== 'page' && item !== 'order' && item !== 'orderBy')?.join('/')}` : `/${router.query.slug}/${router?.query?.subcategory_slug?.filter((item, i, arr) => item !== 'page' && arr[i-1] !== 'page' && item !== 'order' && item !== 'orderBy')?.join('/')}/page/${selectedItem.selected+1}`;
                }
            }
            else {
                updated_url = selectedItem.selected+1 === 1 ? `/${router.query.slug}` : `/${router.query.slug}/page/${selectedItem.selected+1}`;
            }

            if (router.query.order)
            {
                updated_url+=`?order=${router.query.order}&orderBy=${router.query.orderBy}`;
            }

           router.push(updated_url);
        }
        else {
            let updated_url:string = '';

            if (router?.query?.slug && router?.query?.slug?.length > 1)
            {
                if (router?.query?.slug?.[1] === 'page')
                {
                    //@ts-ignore
                    updated_url = selectedItem.selected+1 === 1 ? `/brand/${router.query.slug[0]}` : `/brand/${router.query.slug[0]}/page/${selectedItem.selected+1}`;
                }
                else {
                    //@ts-ignore
                    updated_url = selectedItem.selected+1 === 1 ? `/brand/${router?.query?.slug?.filter((item, i, arr) => item !== 'page' && arr[i-1] !== 'page' && item !== 'order' && item !== 'orderBy')?.join('/')}` : `/brand/${router?.query?.slug?.filter((item, i, arr) => item !== 'page' && arr[i-1] !== 'page' && item !== 'order' && item !== 'orderBy')?.join('/')}/page/${selectedItem.selected+1}`;
                }
            }
            else {
                //@ts-ignore
                updated_url = selectedItem.selected+1 === 1 ? `/brand/${router.query.slug[0]}` : `/brand/${router.query.slug[0]}/page/${selectedItem.selected+1}`;
            }

            if (router.query.order)
            {
                updated_url+=`?order=${router.query.order}&orderBy=${router.query.orderBy}`;
            }

            router.push(updated_url);
        }
    }

    return (
        <div className={styles['product-category-list-wrapper']}>
            <div className={styles['product-category-list']}>
                {
                    products.map((item, i) => (
                        <ProductCard
                            id={item.id}
                            images={item.images}
                            name={item.name}
                            price={item.price}
                            sku={item.sku}
                            slug={item.slug}
                            type={item.type}
                            in_stock={item.in_stock}
                            variations={item.variations}
                            labels={item.labels}
                            key={i}
                        />
                    ))
                }
            </div>

            <If condition={total_pages > 1}>
                <Then>
                    <ProductCategoryLoadBtn
                        updatePosts={setProductItems}
                    />

                    <CustomPagination pages={total_pages} initialPage={page} handlePageClick={handlePageClick} />
                </Then>
            </If>

            <Banner className={styles['product-category-sidebar__banner']} />
        </div>
    )
}

export default ProductCategoryList