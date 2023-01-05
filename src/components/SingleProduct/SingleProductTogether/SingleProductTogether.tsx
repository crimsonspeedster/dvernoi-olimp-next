import React, {useContext, useEffect, useState} from 'react';
import styles from './SingleProductTogether.module.scss';
import sprite from '@icons/sprite.svg';
import Image from "next/image";
import {ProductCardProps} from "@components/Cards/ProductCard/ProductCard";
import Link from "next/link";
import {Else, If, Then} from "react-if";
import {variation_arrayProps} from "@components/SingleProduct/Intro/SingleProductContent";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {
    getProductSelectedFull,
    getProductSelectedImage,
    getProductSelectedName,
    getProductSelectedPrice,
    getProductSelectedStock
} from "@store/product";
import axios from "axios";
import {getCookie, setCookie} from "cookies-next";
import {setCartItemsAmount, setCartServerData} from "@store/cart";
import {SettingsContext} from "@pages/_app";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";


export interface SingleProductTogetherProps {
    product: ProductCardProps,
    discount_percentage: string,
    product_variation_id?: string
}

const SingleProductTogether: React.FC<SingleProductTogetherProps> = (props) => {
    const {
        product,
        product_variation_id,
        discount_percentage
    } = props;

    const firstProductStock = useSelector(getProductSelectedStock);
    const settingsCtx = useContext(SettingsContext);
    const dispatch = useDispatch();
    const router = useRouter();
    const {t} = useTranslation('common');

    const firstProduct = useSelector(getProductSelectedFull);

    const [productSecond, setProductSecond] = useState<ProductCardProps|variation_arrayProps>(product.type === 'variable' ? product.variation_array?.[0] ?? product : product);
    const [updatedPrice, setUpdatedPrice] = useState<string>(product.price.default);
    const [btnDisabled, setBtnDisabled] = useState<boolean>(!product.in_stock);
    const [dataUpdating, setDataUpdating] = useState<boolean>(false);

    useEffect(()=>{
        setBtnDisabled(!firstProductStock || !product.in_stock);
    }, [product, firstProductStock]);

    useEffect(()=>{
        if (product.type === 'variable')
        {
            if (product_variation_id && product.variation_array && product.variation_array.filter(item => item.id === parseInt(product_variation_id)).length > 0)
            {
                setProductSecond(product.variation_array.filter(item => item.id === parseInt(product_variation_id))[0]);

                if (parseInt(discount_percentage) > 0)
                {
                    setUpdatedPrice((parseInt(product.variation_array.filter(item => item.id === parseInt(product_variation_id))[0].price) - parseInt(product.variation_array.filter(item => item.id === parseInt(product_variation_id))[0].price) / 100 * parseInt(discount_percentage)).toString());
                }
                else {
                    setUpdatedPrice(product.variation_array.filter(item => item.id === parseInt(product_variation_id))[0].price);
                }
            }
            else {
                setProductSecond(product.variation_array?.[0] ?? product);

                if (parseInt(discount_percentage) > 0)
                {
                    setUpdatedPrice((parseInt(product.variation_array?.[0].price ?? '1') - parseInt(product.variation_array?.[0].price ?? '1') / 100 * parseInt(discount_percentage)).toString());
                }
                else {
                    setUpdatedPrice(product.variation_array?.[0].price ?? '0');
                }
            }
        }
        else {
            setProductSecond(product);

            if (parseInt(discount_percentage) > 0)
            {
                setUpdatedPrice((parseInt(product.price.default) - parseInt(product.price.default) / 100 * parseInt(discount_percentage)).toString());
            }
            else {
                setUpdatedPrice(product.price.default);
            }
        }
    }, [product, product_variation_id, discount_percentage]);

    const bundleBuyHandler = ():void => {
        if (btnDisabled || dataUpdating)
            return;

        setDataUpdating(true);

        axios.post(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/cart/add-item`, {
            nonce: settingsCtx.nonce,
            // @ts-ignore
            id: firstProduct?.type ? firstProduct.id : firstProduct.parent_id,
            quantity: 1,
            lang: router.locale,
            // @ts-ignore
            ...(!firstProduct.type) && {'variation-id': firstProduct.id},
            cart_item_data: {
                meta_bundle: {
                    product: productSecond,
                    product_price: updatedPrice,
                    product_type: product.type,
                    product_image: product.images.default
                }
            }
        }, {
            headers: {
                'X-Headless-WP': true,
                ...(getCookie('X-WC-Session')) && {'X-WC-Session': getCookie('X-WC-Session')}
            }
        })
            .then((res)=>{
                if (!getCookie('X-WC-Session'))
                {
                    setCookie('X-WC-Session', res.headers['x-wc-session']);
                }

                console.log(res.data);
                dispatch(setCartServerData(res.data));
                dispatch(setCartItemsAmount(res.data.total_amount ?? 0));

                setDataUpdating(false);
            })
            .catch((error) => {console.log(error)});
    }

    return (
        <>
            <div className={styles['single-product-together-slider__item']}>
                <div className={styles['single-product-together-slider__item-inner']}>
                    <div className={styles['single-product-together-slider__item-product']}>
                        <div className={styles['single-product-together-slider__item-height']}>
                            <div className={styles['single-product-together-slider__item-preview']}>
                                <Image src={useSelector(getProductSelectedImage)} width={150} height={115} alt={useSelector(getProductSelectedName)} />
                            </div>

                            <div className={styles['single-product-together-slider__item-desc']}>{useSelector(getProductSelectedName)}</div>

                            <div className={styles['single-product-together-slider__item-price']}>
                                <div className={styles['single-product-together-slider__item-price-new']}>{useSelector(getProductSelectedPrice)} грн</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles['single-product-together-slider__item-product']}>
                        <div className={styles['single-product-together-slider__item-height']}>
                            <div className={styles['single-product-together-slider__item-preview']}>
                                <Image src={product.images.default} width={150} height={115} alt={productSecond.name} />
                            </div>

                            <div className={styles['single-product-together-slider__item-desc']}>{productSecond.name}</div>

                            <div className={styles['single-product-together-slider__item-price']}>
                                <If condition={parseInt(discount_percentage) > 0}>
                                    <Then>
                                        <div className={styles['single-product-together-slider__item-price-old']}>
                                            <If condition={product.type === 'variable'}>
                                                <Then>{productSecond.price.toString()} грн</Then>

                                                <Else>{product.price.default} грн</Else>
                                            </If>
                                        </div>

                                        <div className={styles['single-product-together-slider__item-price-new']}>{updatedPrice} грн</div>
                                    </Then>

                                    <Else>
                                        <div className={styles['single-product-together-slider__item-price-new']}>{updatedPrice} грн</div>
                                    </Else>
                                </If>

                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles['single-product-together-slider__item-bot']}>
                    <div className={styles['single-product-together-slider__item-total']}>{parseInt(useSelector(getProductSelectedPrice)) + parseInt(updatedPrice)} грн</div>

                    <div className={styles['single-product-together-slider__item-btn-wrapper']}>
                        <button onClick={bundleBuyHandler} disabled={btnDisabled || dataUpdating} className={classNames('btn', styles['single-product-together-slider__item-btn'], btnDisabled ? 'disabled' : '', dataUpdating ? styles['updating'] : '')}>
                            <span className={classNames(styles['single-product-together-slider__item-btn-icon'], 'btn__icon')}>
                                <svg><use href={`${sprite.src}#cart`}/></svg>
                            </span>

                            <span className={classNames(styles['single-product-together-slider__item-btn-text'], 'btn__text')}>{t('buyTogether')}</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SingleProductTogether