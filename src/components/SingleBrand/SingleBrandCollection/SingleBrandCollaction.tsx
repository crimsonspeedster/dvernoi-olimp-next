import React from 'react';
import Link from "next/link";
import {Navigation} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import styles from './SingleBrandCollection.module.scss';
import sprite from '@icons/sprite.svg';
import classNames from "classnames";
import {BrandProp} from "@components/Cards/BrandCard/BrandCard";
import {If, Then} from "react-if";


interface SingleBrandCollectionProps {
    title: string
    posts: BrandProp[]
}

const SingleBrandCollection: React.FC<SingleBrandCollectionProps> = ({posts, title}) => (
    <section className={styles['single-brand-collection']}>
        <div className="container">
            <p className={styles['single-brand-collection__title']}>{title}</p>

            <div className={classNames(styles['single-brand-collection__slider-wrapper'], posts.length > 8 ? '' : styles['default'])}>
                <Swiper
                    className={classNames(styles['single-brand-collection__slider'], styles['single-brand-collection-slider'], posts.length > 8 ? '' : styles['default'])}
                    modules={[Navigation]}
                    spaceBetween={0}
                    enabled={posts.length > 8}
                    slidesPerView={8}
                    navigation={{
                        prevEl: `.${styles['single-brand-collection-slider__prev']}`,
                        nextEl: `.${styles['single-brand-collection-slider__next']}`
                    }}
                    breakpoints={{
                        1367: {
                            slidesPerView: 8
                        },
                        992: {
                            slidesPerView: 7
                        },
                        746: {
                            slidesPerView: 5
                        },
                        481: {
                            slidesPerView: 4
                        },
                        0: {
                            slidesPerView: 2.7
                        }
                    }}
                >
                    {
                        posts.map((item, i) => (
                            <SwiperSlide
                                key={i}
                                className={classNames(styles['single-brand-collection-slider__item'], posts.length > 8 ? '' : styles['default'])}
                            >
                                <Link
                                    className={styles['single-brand-collection-slider__item-link']}
                                    href={`/brand/${item.slug}`}
                                >
                                    <span>{item.title.rendered}</span>
                                </Link>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>

                <If condition={posts.length > 8}>
                    <Then>
                        <div
                            className={classNames(styles['single-brand-collection-slider__btn'], styles['single-brand-collection-slider__prev'])}>
                            <svg>
                                <use href={`${sprite.src}#cat-slider-prev`}/>
                            </svg>
                        </div>

                        <div
                            className={classNames(styles['single-brand-collection-slider__btn'], styles['single-brand-collection-slider__next'])}>
                            <svg>
                                <use href={`${sprite.src}#cat-slider-next`}/>
                            </svg>
                        </div>
                    </Then>
                </If>
            </div>
        </div>
    </section>
);

export default SingleBrandCollection;