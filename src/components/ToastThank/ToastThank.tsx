import React, {ReactElement} from "react";
import Image from "next/image";
import styles from './ToastThank.module.scss';
import thankIcon from './thank.svg';
import {useTranslation} from "next-i18next";


const ToastThank = () => {
    const {t} = useTranslation('common');

    return (
        <div className={styles['toast-thank']}>
            <p className={styles['toast-thank__message']} dangerouslySetInnerHTML={{__html: t('toastThankTitle')}} />

            <Image className={styles['toast-thank__img']} src={thankIcon.src} alt={t('thank')} width={88} height={88} />
        </div>
    );
}

export default ToastThank;