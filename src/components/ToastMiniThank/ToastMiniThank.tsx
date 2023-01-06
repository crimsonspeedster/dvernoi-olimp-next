import React from "react";
import Image from "next/image";
import styles from './ToastMiniThank.module.scss';
import thankIcon from './thankIcon.svg';
import {useTranslation} from "next-i18next";


const ToastMiniThank = () => {
    const {t} = useTranslation('common');

    return (
        <div className={styles['toast-thank']}>
            <p className={styles['toast-thank__message']} dangerouslySetInnerHTML={{__html: t('toastThankMiniTitle')}} />

            <Image className={styles['toast-thank__img']} src={thankIcon.src} alt={t('thank')} width={24} height={16} />
        </div>
    );
}

export default ToastMiniThank;