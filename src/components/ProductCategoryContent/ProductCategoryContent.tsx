import React, {useState, useEffect, Dispatch, SetStateAction} from 'react'
import styles from './ProductCategoryContent.module.scss';
import ProductCategoryControls from './ProductCategoryControls'
import ProductCategoryBox from './ProductCategoryBox'
import SortModal from '@components/Modal/SortModal';
import {enableScrollbar} from '@utils/enableScrollbar'
import {disableScrollbar} from '@utils/disableScrollbar'
import {FilterAttrsProps} from "@components/ProductCategoryContent/ProductCategorySidebar";
import {ProductCardProps} from "@components/Cards/ProductCard/ProductCard";


interface ProductCategoryContentProps {
    isSearchPage: boolean,
    isOpenFilter: boolean,
    setIsOpenFilter: Dispatch<SetStateAction<boolean>>,
    category_filter: FilterAttrsProps[],
    products: ProductCardProps[],
    setProductItems: React.Dispatch<React.SetStateAction<ProductCardProps[]>>
}

const ProductCategoryContent: React.FC<ProductCategoryContentProps> = (props) => {
    const {
        isSearchPage,
        isOpenFilter,
        category_filter,
        setIsOpenFilter,
        products,
        setProductItems
    } = props;

    const [isModalExist, setIsModalExist] = useState<boolean>(false);

    useEffect(() => {
        // gsap.registerPlugin(ScrollTrigger)

        setIsModalExist(window.innerWidth<= 649);
    }, [])

    useEffect(() => {
        isOpenFilter ? disableScrollbar() : enableScrollbar();
    }, [isOpenFilter])

    return (
        <div className={styles['product-category-content']}>
            <div className="container">
                <ProductCategoryControls
                    isSearchPage={isSearchPage}
                    isModalExist={isModalExist}
                    setIsOpenFilter={setIsOpenFilter}
                    category_filter={category_filter}
                />

                <ProductCategoryBox
                    isSearchPage={isSearchPage}
                    isModalExist={isModalExist}
                    isOpenFilter={isOpenFilter}
                    setIsOpenFilter={setIsOpenFilter}
                    category_filter={category_filter}
                    products={products}
                    setProductItems={setProductItems}
                />

                {isModalExist && <SortModal />}
            </div>
        </div>
    )
}

export default ProductCategoryContent