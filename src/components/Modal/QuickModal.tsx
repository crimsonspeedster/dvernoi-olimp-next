import React, {useEffect} from 'react'
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


const QuickModal = () => {
    useEffect(() => {
        Fancybox.bind("[data-fancybox='quick']", {
            showClass: 'fancybox-fadeIn',
            hideClass: 'fancybox-fadeOut',
            dragToClose: false,
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

    return (
        <div className={classNames(styles['modal'], styles['modal-quick'])} id="quick-modal" style={{display: 'none'}}>
            <div className={styles['modal__title']}>{t('fastOrderTitle')}</div>

            <div className={classNames(styles['modal__choice'], styles['modal-choice'])}>
                <div className={styles['modal-choice__title']}>{t('fastOrderSelected')}:</div>

                <div className={styles['modal-choice__info']}>
                    <div className={styles['modal-choice__preview']}>
                        <div className={styles['modal-choice__preview-inner']}>
                            <Image src={productImg.src} width={48} height={55} alt="" />
                        </div>
                    </div>

                    <div className={styles['modal-choice__name']}>Product 1</div>
                </div>

                <div className={styles['modal-choice__controls']}>
                    <div className={styles['modal-choice__subtitle']}>{t('selectedPrice')}:</div>

                    <div className={styles['modal-choice__inner']}>
                        <div className={styles['modal-choice__counter']}>
                            <button className={classNames(styles['modal-choice__btn'], styles['modal-choice__btn--minus'])} type="button" />

                            <input className={styles['modal-choice__inp']} type="text" autoComplete="off" value={1} />

                            <button className={classNames(styles['modal-choice__btn'], styles['modal-choice__btn--plus'])} type="button" />
                        </div>

                        <div className={styles['modal-choice__price']}>4 303 грн / шт.</div>
                    </div>
                </div>
            </div>

            <form className={styles['modal__form']}>
                <div className={styles['modal__inp-wrapper']}>
                    <label className={styles['modal__label']} htmlFor="modal-quick-name">{t('modalCallbackLabelName')}</label>

                    <div className={styles['modal__inp-inner']}>
                        <input
                            className={styles['modal__inp']}
                            id="modal-quick-name"
                            type="text"
                            name="modal-callback-name"
                            autoComplete="off"
                            placeholder={t('modalCallbackPlaceholderName') ?? ''}
                        />
                    </div>
                </div>

                <div className={styles['modal__inp-wrapper']}>
                    <label className={styles['modal__label']} htmlFor="modal-quick-phone">{t('modalCallbackLabelPhone')}</label>

                    <div className={styles['modal__inp-inner']}>
                        <input
                            className={styles['modal__inp']}
                            id="modal-quick-phone"
                            type="tel"
                            name="modal-callback-phone"
                            autoComplete="off"
                            placeholder="+38 (000) 000 00 00"
                        />
                    </div>
                </div>

                <div className={styles['modal__btns']}>
                    <div className={styles['modal__btn-wrapper']}>
                        <button className={classNames(styles['modal__btn'], 'btn')}>
                            <span className={classNames(styles['modal__btn-icon'], 'btn__icon')}>
                                <svg><use href={`${sprite.src}#cart`}/></svg>
                            </span>

                            <span className={classNames(styles['modal__btn-text'], 'btn__text')}>{t('buyTitle')}</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default QuickModal