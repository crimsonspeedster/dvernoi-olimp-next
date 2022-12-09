import React, {SetStateAction, useState} from "react";
import Breadcrumbs, {Breadcrumb} from "@components/Breadcrumbs/Breadcrumbs";
import SingleBrandIntro from "@components/SingleBrand/Intro/Intro";
import {If, Then} from "react-if";
import SingleBrandCollection from "@components/SingleBrand/SingleBrandCollection/SingleBrandCollaction";
import {BrandProp} from "@components/Cards/BrandCard/BrandCard";
import ProductCategoryContent from "@components/ProductCategoryContent/ProductCategoryContent";
import {FilterAttrsProps} from "@components/ProductCategoryContent/ProductCategorySidebar";
import {ProductCardProps} from "@components/Cards/ProductCard/ProductCard";
import {PriceRangeProps} from "@root/templates/CatalogCategoryTemplate";


interface SingleBrandTemplateProps {
    breadcrumbs: Breadcrumb[],
    title: string,
    content: string,
    collectionTitle: string,
    posts: BrandProp[],
    productItems: ProductCardProps[],
    category_filter: FilterAttrsProps[],
    setProductItems: React.Dispatch<SetStateAction<ProductCardProps[]>>
    priceRange?: PriceRangeProps
}

const SingleBrandTemplate:React.FC<SingleBrandTemplateProps> = (props) => {
    const {
        title,
        content,
        breadcrumbs,
        collectionTitle,
        posts,
        category_filter,
        priceRange,
        setProductItems,
        productItems,
    } = props;

    const [ isOpenFilter, setIsOpenFilter ] = useState<boolean>(false)

    return (
        <>
            <Breadcrumbs
                list={breadcrumbs}
            />

            <SingleBrandIntro
                title={title}
                content={content}
            />

            <If condition={posts.length > 0}>
                <Then>
                    <SingleBrandCollection
                        title={collectionTitle}
                        posts={posts}
                    />
                </Then>
            </If>

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
    )
}

export default SingleBrandTemplate;