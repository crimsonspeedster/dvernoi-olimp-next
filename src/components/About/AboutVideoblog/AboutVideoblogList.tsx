import React from 'react';
import styles from './AboutVideoblog.module.scss';
import VideoCard, {VideoCardProps} from "@components/Cards/VideoCard/VideoCard";


interface AboutVideoblogListProps {
    videos: VideoCardProps[]
}

const AboutVideoblogList:React.FC<AboutVideoblogListProps> = ({videos}) => (
    <div className={styles['about-videoblog__inner']}>
        {
            videos.map((item, i) => (
                <VideoCard
                    key={i}
                    ssylka_na_video={item.ssylka_na_video}
                    tekst_pod_video={item.tekst_pod_video}
                    dlitelnost_video={item.dlitelnost_video}
                    foto={item.foto}
                />
            ))
        }
    </div>
);

export default AboutVideoblogList;