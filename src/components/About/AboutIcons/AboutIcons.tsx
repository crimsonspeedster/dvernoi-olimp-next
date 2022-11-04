import React from 'react';
import styles from './AboutIcons.module.scss';
import Image from 'next/image';
import {PhotoProps} from "@components/About/Intro/Intro";


interface AboutIconsProps {
    preimushhestva: iconProps[]
}

export interface iconProps {
    foto: PhotoProps,
    tekst: string
}

const AboutIcons:React.FC<AboutIconsProps> = ({preimushhestva}) => (
    <section className={styles['about-icons']}>
        <div className="container">
            <div className={styles['about-icons__inner']}>
                {
                    preimushhestva.map((item, i) => (
                        <div key={i} className={styles['about-icons__item']}>
                            <div className={styles['about-icons__item-inner']}>
                                <div className={styles['about-icons__item-icon']}>
                                    <Image src={item.foto.url} alt={item.foto.alt} width={96} height={96} />
                                </div>

                                <div className={styles['about-icons__item-title']}>{item.tekst}</div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </section>
);

export default AboutIcons;