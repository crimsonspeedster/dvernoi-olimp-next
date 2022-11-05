import React from "react";
import styles from './ProductCard.module.scss';
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import {Else, If, Then} from "react-if";
import YoutubeIco from '@icons/yootube-ico.svg';
import labelNew from '@icons/label-new.svg';
import labelShare from '@icons/label-share.svg';
import labelTop from "@icons/label-top.svg";

export interface ProductCardProps {
    id: number,
    images: ImageProps,
    name: string,
    price: PriceProps,
    sku: string,
    slug: string,
    type: string,
    in_stock: boolean,
    variations: variationsProps[],
    labels: labelProps
}

interface ImageProps {
    default: string,
    gallery: string[]
}

interface variationsProps {
    attr_name: string,
    attr_value: string
}

interface PriceProps {
    default: string,
    regular?: string,
    sale?: string
}

interface labelProps {
    video: boolean,
    is_hit: boolean,
    new_card: boolean,
    sale: boolean
}

const ProductCard:React.FC<ProductCardProps> = (props) => {
    const {
        id,
        name,
        images,
        price,
        in_stock,
        sku,
        labels,
        slug,
        type,
        variations
    } = props;

    return (
        <div className={classNames(styles['productCard'], `product-${id}`)}>
            <span className={styles['productCard__sku']}>Код: {sku}</span>

            <If condition={labels.new_card || labels.sale || labels.is_hit || labels.video}>
                <Then>
                    <div className={styles['productCard-labels']}>
                        {
                            labels.new_card &&
                            <span className={classNames(styles['productCard-label'], styles['productCard-label--new'])}>Новинка</span>
                        }

                        {
                            labels.sale &&
                            <span className={classNames(styles['productCard-label'], styles['productCard-label--sale'])}>Акция</span>
                        }

                        {
                            labels.is_hit &&
                            <span className={classNames(styles['productCard-label'], styles['productCard-label--hit'])}>Топ</span>
                        }

                        {
                            labels.video &&
                            <span className={styles['productCard-label--video']}>
                                <Image src={YoutubeIco.src} alt={'видео'} width={24} height={17} />
                            </span>
                        }
                    </div>
                </Then>
            </If>

            <div className={styles['productCard__img']}>
                <Image width={160} height={288} src={images.default} alt={name} />
            </div>

            <div className={styles['productCard-row']}>
                <p className={styles['productCard__stock']}>{in_stock ? 'В наличии' : 'Нет в наличии'}</p>
            </div>

            <Link href={`/product/`} className={styles['productCard__title']}>{name}</Link>

            <div className={styles['productCard-bottom']}>
                <p className={styles['productCard__price']}>{(price.sale ? price.sale : price.default).toLocaleString()} грн</p>

                <Link className={classNames('button', styles['productCard__btn'])} href="/">Купить</Link>
            </div>
        </div>
    );
}

export default ProductCard;