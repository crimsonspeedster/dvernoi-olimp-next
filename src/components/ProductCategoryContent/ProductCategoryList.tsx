import React, {useContext, useState} from 'react'
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

    const handlePageClick = (selectedItem: {selected: number}):void => {
        if (router.route === '/search')
        {
            const queryParams = router.query;

            selectedItem.selected + 1 === 1 ? delete queryParams['page'] : queryParams['page'] = (selectedItem.selected + 1).toString();

            router.push({
                pathname: router.pathname,
                query: queryParams
            });
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

                    {/*<ProductCategoryPagination />*/}
                </Then>
            </If>

            <Banner className={styles['product-category-sidebar__banner']} />
        </div>
    )
}

export default ProductCategoryList