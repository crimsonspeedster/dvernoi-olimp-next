import React from 'react'
import Callback from '@components/Callback/Callback';
import styles from './Intro.module.scss'
import classNames from "classnames";
import {If, Then} from "react-if";


interface RulerIntroProps {
    title: string,
    opisanie_sverhu?: string
}

const RulerIntro: React.FC<RulerIntroProps> = ({title, opisanie_sverhu}) => {
    return (
        <section className={classNames(styles['ruler-intro'], 'intro')}>
            <div className="container">
                <div className={styles['ruler-intro__wrapper']}>
                    <h1 className={classNames(styles['ruler-intro__title'], 'title', 'title--dark')}>{title}</h1>

                    <Callback/>

                    {
                        opisanie_sverhu &&
                        <div
                            className={styles['ruler-intro__bot']}
                            dangerouslySetInnerHTML={{__html: opisanie_sverhu}}
                        />
                    }
                </div>
            </div>
        </section>
    )
}

export default RulerIntro;