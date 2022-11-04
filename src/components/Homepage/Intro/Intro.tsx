import React, {useState, useEffect} from 'react';
import styles from './Intro.module.scss';
import CategoryBlock from '@components/CategoryBlock/CategoryBlock'
import IntroSlider, {sliderProps} from './IntroSlider'
import IntroCatSlider from "./IntroCatSlider";
import {If, Then} from "react-if";


interface MainIntroProps {
    slider: sliderProps[]
}

const MainIntro:React.FC<MainIntroProps> = ({slider}) => {
    const [isTablet, setIsTablet] = useState(false)

    useEffect(()=>{
        setIsTablet(window.innerWidth <= 1024);
    }, []);

    return (
        <section className={styles['main-intro']}>
            <div className={styles['main-intro__wrapper']}>
                <div className="container">
                    <div className={styles['main-intro__inner']}>
                        <If condition={!isTablet}>
                            <Then>
                                <CategoryBlock className={'main-intro__catalog-wrapper--intro'}/>
                            </Then>
                        </If>

                        <IntroSlider
                            slider={slider}
                        />

                        <If condition={isTablet}>
                            <Then>
                                <IntroCatSlider />
                            </Then>
                        </If>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MainIntro;