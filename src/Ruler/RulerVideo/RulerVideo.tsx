import React from 'react'
import styles from './RulerVideo.module.scss';
import VideoCard from "@components/Cards/VideoCard/VideoCard";
import {PhotoProps} from "@components/About/Intro/Intro";


interface RulerVideoProps {
    title: string,
    link: string,
    image?: PhotoProps,
    duration?: string
}

const RulerVideo: React.FC<RulerVideoProps> = ({title, link, image, duration}) => (
    <section className={styles['ruler-video']}>
        <div className="container">
            <div className={styles['ruler-video__inner']}>
                <VideoCard
                    ssylka_na_video={link}
                    tekst_pod_video={title}
                    dlitelnost_video={duration}
                    foto={image}
                />
            </div>
        </div>
    </section>
);

export default RulerVideo;