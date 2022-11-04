import React from 'react';
import styles from './Support.module.scss';
import {PhotoProps} from "@components/About/Intro/Intro";
import classNames from "classnames";
import Image from "next/image";


export interface MainSupportProps {
    description: string,
    image_big: PhotoProps,
    image_small: PhotoProps,
    title: string
}

const MainSupport: React.FC<MainSupportProps> = ({description, image_big, image_small, title}) => {
    return (
        <div className={styles['main-support']}>
            <div className={styles['main-support__inner']}>
                <div className={styles['main-support__mobile']}>
                    <div className="container">
                        <h2 className={classNames(styles['main-support__mobile-title'], 'title', 'title--dark')}>{title}</h2>
                    </div>
                </div>

                <div className={classNames(styles['main-support__content'], styles['main-support-content'])}>
                    <div className={styles['main-support-content__container']}>
                        <div className={styles['main-support-content__body']}>
                            <h2 className={classNames(styles['main-support-content__title'], 'title', 'title--dark')}>{title}</h2>

                            <div className={styles['main-support-content__desc']} dangerouslySetInnerHTML={{__html: description}} />

                            <button className={classNames(styles['main-support-content__btn'], 'btn')}>
                                <span className={classNames(styles['main-support-content__btn-text'], 'btn__text')}>Узнать больше</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={classNames(styles['main-support__photo'], styles['main-support-photo'])}>
                    <div className={classNames(styles['main-support-photo__img'], styles['main-support-photo__img--big'])}>
                        <Image src={image_big.url} alt={image_big.alt} width={image_big.width} height={image_big.height} />
                    </div>

                    <div className={classNames(styles['main-support-photo__img'], styles['main-support-photo__img--small'])}>
                        <Image src={image_small.url} alt={image_small.alt} width={image_small.width} height={image_small.height} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainSupport