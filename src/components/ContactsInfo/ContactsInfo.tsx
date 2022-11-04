import React, {ReactElement, useEffect, useState} from 'react';
import {Pagination, EffectFade} from 'swiper';
import {Swiper, SwiperSlide} from 'swiper/react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import styles from './ContactsInfo.module.scss';
import sprite from '@icons/sprite.svg'
import classNames from "classnames";
import Image from "next/image";
import {PhotoProps} from "@components/About/Intro/Intro";
import {If, Then} from "react-if";

export interface ContactsInfoProps {
    zagolovok: string,
    povtoritel: CitiesProps[],
    showPhotos: boolean
}

interface CitiesProps {
    gorod: string,
    magaziny: ShopProps[]
}

interface ShopProps {
    adres: string,
    adres_iframe: string,
    nomera: NomerProps[],
    emejl: string,
    dni_raboty: string,
    foto_magazina?: PhotoProps
}

interface NomerProps {
    nomer_telefona: LinkProps
}

export interface LinkProps {
    title: string,
    url: string,
    target: string
}


const ContactsInfo:React.FC<ContactsInfoProps> = ({zagolovok, povtoritel, showPhotos}) => {
    const [mapiframe, setMapiframe] = useState<string>('');

    useEffect(()=>{
        setMapiframe(povtoritel[0].magaziny[0].adres_iframe);
    }, [povtoritel]);

    const GeneratePhone = (data:NomerProps):ReactElement => (
        <a className={styles['contacts-info-slider__item-content-link']} href={data.nomer_telefona.url}>{data.nomer_telefona.title}</a>
    );

    const GenerateShopCard = (data:ShopProps):ReactElement => (
        <div className={styles['shop-card']}>
            <div className={styles['shop-card__img']}>
                <Image src={data.foto_magazina?.url ?? ''} alt={data.foto_magazina?.alt ?? ''} width={387} height={290} />
            </div>

            <p className={styles['shop-card__title']}>{data.adres}</p>
        </div>
    );

    const GenerateShop = (data:ShopProps):ReactElement => (
        <div className={styles['contacts-info-slider__item-content-elem']}>
            <div
                className={styles['contacts-info-slider__item-content-title']}
                onClick={()=>setMapiframe(data.adres_iframe)}
            >
                {data.adres}
            </div>

            <div className={styles['contacts-info-slider__item-content-inner']}>
                <div className={styles['contacts-info-slider__item-content-phones']}>
                    <div className={styles['contacts-info-slider__item-content-icon']}>
                        <svg>
                            <use href={`${sprite.src}#phone`}/>
                        </svg>
                    </div>

                    <div className={styles['contacts-info-slider__item-content-wrapper']}>
                        {
                            data.nomera.map((item, index) => (
                                <GeneratePhone
                                    nomer_telefona={item.nomer_telefona}
                                    key={index}
                                />
                            ))
                        }
                    </div>
                </div>

                <div className={styles['contacts-info-slider__item-content-email']}>
                    <div className={styles['contacts-info-slider__item-content-icon']}>
                        <svg>
                            <use href={`${sprite.src}#mail`}/>
                        </svg>
                    </div>

                    <div className={styles['contacts-info-slider__item-content-wrapper']}>
                        <a className={styles['contacts-info-slider__item-content-link']} href={`mailto:${data.emejl}`}>{data.emejl}</a>
                    </div>
                </div>

                <div className={styles['contacts-info-slider__item-content-schedule']}>
                    <div className={styles['contacts-info-slider__item-content-icon']}>
                        <svg>
                            <use href={`${sprite.src}#clock`}/>
                        </svg>
                    </div>

                    <div className={styles['contacts-info-slider__item-content-wrapper']} dangerouslySetInnerHTML={{__html: data.dni_raboty}} />
                </div>
            </div>
        </div>
    );

    return (
        <section className={styles['contacts-info']}>
            <div className="container">
                <div className={styles['contacts-info__title']}>{zagolovok}</div>

                <div className={styles['contacts-info__pagination']} />

                <Swiper
                    className={classNames(styles['contacts-info__slider'], styles['contacts-info-slider'])}
                    modules={[Pagination, EffectFade]}
                    spaceBetween={0}
                    slidesPerView={1}
                    effect="fade"
                    speed={500}
                    allowTouchMove={false}
                    pagination={{
                        clickable: true,
                        el: `.${styles['contacts-info__pagination']}`,
                        bulletClass: styles['contacts-info__pagination-item'],
                        bulletActiveClass: styles['active'],
                        renderBullet: (index, className) => (
                            `<div class="${className}">${povtoritel[index].gorod}</div>`
                        )
                    }}
                    onSlideChange={instance => setMapiframe(povtoritel[instance.activeIndex].magaziny[0].adres_iframe)}
                >
                    {
                        povtoritel.map((item, index) => {
                            return (
                                <SwiperSlide className={classNames(styles['contacts-info-slider__item'], 'contacts-info-slider__item')} key={index}>
                                    <div className={styles['contacts-info-slider__item-inner']}>
                                        <div className={styles['contacts-info-slider__item-content']}>
                                            <SimpleBar
                                                className={styles['contacts-info-slider__item-content-inner']}
                                                autoHide={false}
                                            >
                                                {
                                                    item.magaziny.map((subitem, k) => (
                                                        <GenerateShop
                                                            key={k}
                                                            adres={subitem.adres}
                                                            adres_iframe={subitem.adres_iframe}
                                                            nomera={subitem.nomera}
                                                            emejl={subitem.emejl}
                                                            dni_raboty={subitem.dni_raboty}
                                                        />
                                                    ))
                                                }
                                            </SimpleBar>
                                        </div>

                                        <div className={styles['contacts-info-slider__item-map']}>
                                            <div className={styles['contacts-info-slider__item-map-inner']} dangerouslySetInnerHTML={{__html: mapiframe}} />
                                        </div>
                                    </div>

                                    <If condition={showPhotos}>
                                        <Then>
                                            <div className={styles['shop-cards']}>
                                                <h2 className={classNames('title', 'title--dark', styles['shop-cards__title'])}>Ждем вас в наших магазинах</h2>

                                                <div className={styles['shop-cards__flex']}>
                                                    {
                                                        item.magaziny.map((subitem, k) => (
                                                            <If condition={subitem.foto_magazina?.ID} key={k}>
                                                                <Then>
                                                                    <GenerateShopCard
                                                                        adres={subitem.adres}
                                                                        adres_iframe={subitem.adres_iframe}
                                                                        nomera={subitem.nomera}
                                                                        emejl={subitem.emejl}
                                                                        dni_raboty={subitem.dni_raboty}
                                                                        foto_magazina={subitem.foto_magazina}
                                                                    />
                                                                </Then>
                                                            </If>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </Then>
                                    </If>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </section>
    )
}

export default ContactsInfo