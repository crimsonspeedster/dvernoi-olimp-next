import React, {useContext} from 'react';
import styles from './Intro.module.scss';
import sprite from '@icons/sprite.svg';
import classNames from "classnames";
import {SettingsContext} from "@pages/_app";
import {socialLinkProps, workTimeProps} from "@components/Footer/FooterContacts";
import Image from "next/image";
import {useTranslation} from "next-i18next";


const ContactsIntroInfo = () => {
    const settingsCtx = useContext(SettingsContext).settings;
    const {t} = useTranslation('common');

    return (
        <div className={classNames(styles['contacts-intro__info'], styles['contacts-intro-info'])}>
            <div className={styles['contacts-intro-info__item']}>
                <div className={classNames(styles['contacts-intro-info__title'], styles['mini'])}>{t('freeUkraine')}</div>

                <a className={styles['contacts-intro-info__phone']} href={settingsCtx.header_phone.url}>{settingsCtx.header_phone.title}</a>
            </div>

            <div className={styles['contacts-intro-info__item']}>
                <div className={classNames(styles['contacts-intro-info__title'], styles['mini'])}>{t('callCenterTitle')}</div>

                <div className={styles['contacts-intro-info__schedule']}>
                    {
                        settingsCtx.wort_time_repeater.map((item:workTimeProps, i:number) => (
                            <p className={styles['contacts-intro-info__schedule-text']} key={i}>{item.time} {item.days}</p>
                        ))
                    }
                </div>
            </div>

            <div className={styles['contacts-intro-info__item']}>
                <div className={styles['contacts-intro-info__title']}>{t('writeToUs')}</div>

                <a className={styles['contacts-intro-info__email']} href={`mailto:${settingsCtx.email}`}>{settingsCtx.email}</a>

                <ul className={styles['contacts-intro-info__social']}>
                    {
                        settingsCtx.write_to_us.map((item:socialLinkProps, i:number) => (
                            <li className={styles['contacts-intro-info__social-item']} key={i}>
                                <a className={styles['contacts-intro-info__social-link']} href={item.link} target="_blank" rel="nofollow noopener noreferrer">
                                    <Image src={item.icon.url} alt={item.icon.alt} width={40} height={40} />
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>

            <div className={styles['contacts-intro-info__item']}>
                <div className={styles['contacts-intro-info__title']}>{t('lawyerTitle')}</div>

                <div className={styles['contacts-intro-info__desc']} dangerouslySetInnerHTML={{__html: settingsCtx.yur_informacziya}} />
            </div>
        </div>
    )
}

export default ContactsIntroInfo;