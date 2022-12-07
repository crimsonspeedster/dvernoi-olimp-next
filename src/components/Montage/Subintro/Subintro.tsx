import React from 'react'
import styles from './Subintro.module.scss';
import {ustanovka_dverejProps} from "@root/templates/services/Montage";
import classNames from "classnames";


interface MontageSubintroProps {
    block: ustanovka_dverejProps
}

const MontageSubintro: React.FC<MontageSubintroProps> = ({block}) => {
    return (
        <section className={styles['montage-subintro']}>
            <div className="container">
                <div className={classNames(styles['montage-subintro__title'], 'title', 'title--dark')}>{block.nazvanie_bloka}</div>

                {
                    block.opisanie &&
                    <div className={styles['montage-subintro__block']} dangerouslySetInnerHTML={{__html: block.opisanie}}/>
                }

                <div className={styles['montage-subintro__table']}>
                    {
                        block.tablicza.map((item, i) => (
                            <div key={i} className={styles['montage-subintro__table-row']}>
                                <div className={styles['montage-subintro__table-title']}>{item.tip_dverei}</div>

                                <div className={styles['montage-subintro__table-value']}>{item.stoimost}</div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default MontageSubintro