import React, {Dispatch, SetStateAction} from 'react'
import styles from './ProductCategoryContent.module.scss';
import ProductCategoryFilters from './ProductCategoryFilters'
import ProductCategoryDropdown from './ProductCategoryDropdown'
import ProductCategoryBtns from "./ProductCategoryBtns";
import {If, Then} from "react-if";
import {FilterAttrsProps} from "@components/ProductCategoryContent/ProductCategorySidebar";


interface ProductCategoryControlsProps {
    isSearchPage: boolean,
    isModalExist: boolean,
    setIsOpenFilter: Dispatch<SetStateAction<boolean>>,
    category_filter: FilterAttrsProps[]
}

const ProductCategoryControls:React.FC<ProductCategoryControlsProps> = ({isSearchPage, isModalExist, setIsOpenFilter, category_filter}) => {
    return (
        <div className={styles['product-category-controls']}>
            <If condition={!isSearchPage && !isModalExist}>
                <Then>
                    <ProductCategoryFilters
                        category_filter={category_filter}
                    />
                </Then>
            </If>

            <ProductCategoryDropdown />

            <ProductCategoryBtns
                isSearchPage={isSearchPage}
                setIsOpenFilter={setIsOpenFilter}
            />
        </div>
    )
}

export default ProductCategoryControls