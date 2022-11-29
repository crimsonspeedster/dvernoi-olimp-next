import React, {ChangeEvent, Dispatch, ReactElement, SetStateAction, useEffect, useRef, useState} from 'react';
import InputMask from 'react-input-mask';
import sprite from '@icons/sprite.svg';
import styles from './Intro.module.scss';
import classNames from "classnames";
import {If, Then} from "react-if";
import {variationsProps} from "@components/Cards/ProductCard/ProductCard";
import Dropdown, {DropdownValuesProps} from "@components/Dropdown/Dropdown";


interface SingleProductContentProps {
    sku: string,
    type: string,
    attributes: attributesProps[],
    variation_array: variation_arrayProps[],
    default_attributes: default_attributesProps[],
    price: string,
    currentVariation?: variation_arrayProps,
    setCurrentVariation?: Dispatch<SetStateAction<variation_arrayProps|undefined>>
}

export interface default_attributesProps {
    id: number,
    name: string,
    option: string,
}

export interface variation_arrayProps {
    id: number,
    name: string,
    slug: string
    attribute_summary: variationsProps[],
    price: string,
    default_choosed: boolean,
    in_stock: boolean
}

export interface attributesProps {
    id: number,
    name: string,
    visible: boolean,
    variation: boolean,
    options: string[],
}

interface ProductVariationProps {
    attribute: attributesProps,
    defaultAttribute: default_attributesProps,
    setCurrVariation?: Dispatch<SetStateAction<variation_arrayProps|undefined>>
}

