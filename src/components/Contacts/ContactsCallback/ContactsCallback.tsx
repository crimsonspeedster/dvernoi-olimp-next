import React, {useState} from 'react'
import styles from './ContactsCallback.module.scss';
import classNames from "classnames";
import {Formik, ErrorMessage, FormikValues} from 'formik';
import InputMask from "react-input-mask";
import * as Yup from 'yup';
import "yup-phone";
import {If, Then} from "react-if";
import axios from "axios";
import Toast from "@components/Toast/Toast";
import ToastThank from "@components/ToastThank/ToastThank";
import loadSpinner from '@icons/load-spinner.gif';
import Image from "next/image";
import {useTranslation} from "next-i18next";

const ContactsCallback = () => {
    const {t} = useTranslation('common');

    const validateFormSchema = Yup.object().shape({
        user_name: Yup.string()
            .min(2, t('errorShort') ?? '')
            .max(50, t('errorLong') ?? '')
            .matches(/^[\p{Script=Cyrl}\s]*$/u, t('errorNotCorrectFormat') ?? '')
            .trim()
            .required(t('fieldRequired') ?? ''),
        user_phone: Yup.string()
            .phone('380', false, t('fieldRequired') ?? ''),
        user_time: Yup.string()
            .min(2, t('errorShort') ?? '')
            .trim()
            .matches(/^[\d|:\- ]*$/, t('errorNotCorrectFormat') ?? '')
            .max(50, t('errorLong') ?? '')
    });

    const [toastStatus, setToastStatus] = useState<boolean>(false);

    return (
        <>
            <div className={styles['contacts-callback']}>
                <div className="container">
                    <div className={styles['contacts-callback__title']}>{t('orderCallBack')}</div>

                    <Formik
                        initialValues={{
                            user_name: '',
                            user_phone: '',
                            user_time: ''
                        }}
                        validationSchema={validateFormSchema}
                        onSubmit={(values, {setSubmitting}) => {
                            setSubmitting(true);

                            const formBodyData = new FormData();

                            for (let [key, value] of Object.entries(values)) {
                                formBodyData.append(key, value.trim());
                            }

                            axios.post(`${process.env.NEXT_PUBLIC_ENV_APP_FORM}/420/feedback`, formBodyData)
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
                                 isSubmitting
                            }) => (
                                <form className={classNames(styles['contacts-callback__form'], 'form-420')} onSubmit={handleSubmit}>
                                    <div className={styles['contacts-callback__inner']}>
                                        <div className={styles['contacts-callback__inp-wrapper']}>
                                            <label className={styles['contacts-callback__label']} htmlFor="contacts-name">{t('modalCallbackPlaceholderName')}</label>

                                            <div className={styles['contacts-callback__inp-inner']}>
                                                <input
                                                    className={classNames(styles['contacts-callback__inp'], {error: errors.user_name && touched.user_name})}
                                                    type="text"
                                                    name="user_name"
                                                    onChange={handleChange}
                                                    value={values.user_name}
                                                    id="contacts-name"
                                                    placeholder={t('modalCallbackLabelName') ?? ''}
                                                    autoComplete="off"
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

                                        <div className={styles['contacts-callback__inp-wrapper']}>
                                            <label className={styles['contacts-callback__label']} htmlFor="contacts-phone">{t('formCallbackLabelPhone')}</label>

                                            <div className={styles['contacts-callback__inp-inner']}>
                                                <InputMask
                                                    mask="+38 (999) 999-99-99"
                                                    maskPlaceholder="+38 (___) ___-__-__"
                                                    placeholder="+38 (___) ___-__-__"
                                                    className={classNames(styles['contacts-callback__inp'], {error: errors.user_phone && touched.user_phone})}
                                                    type="tel"
                                                    name="user_phone"
                                                    onChange={handleChange}
                                                    value={values.user_phone}
                                                    id="contacts-phone"
                                                    autoComplete="off"
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

                                        <div className={styles['contacts-callback__inp-wrapper']}>
                                            <label className={styles['contacts-callback__label']} htmlFor="contacts-time">{t('phoneTime')}</label>

                                            <div className={styles['contacts-callback__inp-inner']}>
                                                <input
                                                    className={classNames(styles['contacts-callback__inp'], {error: errors.user_time && touched.user_time})}
                                                    type="text"
                                                    name="user_time"
                                                    id="contacts-time"
                                                    placeholder="10:00 - 10:30"
                                                    autoComplete="off"
                                                    onChange={handleChange}
                                                    value={values.user_time}
                                                />
                                            </div>

                                            <If condition={errors.user_time && touched.user_time}>
                                                <Then>
                                                    <div className={styles['form-error__msg']}>
                                                        <ErrorMessage name="user_time" />
                                                    </div>
                                                </Then>
                                            </If>
                                        </div>
                                    </div>

                                    <div className={styles['contacts-callback__bot']}>
                                        <p className={styles['contacts-callback__text']} dangerouslySetInnerHTML={{__html: t('personalData')}} />

                                        <button
                                            className={classNames(styles['contacts-callback__btn'], 'btn')}
                                            disabled={isSubmitting}
                                            type="submit"
                                        >
                                            <If condition={isSubmitting}>
                                                <Then>
                                                    <Image src={loadSpinner.src} alt={t('loading')} width={30} height={30} />
                                                </Then>
                                            </If>

                                            <span className={classNames(styles['contacts-callback__btn-text'], 'btn__text')}>{t('sendMessage')}</span>
                                        </button>
                                    </div>
                                </form>
                            )
                        }
                    </Formik>
                </div>
            </div>

            <Toast status={toastStatus} closeHandler={setToastStatus}>
                <ToastThank />
            </Toast>
        </>
    )
}

export default ContactsCallback