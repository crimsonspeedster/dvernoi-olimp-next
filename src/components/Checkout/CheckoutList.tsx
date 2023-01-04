import React, {useState} from 'react';
import {Collapse} from 'react-collapse';
import productImg from '@images/single-product.jpg';
import styles from './Intro.module.scss';
import classNames from "classnames";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {selectAllCartData} from "@store/cart";
import Link from "next/link";
import {If, Then} from "react-if";
import {CartVariationProps} from "@pages/cart";
import {extraDataChoosed} from "@components/SingleProduct/Intro/SingleProductContent";
import IconPlus from '@icons/bundle_plus.svg';


interface CheckoutListProps {
    classStr: string,
}

const CheckoutList:React.FC<CheckoutListProps> = (props) => {
    const {
        classStr
    } = props;

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const cartData = useSelector(selectAllCartData);

    return (
        <div className={classNames(styles['checkout-content__list'], isOpen ? styles['open'] : '', styles[classStr])}>
            <div
                className={styles['checkout-content__list-header']}
                onClick={() => setIsOpen(prev => !prev)}
            >
                <div className={styles['checkout-content__list-header-title']}>Ваш выбор</div>

                <div className={styles['checkout-content__list-header-icon']} />
            </div>

            <Collapse isOpened={isOpen}>
                <div className={styles['checkout-content__list-inner']}>
                    {
                        Object.keys(cartData.items).map(val => (
                            <div className={styles['checkout-content__list-item']} key={cartData.items[val].hash}>
                                <div className={styles['checkout-content__list-top']}>
                                    <div className={styles['checkout-content__list-info']}>
                                        <Link href={`/product/${cartData.items[val].product.slug}`} className={styles['checkout-content__list-preview']}>
                                            <div className={styles['checkout-content__list-preview-inner']}>
                                                <Image src={cartData.items[val].product.images.default} alt={cartData.items[val].product.name} width={48} height={55} />
                                            </div>
                                        </Link>

                                        <Link href={`/product/${cartData.items[val].product.slug}`} className={styles['checkout-content__list-title']}>{cartData.items[val].type === 'variable' ? cartData.items[val].variation_product?.name : cartData.items[val].product.name}</Link>
                                    </div>

                                    <div className={styles['checkout-content__list-count']}>х{cartData.items[val].quantity}</div>

                                    <div className={styles['checkout-content__list-price']}>{cartData.items[val].totals.line_total} грн</div>
                                </div>

                                <If condition={cartData.items[val].type === 'variable' || cartData.items[val].meta_data?.meta_extra_products?.length > 0}>
                                    <Then>
                                        <div className={styles['checkout-content__list-chars']}>
                                            {
                                                cartData.items[val].variation.length > 0 &&
                                                cartData.items[val].variation.map((item:CartVariationProps, i:number) => (
                                                    <div
                                                        key={i}
                                                        className={styles['checkout-content__list-chars-item']}
                                                    >
                                                        <div className={styles['checkout-content__list-chars-title']}>{item.name}:</div>

                                                        <div className={styles['checkout-content__list-chars-value']}>{item.value}</div>
                                                    </div>
                                                ))
                                            }

                                            {
                                                cartData.items[val].meta_data.meta_extra_products && cartData.items[val].meta_data.meta_extra_products?.length &&
                                                cartData.items[val].meta_data.meta_extra_products.map((item:extraDataChoosed, i:number) => (
                                                    <div
                                                        key={i}
                                                        className={styles['checkout-content__list-chars-item']}
                                                    >
                                                        <div className={styles['checkout-content__list-chars-title']}>{item.attribute_title}:</div>

                                                        <div className={styles['checkout-content__list-chars-value']}>{item.attribute_choosed.value}</div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </Then>
                                </If>

                                {
                                    cartData.items[val].meta_data.meta_bundle &&
                                    <>
                                        <div className={styles['checkout-content__list-plus']}>
                                            <Image src={IconPlus.src} alt={'bundle'} width={12} height={12} />
                                        </div>

                                        <div className={classNames(styles['checkout-content__list-top'], styles['bundle'])}>
                                            <div className={styles['checkout-content__list-info']}>
                                                <div className={styles['checkout-content__list-preview']}>
                                                    <div className={styles['checkout-content__list-preview-inner']}>
                                                        <Image src={cartData.items[val].meta_data.meta_bundle.product_image} alt={cartData.items[val].meta_data.meta_bundle.product.name} width={48} height={55} />
                                                    </div>
                                                </div>

                                                <p className={styles['checkout-content__list-title']}>{cartData.items[val].meta_data.meta_bundle.product.name}</p>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        ))
                    }
                </div>
            </Collapse>
        </div>
    )
}

export default CheckoutList