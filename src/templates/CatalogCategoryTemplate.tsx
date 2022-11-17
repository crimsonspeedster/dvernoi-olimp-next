import React from "react";
import Breadcrumbs, {Breadcrumb} from "@components/Breadcrumbs/Breadcrumbs";
import ProductCategoryIntro from "@components/ProductCategory/Intro/Intro";
import {categoriesProps} from "@components/Blog/Intro/BlogIntroCategories";


interface CatalogCategoryTemplateProps {
    breadcrumbs: Breadcrumb[],
    pageTitle: string,
    childrenCategories: categoriesProps[]
}

const CatalogCategoryTemplate:React.FC<CatalogCategoryTemplateProps> = (props) => {
    const {
        breadcrumbs,
        pageTitle,
        childrenCategories
    } = props;

    return (
        <>
            <Breadcrumbs
                list={breadcrumbs}
            />

            <ProductCategoryIntro
                title={pageTitle}
                childrenCategories={childrenCategories}
            />
        </>
    );
}

export default CatalogCategoryTemplate;