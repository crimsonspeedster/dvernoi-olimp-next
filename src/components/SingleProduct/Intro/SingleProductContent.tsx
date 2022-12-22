import React, {
    ChangeEvent,
    Dispatch,
    ReactElement,
    SetStateAction,
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';
import InputMask from 'react-input-mask';
import sprite from '@icons/sprite.svg';
import styles from './Intro.module.scss';
import classNames from "classnames";
import {If, Then} from "react-if";
import {ProductCardProps, variationsProps} from "@components/Cards/ProductCard/ProductCard";
import ProductVariation from "@components/SingleProduct/ProductVariation/ProductVariation";
import ProductExtra, {
    ProductExtraOptionsProps
} from "@components/SingleProduct/ProductExtra/ProductExtra";
import axios from "axios";
import {SettingsContext} from "@pages/_app";
import {getCookie, getCookies} from "cookies-next";
import {setCartItemsAmount, setCartServerData} from "@store/cart";
import {useDispatch} from "react-redux";


interface SingleProductContentProps {
    id: number,
    in_stock: boolean,
    sku: string,
    type: string,
    attributes: attributesProps[],
    variation_array: variation_arrayProps[],
    default_attributes: default_attributesProps[],
    price: string,
    currentVariation?: variation_arrayProps,
    setCurrentVariation: Dispatch<SetStateAction<variation_arrayProps|undefined>>
    extra_attributes: extraAttributesProps[]
}

export interface extraAttributesProps {
    attribute_title: string,
    attribute_values: ProductExtraOptionsProps[]
}

export interface default_attributesProps {
    id: number,
    name: string,
    option: string,
}

export interface variation_arrayProps {
    id: number,
    name: string,
    slug: string,
    status: string,
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

export interface extraDataChoosed {
    attribute_title: string,
    attribute_choosed: ProductExtraOptionsProps
}

const SingleProductContent:React.FC<SingleProductContentProps> = (props) => {
    const {
        id,
        sku,
        type,
        attributes,
        in_stock,
        variation_array,
        price,
        default_attributes,
        currentVariation,
        setCurrentVariation,
        extra_attributes
    } = props;

    const settingsCtx = useContext(SettingsContext);

    const [counter, setCounter] = useState<string>('1');
    const [itemPrice, setItemPrice] = useState<string>(type === 'simple' ? price : currentVariation?.price ?? '0');
    const [extraPrice, setExtraPrice] = useState<string>('0');
    const [extraProducts, setExtraProducts] = useState<extraAttributesProps[]>(extra_attributes);

    useEffect(()=>{
        setItemPrice(type === 'simple' ? price : currentVariation?.price ?? '0');
    }, [price, currentVariation, type]);

    useEffect(()=>{
        setExtraProducts(extra_attributes);
    }, [extra_attributes]);

    useEffect(()=>{
        let total_price:number = 0;

        extraProducts.forEach(item => {
            total_price += parseInt(item.attribute_values.filter(subitem => subitem.choosed)[0].price);

            return item;
        });

        setExtraPrice(total_price.toString());
    }, [extraProducts]);

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

    const dispatch = useDispatch();

    const buyHandler = ():void => {
        if (!in_stock)
            return;

        const extraData:extraDataChoosed[] = [];

        extraProducts.map(item => {
            let choosed_extra_attrs:ProductExtraOptionsProps[] = item.attribute_values.filter(subitem => subitem.choosed && subitem.slug !== 'nothing');

            if (choosed_extra_attrs.length > 0)
            {
                extraData.push({
                    attribute_title: item.attribute_title,
                    attribute_choosed: choosed_extra_attrs[0]
                });
            }

            return item;
        });

        axios.post(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/cart/add-item`, {
            nonce: settingsCtx.nonce,
            id,
            quantity: counter,
            ...(type === 'variable') && {'variation-id': currentVariation?.id},
            ...(extraData.length > 0) && {cart_item_data: {
                meta_extra_products: extraData
            }}
        }, {
            headers: {
                'X-Headless-WP': true,
                ...(getCookie('X-WC-Session')) && {'X-WC-Session': getCookie('X-WC-Session')}
            }
        })
            .then((res)=>{
                dispatch(setCartServerData(res.data));
                dispatch(setCartItemsAmount(res.data.total_amount ?? 0));
            })
            .catch((error) => {console.log(error)});
    }

    return (
        <div className={classNames(styles['single-product-intro__content'], styles['single-product-intro-content'])}>
            <div className={styles['single-product-intro-content__top']}>
                <div className={styles['single-product-intro-content__number']}>
                    Код товара: <span>{id}</span>
                </div>
            </div>

            <If condition={type === 'variable'}>
                <Then>
                    {
                        attributes.sort((a, b) => a.id > b.id ? 1 : -1).map((item, i, arr) => (
                            <If key={i} condition={item.visible && item.variation}>
                                <Then>
                                    <ProductVariation
                                        defaultAttribute={default_attributes.sort((a, b) => a.id > b.id ? 1 : -1)[i]}
                                        attribute={item}
                                        setCurrVariation={setCurrentVariation}
                                        currentVariation={currentVariation}
                                        variation_array={variation_array}
                                    />
                                </Then>
                            </If>
                        ))
                    }
                </Then>
            </If>

            <If condition={extra_attributes.length > 0}>
                <Then>
                    {
                        extra_attributes.map((item, i) => (
                            <ProductExtra
                                key={i}
                                attributeTitle={item.attribute_title}
                                attributeValues={item.attribute_values}
                                extraProducts={extraProducts}
                                updateExtraProducts={setExtraProducts}
                            />
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
                        <button
                            onClick={buyHandler}
                            className={classNames(styles['single-product-intro-content__btn'], styles['single-product-intro-content__btn--buy'], 'btn', !in_stock ? 'disabled' : '')}
                        >
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
                    <span>{parseInt(itemPrice) + parseInt(extraPrice)}</span> грн / шт.
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
                    <button className={classNames(styles['single-product-intro-content__btn'], styles['single-product-intro-content__btn--cursor'], 'btn', !in_stock ? 'disabled' : '')}>
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