import React, {useEffect, useState} from "react";
import styles from './Bestsellers.module.scss';
import CardSlider from "@components/CardSlider/CardSlider";
import {ProductCardProps} from "@components/Cards/ProductCard/ProductCard";
import {categoriesProps} from "@components/Blog/Intro/BlogIntroCategories";

export interface BestsellersProps {
    title: string,
    repeater: repeaterProps[]
}

interface repeaterProps {
    kategoriya: categoriesProps,
    tovary: ProductCardProps[]
}

const Bestsellers:React.FC<BestsellersProps> = ({title, repeater}) => {
    const [sliderItems, setSliderItems] = useState<ProductCardProps[]>(repeater[0].tovary);
    const [tabs, setTabs] = useState<[]|categoriesProps[]|undefined>([]);

    const tabHandler = (index: number):void => {
       setSliderItems(repeater[index].tovary);
    }

    useEffect(()=>{
        if (repeater.length > 0)
        {
            //@ts-ignore
            const tabsArr = [];

            repeater.map((item, i) => {
                tabsArr.push(item.kategoriya);
            });

            //@ts-ignore
            setTabs(tabsArr);
        }
    }, [repeater]);

    return (
        <section className={styles['bestsellers']}>
            <div className="container">
                <CardSlider
                    block_title={title}
                    sliderItems={sliderItems}
                    cardType={'product'}
                    perViewAmount={4}
                    perCard={0}
                    tabs={tabs}
                    tabHandler={tabHandler}
                />
            </div>
        </section>
    )
};

export default Bestsellers;