import React, {useContext} from 'react';
import Link from "next/link";
import styles from './CategoryBlock.module.scss';
import Image from "next/image";
import sprite from '@icons/sprite.svg';
import cat1 from '@images/catalog-1.svg';
import classNames from "classnames";
import {SettingsContext} from "@pages/_app";
import {menuItemProp} from "@components/Header/interfaces";
import {If, Then} from "react-if";

interface CategoryBlockProps {
    className?: string
}

const CategoryBlock:React.FC<CategoryBlockProps> = ({className}) => {
    const settingsCtx = useContext(SettingsContext).menus.header_catalog;

    console.log(settingsCtx);

    return (
        <div className={classNames(styles['main-intro__catalog-wrapper'], className)}>
            <div className={styles['main-intro__catalog']}>
                <div className={styles['main-intro__catalog-list']}>
                    {
                        settingsCtx.map((item:menuItemProp, i:number)=>(
                            <div key={i} className={styles['main-intro__catalog-list-item']}>
                                <Link className={styles['main-intro__catalog-item-link']} href={item.url}>
                                    {
                                        item.acfmenu?.icon &&
                                        <span className={styles['main-intro__catalog-item-icon']}>
                                            <Image src={item.acfmenu.icon.sourceUrl} alt={item.acfmenu.icon.altText} width={24} height={24} />
                                        </span>
                                    }

                                    <span className={styles['main-intro__catalog-item-text']}>{item.label}</span>

                                    <If condition={item.childItems.nodes.length}>
                                        <Then>
                                            <span className={styles['main-intro__catalog-item-arrow']}>
                                                <svg>
                                                    <use href={`${sprite.src}#catalog-arrow`}/>
                                                </svg>
                                            </span>
                                        </Then>
                                    </If>
                                </Link>

                                <If condition={item.childItems.nodes.length}>
                                    <Then>
                                        <div className={styles['main-intro__catalog-dropdown']}>
                                            {
                                                item.childItems.nodes.map((subitem, k) => (
                                                    <div key={k} className={styles['main-intro__catalog-dropdown-item']}>
                                                        <div className={styles['main-intro__catalog-dropdown-title']}>{subitem.label}</div>

                                                        <If condition={subitem.childItems.nodes.length}>
                                                            <Then>
                                                                <div className={styles['main-intro__catalog-dropdown-list']}>
                                                                    {
                                                                        subitem.childItems.nodes.map((lastItem, z) => (
                                                                            <div key={z} className={styles['main-intro__catalog-dropdown-list-item']}>
                                                                                <Link
                                                                                    className={styles['main-intro__catalog-dropdown-list-link']}
                                                                                    href={lastItem.url}
                                                                                >
                                                                                    {lastItem.label}
                                                                                </Link>
                                                                            </div>
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
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default CategoryBlock