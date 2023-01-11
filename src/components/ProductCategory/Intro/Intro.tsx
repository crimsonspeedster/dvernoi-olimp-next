import React, {useContext} from 'react'
import Link from "next/link";
import {Navigation, Autoplay} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'
import styles from './Intro.module.scss';
import Image from "next/image";
import sprite from '@icons/sprite.svg'
import classNames from "classnames";
import {categoriesProps} from "@components/Blog/Intro/BlogIntroCategories";
import {useRouter} from "next/router";
import {If, Then} from "react-if";


interface ProductCategoryIntroProps {
    title: string,
    childrenCategories: categoriesProps[]
}

const ProductCategoryIntro:React.FC<ProductCategoryIntroProps> = ({title, childrenCategories}) => {
    const router = useRouter();

    return (
        <section className={styles['product-category-intro']}>
            <div className="container">
                <h1 className={classNames(styles['product-category-intro__title'], 'title', 'title--dark')}>{title}</h1>

                <If condition={childrenCategories.length > 0}>
                    <Then>
                        <div className={classNames(styles['product-category-intro__slider-wrapper'], childrenCategories.length > 7 ? '' : styles['disabled'])}>
                            <Swiper
                                className={classNames(styles['product-category-intro__slider'], styles['product-category-intro-slider'], childrenCategories.length > 7 ? '' : styles['disabled'])}
                                modules={[Navigation, Autoplay]}
                                spaceBetween={0}
                                slidesPerView={7}
                                enabled={childrenCategories.length > 7}
                                speed={500}
                                // loop={true}
                                // autoplay={{
                                //     delay: 5000,
                                //     pauseOnMouseEnter: true,
                                //     disableOnInteraction: false
                                // }}
                                navigation={{
                                    prevEl: `.${styles['product-category-intro-slider__prev']}`,
                                    nextEl: `.${styles['product-category-intro-slider__next']}`
                                }}
                                breakpoints={{
                                    992: {
                                        slidesPerView: 7
                                    },
                                    745: {
                                        slidesPerView: 5
                                    },
                                    0: {
                                        slidesPerView: 2.7
                                    }
                                }}
                            >
                                {
                                    childrenCategories.map((item, i) => (
                                        <SwiperSlide key={i} className={classNames(styles['product-category-intro-slider__item'], childrenCategories.length > 7 ? '' : styles['default'])}>
                                            <Link className={styles['product-category-intro-slider__link']} href={item.link ?? '/'} />

                                            {
                                                item.featured_image &&
                                                <div className={styles['product-category-intro-slider__icon']}>
                                                    <Image src={item.featured_image} alt={item.name} width={40} height={40} />
                                                </div>
                                            }

                                            <p className={styles['product-category-intro-slider__title']}>{item.name}</p>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>

                            <If condition={childrenCategories.length > 7 }>
                                <Then>
                                    <div className={classNames(styles['product-category-intro-slider__btn'], styles['product-category-intro-slider__prev'])}>
                                        <svg>
                                            <use href={`${sprite.src}#cat-slider-prev`}/>
                                        </svg>
                                    </div>

                                    <div className={classNames(styles['product-category-intro-slider__btn'], styles['product-category-intro-slider__next'])}>
                                        <svg>
                                            <use href={`${sprite.src}#cat-slider-next`}/>
                                        </svg>
                                    </div>
                                </Then>
                            </If>
                        </div>
                    </Then>
                </If>
            </div>
        </section>
    );
}

export default ProductCategoryIntro;