import React, {useContext} from "react";
import styles from './ProductCard.module.scss';
import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";
import {If, Then} from "react-if";
import YoutubeIco from '@icons/yootube-ico.svg';
import {variation_arrayProps} from "@components/SingleProduct/Intro/SingleProductContent";
import axios from "axios";
import {SettingsContext} from "@pages/_app";
import {useDispatch} from "react-redux";
import {setCartItemsAmount, setCartServerData} from "@store/cart";

export interface ProductCardProps {
    id: number,
    images: ImageProductProps,
    name: string,
    price: PriceProps,
    sku: string,
    slug: string,
    type: string,
    in_stock: boolean,
    variations: variationsProps[],
    labels: labelProps,
    variation_array?: variation_arrayProps[],
}

export interface ImageProductProps {
    default: string,
    gallery: string[]
}

export interface variationsProps {
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
        variations,
        variation_array
    } = props;

    const settingsCtx = useContext(SettingsContext);
    const dispatch = useDispatch();

    const buyHandler = ():void => {
        if (type === 'simple')
        {
            axios.post(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/cart/add-item`, {
                nonce: settingsCtx.nonce,
                id,
                quantity: 1
            }, {
                withCredentials: true
            })
                .then((res)=>{
                    dispatch(setCartServerData(res.data));
                    dispatch(setCartItemsAmount(res.data.total_amount ?? 0));
                })
                .catch((error) => {console.log(error)});
        }
        else {
            console.log(variation_array);
        }
    }

    return (
        <div className={classNames(styles['productCard'], `product-${id}`)}>
            <span className={styles['productCard__sku']}>Код: {id}</span>

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

            <Link href={`/product/${slug}`} className={styles['productCard__img']}>
                <Image width={160} height={288} src={images.default} alt={name} />
            </Link>

            <div className={styles['productCard-row']}>
                <p className={styles['productCard__stock']}>{in_stock ? 'В наличии' : 'Нет в наличии'}</p>
            </div>

            <Link href={`/product/${slug}`} className={styles['productCard__title']}>{name}</Link>

            <div className={styles['productCard-bottom']}>
                <p className={styles['productCard__price']}>{type === 'variable' ? 'от': ''} {(price.sale ? price.sale : price.default).toLocaleString()} грн</p>

                <div
                    className={classNames('button', styles['productCard__btn'])}
                    onClick={buyHandler}
                >Купить</div>
            </div>
        </div>
    );
}

export default ProductCard;