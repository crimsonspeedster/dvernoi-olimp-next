import React, {useContext} from 'react'
import Link from "next/link";
import styles from './Intro.module.scss';
import post1 from '@images/post-1.jpg';
import classNames from "classnames";
import {PostProp} from "@components/Homepage/Posts/Posts";
import BlogCard from "@components/Cards/BlogCard/BlogCard";


interface BlogIntroListProps {
    posts: PostProp[]
}

const BlogIntroList:React.FC<BlogIntroListProps> = ({posts}) => (
    <div className={classNames(styles['blog-intro__list'], styles['blog-intro-list'])}>
        {
            posts.map((item, i) => (
                <BlogCard
                    key={i}
                    title={item.title}
                    featured_image_link={item.featured_image_link}
                    slug={item.slug}
                    id={item.id}
                    category_main={item.category_main}
                    locale_date={item.locale_date}
                />
            ))
        }
    </div>
);

export default BlogIntroList