import React, {useContext} from 'react'
import styles from './Intro.module.scss';
import sprite from '@icons/sprite.svg';
import classNames from "classnames";
import {SettingsContext} from "@pages/_app";
import {PhotoProps} from "@components/About/Intro/Intro";
import Image from "next/image";


interface settingsServicesCtxProps {
    description: string,
    title: string,
    icon: PhotoProps
}

const SingleProductInfo = () => {
    const settingsServicesCtx: settingsServicesCtxProps[] = useContext(SettingsContext).settings.tovar_card_group.services_repeater;

    return (
        <div className={classNames(styles['single-product-intro__info'], styles['single-product-intro-info'])}>
            {
                settingsServicesCtx.map((item, i) => (
                    <div key={i} className={styles['single-product-intro-info__item']}>
                        <div className={styles['single-product-intro-info__header']}>
                            <div className={styles['single-product-intro-info__icon']}>
                                <Image src={item.icon.url} alt={item.icon.alt} width={24} height={24} />
                            </div>

                            <p className={styles['single-product-intro-info__title']}>{item.title}</p>
                        </div>

                        <div className={styles['single-product-intro-info__content']} dangerouslySetInnerHTML={{__html: item.description}} />
                    </div>
                ))
            }
        </div>
    )
}

export default SingleProductInfo;