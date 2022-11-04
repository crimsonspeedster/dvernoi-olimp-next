import React from 'react'
import styles from './Stages.module.scss';
import classNames from "classnames";


export interface MainStagesProps {
    background_image: string,
    repeater: repeaterProps[],
    title: string
}

interface repeaterProps {
    text: string
}

const MainStages:React.FC<MainStagesProps> = ({background_image, repeater, title}) => {
    return (
        <div className={styles['main-stages']} style={{backgroundImage: `url(${background_image})`}}>
            <div className="container">
                <div className={classNames(styles['main-stages__title'], 'title', 'title--light')}>{title}</div>

                <div className={styles['main-stages__inner']}>
                    {
                        repeater.map((item, i) => (
                            <div className={styles['main-stages__item']} key={i}>
                                <div className={styles['main-stages__item-inner']}>
                                    <div className={styles['main-stages__item-title']}>{item.text}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default MainStages;