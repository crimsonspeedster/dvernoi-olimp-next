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
    link?: string,
    translated: boolean
}

const Switcher = () => {
    const context = useContext(SettingsContext);
    const langsCtx = context.translates;
    const router = useRouter();

    // const [pathLink, setPathLink] = useState<string>('');
    //
    // useEffect(()=>{
    //     console.log(router.pathname);
    //     switch (router.pathname)
    //     {
    //         case '/brand/[[...slug]]':
    //             setPathLink('/brand/');
    //             break;
    //         case '/services/[slug]':
    //             setPathLink('/services/');
    //             break;
    //         case '/proizvoditeli-dverey/[[...slug]]':
    //             setPathLink('/proizvoditeli-dverey/');
    //             break;
    //         case '/product/[slug]':
    //             setPathLink('/product/');
    //             break;
    //         case '/post/[slug]':
    //             setPathLink('/post/');
    //             break;
    //         case '/poleznoe/[[...slug]]':
    //             setPathLink('/poleznoe/');
    //             break;
    //         case '/category/[[...slug]]':
    //             setPathLink('/category/');
    //             break;
    //         case '/brands-category/[[...slug]]':
    //             setPathLink('/brands-category/');
    //             break;
    //         default:
    //             setPathLink('/');
    //             break;
    //     }
    // }, [router]);

    return (
        <div className={styles['switcher']}>
            {
                langsCtx.map((item:langProps, i:number) => (
                    <If condition={item.translated} key={i}>
                        <Then>
                            <li className={classNames(styles['switcher__item'], item.lang === router.locale ? styles['active'] : '')}>
                                <If condition={item.lang === router.locale}>
                                    <Then>
                                        <span>{item.lang}</span>
                                    </Then>

                                    <Else>
                                        <Link href={item.link ?? ''} locale={item.lang}>{item.lang}</Link>
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