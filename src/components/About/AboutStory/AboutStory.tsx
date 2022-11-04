import React from 'react'
import styles from './AboutStory.module.scss'
import AboutStorySlider, {storyProps} from './AboutStorySlider'
import classNames from "classnames";


export interface AboutStoryProps {
    nazvanie: string,
    istoriya_repeater: storyProps[]
}

const AboutStory:React.FC<AboutStoryProps> = (props) => {
    const {
        nazvanie,
        istoriya_repeater
    } = props;

    return (
        <section className={styles['about-story']}>
            <div className="container">
                <div className={styles['about-story__wrapper']}>
                    <div className={classNames(styles['about-story__title'], 'title', 'title--dark')}>{nazvanie}</div>

                    <AboutStorySlider data={istoriya_repeater} />
                </div>
            </div>
        </section>
    );
}

export default AboutStory;