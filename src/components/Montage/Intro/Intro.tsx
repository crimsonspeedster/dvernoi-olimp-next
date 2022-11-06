import React from 'react';
import styles from './Intro.module.scss';
import classNames from "classnames";
import {tarifyProps} from "@root/templates/services/Montage";


interface MontageIntroPropsProps {
    title: string,
    block: tarifyProps
}

const MontageIntro: React.FC<MontageIntroPropsProps> = ({title, block}) => (
    <section className={classNames(styles['montage-intro'], 'intro')}>
        <div className="container">
            <h1 className={classNames(styles['montage-intro__title'], 'title', 'title--dark')}>{title}</h1>

            <h2 className={styles['montage-intro__subtitle']}>{block.nazvanie}</h2>

            <div className={styles['montage-intro__inner']}>
                {
                    block.povtoritel_opisaniya.map((item, i) => (
                        <div key={i} className={styles['montage-intro__item']} dangerouslySetInnerHTML={{__html: item.opisanie}} />
                    ))
                }
            </div>
        </div>
    </section>
);

export default MontageIntro