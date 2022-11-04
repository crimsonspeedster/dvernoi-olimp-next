import React from 'react';
import Switcher from '@components/Switcher/Switcher';
import Link from "next/link";
import sprite from '@icons/sprite.svg';
import styles from './Header.module.scss'

interface MobileBotProps {
  isMobile: boolean
}

const MobileBot:React.FC<MobileBotProps> = ({isMobile}) => {
    return (
        <div className={styles['mobile-bot']}>
            <div className={styles['mobile-bot__info']}>
                <div className={styles['mobile-bot__title']}>(бесплатно с любого номера)</div>

                <a className={styles['mobile-bot__phone']} href="tel:380800339827">0 800 339 827</a>

                <div className={styles['mobile-bot__schedule']}>
                    <div className={styles['mobile-bot__schedule-icon']}>
                        <svg>
                            <use href={`${sprite.src}#clock`}/>
                        </svg>
                    </div>

                    <div className={styles['mobile-bot__schedule-text']}>
                        <div className={styles['mobile-bot__schedule-item']}>
                            пн-пт <span>09:00-21:00</span>
                        </div>

                        <div className={styles['mobile-bot__schedule-item']}>
                            сб-вс <span>09:00-21:00</span>
                        </div>
                    </div>
                </div>
            </div>

            {isMobile && <Switcher/>}
        </div>
    )
}

export default MobileBot