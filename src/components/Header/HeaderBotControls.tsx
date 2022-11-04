import React, {useContext} from 'react';
import Link from "next/link";
import sprite from '@icons/sprite.svg';
import {SettingsContext} from "@pages/_app";
import styles from './Header.module.scss';
import classNames from "classnames";


const HeaderBotControls = () => {
    const settingsCtx = useContext(SettingsContext);

    return (
        <div className={styles['header-bot__controls']}>
            <div className={styles['header-bot__controls-item']}>
                <Link className={classNames(styles['header-bot__controls-link'], styles['disabled'])} href="/">
                    <svg>
                        <use href={`${sprite.src}#user`}/>
                    </svg>
                </Link>
            </div>

            <div className={styles['header-bot__controls-item']}>
                <Link className={classNames(styles['header-bot__controls-link'], styles['disabled'])} href="/">
                    <svg>
                        <use href={`${sprite.src}#scales`}/>
                    </svg>
                </Link>
            </div>

            <div className={styles['header-bot__controls-item']}>
                <Link className={classNames(styles['header-bot__controls-link'], styles['disabled'])} href="/">
                    <svg>
                        <use href={`${sprite.src}#cart`}/>
                    </svg>
                </Link>

                <span className={styles['header-bot__controls-text']}>10</span>
            </div>
        </div>
    )
}

export default HeaderBotControls