import React from 'react'
import styles from './AboutMissions.module.scss';
import aboutMission from '@images/about-mission.jpg';
import classNames from "classnames";
import Image from 'next/image';
import {PhotoProps} from "@components/About/Intro/Intro";
import {iconProps} from "@components/About/AboutIcons/AboutIcons";


export interface AboutMissionsProps {
    nazvanie: string,
    repeater: iconProps[]
}

const AboutMissions:React.FC<AboutMissionsProps> = ({nazvanie, repeater}) => (
    <section className={styles['about-mission']}>
        <div className="container">
            <div className={classNames(styles['about-mission__title'], 'title', 'title--dark')}>{nazvanie}</div>

            <div className={styles['about-mission__inner']}>
                {
                    repeater.map((item, i) => (
                        <div key={i} className={styles['about-mission__item']}>
                            <div className={styles['about-mission__item-inner']}>
                                <div className={styles['about-mission__item-photo']}>
                                    <Image
                                        src={item.foto.url}
                                        alt={item.foto.alt}
                                        width={385}
                                        height={295}
                                    />
                                </div>

                                <div className={styles['about-mission__item-title']}>{item.tekst}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </section>
);

export default AboutMissions;