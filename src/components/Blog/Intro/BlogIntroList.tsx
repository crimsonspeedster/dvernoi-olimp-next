import React, {useContext} from 'react'
import Link from "next/link";
import styles from './Intro.module.scss';
import {PrefixContext} from '@components/context/PrefixContext';
import post1 from '@images/post-1.jpg';
import classNames from "classnames";


const BlogIntroList = () => {
    let prefix = useContext(PrefixContext);

    return (
        <div className={classNames(styles['blog-intro__list'], styles['blog-intro-list'])}>
            <div className={classNames(styles['blog-intro-list__item'], 'post')}>
                <div className="post__inner">
                    <Link href={`${prefix}single-post/`}>
                        <a className="post__link"/>
                    </Link>

                    <div className="post__preview">
                        <img src={post1.src} alt="" width={410} height={295}/>
                    </div>

                    <div className={classNames('post__info', styles['post__info'])}>
                        <div className="post__date">01.12.2021</div>

                        <div className={classNames('post__cat', styles['post__cat'])}>Название категории</div>
                    </div>

                    <div className="post__title">А в DARUMI в листопад - АКЦІЯ!</div>
                </div>
            </div>
        </div>
    )
}

export default BlogIntroList