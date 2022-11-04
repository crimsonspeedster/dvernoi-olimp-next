import React, {useState, useContext, Dispatch, SetStateAction, FormEvent} from 'react';
import Link from "next/link";
import sprite from '@icons/sprite.svg';
import styles from './Header.module.scss';
import classNames from "classnames";


interface HeaderSearchProps {
    isOpenSearch: boolean,
    setIsOpenSearch: Dispatch<SetStateAction<boolean>>
}

const HeaderSearch:React.FC<HeaderSearchProps> = ({isOpenSearch, setIsOpenSearch}) => {
    let [search, setSearch] = useState<string>('');

    const submitForm = (e:FormEvent) => {
        e.preventDefault()

        setIsOpenSearch(false);
    }

    return (
        <div className={classNames(styles['header__search'], styles['header-search'])}>
            <form
                className={classNames(styles['header-search__form'], isOpenSearch ? styles['open'] : '')}
                onSubmit={submitForm}
            >
                <div className={styles['header-search__inp-wrapper']}>
                    <input
                        className={styles['header-search__inp']}
                        type="search"
                        name="search"
                        autoComplete="off"
                        placeholder="Поиск..."
                        value={search}
                        onChange={e => setSearch(e.currentTarget.value)}
                    />
                </div>

                <div className={styles['header-search__btn-wrapper']}>
                    <button
                        className={classNames(styles['header-search__btn'], isOpenSearch ? styles['active'] : '')}
                        type="button"
                        onClick={() => setIsOpenSearch(prev => !prev)}
                    >
                        <svg>
                            <use href={`${sprite.src}#search`}/>
                        </svg>
                    </button>
                </div>

                {/*<div className={classNames(styles['header-search__result'], isOpenSearch ? styles['open'] : '')}>*/}
                {/*    <div className={styles['header-search__result-list']}>*/}
                {/*        {*/}
                {/*            new Array(3).fill('').map((_, index) => {*/}
                {/*                return (*/}
                {/*                    <div className="header-search__result-item" key={index}>*/}
                {/*                        <Link className="header-search__result-link" href="/" />*/}
                {/*                        */}
                {/*                        <div className="header-search__result-preview">*/}
                {/*                            <img src={productImg} alt="" width={48} height={55}/>*/}
                {/*                        </div>*/}
                {/*                        */}
                {/*                        <div className="header-search__result-title">Входные двери B 3.11 Венге/Белый*/}
                {/*                            супермат М2, Mottura. БЕРИСЛАВ*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                )*/}
                {/*            })*/}
                {/*        }*/}
                {/*    </div>*/}
                {/*    */}
                {/*    <div className={styles['header-search__result-btn-wrapper']}>*/}
                {/*        <button className={styles['header-search__result-btn']} type="submit">Показать все результаты</button>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </form>
        </div>
    )
}

export default HeaderSearch