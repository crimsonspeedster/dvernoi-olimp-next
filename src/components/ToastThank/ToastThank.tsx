import React, {ReactElement} from "react";
import Image from "next/image";
import styles from './ToastThank.module.scss';
import thankIcon from './thank.svg';


const ToastThank = () => (
    <div className={styles['toast-thank']}>
        <p className={styles['toast-thank__message']}>Спасибо, мы скоро <br /> свяжемся с вами</p>

        <Image className={styles['toast-thank__img']} src={thankIcon.src} alt={'спасибо'} width={88} height={88} />
    </div>
)

export default ToastThank;