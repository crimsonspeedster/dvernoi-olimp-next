import React, {useEffect} from 'react'
//@ts-ignore
import {Fancybox} from '@fancyapps/ui'
import '@fancyapps/ui/dist/fancybox.css';
import styles from './Modal-block.module.scss';
import {isBrowser} from '@utils/isBrowser'
import {getScrollbarWidth} from '@utils/getScrollbarWidth';
import classNames from "classnames";

const CallbackModal = () => {
    useEffect(() => {
        Fancybox.bind("[data-fancybox='callback']", {
            showClass: 'fancybox-fadeIn',
            hideClass: 'fancybox-fadeOut',
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

    const test = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
    }

    return (
        <div className={classNames(styles['modal'], styles['modal-callback'])} id="callback-modal" style={{display: 'none'}}>
            <div className={styles['modal__title']}>Обратный звонок</div>

            <p className={styles['modal__desc']}>Заполните заявку и мы свяжемся с вами в ближайшее время</p>

            <form className={styles['modal__form']}>
                <div className={styles['modal__inp-wrapper']}>
                    <label className={styles['modal__label']} htmlFor="modal-callback-name">Имя</label>

                    <div className={styles['modal__inp-inner']}>
                        <input
                            className={styles['modal__inp']}
                            id="modal-callback-name"
                            type="text"
                            name="modal-callback-name"
                            autoComplete="off"
                            placeholder="Ваше имя"
                        />
                    </div>
                </div>
                <div className={styles['modal__inp-wrapper']}>
                    <label className={styles['modal__label']} htmlFor="modal-callback-phone">Телефон</label>

                    <div className={styles['modal__inp-inner']}>
                        <input
                            className={styles['modal__inp']}
                            id="modal-callback-phone"
                            type="tel"
                            name="modal-callback-phone"
                            autoComplete="off"
                            placeholder="+38 (000) 000 00 00"
                        />
                    </div>
                </div>

                <div className={styles['modal__btns']}>
                    <div className={styles['modal__btn-wrapper']}>
                        <button className={classNames(styles['modal__btn'], 'btn')} onClick={(e)=>(test(e))}>
                            <span className={classNames(styles['modal__btn-text'], 'btn__text')}>Отправить</span>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CallbackModal