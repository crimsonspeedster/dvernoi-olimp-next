import React, {useContext, useEffect, useState} from "react";
//@ts-ignore
import {Fancybox} from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox.css';
import {isBrowser} from "@utils/isBrowser";
import {getScrollbarWidth} from "@utils/getScrollbarWidth";
import classNames from "classnames";
import styles from './Modal-block.module.scss';


interface LiqpayPopupProps {
    form: string
}

const LiqpayPopup:React.FC<LiqpayPopupProps> = ({form}) => {

    useEffect(() => {
        Fancybox.bind("[data-fancybox='liqpay-form']", {
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

    return (
        <div className={classNames(styles['modal'], styles['modal-liqpay'])} id="liqpay-modal" dangerouslySetInnerHTML={{__html: form ?? ''}} />
    );
}

export default LiqpayPopup;