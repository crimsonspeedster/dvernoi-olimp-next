import React, {useState, useEffect, useContext} from 'react';
import styles from './Intro.module.scss';
import classNames from "classnames";
import axios from "axios";
import {If, Then} from "react-if";
import {ErrorMessage, Field, Formik} from "formik";
import InputMask from "react-input-mask";
import Image from "next/image";
import * as Yup from "yup";
import CheckoutList from "@components/Checkout/CheckoutList";
import sprite from "@icons/sprite.svg";
import {useSelector} from "react-redux";
import {selectAllCartData} from "@store/cart";
import {SettingsContext} from "@pages/_app";
import {CitiesProps, ShopProps} from "@components/ContactsInfo/ContactsInfo";
import Select, {SingleValue} from "react-select";


interface CheckoutIntroProps {
    title: string,
}

interface GroupedOption {
    label: string;
    options: GroupedItemOption[];
}

interface GroupedItemOption {
    label: string,
    value: string,
    dni_raboty: string,
    city: string
}

const CheckoutIntro: React.FC<CheckoutIntroProps> = (props) => {
    const {
        title,
    } = props;

    const cartData = useSelector(selectAllCartData);
    const shopsArray:CitiesProps[] = useContext(SettingsContext).settings?.nashi_magaziny?.povtoritel ?? [];

    const shopGroupedElements:GroupedOption[] = shopsArray.map(item => {
        return {
            label: item.gorod,
            options: item.magaziny.map(subitem => {
                return {
                    label: subitem.adres,
                    value: `${item.gorod}_${subitem.adres}`,
                    dni_raboty: subitem.dni_raboty,
                    city: item.gorod
                }
            })
        }
    });

    const [choosedShopDefault, setChoosedShopDefault] = useState<GroupedItemOption|null|SingleValue<GroupedItemOption>>(shopGroupedElements[0].options[0]);

    const validateFormSchema = Yup.object().shape({

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
                        delivery_option: choosedShopDefault,
                        np_city: '',
                        np_department: '',
                        np_street: '',
                        np_house: '',
                        shop_city: '',
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

                        setSubmitting(false);
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

                                                    <Select<GroupedItemOption, false, GroupedOption>
                                                        className={styles['checkout-info__delivery-block__select']}
                                                        options={shopGroupedElements}
                                                        onChange={(val) => {
                                                            setFieldValue('delivery_option', val);
                                                            setChoosedShopDefault(val);
                                                        }}
                                                        defaultValue={values.delivery_option}
                                                        name={'delivery_option'}
                                                    />

                                                    <p className={styles['checkout-info__delivery-block__info']}>График работы магазина: {choosedShopDefault?.dni_raboty?.replace(/<\/?[^>]+(>|$)/g, "")}</p>
                                                </div>
                                            }

                                            {
                                                values.delivery_type === '2' &&
                                                <>
                                                    <div className={styles['checkout-info__delivery-block']}>
                                                        <span className={styles['checkout-info__delivery-block__title']}>Укажите город:</span>

                                                        <Select<GroupedItemOption, false, GroupedOption>
                                                            className={styles['checkout-info__delivery-block__select']}
                                                            options={shopGroupedElements}
                                                            onChange={(val) => {
                                                                setFieldValue('delivery_option', val);
                                                                setChoosedShopDefault(val);
                                                            }}
                                                            placeholder="Город"
                                                            name={'delivery_option'}
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
                                                                    name="user_surname"
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

                                                        {/*<div className={styles['checkout-info__inp-wrapper']}>*/}
                                                        {/*    <label className={styles['checkout-info__label']} htmlFor="checkout-floor">Этаж</label>*/}

                                                        {/*    <div className={styles['checkout-info__inp-inner']}>*/}
                                                        {/*        <input*/}
                                                        {/*            className={styles['checkout-info__inp']}*/}
                                                        {/*            id="checkout-floor"*/}
                                                        {/*            name="np_floor"*/}
                                                        {/*            autoComplete="off"*/}
                                                        {/*            placeholder="1"*/}
                                                        {/*            type="text"*/}
                                                        {/*            onChange={handleChange}*/}
                                                        {/*            value={values.np_floor}*/}
                                                        {/*        />*/}
                                                        {/*    </div>*/}

                                                        {/*    <If condition={errors.np_floor && touched.np_floor}>*/}
                                                        {/*        <Then>*/}
                                                        {/*            <div className={styles['form-error__msg']}>*/}
                                                        {/*                <ErrorMessage name="np_floor" />*/}
                                                        {/*            </div>*/}
                                                        {/*        </Then>*/}
                                                        {/*    </If>*/}
                                                        {/*</div>*/}

                                                        {/*<div className={styles['checkout-info__inp-wrapper']}>*/}
                                                        {/*    <label className={styles['checkout-info__label']} htmlFor="checkout-house">Квартира</label>*/}

                                                        {/*    <div className={styles['checkout-info__inp-inner']}>*/}
                                                        {/*        <input*/}
                                                        {/*            className={styles['checkout-info__inp']}*/}
                                                        {/*            id="checkout-house"*/}
                                                        {/*            name="user_surname"*/}
                                                        {/*            autoComplete="off"*/}
                                                        {/*            placeholder="№"*/}
                                                        {/*            type="text"*/}
                                                        {/*            onChange={handleChange}*/}
                                                        {/*            value={values.np_house}*/}
                                                        {/*        />*/}
                                                        {/*    </div>*/}

                                                        {/*    <If condition={errors.np_house && touched.np_house}>*/}
                                                        {/*        <Then>*/}
                                                        {/*            <div className={styles['form-error__msg']}>*/}
                                                        {/*                <ErrorMessage name="np_house" />*/}
                                                        {/*            </div>*/}
                                                        {/*        </Then>*/}
                                                        {/*    </If>*/}
                                                        {/*</div>*/}
                                                    </div>
                                                </>
                                            }

                                            {
                                                values.delivery_type === '3' &&
                                                <>
                                                    <div className={styles['checkout-info__delivery-block']}>
                                                        <span className={styles['checkout-info__delivery-block__title']}>Укажите город:</span>

                                                        <Select<GroupedItemOption, false, GroupedOption>
                                                            className={styles['checkout-info__delivery-block__select']}
                                                            options={shopGroupedElements}
                                                            onChange={(val) => {
                                                                setFieldValue('delivery_option', val);
                                                                setChoosedShopDefault(val);
                                                            }}
                                                            placeholder="Город"
                                                            name={'delivery_option'}
                                                        />
                                                    </div>

                                                    <div className={styles['checkout-info__delivery-block']}>
                                                        <span className={styles['checkout-info__delivery-block__title']}>Номер отделения Новая Почта:</span>

                                                        <Select<GroupedItemOption, false, GroupedOption>
                                                            className={styles['checkout-info__delivery-block__select']}
                                                            options={shopGroupedElements}
                                                            onChange={(val) => {
                                                                setFieldValue('delivery_option', val);
                                                                setChoosedShopDefault(val);
                                                            }}
                                                            placeholder="Отделение"
                                                            name={'delivery_option'}
                                                        />
                                                    </div>
                                                </>
                                            }

                                            {
                                                values.delivery_type === '4' &&
                                                <>
                                                    <div className={styles['checkout-info__delivery-block']}>
                                                        <span className={styles['checkout-info__delivery-block__title']}>Укажите город:</span>

                                                        <Select<GroupedItemOption, false, GroupedOption>
                                                            className={styles['checkout-info__delivery-block__select']}
                                                            options={shopGroupedElements}
                                                            onChange={(val) => {
                                                                setFieldValue('delivery_option', val);
                                                                setChoosedShopDefault(val);
                                                            }}
                                                            placeholder="Город"
                                                            name={'delivery_option'}
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
                                                                    name="user_surname"
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

                                                        {/*<div className={styles['checkout-info__inp-wrapper']}>*/}
                                                        {/*    <label className={styles['checkout-info__label']} htmlFor="checkout-floor">Этаж</label>*/}

                                                        {/*    <div className={styles['checkout-info__inp-inner']}>*/}
                                                        {/*        <input*/}
                                                        {/*            className={styles['checkout-info__inp']}*/}
                                                        {/*            id="checkout-floor"*/}
                                                        {/*            name="np_floor"*/}
                                                        {/*            autoComplete="off"*/}
                                                        {/*            placeholder="1"*/}
                                                        {/*            type="text"*/}
                                                        {/*            onChange={handleChange}*/}
                                                        {/*            value={values.np_floor}*/}
                                                        {/*        />*/}
                                                        {/*    </div>*/}

                                                        {/*    <If condition={errors.np_floor && touched.np_floor}>*/}
                                                        {/*        <Then>*/}
                                                        {/*            <div className={styles['form-error__msg']}>*/}
                                                        {/*                <ErrorMessage name="np_floor" />*/}
                                                        {/*            </div>*/}
                                                        {/*        </Then>*/}
                                                        {/*    </If>*/}
                                                        {/*</div>*/}

                                                        {/*<div className={styles['checkout-info__inp-wrapper']}>*/}
                                                        {/*    <label className={styles['checkout-info__label']} htmlFor="checkout-house">Квартира</label>*/}

                                                        {/*    <div className={styles['checkout-info__inp-inner']}>*/}
                                                        {/*        <input*/}
                                                        {/*            className={styles['checkout-info__inp']}*/}
                                                        {/*            id="checkout-house"*/}
                                                        {/*            name="user_surname"*/}
                                                        {/*            autoComplete="off"*/}
                                                        {/*            placeholder="№"*/}
                                                        {/*            type="text"*/}
                                                        {/*            onChange={handleChange}*/}
                                                        {/*            value={values.np_house}*/}
                                                        {/*        />*/}
                                                        {/*    </div>*/}

                                                        {/*    <If condition={errors.np_house && touched.np_house}>*/}
                                                        {/*        <Then>*/}
                                                        {/*            <div className={styles['form-error__msg']}>*/}
                                                        {/*                <ErrorMessage name="np_house" />*/}
                                                        {/*            </div>*/}
                                                        {/*        </Then>*/}
                                                        {/*    </If>*/}
                                                        {/*</div>*/}
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
        </section>
    );
}

export default CheckoutIntro;