const SingleProductContent:React.FC<SingleProductContentProps> = (props) => {
    const {
        sku,
        type,
        attributes,
        variation_array,
        price,
        default_attributes,
        currentVariation,
        setCurrentVariation
    } = props;

    const [counter, setCounter] = useState<string>('1');
    const [itemPrice, setItemPrice] = useState<string>(type === 'simple' ? price : currentVariation?.price ?? '');

    useEffect(()=>{
        setItemPrice(type === 'simple' ? price : currentVariation?.price ?? '');
    }, [price, currentVariation, type]);

    const counterHandler = (val: string):void => {
        const filteredVal = parseInt(val);

        if (isNaN(filteredVal) || filteredVal < 1) {
            setCounter('1');
            return;
        }

        setCounter(filteredVal.toString());
    }

    const counterClickHandler = (type: string):void => {
        switch (type)
        {
            case 'minus':
                setCounter(prev => (parseInt(prev) - 1) < 1 ? '1' : (parseInt(prev) - 1).toString());
                break;
            default:
                setCounter(prev => (parseInt(prev) + 1).toString());
                break;
        }
    }

    const ProductVariation:React.FC<ProductVariationProps> = (props):ReactElement => {
        const {
            attribute,
            defaultAttribute,
            setCurrVariation
        } = props;

        const selectHandler = (prevVal: DropdownValuesProps, currVal: DropdownValuesProps):void => {
            if (type === 'variable' && setCurrVariation)
                setCurrVariation(prev => variation_array.filter(item => item.slug === prev?.slug?.split('-')?.map(item => item === prevVal.slug.toString().toLowerCase() ? currVal.slug : item)?.join('-'))?.[0] ?? undefined);
        }

        return (
            <div className={styles['single-product-intro-content__inps']}>
                <div className={styles['single-product-intro-content__inp']}>
                    <p className={styles['single-product-intro-content__text']}>{attribute.name}</p>

                    <Dropdown
                        default_value={{
                            slug: currentVariation?.attribute_summary.filter(item => item.attr_name === attribute.name)[0].attr_value ?? defaultAttribute.option,
                            value: currentVariation?.attribute_summary.filter(item => item.attr_name === attribute.name)[0].attr_value ?? defaultAttribute.option
                        }}
                        classNameStr={styles['single-product-intro-dropdown']}
                        values={attribute.options.map((item) => ({
                            value: item,
                            slug: item.toLowerCase()
                        }))}
                        onSelect={(prevVal, currVal)=>selectHandler(prevVal, currVal)}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={classNames(styles['single-product-intro__content'], styles['single-product-intro-content'])}>
            <div className={styles['single-product-intro-content__top']}>
                <div className={styles['single-product-intro-content__number']}>
                    Код товара: <span>{sku}</span>
                </div>
            </div>

            <If condition={type === 'variable'}>
                <Then>
                    {
                        attributes.sort((a, b) => a.id > b.id ? 1 : -1).map((item, i) => (
                            <If key={i} condition={item.visible && item.variation}>
                                <Then>
                                    <ProductVariation
                                        defaultAttribute={default_attributes.sort((a, b) => a.id > b.id ? 1 : -1)[i]}
                                        attribute={item}
                                        setCurrVariation={setCurrentVariation}
                                    />
                                </Then>
                            </If>
                        ))
                    }
                </Then>
            </If>

            <div className={styles['single-product-intro-content__controls']}>
                <div className={styles['single-product-intro-content__controls-item']}>
                    <div className={styles['single-product-intro-content__counter']}>
                        <button
                            onClick={()=>counterClickHandler('minus')}
                            className={classNames(styles['single-product-intro-content__counter-btn'], styles['single-product-intro-content__counter-btn--minus'])}
                        />

                        <input
                            className={styles['single-product-intro-content__counter-inp']}
                            type="number"
                            autoComplete="off"
                            name="product_counter"
                            onChange={(e) => setCounter(e.currentTarget.value.trim() ?? '1')}
                            onBlur={(e) => counterHandler(e.currentTarget.value.trim())}
                            value={counter}
                        />

                        <button
                            onClick={()=>counterClickHandler('plus')}
                            className={classNames(styles['single-product-intro-content__counter-btn'], styles['single-product-intro-content__counter-btn--plus'])}
                        />
                    </div>
                </div>

                <div className={styles['single-product-intro-content__controls-item']}>
                    <div className={styles['single-product-intro-content__btn-wrapper']}>
                        <button className={classNames(styles['single-product-intro-content__btn'], styles['single-product-intro-content__btn--buy'], 'btn')}>
                            <span className={classNames(styles['single-product-intro-content__btn-icon'], 'btn__icon')}>
                                <svg><use href={`${sprite.src}#cart`}/></svg>
                            </span>

                            <span className={classNames(styles['single-product-intro-content__btn-text'], 'btn__text')}>Купить</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles['single-product-intro-content__price']}>
                <p className={styles['single-product-intro-content__price-text']}>Общая стоимость:</p>

                <div className={styles['single-product-intro-content__price-count']}>
                    <span>{itemPrice}</span> грн / шт.
                </div>
            </div>

            <div className={styles['single-product-intro-content__btns']}>
                <div className={styles['single-product-intro-content__btns-item']}>
                    <button className={classNames(styles['single-product-intro-content__btn'], styles['single-product-intro-content__btn--ruler'], 'btn')}>
                        <span className={classNames(styles['single-product-intro-content__btn-icon'], 'btn__icon')}>
                            <svg><use href={`${sprite.src}#ruler`}/></svg>
                        </span>

                        <span className={classNames(styles['single-product-intro-content__btn-text'], 'btn__text')}>Вызвать замерщика</span>
                    </button>
                </div>
            </div>

            <div className={styles['single-product-intro-content__bot']}>
                <div className={styles['single-product-intro-content__bot-item']}>
                    <InputMask
                        className={styles['single-product-intro-content__phone']}
                        mask="+38 (099) 999-99-99"
                        maskPlaceholder={null}
                        name="phone"
                        autoComplete="off"
                        type="tel"
                        placeholder="+38 (___) ___-__-__"
                    />
                </div>

                <div className={styles['single-product-intro-content__bot-item']}>
                    <button className={classNames(styles['single-product-intro-content__btn'], styles['single-product-intro-content__btn--cursor'], 'btn')}>
                        <span className={classNames(styles['single-product-intro-content__btn-icon'], 'btn__icon')}>
                            <svg><use href={`${sprite.src}#cursor`}/></svg>
                        </span>

                        <span className={classNames(styles['single-product-intro-content__btn-text'], 'btn__text')}>Купить в 1 клик</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SingleProductContent