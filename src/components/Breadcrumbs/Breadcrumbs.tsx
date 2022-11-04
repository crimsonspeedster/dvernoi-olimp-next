import React from "react";
import Link from "next/link";
import styles from './Breadcrumbs.module.scss';
import classNames from "classnames";
import {Else, If, Then} from "react-if";


export interface BreadcrumbsProps {
    list: Breadcrumb[]
}

export interface Breadcrumb {
    name: string,
    item?: string
}

const Breadcrumbs:React.FC<BreadcrumbsProps> = ({list}) => {
    return (
        <nav className={styles['breadcrumbs']}>
            <div className="container">
                <ul className={classNames(styles['breadcrumbs__list'], styles['breadcrumbs-list'])}>
                    {
                        list.map((breadcrumb, i) => (
                            <If key={i} condition={i !== list.length-1}>
                                <Then>
                                    <li className={styles['breadcrumbs-list__item']}>
                                        <If condition={breadcrumb.item}>
                                            <Then>
                                                <Link className={styles['breadcrumbs-list__link']} href={breadcrumb.item ?? '/'}>{breadcrumb.name}</Link>
                                            </Then>
                                        </If>
                                    </li>

                                    <li className={styles['breadcrumbs-list__item']}>
                                        <span className={styles['breadcrumbs-list__separator']} />
                                    </li>
                                </Then>
                                <Else>
                                    <li className={styles['breadcrumbs-list__item']}>
                                        <span className={styles['breadcrumbs-list__current']}>{breadcrumb.name}</span>
                                    </li>
                                </Else>
                            </If>
                        ))
                    }
                </ul>
            </div>
        </nav>
    );
}

export default Breadcrumbs;