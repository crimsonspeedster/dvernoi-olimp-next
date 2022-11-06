import React, {Dispatch, SetStateAction, useContext} from 'react'
import styles from './Header.module.scss';
import sprite from '@icons/sprite.svg';
import classNames from "classnames";
import {workTimeProps} from "@components/Footer/FooterContacts";
import {SettingsContext} from "@pages/_app";


interface HeaderScheduleProps {
    isOpenSchedule: boolean,
    setIsOpenSchedule: Dispatch<SetStateAction<boolean>>
}

const HeaderSchedule:React.FC<HeaderScheduleProps> = ({isOpenSchedule, setIsOpenSchedule}) => {
    const settingsCtx = useContext(SettingsContext).settings;

    return (
        <div className={classNames(styles['header__schedule'], styles['header-schedule'])}>
            <div className={styles['header-schedule__title']}>(бесплатно с любого номера)</div>

            <a className={styles['header-schedule__phone']} href={settingsCtx.header_phone.url}>{settingsCtx.header_phone.title}</a>

            <div className={styles['header-schedule__list']}>
                <div
                    className={classNames(styles['header-schedule__list-title'], isOpenSchedule ? styles['open'] : '')}
                    onClick={() => setIsOpenSchedule(prev => !prev)}
                >
                    <div className={styles['header-schedule__list-icon']}>
                        <svg>
                            <use href={`${sprite.src}#clock`}/>
                        </svg>
                    </div>

                    <div className={styles['header-schedule__list-text']}>График работы</div>
                </div>

                <div className={classNames(styles['header-schedule__panel'], isOpenSchedule ? styles['open'] : '')}>
                    <button
                        className={styles['header-schedule__panel-close']}
                        onClick={() => setIsOpenSchedule(false)}
                    />

                    <div className={styles['header-schedule__panel-inner']}>
                        {
                            settingsCtx.wort_time_repeater.map((item:workTimeProps, i:number) => (
                                <div key={i} className={styles['header-schedule__panel-item']}>
                                    <div className={styles['header-schedule__panel-title']}>{item.days}</div>

                                    <div className={styles['header-schedule__panel-val']}>{item.time}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderSchedule