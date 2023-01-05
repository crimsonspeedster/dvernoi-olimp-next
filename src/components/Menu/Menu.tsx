import React, {useContext} from 'react';
import Link from "next/link";
import styles from './Menu.module.scss';
import sprite from '@icons/sprite.svg';
import {SettingsContext} from "@pages/_app";
import classNames from "classnames";
import Image from "next/image";
import {menuItemProp} from "@components/Header/interfaces";
import {Else, If, Then} from "react-if";
import {useTranslation} from "next-i18next";

interface MenuProps {
    isTablet: boolean
    openSubmenu: any
    closeSubmenu: any
    openSubsubmenu: any
    closeSubsubmenu: any
}

const Menu: React.FC<MenuProps> = ({isTablet, openSubmenu, closeSubmenu, openSubsubmenu, closeSubsubmenu}) => {
    const settingsCtx = useContext(SettingsContext).menus;
    const header_top_menu: menuItemProp[] = settingsCtx.header_top;
    const catalog_menu: menuItemProp[] = settingsCtx.header_catalog;
    const {t} = useTranslation('common');

    return (
        <nav className={styles['menu']}>
            <ul className={classNames(styles['menu__list'], styles['menu-list'])}>
                {
                    isTablet &&
                    <li className={classNames(styles['menu-list__item'], styles['menu-list__item--has-children'])}>
                        <span className={styles['menu-list__link']}>{t('catalogTitle')}</span>

                        <svg
                            className={styles['menu-list__icon']}
                            onClick={openSubmenu}
                        >
                            <use href={`${sprite.src}#catalog-arrow`}/>
                        </svg>

                        <div className={styles['menu-list__item-panel']}>
                            <button
                                className={styles['menu-list__item-panel-back']}
                                onClick={closeSubmenu}
                            >
                                    <span className={styles['menu-list__item-panel-icon']}>
                                        <svg><use href={`${sprite.src}#catalog-arrow`}/></svg>
                                    </span>

                                    <span className={styles['menu-list__item-panel-text']}>{t('backTitle')}</span>
                            </button>

                            <div className={styles['menu-list__item-panel-list']}>
                                {
                                    catalog_menu.map((item, i) => (
                                        <div key={i} className={styles['menu-list__item-panel-elem']}>
                                            <Link className={styles['menu-list__item-panel-link']} href={item.url ?? ''}>

                                                {
                                                    item.acfmenu.icon &&
                                                    <span className={styles['menu-list__item-panel-photo']}>
                                                        <Image src={item.acfmenu.icon.sourceUrl} alt={item.acfmenu.icon.altText} width={32} height={32} />
                                                    </span>
                                                }

                                                <span className={styles['menu-list__item-panel-desc']}>{item.label}</span>
                                            </Link>

                                            <If condition={item.childItems.nodes.length}>
                                                <Then>
                                                    <svg
                                                        className={styles['menu-list__item-panel-arrow']}
                                                        onClick={openSubsubmenu}
                                                    >
                                                        <use href={`${sprite.src}#catalog-arrow`}/>
                                                    </svg>

                                                    <div className={styles['menu-list__item-panel-dropdown']}>
                                                        <button
                                                            className={styles['menu-list__item-panel-back']}
                                                            onClick={closeSubsubmenu}
                                                        >
                                                            <span className={styles['menu-list__item-panel-icon']}>
                                                                <svg><use href={`${sprite.src}#catalog-arrow`}/></svg>
                                                            </span>

                                                            <span className={styles['menu-list__item-panel-text']}>{t('backTitle')}</span>
                                                        </button>

                                                            <If condition={item.childItems.nodes.length}>
                                                                <Then>
                                                                    <div className={styles['menu-list__item-panel-dropdown-inner']}>
                                                                        {
                                                                            item.childItems.nodes.map((subitem, k) => (
                                                                                <div key={k} className={styles['menu-list__item-panel-dropdown-elem']}>
                                                                                    <div className={styles['menu-list__item-panel-dropdown-title']}>{subitem.label}</div>

                                                                                    <If condition={subitem.childItems.nodes.length}>
                                                                                        <Then>
                                                                                            <div className={styles['menu-list__item-panel-dropdown-list']}>
                                                                                                {
                                                                                                    subitem.childItems.nodes.map((lastitem, z) => (
                                                                                                        <Link
                                                                                                            key={z}
                                                                                                            className={styles['menu-list__item-panel-dropdown-link']}
                                                                                                            href={lastitem.url ?? ''}
                                                                                                        >{lastitem.label}</Link>
                                                                                                    ))
                                                                                                }
                                                                                            </div>
                                                                                        </Then>
                                                                                    </If>
                                                                                </div>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                </Then>
                                                            </If>
                                                    </div>
                                                </Then>
                                            </If>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </li>
                }

                {
                    header_top_menu.map((item, i) => (
                        <If key={i} condition={item.childItems.nodes.length}>
                            <Then>
                                <li className={classNames(styles['menu-list__item'], styles['menu-list__item--has-children'])} data-test={item.url}>
                                    <If condition={item.url}>
                                        <Then>
                                            <Link className={styles['menu-list__link']} href={item.url}>{item.label}</Link>
                                        </Then>

                                        <Else>
                                            <span className={styles['menu-list__link']}>{item.label}</span>
                                        </Else>
                                    </If>

                                    <svg
                                        className={styles['menu-list__icon']}
                                        onClick={openSubmenu}
                                    >
                                        <use href={`${sprite.src}#catalog-arrow`}/>
                                    </svg>

                                    <div className={styles['menu-list__item-panel']}>
                                        <button
                                            className={styles['menu-list__item-panel-back']}
                                            onClick={closeSubmenu}
                                        >
                                            <span className={styles['menu-list__item-panel-icon']}>
                                                <svg><use href={`${sprite.src}#catalog-arrow`} /></svg>
                                            </span>

                                            <span className={styles['menu-list__item-panel-text']}>{t('backTitle')}</span>
                                        </button>

                                        <div className={styles['menu-list__item-panel-list']}>
                                            {
                                                item.childItems.nodes.map((subitem, k) => (
                                                    <Link key={k} className={styles['menu-list__item-panel-link']} href={subitem.url}>{subitem.label}</Link>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </li>
                            </Then>
                            <Else>
                                <li className={styles['menu-list__item']}>
                                    <If condition={item.url}>
                                        <Then>
                                            <Link className={styles['menu-list__link']} href={item.url}>{item.label}</Link>
                                        </Then>
                                        <Else>
                                            <span className={styles['menu-list__link']}>{item.label}</span>
                                        </Else>
                                    </If>
                                </li>
                            </Else>
                        </If>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Menu