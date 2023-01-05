import React, {useContext, useState} from 'react'
import styles from './Callback.module.scss';
import formBg from '@images/form-bg.png';
import classNames from "classnames";
import Image from "next/image";
import {SettingsContext} from "@pages/_app";
import {Formik, ErrorMessage, FormikValues} from 'formik';
import InputMask from "react-input-mask";
import * as Yup from 'yup';
import "yup-phone";
import axios from "axios";
import {If, Then} from "react-if";
import ToastThank from "@components/ToastThank/ToastThank";
import Toast from "@components/Toast/Toast";
import {useTranslation} from "next-i18next";

const Callback = () => {
    const settingsCtx = useContext(SettingsContext).settings.form_one_day;
    const {t} = useTranslation('common');

    const validateFormSchema = Yup.object().shape({
        user_phone: Yup.string()
            .phone('380', false, t('fieldRequired') ?? '')
    });

    const [toastStatus, setToastStatus] = useState<boolean>(false);

    return (
        <>
            <section className={styles['callback']}>
                <div className="container">
                    <div className={styles['callback__wrapper']}>
                        <Image src={settingsCtx.bg_image.url} alt={settingsCtx.bg_image.alt} width={settingsCtx.bg_image.width} height={settingsCtx.bg_image.height}/>

                        <div className={styles['callback__inner']}>
                            <div className={classNames(styles['callback__content'], styles['callback-content'])}>
                                <div className={classNames(styles['callback__title'], 'title', 'title--light')}>{settingsCtx.title}</div>
                            </div>

                            <Formik
                                initialValues={{
                                    user_phone: ''
                                }}
                                validationSchema={validateFormSchema}
                                onSubmit={(values, {setSubmitting}) => {
                                    setSubmitting(true);

                                    const formBodyData = new FormData();

                                    for (let [key, value] of Object.entries(values)) {
                                        formBodyData.append(key, value.trim());
                                    }

                                    axios.post(`${process.env.NEXT_PUBLIC_ENV_APP_FORM}/319/feedback`, formBodyData)
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
                                        <form className={classNames(styles['callback__form'], styles['callback-form'], 'form-319')} onSubmit={handleSubmit}>
                                            <div className={styles['callback__inp-wrapper']}>
                                                <label className={styles['callback__label']} htmlFor="callback-phone">{t('formCallbackLabelPhone')}</label>

                                                <div className={styles['callback__inp-inner']}>
                                                    <InputMask
                                                        mask="+38 (999) 999-99-99"
                                                        maskPlaceholder="+38 (___) ___-__-__"
                                                        placeholder="+38 (___) ___-__-__"
                                                        className={classNames(styles['callback__inp'], {error: errors.user_phone && touched.user_phone})}
                                                        type="tel"
                                                        name="user_phone"
                                                        onChange={handleChange}
                                                        value={values.user_phone}
                                                        id="callback-phone"
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

                                            <div className={styles['callback__btn-wrapper']}>
                                                <button type="submit" className={classNames(styles['callback__btn'], 'btn')} disabled={isSubmitting}>
                                                    <span className={classNames(styles['callback__btn-text'], 'btn__text')}>{settingsCtx.btn_title}</span>
                                                </button>
                                            </div>
                                        </form>
                                    )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </section>

            <Toast status={toastStatus} closeHandler={setToastStatus}>
                <ToastThank />
            </Toast>
        </>
    );
}

export default Callback;