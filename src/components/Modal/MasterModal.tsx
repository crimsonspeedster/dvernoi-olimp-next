import React, {useEffect, useState} from 'react'
//@ts-ignore
import {Fancybox} from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox.css';
import styles from './Modal-block.module.scss';
import {isBrowser} from '@utils/isBrowser'
import {getScrollbarWidth} from '@utils/getScrollbarWidth';
import classNames from "classnames";
import {useTranslation} from "next-i18next";
import axios from "axios";
import InputMask from "react-input-mask";
import {ErrorMessage, Formik} from "formik";
import * as Yup from "yup";
import "yup-phone";
import {If, Then} from "react-if";
import ToastThank from "@components/ToastThank/ToastThank";
import Toast from "@components/Toast/Toast";

const MasterModal = () => {
    const {t} = useTranslation('common');

    const [toastStatus, setToastStatus] = useState<boolean>(false);

    const validateFormSchema = Yup.object().shape({
        user_phone: Yup.string()
            .phone('380', false, t('fieldRequired') ?? '')
    });

    useEffect(() => {
        Fancybox.bind("[data-fancybox='masterfancy']", {
            showClass: 'fancybox-fadeIn',
            hideClass: 'fancybox-fadeOut',
            infinite: false,
            groupAll: false,
            groupAttr: false,
            dragToClose: false,
            parentEl: isBrowser() && document.querySelector('#__next'),
            on: {
                init: () => {
                    //@ts-ignore
                    if (isBrowser()) document.querySelector('.header').style.paddingRight = getScrollbarWidth();
                },
                destroy: () => {
                    //@ts-ignore
                    if (isBrowser()) document.querySelector('.header').style.paddingRight = '0';
                }
            }
        })

        return () => {
            Fancybox.destroy()
        }
    }, []);

    return (
        <>
            <div className={classNames(styles['modal'], styles['modal-callback'])} id="master-modal" style={{display: 'none'}}>
                <div className={styles['modal__title']}>{t('masterTitle')}</div>

                <Formik
                    initialValues={{
                        user_phone: '',
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
                                Fancybox.close();

                                setToastStatus(true);
                                setSubmitting(false);
                            })
                            .catch(function (error) {
                                console.log(error);
                                Fancybox.close();

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
                            setFieldTouched,
                            isSubmitting
                         }) => (
                            <form className={styles['modal__form']} onSubmit={handleSubmit}>
                                <div className={styles['modal__inp-wrapper']}>
                                    <label className={styles['modal__label']} htmlFor="modal-callback-phone">{t('modalCallbackLabelPhone')}</label>

                                    <div className={styles['modal__inp-inner']}>
                                        <InputMask
                                            mask="+38 (999) 999-99-99"
                                            maskPlaceholder="+38 (___) ___-__-__"
                                            placeholder="+38 (___) ___-__-__"
                                            className={classNames(styles['modal__inp'], {error: errors.user_phone && touched.user_phone})}
                                            type="tel"
                                            name="user_phone"
                                            onChange={(e)=>{
                                                setFieldTouched('user_phone');
                                                handleChange(e);
                                            }}
                                            value={values.user_phone}
                                            id="modal-callback-phone"
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

                                <div className={styles['modal__btns']}>
                                    <div className={styles['modal__btn-wrapper']}>
                                        <button disabled={isSubmitting} type="submit" className={classNames(styles['modal__btn'], 'btn', isSubmitting ? styles['updating'] : '')}>
                                            <span className={classNames(styles['modal__btn-text'], 'btn__text')}>{t('masterBtnTitle')}</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                </Formik>
            </div>

            <Toast status={toastStatus} closeHandler={setToastStatus}>
                <ToastThank />
            </Toast>
        </>
    )
}

export default MasterModal;