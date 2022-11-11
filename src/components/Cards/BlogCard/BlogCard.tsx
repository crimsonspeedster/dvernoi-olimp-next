import React from "react";
import styles from './BlogCard.module.scss';
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import {PostProp} from "@components/Homepage/Posts/Posts";
import {useRouter} from "next/router";
import PhotoPlaceholder from '@icons/clear_photo.png';


const BlogCard:React.FC<PostProp> = (props) => {
    const {
        title,
        featured_image_link,
        id,
        slug, locale_date,
        category_main
    } = props;

    const router = useRouter();

    return (
        <article className={classNames(styles['post'], `post-${id}`)}>
            <Link href={`/post/${slug}`} locale={router.locale} className={styles['post__img']}>
                <Image src={featured_image_link ? featured_image_link : PhotoPlaceholder.src} alt={title.rendered} width={410} height={295} />
            </Link>

            <div className={styles['post-info']}>
                <span className={styles['post-info__date']}>{locale_date}</span>

                {category_main && <Link href={`/category/${category_main.slug}`} locale={router.locale} className={styles['post-info__category']}>{category_main.name}</Link>}
            </div>

            <Link href={`/post/${slug}`} locale={router.locale} className={styles['post__title']}>{title.rendered}</Link>
        </article>
    );
};

export default BlogCard;