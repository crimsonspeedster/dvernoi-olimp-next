import React from "react";
import BLogIntro from "@components/Blog/Intro/Intro";
import Breadcrumbs, {Breadcrumb} from "@components/Breadcrumbs/Breadcrumbs";
import {categoriesProps} from "@components/Blog/Intro/BlogIntroCategories";
import {PostProp} from "@components/Homepage/Posts/Posts";


interface BlogTemplateProps {
    breadcrumbs: Breadcrumb[],
    pageTitle: string,
    categories: categoriesProps[],
    posts: PostProp[],
    updatePosts: React.Dispatch<React.SetStateAction<PostProp[]>>
}

const BlogTemplate:React.FC<BlogTemplateProps> = ({breadcrumbs, pageTitle, categories, posts, updatePosts}) => (
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
    </>
);

export default BlogTemplate;