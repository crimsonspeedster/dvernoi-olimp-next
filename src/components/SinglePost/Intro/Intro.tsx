import React from 'react'
import styles from './Intro.module.scss'
import SinglePostShare from './SinglePostShare'
import classNames from "classnames";
import Image from "next/image";
import {PostProp} from "@components/Homepage/Posts/Posts";
import {If, Then} from "react-if";
import Link from "next/link";
import {useRouter} from "next/router";


const SinglePostIntro:React.FC<PostProp> = (props) => {
    const {
        title,
        featured_image_link,
        slug,
        content,
        id,
        locale_date,
        category_main,
    } = props;

    const router = useRouter();

    return (
        <section className={classNames(styles['single-post-intro'], 'intro', `post-${id}`)}>
            <div className="container">
                <div className={styles['single-post-intro__top']}>
                    <h1 className={classNames(styles['single-post-intro__title'], 'title', 'title--dark')}>{title.rendered}</h1>

                    <div className={styles['single-post-intro__info']}>
                        <span className={styles['single-post-intro__date']}>{locale_date}</span>

                        <If condition={category_main?.term_id}>
                            <Then>
                                <Link href={`/category/${category_main?.slug}`} locale={router.locale} className={styles['single-post-intro__cat']}>{category_main?.name}</Link>
                            </Then>
                        </If>
                    </div>

                    {
                        featured_image_link &&
                        <div className={styles['single-post-intro__preview']}>
                            <Image src={featured_image_link} alt={title.rendered} fill={true} />
                        </div>
                    }
                </div>

                <article className={classNames(styles['single-post-intro__article'], 'article')} dangerouslySetInnerHTML={{__html: content?.rendered ?? ''}} />

                <SinglePostShare
                    title={`Оцени этот пост ${title.rendered}`}
                />
            </div>
        </section>
    )
}

export default SinglePostIntro;