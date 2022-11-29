import React, {useEffect, useState} from "react";
import classNames from "classnames";
import styles from './Dropdown.module.scss';
import sprite from "@icons/sprite.svg";
import {useRouter} from "next/router";


interface DropdownProps {
    default_value: DropdownValuesProps,
    values: DropdownValuesProps[],
    classNameStr?: string
    onSelect( prevVal: DropdownValuesProps, currVal: DropdownValuesProps): void,
}

export interface DropdownValuesProps {
    value: string,
    slug: string|number
}

const Dropdown:React.FC<DropdownProps> = ({default_value, values, classNameStr, onSelect}) => {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currValue, setCurrValue] = useState<DropdownValuesProps>(default_value);

    useEffect(()=>{
        setCurrValue(default_value);
    }, [default_value]);

    useEffect(()=>{
        setIsOpen(false);
    }, [router]);

    const selectHandler = (updateVal: DropdownValuesProps, prevVal: DropdownValuesProps):void => {
        setCurrValue(updateVal);
        onSelect(prevVal, updateVal);
        setIsOpen(false);
    }

    return (
        <div className={classNames(styles['dropdown'], isOpen ? styles['open'] : '', classNameStr)}>
            <div
                className={classNames(styles['dropdown-backdrop'], isOpen ? styles['open'] : '')}
                onClick={()=>setIsOpen(false)}
            />

            <div className={styles['dropdown__current']} onClick={()=>{setIsOpen(prev => !prev)}}>
                <p className={styles['dropdown__text']}>{currValue.value}</p>

                <div className={styles['dropdown__icon']}>
                    <svg>
                        <use href={`${sprite.src}#big-item-arrow`}/>
                    </svg>
                </div>
            </div>

            <div className={styles['dropdown__list']}>
                {
                    values.map((item, i) => (
                        <div
                            key={i}
                            className={classNames(styles['dropdown__item'], item.slug === currValue.slug ? styles['active'] : '')}
                            onClick={()=>{
                                selectHandler(item, currValue);
                            }}
                        >
                            {item.value}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Dropdown;