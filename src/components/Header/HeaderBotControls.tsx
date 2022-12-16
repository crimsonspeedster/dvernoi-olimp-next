import React from 'react';
import Link from "next/link";
import sprite from '@icons/sprite.svg';
import styles from './Header.module.scss';
import classNames from "classnames";
import {If, Then} from "react-if";
import {useSelector} from "react-redux";
import {selectCartAmountState} from "@store/cart";


const HeaderBotControls = () => {
    const cartAmountState = useSelector(selectCartAmountState);

    return (
        <div className={styles['header-bot__controls']}>
            <div className={styles['header-bot__controls-item']}>
                <Link className={classNames(styles['header-bot__controls-link'], styles['disabled'])} href="/cart">
                    <svg>
                        <use href={`${sprite.src}#cart`}/>
                    </svg>
                </Link>

                <If condition={cartAmountState > 0}>
                    <Then>
                        <span className={styles['header-bot__controls-text']}>{cartAmountState}</span>
                    </Then>
                </If>
            </div>
        </div>
    )
}

export default HeaderBotControls