import React, {useEffect, useState} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation, Controller, Autoplay, EffectFade, type Swiper as SwiperType} from 'swiper'
import styles from './AboutStory.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import sprite from '@icons/sprite.svg';
import aboutStory from '@images/about-story.jpg';
import classNames from "classnames";
import Image from 'next/image';
import {PhotoProps} from "@components/About/Intro/Intro";


interface AboutStorySliderProps {
    data: storyProps[]
}

export interface storyProps {
    foto: PhotoProps,
    god: string,
    opisanie: string
}

const AboutStorySlider:React.FC<AboutStorySliderProps> = ({data}) => {
    let [controlledSlider, setControlledSlider] = useState<SwiperType|null>(null);

    return (
        <div className={styles['about-story__sliders']}>
            <div className={styles['about-story__slider-content-wrapper']}>
                {
                    controlledSlider &&

                    <Swiper
                        className={classNames(styles['about-story__slider-content'], styles['about-story-slider-content'])}
                        modules={[Navigation, Controller, Autoplay, EffectFade]}
                        spaceBetween={0}
                        slidesPerView={1}
                        allowTouchMove={false}
                        effect="fade"
                        controller={{control: controlledSlider}}
                        speed={500}
                        navigation={{
                            prevEl: `.${styles['about-story__slider-content-prev']}`,
                            nextEl: `.${styles['about-story__slider-content-next']}`
                        }}
                    >
                        {
                            data.map((item, i) => (
                                <SwiperSlide key={i} className={classNames(styles['about-story-slider-content__item'], 'about-story-slider-content__item')}>
                                    <div className={styles['about-story-slider-content__item-title']}>{item.god}</div>

                                    <p className={styles['about-story-slider-content__item-desc']}>{item.opisanie}</p>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                }
                <div className={styles['about-story__slider-content-nav']}>
                    <div className={classNames(styles['about-story__slider-content-btn'], styles['about-story__slider-content-prev'])}>
                        <svg>
                            <use href={`${sprite.src}#slider-arrow-prev`}/>
                        </svg>
                    </div>

                    <div className={classNames(styles['about-story__slider-content-btn'], styles['about-story__slider-content-next'])}>
                        <svg>
                            <use href={`${sprite.src}#slider-arrow-next`}/>
                        </svg>
                    </div>
                </div>
            </div>

            <div className={styles['about-story__slider-photo-wrapper']}>
                <Swiper
                    className={classNames(styles['about-story__slider-photo'], styles['about-story-slider-photo'])}
                    modules={[Navigation, Controller, Autoplay, EffectFade]}
                    spaceBetween={15}
                    slidesPerView={1}
                    onSwiper={(instance) => {
                        setControlledSlider(instance)
                    }}
                    allowTouchMove={false}
                    speed={500}
                >
                    {
                        data.map((item, i) => (
                            <SwiperSlide key={i} className={styles['about-story-slider-photo__item']}>
                                <Image
                                    src={item.foto.url}
                                    alt={item.foto.alt}
                                    width={945}
                                    height={470}
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    )
}

export default AboutStorySlider