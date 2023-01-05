import React, {useContext} from 'react';
import Switcher from '@components/Switcher/Switcher';
import Link from "next/link";
import sprite from '@icons/sprite.svg';
import styles from './Header.module.scss'
import {useTranslation} from "next-i18next";
import {SettingsContext} from "@pages/_app";
import {workTimeProps} from "@components/Footer/FooterContacts";

interface MobileBotProps {
  isMobile: boolean
}

const MobileBot:React.FC<MobileBotProps> = ({isMobile}) => {
    const {t} = useTranslation('common');
    const settingsCtx = useContext(SettingsContext).settings;

    return (
        <div className={styles['mobile-bot']}>
            <div className={styles['mobile-bot__info']}>
                <div className={styles['mobile-bot__title']}>({t('freeNumber')})</div>

                <a className={styles['mobile-bot__phone']} href={settingsCtx.header_phone.url}>{settingsCtx.header_phone.title}</a>

                <div className={styles['mobile-bot__schedule']}>
                    <div className={styles['mobile-bot__schedule-icon']}>
                        <svg>
                            <use href={`${sprite.src}#clock`}/>
                        </svg>
                    </div>

                    <div className={styles['mobile-bot__schedule-text']}>
                        {
                            settingsCtx.wort_time_repeater.map((item:workTimeProps, i:number) => (
                                <div key={i} className={styles['mobile-bot__schedule-item']}>
                                    {item.days} <span>{item.time}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            {isMobile && <Switcher/>}
        </div>
    )
}

export default MobileBot