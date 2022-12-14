import React, {useContext} from 'react'
import Link from "next/link";
import styles from './BottomTabs.module.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {SettingsContext} from "@pages/_app";
import {menuItemProp} from "@components/Header/interfaces";
import classNames from "classnames";


interface BottomTabsProps {
    classNameStr?: string
}

const BottomTabs:React.FC<BottomTabsProps> = ({classNameStr}) => {
    const menuCatalog:menuItemProp[] = useContext(SettingsContext).menus?.catalog_menu ?? [];

    if (menuCatalog.length > 0)
    {
        return (
            <section className={classNames(styles['bottom-tabs'], classNameStr)}>
                <div className="container">
                    <Tabs selectedTabClassName={styles['active']}>
                        <TabList className={styles['bottom-tabs__head']}>
                            {
                                menuCatalog.map((item, i) => (
                                    <Tab key={i} className={styles['bottom-tabs__head-item']}>{item.label}</Tab>
                                ))
                            }
                        </TabList>

                        <div className={styles['bottom-tabs__body']}>
                            {
                                menuCatalog.map((item, i) => (
                                    <TabPanel key={i} className={styles['bottom-tabs__body-item']}>
                                        <div className={styles['bottom-tabs__body-item-inner']}>
                                            {
                                                item.childItems.nodes.map((subitem, k) => (
                                                    <Link key={k} className={styles['bottom-tabs__body-link']} href={subitem.url ?? ''}>{subitem.label}</Link>
                                                ))
                                            }
                                        </div>
                                    </TabPanel>
                                ))
                            }
                        </div>
                    </Tabs>
                </div>
            </section>
        );
    }
    else {
        return (<></>);
    }
}

export default BottomTabs;