import React, {useState, useContext, FormEvent, useEffect} from 'react'
import Link from "next/link";
import sprite from '@icons/sprite.svg';
import styles from './Header.module.scss';
import classNames from "classnames";
import {ProductCardProps} from "@components/Cards/ProductCard/ProductCard";
import {useRouter} from "next/router";
import axios from "axios";

const MobileSearch = () => {
    let [search, setSearch] = useState<string>('');
    const router = useRouter();

    const submitForm = (e:FormEvent):void => {
        e.preventDefault()

        router.push(`/search?s=${search}`);
    }

    return (
        <div className={classNames(styles['header__search'], styles['header-search'])}>
            <form
                className={styles['header-search__form']}
                onSubmit={submitForm}
            >
                <div className={styles['header-search__inp-wrapper']}>
                    <input
                        className={styles['header-search__inp']}
                        type="text"
                        name="search"
                        autoComplete="off"
                        placeholder="Поиск..."
                        value={search}
                        onChange={e => setSearch(e.currentTarget.value)}
                    />
                </div>

                <div className={styles['header-search__btn-wrapper']}>
                    <button
                        className={styles['header-search__btn']}
                        type="submit"
                    >
                        <svg>
                            <use href={`${sprite.src}#search`}/>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MobileSearch