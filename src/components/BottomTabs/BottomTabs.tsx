import React from 'react'
import Link from "next/link";
import styles from './BottomTabs.module.scss';


const BottomTabs = () => {
    return (
        <div className={styles['bottom-tabs']}>
            <div className="container">
                <div className={styles['bottom-tabs__inner']}>
                    <div className={styles['bottom-tabs__head']}>
                        <div className={styles['bottom-tabs__head-item']}>ТОП Категории</div>

                        <div className={styles['bottom-tabs__head-item']}>Двери</div>

                        <div className={styles['bottom-tabs__head-item']}>ТОП товаров</div>
                    </div>

                    <div className={styles['bottom-tabs__body']}>
                        <div className={styles['bottom-tabs__body-item']}>
                            <div className={styles['bottom-tabs__body-item-inner']}>
                                <Link href="#">
                                    <a className={styles['bottom-tabs__body-item-inner']}>двери межкомнатные на рельсах</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BottomTabs;