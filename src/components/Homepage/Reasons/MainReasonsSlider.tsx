import React, {useEffect, useState} from 'react'
import {Pagination, Navigation, type Swiper as SwiperType} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import sprite from '@icons/sprite.svg';
import styles from './MainReasons.module.scss';
import classNames from "classnames";
import {repeaterProps} from "@components/Homepage/Reasons/MainReasons";
import {If, Then} from "react-if";


interface MainReasonsSliderProps {
    items: repeaterProps[]
}

const MainReasonsSlider:React.FC<MainReasonsSliderProps> = ({items}) => {
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isVisibleSlider, setIsVisibleSlider] = useState<boolean>(false);
    const [swiperInstance, setSwiperInstance] = useState<null|SwiperType>(null);

    useEffect(() => {
        if (swiperInstance)
        {
            window.innerWidth <= 480 ? setIsVisibleSlider(true) : swiperInstance.destroy();
        }
    }, [swiperInstance]);

    return (
        <>
            <Swiper
                className={classNames(styles['main-reasons__slider'], !isVisibleSlider ? styles['destroyed'] : '')}
                modules={[Pagination, Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                speed={500}
                autoHeight={true}
                allowTouchMove={false}
                onInit={(swiper) => setSwiperInstance(swiper)}
                navigation={{
                    prevEl: `.${styles['main-reasons__prev']}`,
                    nextEl: `.${styles['main-reasons__next']}`,
                }}
                pagination={{
                    clickable: true,
                    el: `.${styles['main-reasons__pagination']}`,
                    bulletClass: classNames(styles['main-reasons__pagination-item'], 'slider-pagination__item'),
                    bulletActiveClass: 'active',
                    renderBullet: (index, className) => (`<div class="${className}"></div>`)
                }}
                onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
            >
                {
                    items.map((item, i) => (
                        <SwiperSlide key={i} className={styles['main-reasons__item']}>
                            <div className={styles['main-reasons__item-inner']}>
                                <span>{i+1<=9 ? '0' : ''}{i+1}</span>

                                <p className={styles['main-reasons__item-desc']}>{item.text}</p>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            <If condition={isVisibleSlider}>
                <Then>
                    <div className={classNames(styles['main-reasons__controls'], 'slider-controls')}>
                        <div className={classNames(styles['main-reasons__counter'], 'slider-counter')}>
                            <span className={classNames(styles['main-reasons__current'], 'slider-counter__current')}>{currentSlide + 1}</span>

                            <span className={classNames(styles['main-reasons__separator'], 'slider-counter__separator')}>/</span>

                            <span className={classNames(styles['main-reasons__total'], 'slider-counter__total')}>{items.length}</span>
                        </div>

                        <div className={classNames(styles['main-reasons__pagination'], 'slider-pagination')} />

                        <div className={classNames(styles['products-slider__nav'], 'slider-nav')}>
                            <div className={classNames(styles['main-reasons__btn'], styles['main-reasons__prev'], 'slider-nav__btn', 'slider-nav__btn-prev')}>
                                <svg>
                                    <use href={`${sprite.src}#slider-arrow-prev`}/>
                                </svg>
                            </div>

                            <div className={classNames(styles['main-reasons__btn'], styles['main-reasons__next'], 'slider-nav__btn', 'slider-nav__btn-next')}>
                                <svg>
                                    <use href={`${sprite.src}#slider-arrow-next`}/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </Then>
            </If>
        </>
    )
}

export default MainReasonsSlider