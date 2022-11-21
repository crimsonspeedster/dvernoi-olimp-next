import React, {Dispatch, SetStateAction} from 'react'
import styles from './ProductCategoryContent.module.scss';
import ProductCategorySidebar, {FilterAttrsProps} from './ProductCategorySidebar'
import ProductCategoryList from './ProductCategoryList'
import {ProductCardProps} from "@components/Cards/ProductCard/ProductCard";
import {Else, If, Then} from "react-if";


interface ProductCategoryBoxProps {
    isSearchPage: boolean,
    isModalExist: boolean,
    isOpenFilter: boolean,
    setIsOpenFilter: Dispatch<SetStateAction<boolean>>,
    category_filter: FilterAttrsProps[],
    products: ProductCardProps[],
    setProductItems: React.Dispatch<React.SetStateAction<ProductCardProps[]>>
}

const ProductCategoryBox:React.FC<ProductCategoryBoxProps> = ({isSearchPage, setProductItems, isModalExist, products, isOpenFilter, setIsOpenFilter, category_filter}) => {
    return (
        <div className={styles['product-category-box']}>
            <ProductCategorySidebar
                isSearchPage={isSearchPage}
                isModalExist={isModalExist}
                isOpenFilter={isOpenFilter}
                setIsOpenFilter={setIsOpenFilter}
                category_filter={category_filter}
            />

            <ProductCategoryList
                products={products}
                setProductItems={setProductItems}
            />
        </div>
    )
}

export default ProductCategoryBox