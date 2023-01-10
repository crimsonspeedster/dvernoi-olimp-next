import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Pagination, EffectFade} from 'swiper'
import Image from "next/image";
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import styles from './Intro.module.scss';
import classNames from "classnames";
import {ImageProductProps} from "@components/Cards/ProductCard/ProductCard";
import {Else, If, Then} from "react-if";
import {useTranslation} from "next-i18next";
import ZoomIcon from "./zoom_icon.svg";
// @ts-ignore
import {Fancybox} from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox.css';


interface SingleProductSliderProps {
    images: ImageProductProps,
    in_stock: boolean,
    title: string
}

interface FancyArray {
    src: string,
    type: string,
    preload?: boolean
}

const SingleProductSlider:React.FC<SingleProductSliderProps> = (props) => {
    const {
        images,
        in_stock,
        title
    } = props;

    const {t} = useTranslation('common');

    const handleFancy = ():void => {
        const galleryImages:FancyArray[] = images.gallery.length > 0 ? images.gallery.map((item, i) => ({
                src: item,
                type: 'image',
                preload: false,
            })) : [{
            src: images.default,
            type: 'image',
            preload: false,
        }];

        Fancybox.show(galleryImages);
    }

    return (
        <div className={styles['single-product-intro__slider-wrapper']}>
            <div className={styles['single-product-intro__slider-pagination']}/>

            <div className={styles['single-product-intro__slider-inner']}>
                <div className={classNames(styles['single-product-intro__slider-stock'], in_stock ? styles['avaliable'] : styles['disavaliable'])}>{in_stock ? t('productInStock') : t('productOutStock')}</div>

                <If condition={images.gallery.length > 1}>
                    <Then>
                        <Swiper
                            className={classNames(styles['single-product-intro__slider'], styles['single-product-intro-slider'])}
                            modules={[Pagination, EffectFade]}
                            spaceBetween={0}
                            slidesPerView={1}
                            effect="fade"
                            speed={500}
                            allowTouchMove={false}
                            pagination={{
                                clickable: true,
                                el: `.${styles['single-product-intro__slider-pagination']}`,
                                bulletClass: styles['single-product-intro__slider-pagination-item'],
                                bulletActiveClass: styles['active'],
                                renderBullet: (index, className) => (`
                            <div class="${className}">
                                <div class=${styles['single-product-intro__slider-pagination-inner']}>
                                    <img src="${images.gallery[index]}" alt="" width="58" height="72">
                                </div>
                            </div>
                        `)
                            }}
                        >
                            {
                                images.gallery.map((item, i) => {
                                    return (
                                        <SwiperSlide
                                            className={styles['single-product-intro-slider__item']}
                                            key={i}
                                        >
                                            <div
                                                className={styles['single-product-intro-slider__item-inner']}
                                                onClick={handleFancy}
                                            >
                                                <Image src={item} alt={title} width={349} height={467} />
                                            </div>

                                            <div
                                                className={styles['single-product-intro-slider__item-zoom']}
                                                onClick={handleFancy}
                                            >
                                                <Image src={ZoomIcon.src} alt="zoom" width={32} height={32} />
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </Then>

                    <Else>
                        <div className={classNames(styles['single-product-intro-slider__item'], styles['opacity'])}>
                            <div
                                className={styles['single-product-intro-slider__item-inner']}
                                onClick={handleFancy}
                            >
                                <Image src={images.default} alt={title} width={349} height={467} />
                            </div>

                            <div
                                className={styles['single-product-intro-slider__item-zoom']}
                                onClick={handleFancy}
                            >
                                <Image src={ZoomIcon.src} alt="zoom" width={32} height={32} />
                            </div>
                        </div>
                    </Else>
                </If>
            </div>
        </div>
    )
}

export default SingleProductSlider