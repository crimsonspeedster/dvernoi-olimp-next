import React, {useRef, useState} from 'react'
import {Pagination, Navigation, EffectFade} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import sprite from '@icons/sprite.svg'
import styles from './Intro.module.scss';
import Image from "next/image";
import classNames from "classnames";
import {LinkProps} from "@components/ContactsInfo/ContactsInfo";
import Link from "next/link";
import {If, Then} from "react-if";


export interface IntroSliderProps {
    slider: sliderProps[]
}

export interface sliderProps {
    description?: string,
    image: string,
    link?: LinkProps,
    title: string
}

const IntroSlider:React.FC<IntroSliderProps> = ({slider}) => {
    const [current, setCurrent] = useState<number>(0);

    return (
        <div className={styles['main-intro__slider-wrapper']}>
            <Swiper
                className={styles['main-intro__slider']}
                modules={[Pagination, Navigation, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                effect="fade"
                speed={500}
                allowTouchMove={false}
                navigation={{
                    prevEl: `.${styles['main-intro__slider-prev']}`,
                    nextEl: `.${styles['main-intro__slider-next']}`,
                }}
                pagination={{
                    el: `.${styles['main-intro__slider-pagination']}.slider-pagination`,
                    bulletClass: 'main-intro__slider-pagination-item slider-pagination__item',
                    bulletActiveClass: 'active',
                    renderBullet: (index, className) => (`<div class="${className}"></div>`)
                }}
                onSlideChange={swiper => setCurrent(swiper.activeIndex)}
            >
                {
                    slider.map((item, i) => (
                        <SwiperSlide className={styles['main-intro__slider-item']} key={i}>
                            <Image src={item.image} alt={item.title} width={1005} height={380} />

                            <div className={styles['main-intro__slider-info']}>
                                <h2 className={styles['main-intro__slider-title']}>{item.title}</h2>

                                {
                                    item.description &&
                                    <div className={styles['main-intro__slider-desc']} dangerouslySetInnerHTML={{__html: item.description}} />
                                }

                                {
                                    item.link && item.link.title &&
                                    <Link href={item.link.url} className={classNames(styles['main-intro__slider-btn'], 'btn')}>
                                        <span className={classNames(styles['main-intro__slider-btn-text'], 'btn__text')}>{item.link.title}</span>
                                    </Link>
                                }
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            <div className={styles['main-intro__slider-controls']}>
                <div className={classNames(styles['main-intro__slider-counter'], 'slider-counter')}>
                    <span className={classNames(styles['main-intro__slider-current'], 'slider-counter__current')}>{current + 1}</span>

                    <span className={classNames(styles['main-intro__slider-separator'], 'slider-counter__separator')}>/</span>

                    <span className={classNames(styles['main-intro__slider-total'], 'slider-counter__total')}>{slider.length}</span>
                </div>

                <div className={classNames(styles['main-intro__slider-pagination'], 'slider-pagination')} />

                <div className={classNames(styles['main-intro__slider-nav'], 'slider-nav')}>
                    <div className={classNames(styles['main-intro__slider-btn'], styles['main-intro__slider-prev'], 'slider-nav__btn', 'slider-nav__btn-prev')}>
                        <svg>
                            <use href={`${sprite.src}#slider-arrow-prev`}/>
                        </svg>
                    </div>

                    <div className={classNames(styles['main-intro__slider-btn'], styles['main-intro__slider-next'], 'slider-nav__btn', 'slider-nav__btn-next')}>
                        <svg>
                            <use href={`${sprite.src}#slider-arrow-next`}/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IntroSlider;