import React, {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState
} from 'react';
import InputMask from 'react-input-mask';
import sprite from '@icons/sprite.svg';
import styles from './Intro.module.scss';
import classNames from "classnames";
import {If, Then} from "react-if";
import {variationsProps} from "@components/Cards/ProductCard/ProductCard";
import ProductVariation from "@components/SingleProduct/ProductVariation/ProductVariation";
import ProductExtra, {
    ProductExtraOptionsProps
} from "@components/SingleProduct/ProductExtra/ProductExtra";
import axios from "axios";
import {SettingsContext} from "@pages/_app";
import {getCookie, setCookie} from "cookies-next";
import {setCartItemsAmount, setCartServerData} from "@store/cart";
import {useDispatch} from "react-redux";
import {setProductSelectedPrice} from "@store/product";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";
import {ErrorMessage, Formik} from "formik";
import * as Yup from "yup";
import "yup-phone";
import Toast from "@components/Toast/Toast";
import ToastMiniThank from "@components/ToastMiniThank/ToastMiniThank";


interface SingleProductContentProps {
    id: number,
    in_stock: boolean,
    title: string,
    sku: string,
    type: string,
    attributes: attributesProps[],
    variation_array: variation_arrayProps[],
    default_attributes: default_attributesProps[],
    price: string,
    currentVariation?: variation_arrayProps,
    setCurrentVariation: Dispatch<SetStateAction<variation_arrayProps|undefined>>
    extra_attributes: extraAttributesProps[]
}

export interface extraAttributesProps {
    attribute_title: string,
    attribute_values: ProductExtraOptionsProps[]
}

export interface default_attributesProps {
    id: number,
    name: string,
    option: string,
}

export interface variation_arrayProps {
    id: number,
    name: string,
    parent_id: number,
    slug: string,
    status: string,
    attribute_summary: variationsProps[],
    price: string,
    default_choosed: boolean,
    in_stock: boolean
}

export interface attributesProps {
    id: number,
    name: string,
    visible: boolean,
    variation: boolean,
    options: string[],
}

export interface extraDataChoosed {
    attribute_title: string,
    attribute_choosed: ProductExtraOptionsProps
}

