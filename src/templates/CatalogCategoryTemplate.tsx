import React, {SetStateAction, useState} from "react";
import Breadcrumbs, {Breadcrumb} from "@components/Breadcrumbs/Breadcrumbs";
import ProductCategoryIntro from "@components/ProductCategory/Intro/Intro";
import {categoriesProps} from "@components/Blog/Intro/BlogIntroCategories";
import ProductCategoryContent from "@components/ProductCategoryContent/ProductCategoryContent";
import {FilterAttrsProps} from "@components/ProductCategoryContent/ProductCategorySidebar";
import {ProductCardProps} from "@components/Cards/ProductCard/ProductCard";


interface CatalogCategoryTemplateProps {
    breadcrumbs: Breadcrumb[],
    pageTitle: string,
    childrenCategories: categoriesProps[],
    category_filter: FilterAttrsProps[],
    productItems: ProductCardProps[],
    setProductItems: React.Dispatch<SetStateAction<ProductCardProps[]>>
    priceRange?: PriceRangeProps
}

export interface PriceRangeProps {
    min_price: string,
    max_price: string
}

const CatalogCategoryTemplate:React.FC<CatalogCategoryTemplateProps> = (props) => {
    const {
        breadcrumbs,
        pageTitle,
        category_filter,
        childrenCategories,
        productItems,
        setProductItems,
        priceRange
    } = props;

    const [ isOpenFilter, setIsOpenFilter ] = useState<boolean>(false)

    return (
        <>
            <Breadcrumbs
                list={breadcrumbs}
            />

            <ProductCategoryIntro
                title={pageTitle}
                childrenCategories={childrenCategories}
            />

            <ProductCategoryContent
                isSearchPage={false}
                isOpenFilter={isOpenFilter}
                setIsOpenFilter={setIsOpenFilter}
                category_filter={category_filter}
                products={productItems}
                setProductItems={setProductItems}
                priceRange={priceRange}
            />
        </>
    );
}

export default CatalogCategoryTemplate;