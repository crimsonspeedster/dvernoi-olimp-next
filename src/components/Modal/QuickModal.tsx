import React, {useContext, useEffect} from 'react'
// @ts-ignore
import {Fancybox} from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox.css'
import styles from './Modal-block.module.scss';
import {isBrowser} from '@utils/isBrowser'
import {getScrollbarWidth} from '@utils/getScrollbarWidth';
import sprite from '@icons/sprite.svg'
import productImg from '@images/single-product.jpg';
import classNames from "classnames";
import Image from "next/image";
import {useTranslation} from "next-i18next";
import {useDispatch, useSelector} from "react-redux";
import {selectAllCartData, setCartItemsAmount, setCartServerData} from "@store/cart";
import axios from "axios";
import InputMask from "react-input-mask";
import {If, Then} from "react-if";
import {ErrorMessage, Formik} from "formik";
import * as Yup from "yup";
import "yup-phone";
import ModalCartItem from "@components/Modal/ModalCartItem";
import {getCookie, setCookie} from "cookies-next";
import {useRouter} from "next/router";
import {SettingsContext} from "@pages/_app";


const QuickModal = () => {
    useEffect(() => {
        Fancybox.bind("[data-fancybox='quick']", {
            showClass: 'fancybox-fadeIn',
            hideClass: 'fancybox-fadeOut',
            dragToClose: false,
            infinite: false,
            groupAll: false,
            groupAttr: false,
            parentEl: isBrowser() && document.querySelector('#__next'),
            on: {
                init: () => {
                    // @ts-ignore
                    if (isBrowser()) document.querySelector('.header').style.paddingRight = getScrollbarWidth()
                },
                destroy: () => {
                    // @ts-ignore
                    if (isBrowser()) document.querySelector('.header').style.paddingRight = '0'
                }
            }
        })

        return () => {
            Fancybox.destroy()
        }
    }, []);

    const {t} = useTranslation('common');
    const cartData = useSelector(selectAllCartData);
    const dispatch = useDispatch();
    const router = useRouter();
    const settingsCtx = useContext(SettingsContext);

    const validateFormSchema = Yup.object().shape({
        user_name: Yup.string()
            .min(2, t('errorShort') ?? '')
            .max(50, t('errorLong') ?? '')
            .matches(/^[\p{Script=Cyrl}\s]*$/u, t('errorNotCorrectFormat') ?? '')
            .trim()
            .required(t('fieldRequired') ?? ''),
        user_phone: Yup.string()
            .phone('380', true, t('fieldRequired') ?? ''),
    });

    return (
        <div className={classNames(styles['modal'], styles['modal-quick'])} id="quick-modal" style={{display: 'none'}}>
            <div className={styles['modal__title']}>{t('fastOrderTitle')}</div>

            <div className={classNames(styles['modal__choice'], styles['modal-choice'])}>
                <div className={styles['modal-choice__title']}>{t('fastOrderSelected')}:</div>

                <div className={styles['modal-choice__block']}>
                    {
                        Object.keys(cartData.items).map((val, i) => (
                            <ModalCartItem
                                key={cartData.items[val].hash}
                                type={cartData.items[val].type}
                                hash={cartData.items[val].hash}
                                variation_product={cartData.items[val].variation_product}
                                meta_data={cartData.items[val].meta_data}
                                id={cartData.items[val].id}
                                quantity={cartData.items[val].quantity}
                                variation_id={cartData.items[val].variation_id}
                                variation={cartData.items[val].variation}
                                totals={cartData.items[val].totals}
                                product={cartData.items[val].product}
                            />
                        ))
                    }
                </div>
            </div>

            <Formik
                initialValues={{
                    user_phone: '',
                    user_name: ''
                }}
                validationSchema={validateFormSchema}
                onSubmit={(values, {setSubmitting}) => {
                    setSubmitting(true);

                    axios.post(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/orders/create`, {
                        nonce: settingsCtx.nonce,
                        data_user: {
                            shipping_title: t('fastOrderTitle'),
                            payment_method: t('fastOrderTitle'),
                            first_name: `${t('fastOrderTitle')} ${values.user_name}`,
                            last_name: '',
                            email: '',
                            phone: values.user_phone,
                            comment: '',
                            meta_shipping_type: '',
                            shipping_shop_choosed: '',
                            shipping_delivery_city: '',
                            shipping_delivery_street: '',
                            shipping_delivery_house: '',
                            shipping_delivery_floor: '',
                            shipping_delivery_apartment: '',
                            shipping_np_city: '',
                            shipping_np_department: '',
                            shipping_np_street: '',
                            shipping_np_house: '',
                            payment_type: '',
                            coupon_code: ''
                        }
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

                            dispatch(setCartServerData(res.data.cart));
                            dispatch(setCartItemsAmount(res.data.cart.total_amount ?? 0));

                            Fancybox.close();
                            setSubmitting(false);

                            router.push({
                                pathname: '/thanks',
                                query: {order: res.data.order_id ?? ''}
                            });
                        })
                        .catch((error) => {console.log(error)});
                }}
            >
                {
                    ({
                         values,
                         errors,
                         touched,
                         handleChange,
                         handleSubmit,
                         setFieldTouched,
                         isSubmitting
                     }) => (
                        <form className={styles['modal__form']} onSubmit={handleSubmit}>
                            <div className={styles['modal__inp-wrapper']}>
                                <label className={styles['modal__label']} htmlFor="modal-quick-name">{t('modalCallbackLabelName')}</label>

                                <div className={styles['modal__inp-inner']}>
                                    <input
                                        className={styles['modal__inp']}
                                        id="modal-quick-name"
                                        type="text"
                                        name="user_name"
                                        onChange={(e)=>{
                                            setFieldTouched('user_name');
                                            handleChange(e);
                                        }}
                                        autoComplete="off"
                                        value={values.user_name}
                                        placeholder={t('modalCallbackPlaceholderName') ?? ''}
                                    />
                                </div>

                                <If condition={errors.user_name && touched.user_name}>
                                    <Then>
                                        <div className={styles['form-error__msg']}>
                                            <ErrorMessage name="user_name" />
                                        </div>
                                    </Then>
                                </If>
                            </div>

                            <div className={styles['modal__inp-wrapper']}>
                                <label className={styles['modal__label']} htmlFor="modal-quick-phone">{t('modalCallbackLabelPhone')}</label>

                                <div className={styles['modal__inp-inner']}>
                                    <InputMask
                                        className={styles['modal__inp']}
                                        id="modal-quick-phone"
                                        name="user_phone"
                                        autoComplete="off"
                                        mask="+38 (999) 999-99-99"
                                        maskPlaceholder="+38 (___) ___-__-__"
                                        placeholder="+38 (000) ___ __ __"
                                        type="tel"
                                        onChange={(e)=>{
                                            setFieldTouched('user_phone');
                                            handleChange(e);
                                        }}
                                        value={values.user_phone}
                                    />
                                </div>

                                <If condition={errors.user_phone && touched.user_phone}>
                                    <Then>
                                        <div className={styles['form-error__msg']}>
                                            <ErrorMessage name="user_phone" />
                                        </div>
                                    </Then>
                                </If>
                            </div>

                            <div className={styles['modal__btns']}>
                                <div className={styles['modal__btn-wrapper']}>
                                    <button
                                        type="submit"
                                        className={classNames(styles['modal__btn'], 'btn', isSubmitting ? styles['updating'] : '')}
                                        disabled={isSubmitting}
                                    >
                                        <span className={classNames(styles['modal__btn-icon'], 'btn__icon')}>
                                            <svg><use href={`${sprite.src}#cart`}/></svg>
                                        </span>

                                        <span className={classNames(styles['modal__btn-text'], 'btn__text')}>{t('buyTitle')}</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
            </Formik>
        </div>
    )
}

export default QuickModal;