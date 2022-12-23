import React from "react";
import BLogIntro from "@components/Blog/Intro/Intro";
import Breadcrumbs, {Breadcrumb} from "@components/Breadcrumbs/Breadcrumbs";
import {categoriesProps} from "@components/Blog/Intro/BlogIntroCategories";
import {PostProp} from "@components/Homepage/Posts/Posts";
import SeoBlock, {seoBlockProps} from "@components/SeoBlock/SeoBlock";


interface BlogTemplateProps {
    breadcrumbs: Breadcrumb[],
    pageTitle: string,
    categories: categoriesProps[],
    posts: PostProp[],
    updatePosts: React.Dispatch<React.SetStateAction<PostProp[]>>,
    seoBlock?: seoBlockProps
}

const BlogTemplate:React.FC<BlogTemplateProps> = ({breadcrumbs, pageTitle, categories, posts, updatePosts, seoBlock}) => (
    <>
        <Breadcrumbs
            list={breadcrumbs}
        />

        <BLogIntro
            title={pageTitle}
            categories={categories}
            posts={posts}
            updatePosts={updatePosts}
        />

        {
            seoBlock &&
            <SeoBlock
                seoBlock={seoBlock}
            />
        }
    </>
);

export default BlogTemplate;