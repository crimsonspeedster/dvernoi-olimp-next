import React, {useEffect, useState} from 'react'
import styles from './Intro.module.scss'
import SingleProductSlider from './SingleProductSlider'
import SingleProductContent, {
    attributesProps,
    default_attributesProps, extraAttributesProps,
    variation_arrayProps
} from './SingleProductContent'
import SingleProductInfo from './SingleProductInfo'
import classNames from "classnames";
import {ImageProductProps} from "@components/Cards/ProductCard/ProductCard";
import {useDispatch} from "react-redux";
import {setProductFull, setProductSelectedName, setProductSelectedStock} from "@store/product";


interface SingleProductIntroProps {
    id: number,
    title: string,
    sku: string,
    type: string,
    slug: string,
    in_stock: boolean,
    attributes: attributesProps[],
    variation_array: variation_arrayProps[],
    default_attributes: default_attributesProps[],
    images: ImageProductProps,
    regular_price: string,
    extra_attributes: extraAttributesProps[]
}

const SingleProductIntro:React.FC<SingleProductIntroProps> = (props) => {
    const {
        id,
        title,
        sku,
        in_stock,
        type,
        slug,
        attributes,
        variation_array,
        default_attributes,
        images,
        regular_price,
        extra_attributes
    } = props;

    const dispatch = useDispatch();

    const [variation, setVariation] = useState<variation_arrayProps|undefined>(type === 'variable' ? variation_array.filter(item => item.slug === `${slug}-${default_attributes.sort((a, b)=> a.id > b.id ? 1 : -1).map(item => item.option).join('-')}`)[0] : undefined);
    const [stock, setStock] = useState<boolean>(type === 'simple' ? in_stock : variation?.in_stock ?? false);

    useEffect(()=>{
        setStock(type === 'simple' ? in_stock : variation?.in_stock ?? false);

        dispatch(setProductSelectedName(type === 'variable' ? variation?.name ?? '' : title));
        dispatch(setProductSelectedStock(type === 'simple' ? in_stock : variation?.in_stock ?? false));

        dispatch(setProductFull(type === 'variable' ? variation : {
            id,
            title,
            sku,
            in_stock,
            type,
            slug,
            attributes,
            variation_array,
            default_attributes,
            images,
            regular_price,
            extra_attributes
        }))
    }, [variation, type, title, in_stock]);

    return (
        <section className={classNames(styles['single-product-intro'], 'intro')}>
            <div className="container">
                <h1 className={classNames(styles['single-product-intro__title'], 'title', 'title--dark')}>{title}</h1>

                <div className={styles['single-product-intro__inner']}>
                    <SingleProductSlider
                        images={images}
                        in_stock={stock}
                        title={title}
                    />

                    <SingleProductContent
                        in_stock={stock}
                        sku={sku}
                        id={id}
                        title={title}
                        type={type}
                        attributes={attributes}
                        variation_array={variation_array}
                        default_attributes={default_attributes}
                        price={regular_price}
                        currentVariation={variation}
                        setCurrentVariation={setVariation}
                        extra_attributes={extra_attributes}
                    />

                    <SingleProductInfo />
                </div>
        </div>
</section>
)
}

export default SingleProductIntro