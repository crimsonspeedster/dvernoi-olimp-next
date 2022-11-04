import React, {useContext, useState, useEffect, ReactElement} from 'react';
import Link from "next/link";
import {Collapse} from 'react-collapse';
import styles from './Footer.module.scss';
import sprite from '@icons/sprite.svg';
import classNames from "classnames";
import {MenuContext, SettingsContext} from "@pages/_app";


export interface menuProps {
    cssClasses: string[],
    label: string,
    url: string
}

export interface menuLabelProps {
    label: string,
    isOpen: boolean,
    items: menuProps[]
}

const FooterLinks = () => {

    const settingsCtx = useContext(SettingsContext);

    const [menus, setMenus] = useState<menuLabelProps[]>([
        {
            label: 'О КОМПАНИИ',
            isOpen: true,
            items: settingsCtx?.menus?.footer_company ?? []
        },
        {
            label: 'ОБЩИЕ ВОПРОСЫ',
            isOpen: true,
            items: settingsCtx?.menus?.footer_questions ?? []
        },
        {
            label: 'КАТАЛОГ ДВЕРЕЙ',
            isOpen: true,
            items: settingsCtx?.menus?.footer_catalog ?? []
        },
    ]);

    useEffect(() => {

        window.innerWidth <= 745 ? setMenus(menus.map(item => {
            return {
                ...item,
                isOpen: false,
            }
        })) : setMenus(menus.map(item => {
            return {
                ...item,
                isOpen: true,
            }
        }));

    }, []);

    const toggleIsOpen = (index:number):void => {
        if (window.innerWidth >= 746)
            return;

        setMenus(menus.map((item, i) => {
            return i === index ? {
                ...item,
                isOpen: !item.isOpen,
            } : item
        }))
    }

    const GenerateMenuItem = (item:menuProps):ReactElement => (
        <li className={styles['footer-links__list-item']}>
            <Link
                className={classNames(styles['footer-links__list-link'], item.cssClasses)}
                href={item.url}
            >
                {item.label}
            </Link>

            <svg className={styles['footer-links__list-icon']}>
                <use href={`${sprite.src}#big-item-arrow`}/>
            </svg>
        </li>
    );

    return (
        <div className={classNames(styles['footer__links'], styles['footer-links'])}>
            {
                menus.map((menu, i) => {
                    return (
                        <div className={classNames(styles['footer-links__item'], {open: menu.isOpen})} key={i}>
                            <div
                                className={classNames(styles['footer-links__title'], styles['footer-title'])}
                                onClick={() => toggleIsOpen(i)}
                            >
                                {menu.label}

                                <span className={styles['footer-links__title-icon']}>
                                    <svg>
                                        <use href={`${sprite.src}#catalog-arrow`}/>
                                    </svg>
                                </span>
                            </div>

                            <Collapse isOpened={menu.isOpen}>
                                <ul className={styles['footer-links__list']}>
                                    {
                                        menu.items.map((item, k) => (
                                            <GenerateMenuItem
                                                key={k}
                                                cssClasses={item.cssClasses}
                                                label={item.label}
                                                url={item.url}
                                            />
                                        ))
                                    }
                                </ul>
                            </Collapse>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default FooterLinks;