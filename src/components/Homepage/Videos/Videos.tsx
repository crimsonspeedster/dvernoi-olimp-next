import React from "react";
import styles from './Videos.module.scss';
import CardSlider from "@components/CardSlider/CardSlider";
import {PhotoProps} from "@components/About/Intro/Intro";


interface VideosSectionProps {
    last_video: last_videoProps,
}

export interface last_videoProps {
    title: string,
    repeater: videosRepeater[]
}

interface videosRepeater {
    video_link: string,
    video_title: string,
    video_duration: string,
    image: PhotoProps
}

const VideosSection:React.FC<VideosSectionProps> = ({last_video}) => (
    <section className={styles['videos']}>
        <div className="container">
            <CardSlider
                block_title={last_video.title}
                sliderItems={last_video.repeater}
                cardType={'video'}
                perViewAmount={2}
                perCard={60}
            />
        </div>
    </section>
);

export default VideosSection;