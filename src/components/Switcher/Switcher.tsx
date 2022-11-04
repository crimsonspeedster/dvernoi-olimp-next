import React, {useContext} from 'react'
import Link from "next/link";
import styles from './Switcher.module.scss';
import {SettingsContext} from "@pages/_app";
import {useRouter} from "next/router";
import {Else, If, Then} from "react-if";
import classNames from "classnames";


interface langProps {
    slug: string,
    lang: string
}

const Switcher = () => {
    const context = useContext(SettingsContext);
    const langsCtx = context.translates;
    const router = useRouter();

    return (
        <div className={styles['switcher']}>
            {
                langsCtx.map((item:langProps, i:number) => (
                    <li className={classNames(styles['switcher__item'], item.lang === router.locale ? styles['active'] : '')} key={i}>
                        <If condition={item.lang === router.locale}>
                            <Then>
                                <span>{item.lang}</span>
                            </Then>

                            <Else>
                                <Link href={`/${item.slug === 'home' ? '' : item.slug}`} locale={item.lang}>{item.lang}</Link>
                            </Else>
                        </If>
                    </li>
                ))
            }
        </div>
    )
}

export default Switcher