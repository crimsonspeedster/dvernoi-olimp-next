import React, {Dispatch, SetStateAction} from 'react'
import styles from './Header.module.scss';
import sprite from '@icons/sprite.svg';
import classNames from "classnames";


interface HeaderScheduleProps {
    isOpenSchedule: boolean,
    setIsOpenSchedule: Dispatch<SetStateAction<boolean>>
}

const HeaderSchedule:React.FC<HeaderScheduleProps> = ({isOpenSchedule, setIsOpenSchedule}) => {
    return (
        <div className={classNames(styles['header__schedule'], styles['header-schedule'])}>
            <div className={styles['header-schedule__title']}>(бесплатно с любого номера)</div>

            <a className={styles['header-schedule__phone']} href="tel:380800339827">0 800 339 827</a>

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
                        <div className={styles['header-schedule__panel-item']}>
                            <div className={styles['header-schedule__panel-title']}>пн-пт</div>

                            <div className={styles['header-schedule__panel-val']}>09:00-21:00</div>
                        </div>

                        <div className={styles['header-schedule__panel-item']}>
                            <div className={styles['header-schedule__panel-title']}>сб-вс</div>

                            <div className={styles['header-schedule__panel-val']}>09:00-21:00</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderSchedule