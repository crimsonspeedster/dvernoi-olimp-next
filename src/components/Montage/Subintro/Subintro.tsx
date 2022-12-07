import React, {ReactElement} from 'react'
import styles from './Subintro.module.scss';
import {tables_repeaterProps, ustanovka_dverejProps} from "@root/templates/services/Montage";
import classNames from "classnames";
import {If, Then} from "react-if";


interface MontageSubintroProps {
    block: ustanovka_dverejProps
}

const MontageSubintro: React.FC<MontageSubintroProps> = ({block}) => {
    const TableBlock = (table:tables_repeaterProps):ReactElement => {
        return (
            <>
                <div className={styles['montage-subintro__table']}>
                    {
                        table.tablicza.map((item, i) => (
                            <div key={i} className={styles['montage-subintro__table-row']}>
                                <div className={styles['montage-subintro__table-title']}>{item.tip_dverei}</div>

                                <div className={styles['montage-subintro__table-value']}>{item.stoimost}</div>
                            </div>
                        ))
                    }
                </div>

                <If condition={table.description_after}>
                    <Then>
                        <div className={styles['montage-subintro__table-description']} dangerouslySetInnerHTML={{__html: table.description_after ?? ''}} />
                    </Then>
                </If>
            </>
        )
    }

    return (
        <section className={styles['montage-subintro']}>
            <div className="container">
                <div className={classNames(styles['montage-subintro__title'], 'title', 'title--dark')}>{block.nazvanie_bloka}</div>

                {
                    block.opisanie &&
                    <div className={styles['montage-subintro__block']} dangerouslySetInnerHTML={{__html: block.opisanie}}/>
                }

                {
                    block.tables_repeater.map((item, i) => (
                        <TableBlock
                            key={i}
                            tablicza={item.tablicza}
                            description_after={item.description_after}
                        />
                    ))
                }
            </div>
        </section>
    )
}

export default MontageSubintro