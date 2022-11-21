import React, {useState, useContext, Dispatch, SetStateAction, FormEvent, useEffect} from 'react';
import Link from "next/link";
import sprite from '@icons/sprite.svg';
import styles from './Header.module.scss';
import classNames from "classnames";
import Image from "next/image";
import {Else, If, Then} from "react-if";
import {useRouter} from "next/router";
import axios from "axios";
import {PhotoProps} from "@components/About/Intro/Intro";
import {ProductCardProps} from "@components/Cards/ProductCard/ProductCard";


interface HeaderSearchProps {
    isOpenSearch: boolean,
    setIsOpenSearch: Dispatch<SetStateAction<boolean>>
}

export interface ProductItemProps {
    id: number,
    slug: string,
    name: string,
    type: string,
    sku: string,
    images: ProductImagesProps[],
    acf: acfProductProps
}

interface ProductImagesProps {
    id: number,
    src: string,
    alt: string
}

interface acfProductProps {
    video_group: videoGroupProps,
    akciya: akciyaProps,
    meta_data: metaDataProps,
    opisanie: string,
    icon?: PhotoProps,
    haratekristiki: haratekristikiProps[]
}

interface videoGroupProps {
    foto?: string,
    video: string,
    video_title: string,
    duration?: string
}

interface akciyaProps {
    enable: boolean,
    description: string
}

interface metaDataProps {
    top_sale: boolean,
    new_card: boolean
}

interface haratekristikiProps {
    nazvanie: string,
    opisanie: string
}

const HeaderSearch:React.FC<HeaderSearchProps> = ({isOpenSearch, setIsOpenSearch}) => {
    const [search, setSearch] = useState<string>('');
    const [searchData, setSearchData] = useState<ProductCardProps[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);

    const router = useRouter();

    useEffect(()=>{
        if (!search) setIsOpenSearch(false);
    }, [search]);

    const submitForm = (e:FormEvent):void => {
        e.preventDefault();

        if (!search) return;

        setIsSearching(true);

        axios.get(`${process.env.NEXT_PUBLIC_ENV_WOO_API}/products`, {
            params: {
                lang: router.locale,
                search,
                consumer_key: process.env.NEXT_PUBLIC_ENV_CONSUMER_KEY,
                consumer_secret: process.env.NEXT_PUBLIC_ENV_CONSUMER_SECRET,
                acf_format: 'standard',
                per_page: 3,
                page: 1
            }
        })
            .then((res) => {
                console.log(res.data);

                setSearchData(res.data);
                setIsSearching(false);
                setIsOpenSearch(prev => !prev);
            })
            .catch((err) => {
                console.log(err);

                setIsSearching(false);
                setSearchData([]);
                setIsOpenSearch(prev => !prev);
            });
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
                        onChange={e => setSearch(e.currentTarget.value.trim())}
                    />
                </div>

                <div className={styles['header-search__btn-wrapper']}>
                    <button
                        className={classNames(styles['header-search__btn'], isOpenSearch ? styles['active'] : '')}
                        type="button"
                        onClick={submitForm}
                    >
                        <svg>
                            <use href={`${sprite.src}#search`}/>
                        </svg>
                    </button>
                </div>

                <If condition={!isSearching && search}>
                    <Then>
                        <div className={classNames(styles['header-search__result'], isOpenSearch ? styles['open'] : '')}>
                            <div className={styles['header-search__result-list']}>
                                <If condition={searchData.length > 0}>
                                    <Then>
                                        {
                                            searchData.map((item, i) => {
                                                return (
                                                    <div className={styles['header-search__result-item']} key={i}>
                                                        <Link className={styles['header-search__result-link']} href={`/product/${item.slug}`} />

                                                        <div className={styles['header-search__result-preview']}>
                                                            <Image src={item.images.default} alt={item.name} width={48} height={55} />
                                                        </div>

                                                        <h3 className={styles['header-search__result-title']}>{item.name}</h3>
                                                    </div>
                                                )
                                            })
                                        }

                                        <div className={styles['header-search__result-btn-wrapper']}>
                                            <Link href={`/search?s=${search}`} className={styles['header-search__result-btn']}>Показать все результаты</Link>
                                        </div>
                                    </Then>

                                    <Else>
                                        <p>Ничего не найдено</p>
                                    </Else>
                                </If>
                            </div>
                        </div>
                    </Then>
                </If>
            </form>
        </div>
    )
}

export default HeaderSearch