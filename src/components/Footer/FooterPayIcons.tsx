import React from 'react';
import styles from './Footer.module.scss';
import mastercard from '@images/mastercard.svg';
import visa from '@images/visa.svg';
import Image from "next/image";


const FooterPayIcons = () => {
    return (
        <div className={styles['footer-pay']}>
            <div className={styles['footer-pay__item']}>
                <Image src={mastercard.src} alt="mastercard" width={23} height={18} />
            </div>

            <div className={styles['footer-pay__item']}>
                <Image src={visa.src} alt="visa" width={38} height={12} />
            </div>
        </div>
    )
}

export default FooterPayIcons;