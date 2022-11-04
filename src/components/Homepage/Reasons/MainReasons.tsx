import React from 'react';
import styles from './MainReasons.module.scss';
import MainReasonsSlider from './MainReasonsSlider';
import classNames from "classnames";


export interface MainReasonsProps {
    title: string,
    background: string,
    repeater: repeaterProps[]
}

export interface repeaterProps {
    text: string
}

const MainReasons:React.FC<MainReasonsProps> = ({title, background, repeater}) => (
    <div className={styles['main-reasons']} style={{backgroundImage: `url(${background})`}}>
        <div className="container">
            <h2 className={classNames(styles['main-reasons__title'], 'title', 'title--light')}>{title}</h2>

            <MainReasonsSlider items={repeater} />
        </div>
    </div>
);

export default MainReasons;