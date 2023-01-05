import React from 'react'
import Image from "next/image";
import styles from './Subintro.module.scss';
import {PhotoProps} from "@components/About/Intro/Intro";
import {If, Then} from "react-if";
import {useTranslation} from "next-i18next";


interface RulerSubintroProps {
    image?: PhotoProps,
    content: string
}

const RulerSubintro: React.FC<RulerSubintroProps> = ({image, content}) => {
    const {t} = useTranslation('common');

    return (
        <section className={styles['ruler-subintro']}>
            <div className="container">
                <div className={styles['ruler-subintro__inner']}>
                    <div className={styles['ruler-subintro__content']}>
                        <div className={styles['ruler-subintro__title']}>{t('selfMeasurement')}:</div>

                        <article className={styles['ruler-subintro__article']} dangerouslySetInnerHTML={{__html: content}}/>
                    </div>

                    <If condition={image && image.ID}>
                        <Then>
                            <div className={styles['ruler-subintro__photo']}>
                                <div className={styles['ruler-subintro__photo-inner']}>
                                    <Image src={image?.url ?? ''} alt={image?.alt ?? ''} width={275} height={335}/>
                                </div>
                            </div>
                        </Then>
                    </If>
                </div>
            </div>
        </section>
    );
}

export default RulerSubintro