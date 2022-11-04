import React, {useRef, useContext, useState} from 'react'
import Link from "next/link";
import {Navigation, Pagination, Autoplay} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react';
import styles from './Intro.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import sprite from '@icons/sprite.svg'
import cat1 from '@images/catalog-1.svg'
import Image from "next/image";
import classNames from "classnames";
import {SettingsContext} from "@pages/_app";
import {menuItemProp} from "@components/Header/interfaces";
import {If, Then} from "react-if";


interface IntroCatSliderProps {

}

const IntroCatSlider:React.FC<IntroCatSliderProps> = ({}) => {
    const [current, setCurrent] = useState<number>(0);

    const settingsCtx = useContext(SettingsContext).menus.header_catalog;

    return (
        <div className={styles['main-intro__cat-wrapper']}>
            <Swiper
                className={classNames(styles['main-intro__cat'], styles['main-intro-cat'])}
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={5}
                speed={500}
                loop={true}
                navigation={{
                    prevEl: `.${styles['main-intro-cat__prev']}`,
                    nextEl: `.${styles['main-intro-cat__next']}`
                }}
                pagination={{
                    clickable: true,
                    el: `.${styles['main-intro-cat__pagination']}.slider-pagination`,
                    bulletClass: `${styles['main-intro-cat__pagination-item'], 'slider-pagination__item'}`,
                    bulletActiveClass: 'active',
                    renderBullet: (index, className) => (`
                        <div class="${className}"></div>
                    `)
                }}
                breakpoints={{
                    650: {
                        slidesPerView: 5
                    },
                    481: {
                        slidesPerView: 4,
                        navigation: {
                            nextEl: `.${styles['main-intro-cat__next']}`,
                            prevEl: `.${styles['main-intro-cat__prev']}`,
                        },
                    },
                    0: {
                        slidesPerView: 2.7,
                        navigation: {
                            nextEl: `.${styles['main-intro-cat__next-mob']}.slider-nav__btn-next`,
                            prevEl: `.${styles['main-intro-cat__next-mob']}.slider-nav__btn-prev`,
                        },
                    }
                }}
                onSlideChange={swiper => setCurrent(swiper.activeIndex)}
            >
                {
                    settingsCtx.map((item:menuItemProp, i:number) => (
                        <SwiperSlide key={i} className={styles['main-intro-cat__item']}>
                            <Link className={styles['main-intro-cat__link']} href={item.url}>
                                {
                                    item.acfmenu?.icon &&
                                    <span className={styles['main-intro-cat__preview']}>
                                        <Image src={item.acfmenu.icon.sourceUrl} alt={item.acfmenu.icon.altText} width={45} height={45} />
                                    </span>
                                }

                                <span className={styles['main-intro-cat__title']}>{item.label}</span>
                            </Link>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            <div className={classNames(styles['main-intro-cat__btn'], styles['main-intro-cat__prev'])}>
                <svg>
                    <use href={`${sprite.src}#cat-slider-prev`}/>
                </svg>
            </div>

            <div className={classNames(styles['main-intro-cat__btn'], styles['main-intro-cat__next'])}>
                <svg>
                    <use href={`${sprite.src}#cat-slider-next`}/>
                </svg>
            </div>

            <div className={classNames(styles['main-intro-cat__controls'], 'slider-controls')}>
                <div className={classNames(styles['main-intro-cat__counter'], 'slider-counter')}>
                    <span className={classNames(styles['main-intro-cat__current'], 'slider-counter__current')}>{current + 1}</span>

                    <span className={classNames(styles['main-intro-cat__separator'], 'slider-counter__separator')}>/</span>

                    <span className={classNames(styles['main-intro-cat__total'], 'slider-counter__total')}>{settingsCtx.length}</span>
                </div>

                <div className={classNames(styles['main-intro-cat__pagination'], 'slider-pagination')} />

                <div className={classNames(styles['main-intro-cat__nav'], 'slider-nav')}>
                    <div className={classNames(styles['main-intro-cat__btn-mob'], styles['main-intro-cat__prev-mob'], 'slider-nav__btn', 'slider-nav__btn-prev')}>
                        <svg>
                            <use href={`${sprite.src}#slider-arrow-prev`}/>
                        </svg>
                    </div>

                    <div className={classNames(styles['main-intro-cat__btn-mob'], styles['main-intro-cat__next-mob'], 'slider-nav__btn', 'slider-nav__btn-next')}>
                        <svg>
                            <use href={`${sprite.src}#slider-arrow-next`}/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IntroCatSlider