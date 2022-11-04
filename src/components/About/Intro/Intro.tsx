import React from 'react';
import styles from './Intro.module.scss';
import classNames from "classnames";
import Image from 'next/image';

export interface AboutIntroProps {
    opisanie: string,
    opisanie_pod_foto: string,
    photo_right: PhotoProps,
    photo_top: PhotoProps
}

export interface PhotoProps {
    ID: number,
    url: string,
    alt: string,
    height: number,
    width: number
}

const AboutIntro:React.FC<AboutIntroProps> = (props) => {
    const {
        opisanie,
        opisanie_pod_foto,
        photo_right,
        photo_top
    } = props;

    return (
        <section className={classNames(styles['about-intro'], 'intro')}>
            <div className="container">
                <div className={classNames(styles['about-intro__preview'], styles['about-intro-preview'])}>
                    <Image src={photo_top.url} alt={photo_top.alt} width={1280} height={535} priority={true} />
                </div>

                <div className={classNames(styles['about-intro__content'], styles['about-intro-content'])}>
                    <div className={styles['about-intro-content__side']} dangerouslySetInnerHTML={{__html: opisanie}} />

                    <div className={styles['about-intro-content__side']}>
                        <div className={styles['about-intro-content__photo']}>
                            <Image src={photo_right.url} alt={photo_right.alt}  width={335} height={77} />
                        </div>

                        <div className={styles['about-intro-content__desc']} dangerouslySetInnerHTML={{__html: opisanie_pod_foto}} />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutIntro