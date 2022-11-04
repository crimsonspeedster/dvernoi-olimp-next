import React, {useState, useEffect} from 'react';
import styles from './AboutVideoblog.module.scss';
import AboutVideoblogList from './AboutVideoblogList';
import classNames from "classnames";
import {VideoCardProps} from "@components/Cards/VideoCard/VideoCard";


export interface AboutVideoblogProps {
    nazvanie: string,
    repeater: VideoCardProps[]
}

const AboutVideoblog:React.FC<AboutVideoblogProps> = ({nazvanie, repeater}) => (
    <section className={styles['about-videoblog']}>
        <div className="container">
            <div className={classNames(styles['about-videoblog__title'], 'title', 'title--dark')}>{nazvanie}</div>

            <AboutVideoblogList videos={repeater} />
        </div>
    </section>
);

export default AboutVideoblog;