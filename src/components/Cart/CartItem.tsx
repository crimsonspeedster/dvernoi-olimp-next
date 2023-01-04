import React, {useContext, useState, memo, useEffect} from "react";
import styles from "@components/Cart/Intro.module.scss";
import Image from "next/image";
import classNames from "classnames";
import {CartItemProps} from "@pages/cart";
import {If, Then} from "react-if";
import axios from "axios";
import {SettingsContext} from "@pages/_app";
import Link from "next/link";
import {
    selectCartAmountState,
    selectCartTotalPrice,
    setCartItemsAmount,
    setCartServerData, setCartTotalPrice
} from "@store/cart";
import {useDispatch, useSelector} from "react-redux";
import {getCookie} from "cookies-next";
import Preloader from '@icons/load-spinner.gif';
import IconPlus from '@icons/bundle_plus.svg';

const CartItem:React.FC<CartItemProps> = (props) => {
    const {
        id,
        variation,
        variation_id,
        meta_data,
        hash,
        type,
        totals,
        product,
        quantity,
        variation_product
    } = props;

    const settingsCtx = useContext(SettingsContext);
    const dispatch = useDispatch();
    const cartAmountItems = useSelector(selectCartAmountState);
    const cartTotalPrice = useSelector(selectCartTotalPrice);

    const [productExist, setProductExist] = useState<boolean>(true);
    const [counter, setCounter] = useState<string>(quantity.toString());
    const [dataStatus, setDataStatus] = useState<boolean>(false);

    useEffect(()=>{
        setCounter(quantity.toString());
    }, [quantity]);

    const counterHandler = (val: string):void => {
        setDataStatus(true);
        const filteredVal = parseInt(val);

        if (isNaN(filteredVal) || filteredVal < 1) {
            setCounter('1');
            return;
        }

        setCounter(filteredVal.toString());

        axios.post(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/cart/update-item`, {
            nonce: settingsCtx.nonce,
            key: hash,
            quantity: filteredVal
        }, {
            headers: {
                'X-Headless-WP': true,
                ...(getCookie('X-WC-Session')) && {'X-WC-Session': getCookie('X-WC-Session')}
            }
        })
            .then(({data})=>{
                dispatch(setCartServerData(data));

                setDataStatus(false);
            })
            .catch((error) => {console.log(error)});
    }

    const counterClickHandler = (type: string):void => {
        setDataStatus(true);
        let amount:number = parseInt(counter);

        switch (type)
        {
            case 'minus':
                setCounter(prev => (parseInt(prev) - 1) < 1 ? '1' : (parseInt(prev) - 1).toString());

                amount = parseInt(counter) - 1 < 1 ? 1 : parseInt(counter) - 1;
                break;
            default:
                setCounter(prev => (parseInt(prev) + 1).toString());

                amount = parseInt(counter) + 1;
                break;
        }

        axios.post(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/cart/update-item`, {
            nonce: settingsCtx.nonce,
            key: hash,
            quantity: amount
        }, {
            headers: {
                'X-Headless-WP': true,
                ...(getCookie('X-WC-Session')) && {'X-WC-Session': getCookie('X-WC-Session')}
            }
        })
            .then(({data})=>{
                dispatch(setCartServerData(data));

                setDataStatus(false);
            })
            .catch((error) => {console.log(error)});
    }

    const removeItem = ():void => {
        setDataStatus(true);

        axios.post(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/cart/remove-item`, {
            nonce: settingsCtx.nonce,
            key: hash
        }, {
            headers: {
                'X-Headless-WP': true,
                ...(getCookie('X-WC-Session')) && {'X-WC-Session': getCookie('X-WC-Session')}
            }
        })
            .then((result)=>{
                setDataStatus(false);
                setProductExist(false);

                dispatch(setCartItemsAmount(cartAmountItems - 1 >= 0 ? cartAmountItems-1 : 0));
                dispatch(setCartTotalPrice(parseFloat((cartTotalPrice - parseFloat(totals.line_total)).toFixed(2))));
            })
            .catch((error) => {console.log(error)});
    }

    console.log(meta_data);

    return (
        <div className={classNames(styles['cart-list__wrapper'], !productExist ? styles['removed'] : '')}>
            <If condition={dataStatus}>
                <Then>
                    <div className={styles['cart-list-preloader']}>
                        <div className={styles['cart-list-preloader__backdrop']} />

                        <div className={styles['cart-list-preloader__img']}>
                            <Image src={Preloader.src} alt={'preloader'} width={50} height={50} />
                        </div>
                    </div>
                </Then>
            </If>

            <div className={styles['cart-list__item']}>
                <div className={classNames(styles['cart-list__item-inner'], styles['preview'])}>
                    <Link href={`/product/${product.slug}`} className={styles['cart-list__item-preview']}>
                        <div className={styles['cart-list__item-preview-inner']}>
                            <Image src={product.images.default} alt={product.name} width={48} height={55} />
                        </div>
                    </Link>

                    <div className={styles['cart-list__item-info']}>
                        <Link href={`/product/${product.slug}`} className={styles['cart-list__item-title']}>
                            {
                                type === 'variable' ? variation_product?.name : product.name
                            }
                        </Link>

                        <If condition={variation.length > 0 || meta_data.meta_extra_products && meta_data.meta_extra_products?.length > 0}>
                            <Then>
                                <div className={styles['cart-list__item-chars']}>
                                    {
                                        variation.length > 0 &&
                                        variation.map((item, i) => (
                                            <div
                                                className={styles['cart-list__item-chars-elem']}
                                                key={i}
                                            >
                                                {item.name}: {item.value}
                                            </div>
                                        ))
                                    }

                                    {
                                        meta_data.meta_extra_products && meta_data.meta_extra_products?.length &&
                                        meta_data.meta_extra_products.map((item, i) => (
                                            <div
                                                className={styles['cart-list__item-chars-elem']}
                                                key={i}
                                            >
                                                {item.attribute_title}: <span dangerouslySetInnerHTML={{__html: item.attribute_choosed.value}} />
                                            </div>
                                        ))
                                    }
                                </div>
                            </Then>
                        </If>
                    </div>
                </div>

                <div className={classNames(styles['cart-list__item-inner'], styles['price-local'])}>
                    <div className="cart-list__item-current-price">{type === 'variable' ? variation_product?.price : product.price.default} грн</div>
                </div>

                <div className={classNames(styles['cart-list__item-inner'], styles['counter'])}>
                    <div className={styles['cart-list__item-counter']}>
                        <button
                            onClick={()=>counterClickHandler('minus')}
                            disabled={dataStatus}
                            className={classNames(styles['cart-list__item-counter-btn'], styles['cart-list__item-counter-btn--minus'])}
                        />

                        <input
                            className={styles['cart-list__item-counter-inp']}
                            type="number"
                            name="counter"
                            autoComplete="off"
                            value={counter}
                            onChange={(e) => setCounter(e.currentTarget.value.trim() ?? '1')}
                            onBlur={(e) => counterHandler(e.currentTarget.value.trim())}
                        />

                        <button
                            onClick={()=>counterClickHandler('plus')}
                            disabled={dataStatus}
                            className={classNames(styles['cart-list__item-counter-btn'], styles['cart-list__item-counter-btn--plus'])}
                        />
                    </div>
                </div>

                <div className={classNames(styles['cart-list__item-inner'], styles['price-total'])}>
                    <div className={styles['cart-list__item-total-price']}>{totals.line_total} грн</div>
                </div>

                <span
                    className={styles['cart-list__item-close']}
                    onClick={removeItem}
                />
            </div>

            {
                meta_data.meta_bundle &&
                <>
                    <div className={styles['cart-list__plus']}>
                        <Image src={IconPlus.src} alt={'bundle'} width={24} height={24} />
                    </div>

                    <div className={styles['cart-list__item']}>
                        <div className={classNames(styles['cart-list__item-inner'], styles['preview'])}>
                            <div className={styles['cart-list__item-preview-inner']}>
                                <Image src={meta_data.meta_bundle.product_image} alt={meta_data.meta_bundle.product.name} width={48} height={55} />
                            </div>

                            <div className={styles['cart-list__item-info']}>
                                <p className={styles['cart-list__item-title']}>{meta_data.meta_bundle.product.name}</p>
                            </div>
                        </div>

                        <div className={classNames(styles['cart-list__item-inner'], styles['price-local'])}>
                            <div className="cart-list__item-current-price">{meta_data.meta_bundle.product_price} грн</div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
}

export default memo(CartItem);