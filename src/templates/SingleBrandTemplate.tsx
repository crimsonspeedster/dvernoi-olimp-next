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
import SeoBlock, {seoBlockProps} from "@components/SeoBlock/SeoBlock";


interface SingleBrandTemplateProps {
    breadcrumbs: Breadcrumb[],
    title: string,
    content: string,
    collectionTitle: string,
    posts: BrandProp[],
    productItems: ProductCardProps[],
    category_filter: FilterAttrsProps[],
    setProductItems: React.Dispatch<SetStateAction<ProductCardProps[]>>
    priceRange?: PriceRangeProps,
    image?: string
    seoBlock?: seoBlockProps
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
        image,
        seoBlock
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
                image={image}
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

            {
                seoBlock?.title &&
                <SeoBlock
                    seoBlock={seoBlock}
                />
            }
        </>
    )
}

export default SingleBrandTemplate;