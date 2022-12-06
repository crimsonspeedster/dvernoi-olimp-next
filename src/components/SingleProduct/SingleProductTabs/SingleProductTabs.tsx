import React, {useState, useEffect} from 'react';
import InputMask from 'react-input-mask';
import styles from './SingleProductTabs.module.scss';
import sprite from '@icons/sprite.svg';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import {acfProductProps} from "@components/Header/HeaderSearch";
import {If, Then} from "react-if";
import VideoCard from "@components/Cards/VideoCard/VideoCard";


interface SingleProductTabsProps {
    acf: acfProductProps,
    description: string
}

const SingleProductTabs: React.FC<SingleProductTabsProps> = (props) => {
    const {
        acf,
        description,
    } = props;

    if (description || acf.enable_characteristics || acf.video_group.enable_video)
    {
        return (
            <section className={styles['single-product-tabs']}>
                <div className="container">
                    <Tabs className={styles['single-product-tabs__tab']} selectedTabClassName={styles['active']}>
                        <TabList className={styles['single-product-tabs__nav']}>
                            {
                                description &&
                                <Tab className={styles['single-product-tabs__nav-item']}>Описание</Tab>
                            }

                            {
                                acf.video_group.enable_video &&
                                <Tab className={styles['single-product-tabs__nav-item']}>Видео</Tab>
                            }

                            {
                                acf.enable_characteristics &&
                                <Tab className={styles['single-product-tabs__nav-item']}>Характеристики</Tab>
                            }
                        </TabList>

                        <div className={styles['single-product-tabs__body']}>
                            {
                                description &&
                                <TabPanel className={styles['single-product-tabs__body-item']}>
                                    <div className={styles['single-product-tabs__desc']}>
                                        <If condition={acf.akciya.enable}>
                                            <Then>
                                                <div className={styles['single-product-tabs__sale']}>
                                                    <div className={styles['single-product-tabs__sale-bg']}>
                                                        {
                                                            new Array(3).fill('').map((_, i) => (
                                                                <svg key={i}>
                                                                    <use href={`${sprite.src}#percent`}/>
                                                                </svg>
                                                            ))
                                                        }
                                                    </div>

                                                    <span className={styles['single-product-tabs__sale-label']}>Акция</span>

                                                    <h2 className={styles['single-product-tabs__sale-title']}>Акция</h2>

                                                    <div className={styles['single-product-tabs__sale-desc']} dangerouslySetInnerHTML={{__html: acf.akciya.description}} />
                                                </div>
                                            </Then>
                                        </If>

                                        <div className={styles['single-product-tabs__desc-inner']} dangerouslySetInnerHTML={{__html: description}} />
                                    </div>
                                </TabPanel>
                            }

                            {
                                acf.video_group.enable_video &&
                                <TabPanel className={styles['single-product-tabs__body-item']}>
                                    <div className={styles['single-product-tabs__video']}>
                                        <VideoCard
                                            ssylka_na_video={acf.video_group.video}
                                            tekst_pod_video={acf.video_group.video_title}
                                            foto={acf.video_group.foto}
                                            dlitelnost_video={acf.video_group.duration}
                                        />
                                    </div>
                                </TabPanel>
                            }

                            {
                                acf.enable_characteristics &&
                                <TabPanel className={styles['single-product-tabs__body-item']}>
                                    <div className={styles['single-product-tabs__chars']}>
                                        <div className={styles['single-product-tabs__chars-inner']}>
                                            {
                                                acf.haratekristiki.map((item, i) => (
                                                    <div key={i} className={styles['single-product-tabs__chars-item-inner']}>
                                                        <p className={styles['single-product-tabs__chars-title']}>{item.nazvanie}</p>

                                                        <p className={styles['single-product-tabs__chars-value']}>{item.opisanie}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </TabPanel>
                            }
                        </div>
                    </Tabs>
                </div>
            </section>
        )
    }
    else {
        return (<></>);
    }
}

export default SingleProductTabs