import React, {useContext} from 'react'
import styles from './Footer.module.scss';
import sprite from '@icons/sprite.svg'
import classNames from "classnames";
import {SettingsContext} from "@pages/_app";
import {PhotoProps} from "@components/About/Intro/Intro";
import Image from "next/image";
import {useTranslation} from "next-i18next";


export interface workTimeProps {
    time: string,
    days: string
}

export interface socialLinkProps {
    icon: PhotoProps,
    link: string
}

const FooterContacts = () => {
    const settingsCtx = useContext(SettingsContext).settings;
    const {t} = useTranslation('common');

    return (
        <div className={classNames(styles['footer__contacts'], styles['footer-contacts'])}>
            <div className={classNames(styles['footer-contacts__title'], styles['footer-title'])}>{t('contactsTitle')}</div>

            <a className={styles['footer-contacts__phone']} href={settingsCtx.header_phone.url}>{settingsCtx.header_phone.title}</a>

            <p className={styles['footer-contacts__schedule']}>
                {
                    settingsCtx.wort_time_repeater.map((item:workTimeProps, i:number) => (
                        <span key={i}>{item.time} {item.days} </span>
                    ))
                }
            </p>

            <a className={styles['footer-contacts__email']} href={`mailto:${settingsCtx.email}`}>{settingsCtx.email}</a>

            <ul className={styles['footer-contacts__social']}>
                {
                    settingsCtx.social_repeater.map((item:socialLinkProps, i:number) => (
                        <li className={styles['footer-contacts__social-item']} key={i}>
                            <a className={styles['footer-contacts__social-link']} href={item.link} target="_blank" rel="nofollow noopener noreferrer">
                                <Image src={item.icon.url} alt={item.icon.alt} width={25} height={25} />
                            </a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default FooterContacts;