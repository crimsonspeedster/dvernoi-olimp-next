import React, {useEffect, useState} from 'react';
import styles from './Intro.module.scss';
import pay1 from '@images/pay-1.jpg';
import pay2 from '@images/pay-2.jpg';
import pay3 from '@images/pay-3.jpg';
import classNames from "classnames";
import {tab_repeaterProps, bankiRepeater} from "@root/templates/services/Credit";
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectFade, type Swiper as SwiperType} from 'swiper';
import Image from "next/image";
import 'swiper/css';
import 'swiper/css/effect-fade';


interface CreditIntroProps {
    title: string,
    items: tab_repeaterProps[]
}

const CreditIntro:React.FC<CreditIntroProps> = ({title, items}) => {
    const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
    const [allItems, setAllItems] = useState<bankiRepeater[]>([]);
    const [sliderInstance, setSliderInstance] = useState<null|SwiperType>(null);

    useEffect(()=>{
        const res:bankiRepeater[] = [];

        items.map((item, i) => item.banki.map((subitem, k) => res.push(subitem)));

        setAllItems(res);
    }, [items]);

    useEffect(()=>{
        if (sliderInstance && !sliderInstance.destroyed) {

            sliderInstance?.slideTo(currentTabIndex);

        }
    }, [currentTabIndex, sliderInstance]);

    return (
        <section className={classNames(styles['credit'], 'intro')}>
            <div className="container">
                <h1 className={classNames(styles['credit__title'], 'title', 'title--dark')}>{title}</h1>

                <div className={classNames(styles['credit__tab'], styles['credit-tab'])}>
                    <div className={styles['credit-tab__nav']}>
                        <div
                            onClick={()=>{setCurrentTabIndex(0)}}
                            className={classNames(styles['credit-tab__nav-item'], currentTabIndex === 0 ? styles.active : '')}
                        >Все варианты</div>

                        {
                            items.map((item, i) => (
                                <div
                                    key={i}
                                    className={classNames(styles['credit-tab__nav-item'], currentTabIndex === i+1 ? styles.active : '')}
                                    onClick={()=>{setCurrentTabIndex(i + 1)}}
                                >{item.title}</div>
                            ))
                        }
                    </div>

                    <Swiper
                        className={styles['credit-tab__body']}
                        spaceBetween={0}
                        allowTouchMove={false}
                        modules={[EffectFade]}
                        effect="fade"
                        speed={500}
                        autoHeight={true}
                        onInit={(instance)=>setSliderInstance(instance)}
                    >
                        <SwiperSlide
                            className={styles['credit-tab__body-item']}
                        >
                            {
                                allItems.map((item, i) => (
                                    <div key={i} className={styles['credit-tab__body-pay']}>
                                        <div className={styles['credit-tab__body-pay-preview']}>
                                            <div className={styles['credit-tab__body-pay-preview-inner']}>
                                                <Image src={item.foto.url} alt={item.foto.alt} width={275} height={135} />
                                            </div>
                                        </div>

                                        <div className={styles['credit-tab__body-pay-content']}>
                                            <div className={styles['credit-tab__body-pay-title']}>{item.nazvanie_v_tekste}</div>

                                            <article className={styles['credit-tab__body-pay-article']} dangerouslySetInnerHTML={{__html: item.opisanie}} />
                                        </div>
                                    </div>
                                ))
                            }
                        </SwiperSlide>

                        {
                            items.map((tab_item, k) => (
                                <SwiperSlide
                                    className={styles['credit-tab__body-item']}
                                    key={k}
                                >
                                    {
                                        tab_item.banki.map((item, i) => (
                                            <div key={i} className={styles['credit-tab__body-pay']}>
                                                <div className={styles['credit-tab__body-pay-preview']}>
                                                    <div className={styles['credit-tab__body-pay-preview-inner']}>
                                                        <Image src={item.foto.url} alt={item.foto.alt} width={275} height={135} />
                                                    </div>
                                                </div>

                                                <div className={styles['credit-tab__body-pay-content']}>
                                                    <div className={styles['credit-tab__body-pay-title']}>{item.nazvanie_v_tekste}</div>

                                                    <article className={styles['credit-tab__body-pay-article']} dangerouslySetInnerHTML={{__html: item.opisanie}} />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>
                </div>
            </div>
        </section>
    );
}

export default CreditIntro