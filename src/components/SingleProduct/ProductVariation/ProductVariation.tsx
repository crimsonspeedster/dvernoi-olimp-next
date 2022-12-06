import React, {Dispatch, ReactElement, SetStateAction, useEffect, useState, memo} from "react";
import styles from '@components/SingleProduct/Intro/Intro.module.scss';
import {
    attributesProps,
    default_attributesProps,
    variation_arrayProps
} from "@components/SingleProduct/Intro/SingleProductContent";


interface ProductVariationProps {
    currentVariation?: variation_arrayProps,
    variation_array: variation_arrayProps[],
    attribute: attributesProps,
    defaultAttribute: default_attributesProps,
    setCurrVariation: Dispatch<SetStateAction<variation_arrayProps|undefined>>
}

const ProductVariation:React.FC<ProductVariationProps> = (props):ReactElement => {
    const {
        attribute,
        defaultAttribute,
        currentVariation,
        variation_array,
        setCurrVariation
    } = props;

    const [selectValue, setSelectValue] = useState<string|number>(defaultAttribute.option);

    useEffect(()=>{
        console.log('up');
        setSelectValue(defaultAttribute.option);
    }, [defaultAttribute.option]);

    const selectHandler = (value:string|number):void => {
        setSelectValue(value);

        const updated_variation_slug = currentVariation?.slug.replace(selectValue.toString().toLowerCase(), value.toString().toLowerCase()) ?? '';

        if (setCurrVariation)
            setCurrVariation(variation_array.filter(item => item.slug === updated_variation_slug)[0]);
    }

    return (
        <div className={styles['single-product-intro-content__inps']}>
            <div className={styles['single-product-intro-content__inp']}>
                <p className={styles['single-product-intro-content__text']}>{attribute.name}</p>

                <div className={styles['select-dropdown']}>
                    <select
                        onChange={(e)=>selectHandler(e.currentTarget.value)}
                    >
                        {
                            attribute.options.map((item, i) => (
                                <option
                                    selected={selectValue === item.toLowerCase()}
                                    key={i}
                                    value={item.toLowerCase()}
                                >
                                    {item.toLowerCase()}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </div>
    );
}

export default memo(ProductVariation);