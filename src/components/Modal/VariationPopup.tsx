import React, {useContext, useEffect, useState} from "react";
//@ts-ignore
import {Fancybox} from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox.css';
import {isBrowser} from "@utils/isBrowser";
import {getScrollbarWidth} from "@utils/getScrollbarWidth";
import classNames from "classnames";
import styles from './Modal-block.module.scss';
import {variation_arrayProps} from "@components/SingleProduct/Intro/SingleProductContent";
import axios from "axios";
import {getCookie, setCookie} from "cookies-next";
import {setCartItemsAmount, setCartServerData} from "@store/cart";
import {SettingsContext} from "@pages/_app";
import {useDispatch} from "react-redux";
import {If, Then} from "react-if";


interface VariationPopupProps {
    variations: variation_arrayProps[],
    id: number
}

const VariationPopup:React.FC<VariationPopupProps> = (props) => {
    const {
        variations,
        id
    } = props;

    const settingsCtx = useContext(SettingsContext);
    const dispatch = useDispatch();

    const [dataStatus, setDataStatus] = useState<boolean>(false);

    useEffect(() => {
        Fancybox.bind("[data-fancybox='variable']", {
            showClass: 'fancybox-fadeIn',
            hideClass: 'fancybox-fadeOut',
            infinite: false,
            groupAll: false,
            groupAttr: false,
            dragToClose: false,
            parentEl: isBrowser() && document.querySelector('#__next'),
            on: {
                init: () => {
                    // @ts-ignore
                    if (isBrowser()) document.querySelector('.header').style.paddingRight = getScrollbarWidth();
                },
                destroy: () => {
                    // @ts-ignore
                    if (isBrowser()) document.querySelector('.header').style.paddingRight = '0';
                }
            }
        })

        return () => {
            Fancybox.destroy();
        }
    }, []);

    const buyHandler = (variation_id: number):void => {
        setDataStatus(true);

        axios.post(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/cart/add-item`, {
            nonce: settingsCtx.nonce,
            id,
            'variation-id': variation_id,
            quantity: 1
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

                dispatch(setCartServerData(res.data));
                dispatch(setCartItemsAmount(res.data.total_amount ?? 0));

                setDataStatus(false);
                Fancybox.close();
            })
            .catch((error) => {console.log(error)});
    }

    return (
        <div className={classNames(styles['modal'], styles['modal-variable'])} id={`variable-modal-${id}`} style={{display: 'none'}}>
            <div className={classNames(styles['modal-variable__backdrop'], dataStatus ? styles['active'] : '')} />

            {
                variations.map((item, i) => (
                    <div key={i} className={styles['modal-variable__row']}>
                        <h3 className={styles['modal-variable__title']}>{item.name}</h3>

                        <p className={styles['modal-variable__price']}>{item.price} грн</p>

                        <button
                            disabled={dataStatus}
                            className={classNames('button', styles['productCard__btn'])}
                            onClick={()=>{buyHandler(item.id)}}
                        >Купить</button>
                    </div>
                ))
            }
        </div>
    );
}

export default VariationPopup;