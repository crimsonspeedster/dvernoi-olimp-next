import React from "react";
import styles from './Posts.module.scss';
import CardSlider from "@components/CardSlider/CardSlider";
import {categoriesProps} from "@components/Blog/Intro/BlogIntroCategories";

export interface PostsSectionProps {
    recentPosts: PostProp[]
}

export interface PostProp {
    title: postTitleProp,
    featured_image_link?: string,
    slug: string,
    content?: postTitleProp,
    id: number,
    locale_date: string,
    category_main?: categoriesProps,
}

interface postTitleProp {
    rendered: string
}

const PostsSection: React.FC<PostsSectionProps> = ({recentPosts}) => (
    <section className={styles['posts']}>
        <div className="container">
            <CardSlider
                block_title={'Блог'}
                sliderItems={recentPosts}
                cardType={'post'}
                perViewAmount={3}
                perCard={30}
            />
        </div>
    </section>
);

export default PostsSection;