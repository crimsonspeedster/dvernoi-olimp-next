import React, {useState, useContext, FormEvent} from 'react'
import Link from "next/link";
import sprite from '@icons/sprite.svg';
import styles from './Header.module.scss';
import classNames from "classnames";

const MobileSearch = () => {
    let [search, setSearch] = useState<string>('')

    const submitForm = (e:FormEvent) => {
        e.preventDefault()
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