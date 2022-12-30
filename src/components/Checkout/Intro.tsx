import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from './Intro.module.scss';
import classNames from "classnames";
import {If, Then} from "react-if";
import {ErrorMessage, Field, Formik} from "formik";
import InputMask from "react-input-mask";
import * as Yup from "yup";
import CheckoutList from "@components/Checkout/CheckoutList";
import sprite from "@icons/sprite.svg";
import {useSelector} from "react-redux";
import {selectAllCartData, setCartItemsAmount, setCartServerData} from "@store/cart";
import Select, {SingleValue} from "react-select";
import {NPCityProps, NPDepartament} from "@pages/checkout";
import "yup-phone";
// @ts-ignore
import NovaPoshta from "novaposhta";
import {SettingsContext} from "@pages/_app";
import axios from "axios";
import {getCookie, setCookie} from "cookies-next";
import LiqpayPopup from "@components/Modal/LiqpayPopup";


interface CheckoutIntroProps {
    title: string,
    npCities: NPCityProps[]
    deliveryShops: DeliverShopsProps[]
}

interface DeliverShopsProps {
    label: string;
    options: DeliverShopProps[];
}

interface DeliverShopProps {
    label: string,
    value: string,
    schedule: string,
    city: string
}

const CheckoutIntro: React.FC<CheckoutIntroProps> = (props) => {
    const {
        title,
        npCities,
        deliveryShops
    } = props;

    const cartData = useSelector(selectAllCartData);
    const settingsCtx = useContext(SettingsContext);

    const novaPoshtaRequest = new NovaPoshta({ apiKey: process.env.NEXT_PUBLIC_ENV_NP_API_KEY });

    const [departament, setDepartament] = useState<NPDepartament[]>([]);
    const [liqpayForm, setLiqpayForm] = useState<string>('');

    const validateFormSchema = Yup.object().shape({
        user_name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .matches(/^[\p{Script=Cyrl}\s]*$/u, 'Is not in correct format')
            .trim()
            .required('Required'),
        user_phone: Yup.string()
            .phone()
            .required('Required'),
        user_email: Yup.string()
            .email()
            .required('Required'),
        user_agreed: Yup.bool().oneOf([true], 'Field must be checked'),
    });

    return (
        <section className={classNames(styles['checkout'], 'intro')}>
            <div className="container">
                <h1 className={classNames(styles['checkout__title'], 'title', 'title--dark')}>{title}</h1>

                <Formik
                    initialValues={{
                        user_name: '',
                        user_surname: '',
                        user_phone: '',
                        user_email: '',
                        user_comment: '',
                        user_agreed: true,
                        user_promo: '',
                        delivery_type: "1",
                        np_city: {},
                        np_department: '',
                        np_street: '',
                        np_house: '',
                        shop_city: deliveryShops[0].options[0],
                        shop_street: '',
                        shop_house: '',
                        shop_floor: '',
                        shop_apartment: '',
                        payment_type: "1"
                    }}
                    // validationSchema={validateFormSchema}
                    onSubmit={(values, {setSubmitting}) => {
                        setSubmitting(true);
                        console.log(values);

                        axios.post(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/orders/create`, {
                            nonce: settingsCtx.nonce,
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
                                setSubmitting(false);
                                setLiqpayForm(res.data.form);
                            })
                            .catch((error) => {console.log(error)});
                    }}
                >
                    {
                        ({
                             setFieldValue,
                             values,
                             errors,
                             touched,
                             handleChange,
                             handleSubmit,
                             isSubmitting
                         }) => (
                            <form className={styles['checkout__from']} onSubmit={handleSubmit}>
                                <div className={classNames(styles['checkout__info'], styles['checkout-info'])}>
                                    <div className={styles['checkout-info__item']}>
                                        <div className={styles['checkout-info__header']}>
                                            <div className={styles['checkout-info__header-number']}>1</div>

                                            <div className={styles['checkout-info__header-title']}>Контактные данные</div>
                                        </div>

                                        <div className={styles['checkout-info__inps']}>
                                            <div className={styles['checkout-info__inp-wrapper']}>
                                                <label className={styles['checkout-info__label']} htmlFor="checkout-first-name">Имя</label>

                                                <div className={styles['checkout-info__inp-inner']}>
                                                    <input
                                                        className={styles['checkout-info__inp']}
                                                        id="checkout-first-name"
                                                        name="user_name"
                                                        onChange={handleChange}
                                                        autoComplete="off"
                                                        placeholder="Ваше имя"
                                                        type="text"
                                                        value={values.user_name}
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

                                            <div className={styles['checkout-info__inp-wrapper']}>
                                                <label className={styles['checkout-info__label']} htmlFor="checkout-last-name">Фамилия</label>

                                                <div className={styles['checkout-info__inp-inner']}>
                                                    <input
                                                        className={styles['checkout-info__inp']}
                                                        id="checkout-last-name"
                                                        name="user_surname"
                                                        autoComplete="off"
                                                        placeholder="Ваша фамилия"
                                                        type="text"
                                                        onChange={handleChange}
                                                        value={values.user_surname}
                                                    />
                                                </div>

                                                <If condition={errors.user_surname && touched.user_surname}>
                                                    <Then>
                                                        <div className={styles['form-error__msg']}>
                                                            <ErrorMessage name="user_surname" />
                                                        </div>
                                                    </Then>
                                                </If>
                                            </div>

                                            <div className={styles['checkout-info__inp-wrapper']}>
                                                <label className={styles['checkout-info__label']} htmlFor="checkout-phone">Мобильный телефон</label>

                                                <div className={styles['checkout-info__inp-inner']}>
                                                    <InputMask
                                                        className={styles['checkout-info__inp']}
                                                        id="checkout-phone"
                                                        name="user_phone"
                                                        autoComplete="off"
                                                        mask="+38 (999) 999-99-99"
                                                        maskPlaceholder="+38 (___) ___-__-__"
                                                        placeholder="+38 (000) ___ __ __"
                                                        type="tel"
                                                        onChange={handleChange}
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

                                            <div className={styles['checkout-info__inp-wrapper']}>
                                                <label className={styles['checkout-info__label']}  htmlFor="checkout-email">Email</label>

                                                <div className={styles['checkout-info__inp-inner']}>
                                                    <input
                                                        className={styles['checkout-info__inp']}
                                                        id="checkout-email"
                                                        name="user_email"
                                                        autoComplete="off"
                                                        placeholder="Email"
                                                        type="email"
                                                        value={values.user_email}
                                                        onChange={handleChange}
                                                    />
                                                </div>

                                                <If condition={errors.user_email && touched.user_email}>
                                                    <Then>
                                                        <div className={styles['form-error__msg']}>
                                                            <ErrorMessage name="user_email" />
                                                        </div>
                                                    </Then>
                                                </If>
                                            </div>
                                        </div>

                                        <CheckoutList
                                            classStr={'mobile'}
                                        />
                                    </div>

                                    <div className={styles['checkout-info__item']}>
                                        <div className={styles['checkout-info__header']}>
                                            <div className={styles['checkout-info__header-number']}>2</div>

                                            <div className={styles['checkout-info__header-title']}>Доставка</div>
                                        </div>

                                        <div className={classNames(styles['checkout-info__delivery'], styles['checkout-info__select'])}>
                                            <span className={styles['checkout-info__label']}>Выберите способ доставки:</span>

                                            <div className={styles['checkout-info__inner']}>
                                                <div className={styles['checkout-info__select-item']}>
                                                    <Field
                                                        type="radio"
                                                        id="checkout-delivery-1"
                                                        name="delivery_type"
                                                        className={styles['checkout-info__select-radio']}
                                                        value="1"
                                                    />

                                                    <label
                                                        className={styles['checkout-info__select-btn']}
                                                        htmlFor="checkout-delivery-1"
                                                    >
                                                        <span className={styles['checkout-info__select-icon']}>
                                                            <svg>
                                                                <use href={`${sprite.src}#user`}/>
                                                            </svg>
                                                        </span>

                                                        <span className={styles['checkout-info__select-check']}/>

                                                        <span className={styles['checkout-info__select-text']}>Самовывоз из магазина</span>
                                                    </label>
                                                </div>

                                                <div className={styles['checkout-info__select-item']}>
                                                    <Field
                                                        type="radio"
                                                        id="checkout-delivery-2"
                                                        name="delivery_type"
                                                        className={styles['checkout-info__select-radio']}
                                                        value="2"
                                                    />

                                                    <label
                                                        className={styles['checkout-info__select-btn']}
                                                        htmlFor="checkout-delivery-2"
                                                    >
                                                        <span className={styles['checkout-info__select-icon']}>
                                                            <svg>
                                                                <use href={`${sprite.src}#user`}/>
                                                            </svg>
                                                        </span>

                                                        <span className={styles['checkout-info__select-check']}/>

                                                        <span className={styles['checkout-info__select-desc']}>
                                                            <span className={styles['checkout-info__select-text']}>Курьером по адресу (от магазина)</span>
                                                        </span>
                                                    </label>
                                                </div>

                                                <div className={styles['checkout-info__select-item']}>
                                                    <Field
                                                        type="radio"
                                                        id="checkout-delivery-3"
                                                        name="delivery_type"
                                                        className={styles['checkout-info__select-radio']}
                                                        value="3"
                                                    />

                                                    <label
                                                        className={styles['checkout-info__select-btn']}
                                                        htmlFor="checkout-delivery-3"
                                                    >
                                                        <span className={styles['checkout-info__select-icon']}>
                                                            <svg>
                                                                <use href={`${sprite.src}#newpost`}/>
                                                            </svg>
                                                        </span>

                                                        <span className={styles['checkout-info__select-check']}/>

                                                        <span className={styles['checkout-info__select-desc']}>
                                                            <span className={styles['checkout-info__select-text']}>В отделение «Новая Почта»</span>
                                                        </span>
                                                    </label>
                                                </div>

                                                <div className={styles['checkout-info__select-item']}>
                                                    <Field
                                                        type="radio"
                                                        id="checkout-delivery-4"
                                                        name="delivery_type"
                                                        className={styles['checkout-info__select-radio']}
                                                        value="4"
                                                    />

                                                    <label
                                                        className={styles['checkout-info__select-btn']}
                                                        htmlFor="checkout-delivery-4"
                                                    >
                                                        <span className={styles['checkout-info__select-icon']}>
                                                            <svg>
                                                                <use href={`${sprite.src}#newpost`}/>
                                                            </svg>
                                                        </span>

                                                        <span className={styles['checkout-info__select-check']}/>

                                                        <span className={styles['checkout-info__select-desc']}>
                                                            <span className={styles['checkout-info__select-text']}>Курьером по адресу</span>
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>

                                            {
                                                values.delivery_type === '1' &&
                                                <div className={styles['checkout-info__delivery-block']}>
                                                    <span className={styles['checkout-info__delivery-block__title']}>Выберите удобный магазин:</span>

                                                    <Select<DeliverShopProps, false, DeliverShopsProps>
                                                        className={styles['checkout-info__delivery-block__select']}
                                                        options={deliveryShops}
                                                        onChange={(val) => {
                                                            setFieldValue('shop_city', val);

                                                            console.log(val);
                                                        }}
                                                        defaultValue={values.shop_city}
                                                        name={'shop_city'}
                                                    />

                                                    <p className={styles['checkout-info__delivery-block__info']}>{values.shop_city.schedule}</p>
                                                </div>
                                            }

                                            {
                                                values.delivery_type === '2' &&
                                                <>
                                                    <div className={styles['checkout-info__delivery-block']}>
                                                        <span className={styles['checkout-info__delivery-block__title']}>Укажите город:</span>

                                                        <Select<DeliverShopProps, false, DeliverShopsProps>
                                                            className={styles['checkout-info__delivery-block__select']}
                                                            options={deliveryShops}
                                                            onChange={(val) => {
                                                                setFieldValue('shop_city', val);
                                                            }}
                                                            defaultValue={values.shop_city}
                                                            placeholder="Город"
                                                            name={'shop_city'}
                                                        />
                                                    </div>

                                                    <div className={styles['checkout-info__inps']}>
                                                        <div className={styles['checkout-info__inp-wrapper']}>
                                                            <label className={styles['checkout-info__label']} htmlFor="checkout-shop-street">Улица</label>

                                                            <div className={styles['checkout-info__inp-inner']}>
                                                                <input
                                                                    className={styles['checkout-info__inp']}
                                                                    id="checkout-shop-street"
                                                                    name="shop_street"
                                                                    onChange={handleChange}
                                                                    autoComplete="off"
                                                                    placeholder="Улица"
                                                                    type="text"
                                                                    value={values.shop_street}
                                                                />
                                                            </div>

                                                            <If condition={errors.shop_street && touched.shop_street}>
                                                                <Then>
                                                                    <div className={styles['form-error__msg']}>
                                                                        <ErrorMessage name="shop_street" />
                                                                    </div>
                                                                </Then>
                                                            </If>
                                                        </div>

                                                        <div className={styles['checkout-info__inp-wrapper']}>
                                                            <label className={styles['checkout-info__label']} htmlFor="checkout-shop-house">Дом</label>

                                                            <div className={styles['checkout-info__inp-inner']}>
                                                                <input
                                                                    className={styles['checkout-info__inp']}
                                                                    id="checkout-shop-house"
                                                                    name="shop_house"
                                                                    autoComplete="off"
                                                                    placeholder="№"
                                                                    type="text"
                                                                    onChange={handleChange}
                                                                    value={values.shop_house}
                                                                />
                                                            </div>

                                                            <If condition={errors.shop_house && touched.shop_house}>
                                                                <Then>
                                                                    <div className={styles['form-error__msg']}>
                                                                        <ErrorMessage name="shop_house" />
                                                                    </div>
                                                                </Then>
                                                            </If>
                                                        </div>

                                                        <div className={styles['checkout-info__inp-wrapper']}>
                                                            <label className={styles['checkout-info__label']} htmlFor="checkout-shop-floor">Этаж</label>

                                                            <div className={styles['checkout-info__inp-inner']}>
                                                                <input
                                                                    className={styles['checkout-info__inp']}
                                                                    id="checkout-shop-floor"
                                                                    name="shop_floor"
                                                                    autoComplete="off"
                                                                    placeholder="1"
                                                                    type="text"
                                                                    onChange={handleChange}
                                                                    value={values.shop_floor}
                                                                />
                                                            </div>

                                                            <If condition={errors.shop_floor && touched.shop_floor}>
                                                                <Then>
                                                                    <div className={styles['form-error__msg']}>
                                                                        <ErrorMessage name="shop_floor" />
                                                                    </div>
                                                                </Then>
                                                            </If>
                                                        </div>

                                                        <div className={styles['checkout-info__inp-wrapper']}>
                                                            <label className={styles['checkout-info__label']} htmlFor="checkout-shop-apartment">Квартира</label>

                                                            <div className={styles['checkout-info__inp-inner']}>
                                                                <input
                                                                    className={styles['checkout-info__inp']}
                                                                    id="checkout-shop-apartment"
                                                                    name="shop_apartment"
                                                                    autoComplete="off"
                                                                    placeholder="№"
                                                                    type="text"
                                                                    onChange={handleChange}
                                                                    value={values.shop_apartment}
                                                                />
                                                            </div>

                                                            <If condition={errors.shop_apartment && touched.shop_apartment}>
                                                                <Then>
                                                                    <div className={styles['form-error__msg']}>
                                                                        <ErrorMessage name="shop_apartment" />
                                                                    </div>
                                                                </Then>
                                                            </If>
                                                        </div>
                                                    </div>
                                                </>
                                            }

                                            {
                                                values.delivery_type === '3' &&
                                                <>
                                                    <div className={styles['checkout-info__delivery-block']}>
                                                        <span className={styles['checkout-info__delivery-block__title']}>Укажите город:</span>

                                                        <Select
                                                            className={styles['checkout-info__delivery-block__select']}
                                                            options={npCities}
                                                            defaultValue={values.np_city}
                                                            onChange={(val) => {
                                                                setFieldValue('np_city', val);
                                                                setFieldValue('np_department', '');
                                                                setDepartament([]);

                                                                novaPoshtaRequest.address
                                                                    .getWarehouses({
                                                                        // @ts-ignore
                                                                        "CityRef": val?.Ref ?? ''
                                                                    })
                                                                    .then((res:any) => {
                                                                        const data:NPDepartament[] = [];

                                                                        res.data.map((item:NPDepartament) => {
                                                                            data.push({
                                                                                ...item,
                                                                                value: item.DescriptionRu,
                                                                                label: item.DescriptionRu
                                                                            })
                                                                        });

                                                                        setDepartament(data);
                                                                    });

                                                            }}
                                                            placeholder="Город"
                                                            name={'np_city'}
                                                        />
                                                    </div>

                                                    <div className={styles['checkout-info__delivery-block']}>
                                                        <span className={styles['checkout-info__delivery-block__title']}>Номер отделения Новая Почта:</span>

                                                        <Select
                                                            className={styles['checkout-info__delivery-block__select']}
                                                            options={departament}
                                                            onChange={(val) => {
                                                                setFieldValue('np_department', val);
                                                            }}
                                                            placeholder="№"
                                                            name={'np_department'}
                                                        />
                                                    </div>
                                                </>
                                            }

                                            {
                                                values.delivery_type === '4' &&
                                                <>
                                                    <div className={styles['checkout-info__delivery-block']}>
                                                        <span className={styles['checkout-info__delivery-block__title']}>Укажите город:</span>

                                                        <Select
                                                            className={styles['checkout-info__delivery-block__select']}
                                                            options={npCities}
                                                            onChange={(val) => {
                                                                setFieldValue('np_city', val);
                                                            }}
                                                            defaultValue={values.np_city}
                                                            placeholder="Город"
                                                            name={'np_city'}
                                                        />
                                                    </div>

                                                    <div className={styles['checkout-info__inps']}>
                                                        <div className={styles['checkout-info__inp-wrapper']}>
                                                            <label className={styles['checkout-info__label']} htmlFor="checkout-street">Улица</label>

                                                            <div className={styles['checkout-info__inp-inner']}>
                                                                <input
                                                                    className={styles['checkout-info__inp']}
                                                                    id="checkout-street"
                                                                    name="np_street"
                                                                    onChange={handleChange}
                                                                    autoComplete="off"
                                                                    placeholder="Улица"
                                                                    type="text"
                                                                    value={values.np_street}
                                                                />
                                                            </div>

                                                            <If condition={errors.np_street && touched.np_street}>
                                                                <Then>
                                                                    <div className={styles['form-error__msg']}>
                                                                        <ErrorMessage name="np_street" />
                                                                    </div>
                                                                </Then>
                                                            </If>
                                                        </div>

                                                        <div className={styles['checkout-info__inp-wrapper']}>
                                                            <label className={styles['checkout-info__label']} htmlFor="checkout-house">Дом</label>

                                                            <div className={styles['checkout-info__inp-inner']}>
                                                                <input
                                                                    className={styles['checkout-info__inp']}
                                                                    id="checkout-house"
                                                                    name="np_house"
                                                                    autoComplete="off"
                                                                    placeholder="№"
                                                                    type="text"
                                                                    onChange={handleChange}
                                                                    value={values.np_house}
                                                                />
                                                            </div>

                                                            <If condition={errors.np_house && touched.np_house}>
                                                                <Then>
                                                                    <div className={styles['form-error__msg']}>
                                                                        <ErrorMessage name="np_house" />
                                                                    </div>
                                                                </Then>
                                                            </If>
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    </div>

                                    <div className={styles['checkout-info__item']}>
                                        <div className={styles['checkout-info__header']}>
                                            <div className={styles['checkout-info__header-number']}>3</div>

                                            <div className={styles['checkout-info__header-title']}>Метод оплаты</div>
                                        </div>

                                        <div className={classNames(styles['checkout-info__pay'], styles['checkout-info__select'])}>
                                            <span className={styles['checkout-info__label']}>Выберите метод оплаты</span>

                                            <div className={styles['checkout-info__inner']}>
                                                <div className={styles['checkout-info__select-item']}>
                                                    <Field
                                                        type="radio"
                                                        id="checkout-pay-1"
                                                        name="payment_type"
                                                        className={styles['checkout-info__select-radio']}
                                                        value="1"
                                                    />

                                                    <label
                                                        className={styles['checkout-info__select-btn']}
                                                        htmlFor="checkout-pay-1"
                                                    >
                                                        <span className={classNames(styles['checkout-info__select-icon'], styles['checkout-info__select-icon--small'])}>
                                                            <svg>
                                                                <use href={`${sprite.src}#money`}/>
                                                            </svg>
                                                        </span>

                                                        <span className={styles['checkout-info__select-check']}/>

                                                        <span className={styles['checkout-info__select-text']}>Наличными</span>
                                                    </label>
                                                </div>

                                                <div className={styles['checkout-info__select-item']}>
                                                    <Field
                                                        type="radio"
                                                        id="checkout-pay-2"
                                                        name="payment_type"
                                                        className={styles['checkout-info__select-radio']}
                                                        value="2"
                                                    />

                                                    <label className={styles['checkout-info__select-btn']} htmlFor="checkout-pay-2">
                                                        <span
                                                            className={classNames(styles['checkout-info__select-icon'], styles['checkout-info__select-icon--big'])}>
                                                            <svg>
                                                                <use href={`${sprite.src}#paymethods`}/>
                                                            </svg>
                                                        </span>

                                                        <span className={styles['checkout-info__select-check']}/>

                                                        <span className={styles['checkout-info__select-text']}>Картой на сайте»</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles['checkout-info__textarea-wrapper']}>
                                            <label className={styles['checkout-info__label']} htmlFor="checkout-message">Добавить комментарий</label>

                                            <div className={styles['checkout-info__textarea-inner']}>
                                                <textarea
                                                    className={styles['checkout-info__textarea']}
                                                    id="checkout-message"
                                                    name="user_comment"
                                                    onChange={handleChange}
                                                    value={values.user_comment}
                                                    autoComplete="off"
                                                    placeholder="Напишите что считаете важным"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className={classNames(styles['checkout__content'], 'checkout-content')}>
                                    <div className={styles['checkout-content__inner']}>
                                        <CheckoutList
                                            classStr={'pc'}
                                        />

                                        <div className={styles['checkout-content__code']}>
                                            <label className={styles['checkout-content__code-label']} htmlFor="checkout-code">Промокод</label>

                                            <div className={styles['checkout-content__code-inp-wrapper']}>
                                                <input
                                                    className={styles['checkout-content__code-inp']}
                                                    id="checkout-code"
                                                    name="user_promo"
                                                    onChange={handleChange}
                                                    autoComplete="off"
                                                    placeholder="Есть промокод? Укажите его здесь"
                                                    type="text"
                                                    value={values.user_promo}
                                                />
                                            </div>
                                        </div>

                                        <div className={styles['checkout-content__total']}>
                                            <div className={styles['checkout-content__total-section']}>
                                                <div className={styles['checkout-content__total-item']}>
                                                    <div className={styles['checkout-content__total-title']}>Вместе:</div>

                                                    <div className={styles['checkout-content__total-value']}>{cartData.total_amount} {cartData.total_amount > 1 ? 'товара': 'товар'} на сумму</div>
                                                </div>

                                                <div className={styles['checkout-content__total-item']}>
                                                    <div className={styles['checkout-content__total-title']}>Цена доставки:</div>

                                                    <div className={styles['checkout-content__total-value']}>
                                                        {
                                                            values.delivery_type === '1' &&
                                                            <span>Бесплатно</span>
                                                        }

                                                        {
                                                            values.delivery_type === '2'&&
                                                            <span>Уточнить у менеджера</span>
                                                        }

                                                        {
                                                            values.delivery_type !== '1' && values.delivery_type !== '2' &&
                                                            <span>По тарифам Новой почты</span>
                                                        }
                                                    </div>
                                                </div>

                                                <div className={styles['checkout-content__total-item']}>
                                                    <div className={styles['checkout-content__total-title']}>Итого:</div>

                                                    <div className={styles['checkout-content__total-value']}>{cartData.total_price} грн</div>
                                                </div>
                                            </div>

                                            <div className={styles['checkout-content__total-privacy']}>
                                                <Field
                                                    className={styles['checkout-content__total-privacy-check']}
                                                    id="checkout-privacy"
                                                    type="checkbox"
                                                    name="user_agreed"
                                                />

                                                <label className={styles['checkout-content__total-privacy-btn']} htmlFor="checkout-privacy">
                                                    <span className={styles['checkout-content__total-privacy-icon']}>
                                                        <svg>
                                                            <use href={`${sprite.src}#check`} />
                                                        </svg>
                                                    </span>

                                                    <span className={styles['checkout-content__total-privacy-text']}>
                                                        Подтверждая заказ, я согласен с <a href="#" target="_blank" rel="noreferrer nofollow">пользовательским соглашением</a>
                                                    </span>
                                                </label>
                                            </div>

                                            <div className={styles['checkout-content__total-btn-wrapper']}>
                                                <button disabled={isSubmitting} type="submit" className={classNames(styles['checkout-content__total-btn'], 'btn')}>
                                                    <span className={classNames(styles['checkout-content__total-btn-text'], 'btn__text')}>Оформить заказ</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )
                    }
                </Formik>
            </div>

            <LiqpayPopup form={liqpayForm} />
        </section>
    );
}

export default CheckoutIntro;