const SingleProductContent:React.FC<SingleProductContentProps> = (props) => {
    const {
        id,
        sku,
        type,
        title,
        attributes,
        in_stock,
        variation_array,
        price,
        default_attributes,
        currentVariation,
        setCurrentVariation,
        extra_attributes
    } = props;

    const settingsCtx = useContext(SettingsContext);
    const dispatch = useDispatch();
    const router = useRouter();
    const {t} = useTranslation('common');

    const [counter, setCounter] = useState<string>('1');
    const [itemPrice, setItemPrice] = useState<string>(type === 'simple' ? price : currentVariation?.price ?? '0');
    const [extraPrice, setExtraPrice] = useState<string>('0');
    const [extraProducts, setExtraProducts] = useState<extraAttributesProps[]>(extra_attributes);
    const [dataStatus, setDataStatus] = useState<boolean>(false);
    const [toastStatus, setToastStatus] = useState<boolean>(false);

    const validateFormSchema = Yup.object().shape({
        user_phone: Yup.string()
            .phone('380', false, t('fieldRequired') ?? '')
    });

    useEffect(()=>{
        setItemPrice(type === 'simple' ? price : currentVariation?.price ?? '0');
    }, [price, currentVariation, type]);

    useEffect(()=>{
        setExtraProducts(extra_attributes);
    }, [extra_attributes]);

    useEffect(()=>{
        dispatch(setProductSelectedPrice(parseInt(itemPrice) + parseInt(extraPrice)));
    }, [itemPrice, extraPrice]);

    useEffect(()=>{
        let total_price:number = 0;

        extraProducts.forEach(item => {
            total_price += parseInt(item.attribute_values.filter(subitem => subitem.choosed)[0].price);

            return item;
        });

        setExtraPrice(total_price.toString());
    }, [extraProducts]);

    const counterHandler = (val: string):void => {
        const filteredVal = parseInt(val);

        if (isNaN(filteredVal) || filteredVal < 1) {
            setCounter('1');
            return;
        }

        setCounter(filteredVal.toString());
    }

    const counterClickHandler = (type: string):void => {
        switch (type)
        {
            case 'minus':
                setCounter(prev => (parseInt(prev) - 1) < 1 ? '1' : (parseInt(prev) - 1).toString());
                break;
            default:
                setCounter(prev => (parseInt(prev) + 1).toString());
                break;
        }
    }

    const buyHandler = ():void => {
        if (!in_stock)
            return;

        setDataStatus(true);

        const extraData:extraDataChoosed[] = [];

        extraProducts.map(item => {
            let choosed_extra_attrs:ProductExtraOptionsProps[] = item.attribute_values.filter(subitem => subitem.choosed && subitem.slug !== 'nothing');

            if (choosed_extra_attrs.length > 0)
            {
                extraData.push({
                    attribute_title: item.attribute_title,
                    attribute_choosed: choosed_extra_attrs[0]
                });
            }

            return item;
        });

        axios.post(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/cart/add-item`, {
            nonce: settingsCtx.nonce,
            id,
            lang: router.locale,
            quantity: counter,
            ...(type === 'variable') && {'variation-id': currentVariation?.id},
            ...(extraData.length > 0) && {cart_item_data: {
                meta_extra_products: extraData
            }}
        }, {
            headers: {
                'X-Headless-WP': true,
                ...(getCookie('X-WC-Session')) && {'X-WC-Session': getCookie('X-WC-Session')}
            }
        })
            .then((res)=>{
                if (!getCookie('X-WC-Session'))
                {
                    setCookie('X-WC-Session', res.headers['x-wc-session']);
                }

                console.log(res.data);

                dispatch(setCartServerData(res.data));
                dispatch(setCartItemsAmount(res.data.total_amount ?? 0));

                setDataStatus(false);
            })
            .catch((error) => {console.log(error)});
    }

    return (
        <div className={classNames(styles['single-product-intro__content'], styles['single-product-intro-content'])}>
            <div className={styles['single-product-intro-content__top']}>
                <div className={styles['single-product-intro-content__number']}>
                    {t('productCode')}: <span>{id}</span>
                </div>
            </div>

            {
                type === 'variable' &&
                attributes.sort((a, b) => a.id > b.id ? 1 : -1).map((item, i, arr) => (
                    <If key={i} condition={item.visible && item.variation}>
                        <Then>
                            <ProductVariation
                                defaultAttribute={default_attributes.sort((a, b) => a.id > b.id ? 1 : -1)[i]}
                                attribute={item}
                                setCurrVariation={setCurrentVariation}
                                currentVariation={currentVariation}
                                variation_array={variation_array}
                            />
                        </Then>
                    </If>
                ))
            }

            <If condition={extra_attributes.length > 0}>
                <Then>
                    {
                        extra_attributes.map((item, i) => (
                            <ProductExtra
                                key={i}
                                attributeTitle={item.attribute_title}
                                attributeValues={item.attribute_values}
                                extraProducts={extraProducts}
                                updateExtraProducts={setExtraProducts}
                            />
                        ))
                    }
                </Then>
            </If>

            <div className={styles['single-product-intro-content__controls']}>
                <div className={styles['single-product-intro-content__controls-item']}>
                    <div className={styles['single-product-intro-content__counter']}>
                        <button
                            onClick={()=>counterClickHandler('minus')}
                            className={classNames(styles['single-product-intro-content__counter-btn'], styles['single-product-intro-content__counter-btn--minus'])}
                        />

                        <input
                            className={styles['single-product-intro-content__counter-inp']}
                            type="number"
                            autoComplete="off"
                            name="product_counter"
                            onChange={(e) => setCounter(e.currentTarget.value.trim() ?? '1')}
                            onBlur={(e) => counterHandler(e.currentTarget.value.trim())}
                            value={counter}
                        />

                        <button
                            onClick={()=>counterClickHandler('plus')}
                            className={classNames(styles['single-product-intro-content__counter-btn'], styles['single-product-intro-content__counter-btn--plus'])}
                        />
                    </div>
                </div>

                <div className={styles['single-product-intro-content__controls-item']}>
                    <div className={styles['single-product-intro-content__btn-wrapper']}>
                        <button
                            disabled={dataStatus}
                            onClick={buyHandler}
                            className={classNames(styles['single-product-intro-content__btn'], styles['single-product-intro-content__btn--buy'], 'btn', !in_stock ? 'disabled' : '', dataStatus ? styles['updating'] : '')}
                        >
                            <span className={classNames(styles['single-product-intro-content__btn-icon'], 'btn__icon', dataStatus ? styles['updating'] : '')}>
                                <svg><use href={`${sprite.src}#cart`}/></svg>
                            </span>

                            <span className={classNames(styles['single-product-intro-content__btn-text'], 'btn__text', dataStatus ? styles['updating'] : '')}>{t('buyTitle')}</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className={styles['single-product-intro-content__price']}>
                <p className={styles['single-product-intro-content__price-text']}>{t('selectedPrice')}:</p>

                <div className={styles['single-product-intro-content__price-count']}>
                    <span>{parseInt(itemPrice) + parseInt(extraPrice)}</span> грн / шт.
                </div>
            </div>

            <div className={styles['single-product-intro-content__btns']}>
                <div className={styles['single-product-intro-content__btns-item']}>
                    <button
                        data-fancybox="masterfancy"
                        data-src="#master-modal"
                        className={classNames(styles['single-product-intro-content__btn'], styles['single-product-intro-content__btn--ruler'], 'btn')}
                    >
                        <span className={classNames(styles['single-product-intro-content__btn-icon'], 'btn__icon')}>
                            <svg><use href={`${sprite.src}#ruler`}/></svg>
                        </span>

                        <span className={classNames(styles['single-product-intro-content__btn-text'], 'btn__text')}>{t('callMaster')}</span>
                    </button>
                </div>
            </div>

            <Formik
                initialValues={{
                    user_phone: '',
                    product_title: title,
                    product_id: id.toString(),
                    product_link: `${process.env.NEXT_PUBLIC_ENV_FRONTEND_LINK}${router.asPath}`
                }}
                validationSchema={validateFormSchema}
                onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(true);

                    const formBodyData = new FormData();

                    for (let [key, value] of Object.entries(values)) {
                        formBodyData.append(key, value.trim());
                    }

                    axios.post(`${process.env.NEXT_PUBLIC_ENV_APP_FORM}/1448/feedback`, formBodyData)
                        .then(function (response) {
                            setToastStatus(true);
                            setSubmitting(false);
                        })
                        .catch(function (error) {
                            console.log(error);

                            setToastStatus(true);
                            setSubmitting(false);
                        });
                }}
            >
                {
                    ({
                         values,
                         errors,
                         touched,
                         handleChange,
                         handleSubmit,
                         isSubmitting,
                         setFieldTouched
                     }) => (
                            <form className={styles['single-product-intro-content__bot']} onSubmit={handleSubmit}>
                                <div className={classNames(styles['single-product-intro-content__bot-item'], styles['input'])}>
                                    <InputMask
                                        className={styles['single-product-intro-content__phone']}
                                        mask="+38 (099) 999-99-99"
                                        maskPlaceholder={'+38 (___) ___-__-__'}
                                        name="user_phone"
                                        autoComplete="off"
                                        type="tel"
                                        placeholder="+38 (___) ___-__-__"
                                        value={values.user_phone}
                                        onChange={(e)=>{
                                            setFieldTouched('user_phone');
                                            handleChange(e);
                                        }}
                                    />

                                    <If condition={errors.user_phone && touched.user_phone}>
                                        <Then>
                                            <div className={styles['form-error__msg']}>
                                                <ErrorMessage name="user_phone" />
                                            </div>
                                        </Then>
                                    </If>
                                </div>

                                <div className={classNames(styles['single-product-intro-content__bot-item'], styles['button'])}>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={classNames(styles['single-product-intro-content__btn'], styles['single-product-intro-content__btn--cursor'], 'btn', !in_stock ? 'disabled' : '', isSubmitting ? styles['updating'] : '')}
                                    >
                                        <span className={classNames(styles['single-product-intro-content__btn-icon'], 'btn__icon', isSubmitting ? styles['updating'] : '')}>
                                            <svg><use href={`${sprite.src}#cursor`}/></svg>
                                        </span>

                                        <span className={classNames(styles['single-product-intro-content__btn-text'], 'btn__text', isSubmitting ? styles['updating'] : '')}>{t('buy1Click')}</span>
                                    </button>
                                </div>
                            </form>
                    )
                }
            </Formik>

            <Toast status={toastStatus} closeHandler={setToastStatus}>
                <ToastMiniThank />
            </Toast>
        </div>
    )
}

export default SingleProductContent;