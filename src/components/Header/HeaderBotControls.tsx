import React, {useContext, useState} from 'react';
import Link from "next/link";
import sprite from '@icons/sprite.svg';
import {SettingsContext} from "@pages/_app";
import styles from './Header.module.scss';
import classNames from "classnames";
import {If, Then} from "react-if";


const HeaderBotControls = () => {
    const settingsCtx = useContext(SettingsContext);

    const [amountItems, setAmountItems] = useState<number>(0);

    return (
        <div className={styles['header-bot__controls']}>
            <div className={styles['header-bot__controls-item']}>
                <Link className={classNames(styles['header-bot__controls-link'], styles['disabled'])} href="/">
                    <svg>
                        <use href={`${sprite.src}#cart`}/>
                    </svg>
                </Link>

                <If condition={amountItems > 0}>
                    <Then>
                        <span className={styles['header-bot__controls-text']}>{amountItems}</span>
                    </Then>
                </If>
            </div>
        </div>
    )
}

export default HeaderBotControls