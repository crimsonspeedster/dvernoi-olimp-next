import React, {useContext} from 'react';
import styles from './Footer.module.scss';
import mastercard from '@images/mastercard.svg';
import visa from '@images/visa.svg';
import {SettingsContext} from "@pages/_app";
import {PhotoProps} from "@components/About/Intro/Intro";
import Image from "next/image";

interface paymentProps {
    image: PhotoProps
}


const FooterPayIcons = () => {
    const settingsCtx = useContext(SettingsContext).settings.footer;

    return (
        <div className={styles['footer-pay']}>
            {
                settingsCtx.payment_systems.map((item:paymentProps, i:number) => (
                    <div key={i} className={styles['footer-pay__item']}>
                        <Image src={item.image.url} alt={item.image.alt} width={38} height={12} />
                    </div>
                ))
            }
        </div>
    )
}

export default FooterPayIcons;