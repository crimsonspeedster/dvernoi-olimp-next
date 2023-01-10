import React, {useContext, useEffect, useState} from 'react'
import Link from "next/link";
import styles from './Switcher.module.scss';
import {SettingsContext} from "@pages/_app";
import {useRouter} from "next/router";
import {Else, If, Then} from "react-if";
import classNames from "classnames";


interface langProps {
    // slug: string,
    lang: string,
    tag: string,
    link?: string,
    translated: boolean
}

const Switcher = () => {
    const context = useContext(SettingsContext);
    const langsCtx = context.translates;
    const router = useRouter();

    console.log(langsCtx);

    return (
        <div className={styles['switcher']}>
            {
                langsCtx.map((item:langProps, i:number) => (
                    <If condition={item.translated} key={i}>
                        <Then>
                            <li className={classNames(styles['switcher__item'], item.lang === router.locale ? styles['active'] : '')}>
                                <If condition={item.lang === router.locale}>
                                    <Then>
                                        <span>{item.tag}</span>
                                    </Then>

                                    <Else>
                                        <Link href={item.link ?? ''} locale={item.lang}>{item.tag}</Link>
                                    </Else>
                                </If>
                            </li>
                        </Then>
                    </If>
                ))
            }
        </div>
    )
}

export default Switcher