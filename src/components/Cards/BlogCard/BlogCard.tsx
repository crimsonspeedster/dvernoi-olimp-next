import React from "react";
import styles from './BlogCard.module.scss';
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import {PostProp} from "@components/Homepage/Posts/Posts";


const BlogCard:React.FC<PostProp> = ({title, featured_image_link, id, slug, locale_date, category_main }) => (
    <article className={classNames(styles['post'], `post-${id}`)}>
        <Link href="/" className={styles['post__img']}>
            <Image src={featured_image_link} alt={title} width={410} height={295} />
        </Link>

        <div className={styles['post-info']}>
            <span className={styles['post-info__date']}>{locale_date}</span>

            {category_main && <div className={styles['post-info__category']}>{category_main}</div>}
        </div>

        <Link href="/" className={styles['post__title']}>{title}</Link>
    </article>
);

export default BlogCard;