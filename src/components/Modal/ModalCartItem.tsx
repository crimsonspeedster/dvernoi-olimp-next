import React, {memo, useContext, useEffect, useState} from "react";
import {CartItemProps} from "@pages/cart";
import styles from './Modal-block.module.scss';
import Image from "next/image";
import classNames from "classnames";
import {useTranslation} from "next-i18next";
import Link from "next/link";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import axios from "axios";
import {getCookie} from "cookies-next";
import {setCartServerData} from "@store/cart";
import {SettingsContext} from "@pages/_app";

const ModalCartItem:React.FC<CartItemProps> = (props) => {
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

    const {t} = useTranslation('common');
    const settingsCtx = useContext(SettingsContext);
    const dispatch = useDispatch();
    const router = useRouter();

    const [counter, setCounter] = useState<string>(quantity.toString());
    const [dataStatus, setDataStatus] = useState<boolean>(false);
    const [totalPrice, setTotalPrice] = useState<string>('');

    useEffect(()=>{
        setTotalPrice(
            type === 'variable' ? (parseInt(variation_product?.price ?? '0') * parseInt(counter)).toString() : (parseInt(product.price.default) * parseInt(counter)).toString()
        );
    }, [counter, type, product, variation_product]);

    const counterHandler = (val: string):void => {
        const filteredVal = parseInt(val);

        if (isNaN(filteredVal) || filteredVal < 1) {
            setCounter('1');
            return;
        }

        setDataStatus(true);

        setCounter(filteredVal.toString());

        axios.post(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/cart/update-item`, {
            nonce: settingsCtx.nonce,
            key: hash,
            lang: router.locale,
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
            lang: router.locale,
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

    return (
        <div className={styles['modal-choice__item']}>
            <div className={dataStatus ? styles['updating'] : ''} />

            <div className={styles['modal-choice__info']}>
                <Link href={`/product/${product.slug}`} className={styles['modal-choice__preview']}>
                    <div className={styles['modal-choice__preview-inner']}>
                        <Image src={product.images.default} width={48} height={55} alt={product.name} />
                    </div>
                </Link>

                <Link href={`/product/${product.slug}`} className={styles['modal-choice__name']}>
                    {
                        type === 'variable' ? variation_product?.name : product.name
                    }
                </Link>
            </div>

            <div className={styles['modal-choice__controls']}>
                <div className={styles['modal-choice__subtitle']}>{t('selectedPrice')}: {totalPrice} грн</div>

                <div className={styles['modal-choice__inner']}>
                    <div className={styles['modal-choice__counter']}>
                        <button
                            className={classNames(styles['modal-choice__btn'], styles['modal-choice__btn--minus'])}
                            onClick={()=>counterClickHandler('minus')}
                            disabled={dataStatus}
                        />

                        <input
                            className={styles['modal-choice__inp']}
                            type="number"
                            name="counter"
                            autoComplete="off"
                            value={counter}
                            onChange={(e) => setCounter(e.currentTarget.value.trim() ?? '1')}
                            onBlur={(e) => counterHandler(e.currentTarget.value.trim())}
                        />

                        <button
                            className={classNames(styles['modal-choice__btn'], styles['modal-choice__btn--plus'])}
                            onClick={()=>counterClickHandler('plus')}
                            disabled={dataStatus}
                        />
                    </div>

                    <div className={styles['modal-choice__price']}>{type === 'variable' ? variation_product?.price : product.price.default} грн / шт.</div>
                </div>
            </div>
        </div>
    )
}

export default memo(ModalCartItem);