import React, {useEffect, useState} from "react";
import styles from './VideoCard.module.scss';
import sprite from "@icons/sprite.svg";
import Image from "next/image";
import {PhotoProps} from "@components/About/Intro/Intro";
import * as duration from 'duration-fns';
import axios from "axios";
import {Else, If, Then} from "react-if";


export interface VideoCardProps {
    ssylka_na_video: string,
    tekst_pod_video: string,
    foto?: PhotoProps,
    dlitelnost_video?: string
}

const VideoCard:React.FC<VideoCardProps> = (props) => {
    const {
        ssylka_na_video,
        tekst_pod_video,
        foto,
        dlitelnost_video
    } = props;

    const video_id:string|undefined = ssylka_na_video.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/)?.pop();

    const [contentDuration, setContentDuration] = useState<string>('');
    const [formatDuration, setFormatDuration] = useState<string>('0:00');
    const [videoOpened, setVideoOpened] = useState<boolean>(false);

    useEffect(()=>{

        if (!dlitelnost_video && video_id)
        {
            axios.get('https://www.googleapis.com/youtube/v3/videos', {
                params: {
                    id: video_id,
                    part: 'contentDetails',
                    key: process.env.NEXT_PUBLIC_ENV_APP_YOUTUBE_KEY
                }
            })
                .then(function (response) {
                    setContentDuration(response?.data?.items?.[0]?.contentDetails?.duration ?? '');
                })
                .catch(function (error) {
                    console.log(error);
                });
        }


    }, [video_id, dlitelnost_video]);

    useEffect(()=>{

        if (contentDuration)
        {
            let minutes = duration.parse(contentDuration).minutes;
            let seconds = duration.parse(contentDuration).seconds;

            setFormatDuration(`${minutes}:${seconds}`)
        }

    }, [contentDuration]);

    return (
        <div className={styles['videoCard']}>
            <div
                className={styles['videoCard__img']}
                onClick={()=>setVideoOpened(true)}
            >
                <If condition={videoOpened}>
                    <Then>
                        <iframe width="100%" height="345" src={`https://www.youtube.com/embed/${video_id}?autoplay=1`} frameBorder="0" allowFullScreen  allow='autoplay' />
                    </Then>

                    <Else>
                        <>
                            <Image
                                src={foto ? foto.url : `https://img.youtube.com/vi/${video_id}/maxresdefault.jpg`}
                                alt=""
                                width={610}
                                height={345}
                            />

                            <svg
                                className={styles['videoCard__btn']}
                            >
                                <use href={`${sprite.src}#video-youtube`}/>
                            </svg>
                        </>
                    </Else>
                </If>
            </div>

            <div className={styles['videoCard-block']}>
                <h3 className={styles['videoCard-block__title']}>{tekst_pod_video}</h3>

                <p className={styles['videoCard-block__duration']}>{dlitelnost_video ? dlitelnost_video : formatDuration}</p>
            </div>
        </div>
    );
}

export default VideoCard;