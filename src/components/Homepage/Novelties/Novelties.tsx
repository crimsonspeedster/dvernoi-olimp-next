import React from "react";
import styles from "./Novelties.module.scss";
import CardSlider from "@components/CardSlider/CardSlider";
import {ProductCardProps} from "@components/Cards/ProductCard/ProductCard";


interface NoveltiesProps {
    novelties: noveltiesProps,
}

export interface noveltiesProps {
    title: string,
    products: ProductCardProps[]
}

const Novelties:React.FC<NoveltiesProps> = ({novelties}) => (
    <section className={styles['novelties']}>
        <div className="container">
            <CardSlider
                block_title={novelties.title}
                sliderItems={novelties.products}
                cardType={'product'}
                perViewAmount={4}
                perCard={0}
            />
        </div>
    </section>
);

export default Novelties;