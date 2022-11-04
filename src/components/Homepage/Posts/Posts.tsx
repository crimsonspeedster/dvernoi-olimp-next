import React from "react";
import styles from './Posts.module.scss';
import CardSlider from "@components/CardSlider/CardSlider";

export interface PostsSectionProps {
    recentPosts: PostProp[]
}

export interface PostProp {
    title: string,
    featured_image_link: string,
    slug: string,
    id: number,
    locale_date: string,
    category_main?: string,
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