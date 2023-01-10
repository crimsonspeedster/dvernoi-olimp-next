import React, {ReactElement} from 'react';
import {Autoplay, FreeMode} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import styles from './Partners.module.scss';
import 'swiper/css';
import 'swiper/css/autoplay';
import {PhotoProps} from "@components/About/Intro/Intro";
import classNames from "classnames";
import Image from "next/image";


export interface PartnersProps {
    title: string,
    repeater: repeaterProps[]
}

interface repeaterProps {
    image: PhotoProps,
    link: string
}

const Partners:React.FC<PartnersProps> = ({title, repeater}) => (
    <div className={styles['partners']}>
        <div className={styles['partners__title-wrapper']}>
            <div className="container">
                <h2 className={classNames(styles['partners__title'], 'title', 'title--dark')}>{title}</h2>
            </div>
        </div>

        <Swiper
            className={classNames(styles['partners__slider'], styles['partners-slider'], styles['partners-slider--normal'])}
            allowTouchMove={false}
            modules={[Autoplay, FreeMode]}
            freeMode={true}
            slidesPerView={6.3}
            loop={true}
            speed={5000}
            autoplay={{
                delay: 1,
            }}
        >
            {
                repeater.map((item, i) => (
                    <SwiperSlide className={styles['partners-slider__item']} key={i}>
                        <Image src={item.image.url} alt={item.image.alt} width={item.image.width} height={item.image.height} />
                    </SwiperSlide>
                ))
            }
        </Swiper>

        <Swiper
            className={classNames(styles['partners__slider'], styles['partners-slider'], styles['partners-slider--reverse'])}
            allowTouchMove={false}
            modules={[Autoplay, FreeMode]}
            freeMode={true}
            slidesPerView={6.3}
            loop={true}
            speed={5000}
            autoplay={{
                delay: 1,
                reverseDirection: true
            }}
        >
            {
                repeater.map((item, i) => (
                    <SwiperSlide className={styles['partners-slider__item']} key={i}>
                        <Image src={item.image.url} alt={item.image.alt} width={item.image.width} height={item.image.height} />
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </div>
);

export default Partners;