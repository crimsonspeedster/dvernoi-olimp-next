import React, {ReactElement} from 'react';
import Link from "next/link";
import sprite from '@icons/sprite.svg';
import classNames from "classnames";
import styles from './Intro.module.scss';
import Image from "next/image";
import {PhotoProps} from "@components/About/Intro/Intro";
import {LinkProps} from "@components/ContactsInfo/ContactsInfo";
import {If, Then} from "react-if";


interface CatalogCategoriesProps {
    block: acfBlockProps[]
}

export interface acfBlockProps {
    title: string,
    icon: PhotoProps,
    categories: categoriesItemsProps[],
    bottom_items: bottom_itemsProps
}

interface categoriesItemsProps {
    title: string,
    background: PhotoProps,
    repeater: linkRepeater[]
}

interface linkRepeater {
    link: LinkProps
}

interface bottom_itemsProps {
    show_blocks: boolean,
    repeater_blocks: repeater_blocksProps[] | false
}

interface repeater_blocksProps {
    title: string,
    items: linkRepeater[]
}


const CatalogCategories:React.FC<CatalogCategoriesProps> = ({block}) => {
    const CategoryBlock = (item:categoriesItemsProps):ReactElement => (
        <div className={classNames(styles['catalog-intro-categories__filter'], styles['filter-item'])}>
            <div className={classNames(styles['catalog-intro-categories__filter-inner'], styles['filter-item__inner'])} style={{backgroundImage: `url(${item.background.url})`}}>
                <div className={classNames(styles['catalog-intro-categories__filter-info'], styles['filter-item__info'])}>
                    <h3 className={classNames(styles['catalog-intro-categories__filter-title'], styles['filter-item__title'])}>{item.title}</h3>

                    <div className={classNames(styles['catalog-intro-categories__filter-links'], styles['filter-item__links'])}>
                        {
                            item.repeater.map((subitem, k) => (
                                <SubcategoryLink
                                    link={subitem.link}
                                    key={k}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );

    const SubcategoryLink = (item:linkRepeater):ReactElement => (
        <Link href={item.link.url} className={classNames(styles['catalog-intro-categories__filter-link'], styles['filter-item__link'])}>
            <span className={classNames(styles['catalog-intro-categories__filter-text'], styles['filter-item__text'])}>{item.link.title}</span>

            <span className={classNames(styles['catalog-intro-categories__filter-icon'], styles['filter-item__icon'])}>
                <svg>
                    <use href={`${sprite.src}#big-item-arrow`}/>
                </svg>
            </span>
        </Link>
    );

    const BottomBlock = (item:repeater_blocksProps):ReactElement => (
        <div className={styles['catalog-intro-categories__select-item']}>
            <h4 className={styles['catalog-intro-categories__select-title']}>{item.title}</h4>

            <ul className={styles['catalog-intro-categories__select-list']}>
                {
                    item.items.map((subitem, k) => (
                        <li key={k} className={styles['catalog-intro-categories__select-elem']}>
                            <Link href={subitem.link.url}>{subitem.link.title}</Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );


    return (
        <div className={classNames(styles['catalog-intro__categories'], styles['catalog-intro-categories'])}>
            {
                block.map((item, i) => (
                    <div key={i} className={styles['catalog-intro-categories__item']}>
                        <div className={styles['catalog-intro-categories__title']}>
                            <div className={styles['catalog-intro-categories__title-icon']}>
                                <Image src={item.icon.url} alt={item.icon.alt} width={item.icon.width} height={item.icon.height} />
                            </div>

                            <h2 className={styles['catalog-intro-categories__title-text']}>{item.title}</h2>
                        </div>

                        <div className={styles['catalog-intro-categories__inner']}>
                            {
                                item.categories.map((subitem, k) => (
                                    <CategoryBlock
                                        key={k}
                                        title={subitem.title}
                                        background={subitem.background}
                                        repeater={subitem.repeater}
                                    />
                                ))
                            }
                        </div>

                        <If condition={item.bottom_items.show_blocks}>
                            <Then>
                                <div className={styles['catalog-intro-categories__select']}>
                                    {
                                        item.bottom_items.repeater_blocks && item.bottom_items.repeater_blocks.map((subitem, k) => (
                                            <BottomBlock
                                                key={k}
                                                title={subitem.title}
                                                items={subitem.items}
                                            />
                                        ))
                                    }
                                </div>
                            </Then>
                        </If>
                    </div>
                ))
            }
        </div>
    );
}

export default CatalogCategories;