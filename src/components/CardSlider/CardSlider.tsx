import React, {ReactElement, useEffect, useState} from "react";
import classNames from "classnames";
import  { Navigation, type Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import styles from './CardSlider.module.scss';
import {If, Then} from "react-if";
import ProductCard from "@components/Cards/ProductCard/ProductCard";
import VideoCard from "@components/Cards/VideoCard/VideoCard";
import {PhotoProps} from "@components/About/Intro/Intro";
import BlogCard from "@components/Cards/BlogCard/BlogCard";
import {categoriesProps} from "@components/Blog/Intro/BlogIntroCategories";

interface cardSliderProps {
    block_title: string,
    tabs?: categoriesProps[]|[],
    sliderItems: any[],
    tabHandler?: (index:number) => void,
    perViewAmount: number,
    cardType: string,
    perCard: number
}

const CardSlider:React.FC<cardSliderProps> = (props) => {
    const {
        block_title,
        tabs,
        perCard,
        sliderItems,
        perViewAmount,
        cardType,
        tabHandler
    } = props;

    const [swiperInstance, setSwiperInstance] = useState<null|SwiperType>(null);
    const [paginationInstance, setPaginationInstance] = useState<null|SwiperType>(null);
    const [paginationSlide, setPaginationSlide] = useState<number>(0);
    const [activeTab, setActiveTab] = useState<number>(0);

    useEffect(()=>{
        swiperInstance && sliderItems.length <= perViewAmount ? swiperInstance.destroy() : null;
    }, [sliderItems, perViewAmount, swiperInstance]);

    useEffect(()=>{
        swiperInstance ? swiperInstance?.slideTo(0, 0) : null;
    }, [activeTab, swiperInstance]);

    const cardItem = (type:string, data:any):ReactElement => {
        switch (type)
        {
            case 'product':
                return (
                    <ProductCard
                        id={data.id}
                        name={data.name}
                        images={data.images}
                        price={data.price}
                        in_stock={data.in_stock}
                        sku={data.sku}
                        slug={data.slug}
                        labels={data.labels}
                        type={data.type}
                        variations={data.variations}
                        variation_array={data.variation_array}
                    />
                );
            case 'video':
                return (
                    <VideoCard
                        ssylka_na_video={data.video_link}
                        tekst_pod_video={data.video_title}
                        foto={data.image}
                        dlitelnost_video={data.video_duration}
                    />
                );
            case 'post':
                return (
                    <BlogCard
                        title={data.title}
                        featured_image_link={data.featured_image_link}
                        slug={data.slug}
                        id={data.id}
                        locale_date={data.locale_date}
                        category_main={data.category_main}
                    />
                );
            default:
                return (<></>);
        }
    };

    const cardSlides = (item:any, index:number):ReactElement => (
        <SwiperSlide key={index} className={classNames(styles['cardSlider-slide'], sliderItems.length <= perViewAmount ? 'cardSlider-slide--default' : '', cardType)}>
            {
                cardItem(cardType, item)
            }
        </SwiperSlide>
    );

    return (
        <div className={styles['cardSlider']}>
            <div className={styles['cardSlider-top']}>
                <h2 className={classNames(styles['cardSlider-top__title'], 'title', 'title--dark')}>{block_title}</h2>

                <If condition={sliderItems.length > perViewAmount}>
                    <Then>
                        <div className={classNames(styles['cardSlider-right'], styles['top'])}>
                            <span className={styles['cardSlider-right__amount']}>{paginationSlide + 1} / {Math.ceil(sliderItems.length / perViewAmount)}</span>

                            <Swiper
                                className={styles['cardSlider-right__pagination']}
                                spaceBetween={8}
                                slidesPerView={perViewAmount}
                                speed={500}
                                allowTouchMove={false}
                                breakpoints={{
                                    320: {
                                        slidesPerView: 1,
                                    },
                                    360: {
                                        slidesPerView: perViewAmount > 2 ? 2 : perViewAmount,
                                    },
                                    768: {
                                        slidesPerView: perViewAmount > 3 ? 3 : perViewAmount,
                                    },
                                    991: {
                                        slidesPerView: perViewAmount > 4 ? 4 : perViewAmount,
                                    }
                                }}
                                onInit={(instance) => setPaginationInstance(instance)}
                            >
                                {
                                    new Array(Math.ceil(sliderItems.length / perViewAmount)).fill(0).map((_:number, index) => (
                                        <SwiperSlide
                                            key={index}
                                            tag={'span'}
                                            className={index === paginationSlide ? styles['active'] : ''}
                                        />
                                    ))
                                }
                            </Swiper>

                            <div className={styles['cardSlider-right__navigation']}>
                            <span className={classNames(styles['cardSlider__arrow'], styles['left'], cardType)}>
                                <svg width="28" height="17" viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.75 16.5L1 8.75L8.75 0.999998" stroke="#C1C1C1"/>
                                    <path d="M1.43066 8.75L27.264 8.75" stroke="#C1C1C1"/>
                                </svg>
                            </span>

                            <span className={classNames(styles['cardSlider__arrow'], styles['right'], cardType)}>
                                <svg width="28" height="17" viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.7773 1L26.5273 8.75L18.7773 16.5" stroke="#C1C1C1"/>
                                    <path d="M26.0967 8.75L0.263343 8.75" stroke="#C1C1C1"/>
                                </svg>
                            </span>
                            </div>
                        </div>
                    </Then>
                </If>
            </div>

            <If condition={tabs && tabs.length > 0}>
                <Then>
                    <div className={styles['cardSlider-tabs']}>
                        {
                            tabs?.map((item, index) => (
                                <div
                                    key={index}
                                    className={classNames(styles['cardSlider-tab'], activeTab === index ? styles['active'] : '')}
                                    onClick={()=>{
                                        setActiveTab(index);

                                        if (tabHandler)
                                        tabHandler(index);
                                    }}
                                >
                                    {item.name}
                                </div>
                            ))
                        }
                    </div>
                </Then>
            </If>

            <Swiper
                className={classNames(styles['cardSlider-slider'], sliderItems.length <= perViewAmount ? styles['cardSlider-slider--destroyed'] : '', cardType)}
                modules={[Navigation]}
                spaceBetween={perCard}
                slidesPerView={perViewAmount}
                slidesPerGroup={perViewAmount}
                speed={500}
                allowTouchMove={false}
                autoHeight={true}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        slidesPerGroup: 1
                    },
                    360: {
                        slidesPerView: perViewAmount > 2 ? 2 : perViewAmount,
                        slidesPerGroup: perViewAmount > 2 ? 2 : perViewAmount
                    },
                    768: {
                        slidesPerView: perViewAmount > 3 ? 3 : perViewAmount,
                        slidesPerGroup: perViewAmount > 3 ? 3 : perViewAmount
                    },
                    991: {
                        slidesPerView: perViewAmount > 4 ? 4 : perViewAmount,
                        slidesPerGroup: perViewAmount > 4 ? 4 : perViewAmount
                    }
                }}
                onInit={(instance) => {
                    setSwiperInstance(instance);
                }}
                onSlideChange={(instance) => {
                    if (paginationInstance)
                    {
                        paginationInstance.slideTo(Math.ceil(instance.activeIndex / perViewAmount));
                        setPaginationSlide(Math.ceil(instance.activeIndex / perViewAmount));
                    }
                }}
                navigation={{
                    prevEl: `.${styles['cardSlider__arrow']}.${styles['left']}.${cardType}`,
                    nextEl: `.${styles['cardSlider__arrow']}.${styles['right']}.${cardType}`,
                }}
            >
                {
                    sliderItems.map((item, index) => cardSlides(item, index))
                }
            </Swiper>

            <If condition={sliderItems.length > perViewAmount}>
                <Then>
                    <div className={classNames(styles['cardSlider-right'], styles['bottom'])}>
                        <span className={styles['cardSlider-right__amount']}>{paginationSlide + 1} / {Math.ceil(sliderItems.length / perViewAmount)}</span>

                        <Swiper
                            className={styles['cardSlider-right__pagination']}
                            spaceBetween={8}
                            slidesPerView={perViewAmount}
                            speed={500}
                            allowTouchMove={false}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1,
                                },
                                360: {
                                    slidesPerView: perViewAmount > 2 ? 2 : perViewAmount,
                                },
                                768: {
                                    slidesPerView: perViewAmount > 3 ? 3 : perViewAmount,
                                },
                                991: {
                                    slidesPerView: perViewAmount > 4 ? 4 : perViewAmount,
                                }
                            }}
                            onInit={(instance) => setPaginationInstance(instance)}
                        >
                            {
                                new Array(Math.ceil(sliderItems.length / perViewAmount)).fill(0).map((_:number, index) => (
                                    <SwiperSlide
                                        key={index}
                                        tag={'span'}
                                        className={index === paginationSlide ? styles['active'] : ''}
                                    />
                                ))
                            }
                        </Swiper>

                        <div className={styles['cardSlider-right__navigation']}>
                            <span className={classNames(styles['cardSlider__arrow'], styles['left'], cardType)}>
                                <svg width="28" height="17" viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.75 16.5L1 8.75L8.75 0.999998" stroke="#C1C1C1"/>
                                    <path d="M1.43066 8.75L27.264 8.75" stroke="#C1C1C1"/>
                                </svg>
                            </span>

                            <span className={classNames(styles['cardSlider__arrow'], styles['right'], cardType)}>
                                <svg width="28" height="17" viewBox="0 0 28 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.7773 1L26.5273 8.75L18.7773 16.5" stroke="#C1C1C1"/>
                                    <path d="M26.0967 8.75L0.263343 8.75" stroke="#C1C1C1"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                </Then>
            </If>
        </div>
    );
}

export default CardSlider;