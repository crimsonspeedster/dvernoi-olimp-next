import React, {Dispatch, memo, SetStateAction, useEffect, useState} from "react";
import styles from '@components/SingleProduct/Intro/Intro.module.scss';
import {extraAttributesProps} from "@components/SingleProduct/Intro/SingleProductContent";


interface ProductExtraProps {
    attributeTitle: string,
    attributeValues: ProductExtraOptionsProps[],
    extraProducts: extraAttributesProps[],
    updateExtraProducts: Dispatch<SetStateAction<extraAttributesProps[]>>
}

export interface ProductExtraOptionsProps {
    id: number,
    value: string,
    slug: string,
    price: string,
    choosed: boolean
}

const ProductExtra:React.FC<ProductExtraProps> = (props) => {
    const {
        attributeTitle,
        attributeValues,
        extraProducts,
        updateExtraProducts
    } = props;

    const [selectValue, setSelectValue] = useState<ProductExtraOptionsProps>(attributeValues[0]);

    useEffect(()=>{
        setSelectValue(attributeValues[0]);
    }, [attributeValues]);

    const selectHandler = (attrName:string, obj: ProductExtraOptionsProps):void => {
        setSelectValue(obj);

        const extraProductElement:extraAttributesProps = extraProducts.filter(item => item.attribute_title === attrName)[0];

        extraProductElement.attribute_values.forEach(item => {
            item.choosed = item.slug === obj.slug;

            return item;
        });

        updateExtraProducts(prev => [
            ...prev.slice(0, prev.findIndex(item => item.attribute_title === attrName)),
            extraProductElement,
            ...prev.slice(prev.findIndex(item => item.attribute_title === attrName) + 1)
        ]);
    }

    return (
        <div className={styles['single-product-intro-content__inps']}>
            <div className={styles['single-product-intro-content__inp']}>
                <p className={styles['single-product-intro-content__text']}>{attributeTitle}</p>

                <div className={styles['select-dropdown']}>
                    <select
                        onChange={(e)=>selectHandler(attributeTitle, attributeValues.filter(item => item.slug === e.currentTarget.value)[0])}
                    >
                        {
                            attributeValues.map(item => (
                                <option
                                    selected={item.slug === selectValue.slug}
                                    key={item.id}
                                    value={item.slug.toLowerCase()}
                                    dangerouslySetInnerHTML={{__html: item.value}}
                                />
                            ))
                        }
                    </select>
                </div>
            </div>
        </div>
    );
}

export default memo(ProductExtra);