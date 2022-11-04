import React from 'react'
import styles from './AboutEmployees.module.scss';
import classNames from "classnames";
import Image from 'next/image';
import {PhotoProps} from "@components/About/Intro/Intro";


export interface AboutEmployeesProps {
    foto: PhotoProps,
    nazvanie: string,
}

const AboutEmployees:React.FC<AboutEmployeesProps> = ({foto, nazvanie}) => (
    <section className={styles['about-employees']}>
        <div className="container">
            <div className={styles['about-employees__wrapper']}>
                <div className={classNames(styles['about-employees__title'], 'title', 'title--dark')}>{nazvanie}</div>

                <div className={styles['about-employees__preview']}>
                    <Image src={foto.url} alt={foto.alt} width={1280} height={520} />
                </div>
            </div>
        </div>
    </section>
);

export default AboutEmployees;