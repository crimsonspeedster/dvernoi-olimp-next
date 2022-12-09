import React from 'react'
import styles from './Intro.module.scss';
import classNames from "classnames";
import Image from "next/image";
import PhotoPlaceholder from '@icons/clear_photo.png';


interface SingleBrandIntroProps {
    title: string,
    content: string,
    image?: string,
}

const SingleBrandIntro: React.FC<SingleBrandIntroProps> = ({title, content, image}) => {
    return (
        <section className={classNames('intro', styles['single-brand-intro'])}>
            <div className="container">
                <div className={styles['single-brand-intro__wrapper']}>
                    <h1 className={classNames('title', 'title--dark', styles['single-brand-intro__title'])}>{title}</h1>

                    <div className={styles['single-brand-intro__inner']}>
                        <div className={styles['single-brand-intro__photo']}>
                            <div className={styles['single-brand-intro__photo-inner']}>
                                <Image src={image ?? PhotoPlaceholder.src} width={245} height={65} alt={title}/>
                            </div>
                        </div>

                        <div
                            className={classNames('article', styles['single-brand-intro__desc'])}
                            dangerouslySetInnerHTML={{__html: content ?? ''}}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SingleBrandIntro