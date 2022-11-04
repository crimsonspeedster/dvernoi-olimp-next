import React from 'react';
// import { Tabs, Nav, Content } from 'react-tiny-tabs'
// import 'react-tiny-tabs/dist/index.css';
import styles from './Intro.module.scss';
import pay1 from '@images/pay-1.jpg';
import pay2 from '@images/pay-2.jpg';
import pay3 from '@images/pay-3.jpg';
import classNames from "classnames";


const CreditIntro = () => {
    return (
        <section className={classNames(styles['credit'], 'intro')}>
            <div className="container">
                <h1 className={classNames(styles['credit__title'], 'title', 'title--dark')}>Кредит без %</h1>

                <div className={classNames(styles['credit__tab'], styles['credit-tab'])}>
                    <div className={styles['credit-tab__nav']}>
                        <div className={styles['credit-tab__nav-item']}>Все варианты</div>

                        <div className={styles['credit-tab__nav-item']}>ПриватБанк</div>

                        <div className={styles['credit-tab__nav-item']}>Альфа-Банк</div>

                        <div className={styles['credit-tab__nav-item']}>Мгновенная рассрочка</div>
                    </div>

                    <div className={styles['credit-tab__body']}>
                        <div className={styles['credit-tab__body-item']}>
                            <div className={styles['credit-tab__body-pay']}>
                                <div className={styles['credit-tab__body-pay-preview']}>
                                    <div className={styles['credit-tab__body-pay-preview-inner']}>
                                        <img src={pay1.src} alt="" width={275} height={135}/>
                                    </div>
                                </div>

                                <div className={styles['credit-tab__body-pay-content']}>
                                    <div className={styles['credit-tab__body-pay-title']}>ОПЛАТА ЧАСТЯМИ</div>

                                    <article className={styles['credit-tab__body-pay-article']}>
                                        <p>
                                            Купить двери в кредит без процентов — стало очень выгодно и просто.
                                        </p>
                                        <p>
                                            Cделать это можно в любом из наших магазинов. Если клиент с другого города,
                                            тогда есть возможность оформить в Приват банке своего города Мгновенную
                                            рассрочку, оплата частями не доступна.
                                        </p>
                                        <strong>
                                            Срок кредитования без % — от 1 до 3 месяцев.
                                        </strong>
                                        <p>
                                            Услуга "Оплата частями" доступна владельцам:
                                        </p>
                                        <p>
                                            карты «Универсальная»; <br/>
                                            карты «Универсальная Gold»; <br/>
                                            элитных карт для VIP-клиентов (Platinum, Infinite, World Signia / Elite)
                                            ПриватБанка.
                                        </p>
                                        <h3>
                                            Что для этого нужно?
                                        </h3>
                                        <p>
                                            Узнайте прямо сейчас доступную сумму кредитования - отправьте SMS на номер
                                            10060 с текстом chast. На карточке должна быть доступна сумма на первый
                                            платеж, который снимается сразу при оформлении.
                                        </p>
                                        <p>
                                            Оформление оплаты частями онлайн.
                                        </p>
                                        <ol>
                                            <li>Запросить у менеджера счет фактуру на оплату.</li>
                                            <li>Получить ссылку для оплаты (действует сутки).</li>
                                            <li>Не открывать ссылку до фактического оформления/оплаты - так как если
                                                клиент перешел по ней и ничего не сделал на протяжении 20 минут, сессия
                                                токена деактивируется банком автоматически. И нужно снова запрашивать
                                                новую ссылку.
                                            </li>
                                        </ol>
                                    </article>
                                </div>
                            </div>

                            <div className={styles['credit-tab__body-pay']}>
                                <div className={styles['credit-tab__body-pay-preview']}>
                                    <div className={styles['credit-tab__body-pay-preview-inner']}>
                                        <img src={pay2.src} alt="" width={275} height={135}/>
                                    </div>
                                </div>

                                <div className={styles['credit-tab__body-pay-content']}>
                                    <div className={styles['credit-tab__body-pay-title']}>КРЕДИТ ОТ АЛЬФА-БАНКА</div>

                                    <article className={styles['credit-tab__body-pay-article']}>
                                        <p>
                                            Условия оформления кредита Альфа-банк:
                                        </p>
                                        <p>
                                            сумма кредита — от 1000 до 50 000 грн; <br/>
                                            срок кредитования — до 20 месяцев; <br/>
                                            первоначальный взнос — 0%;
                                        </p>
                                        <p>
                                            комиссия 0% на первые 4 месяца, с пятого месяца до двадцатого месяца —
                                            7-20%; <br/>
                                            ежемесячная комиссия банка за SMS-информирование — 50 грн.
                                        </p>
                                        <p>
                                            Предусматривается ежемесячное информирование о дате платежа, о
                                            поступлении/не поступлении денежных средств на счет клиента.
                                        </p>
                                        <p>
                                            Предлагается страхование (по желанию клиента).
                                        </p>
                                        <p>
                                            Необходимые документы: паспорт и ИНН. <br/>
                                            Доставка кредитного договора клиенту осуществляется по всей территории
                                            Украины.
                                        </p>
                                        <p>
                                            Оцените свои шансы на получение кредита:
                                        </p>
                                        <ul>
                                            <li>Вы - гражданин Украины.</li>
                                            <li>Ваш возраст от 21 до 70 лет.</li>
                                            <li>У Вас постоянное место работы, стаж на котором составляет не менее 3-х
                                                месяцев (для неработающих пенсионеров - 0 мес., для СПД/ФЛП - 12 мес.)
                                            </li>
                                            <li>У Вас нет просроченной задолженности по кредитам.</li>
                                            <li>Вы оформляете кредит по месту фактического проживания или юридического
                                                адреса места работы.
                                            </li>
                                            <li>У Вас при себе оригиналы паспорта и идентификационного кода.</li>
                                        </ul>
                                        <p>
                                            Если все эти позиции соответствуют, смело обращайтесь к нам. Ваши шансы
                                            получить кредит в Альфа-банке очень высоки!
                                        </p>
                                        <p>
                                            Хотите оформить кредит через Альфа-банк? - <a href="#" target="_blank"
                                                                                          rel="noreferrer">Заполнить
                                            заявку</a>
                                        </p>
                                    </article>
                                </div>
                            </div>

                            <div className={styles['credit-tab__body-pay']}>
                                <div className={styles['credit-tab__body-pay-preview']}>
                                    <div className={styles['credit-tab__body-pay-preview-inner']}>
                                        <img src={pay3.src} alt="" width={275} height={135}/>
                                    </div>
                                </div>

                                <div className={styles['credit-tab__body-pay-content']}>
                                    <div className={styles['credit-tab__body-pay-title']}>МГНОВЕННАЯ РАССРОЧКА</div>

                                    <article className={styles['credit-tab__body-pay-article']}>
                                        <p>
                                            Для оформления кредита на сроком от 3 до 24 мес.
                                        </p>
                                        <p>
                                            Комиссия для клиента - 2,9% ежемесячно от суммы кредита.
                                        </p>
                                        <p>
                                            P.S.!!!
                                        </p>
                                        <ul>
                                            <li>Если клиент рассчитывается за кредит за счет личных средств с кредитной
                                                карты и своевременно вносит на карту сумму ежемесячного платежа, услуга
                                                для него бесплатна.
                                            </li>
                                            <li>Если списание ежемесячного платежа происходит за счет кредитных средств,
                                                комиссия за регулярный платеж составит 4% от его суммы.
                                            </li>
                                        </ul>
                                    </article>
                                </div>
                            </div>
                        </div>

                        <div className={styles['credit-tab__body-item']}>
                            <div className={styles['credit-tab__body-pay']}>
                                <div className={styles['credit-tab__body-pay-preview']}>
                                    <div className={styles['credit-tab__body-pay-preview-inner']}>
                                        <img src={pay1.src} alt="" width={275} height={135}/>
                                    </div>
                                </div>

                                <div className={styles['credit-tab__body-pay-content']}>
                                    <div className={styles['credit-tab__body-pay-title']}>ОПЛАТА ЧАСТЯМИ</div>

                                    <article className={styles['credit-tab__body-pay-article']}>
                                        <p>
                                            Купить двери в кредит без процентов — стало очень выгодно и просто.
                                        </p>
                                        <p>
                                            Cделать это можно в любом из наших магазинов. Если клиент с другого города,
                                            тогда есть возможность оформить в Приват банке своего города Мгновенную
                                            рассрочку, оплата частями не доступна.
                                        </p>
                                        <strong>
                                            Срок кредитования без % — от 1 до 3 месяцев.
                                        </strong>
                                        <p>
                                            Услуга "Оплата частями" доступна владельцам:
                                        </p>
                                        <p>
                                            карты «Универсальная»; <br/>
                                            карты «Универсальная Gold»; <br/>
                                            элитных карт для VIP-клиентов (Platinum, Infinite, World Signia / Elite)
                                            ПриватБанка.
                                        </p>
                                        <h3>
                                            Что для этого нужно?
                                        </h3>
                                        <p>
                                            Узнайте прямо сейчас доступную сумму кредитования - отправьте SMS на номер
                                            10060 с текстом chast. На карточке должна быть доступна сумма на первый
                                            платеж, который снимается сразу при оформлении.
                                        </p>
                                        <p>
                                            Оформление оплаты частями онлайн.
                                        </p>
                                        <ol>
                                            <li>Запросить у менеджера счет фактуру на оплату.</li>
                                            <li>Получить ссылку для оплаты (действует сутки).</li>
                                            <li>Не открывать ссылку до фактического оформления/оплаты - так как если
                                                клиент перешел по ней и ничего не сделал на протяжении 20 минут, сессия
                                                токена деактивируется банком автоматически. И нужно снова запрашивать
                                                новую ссылку.
                                            </li>
                                        </ol>
                                    </article>
                                </div>
                            </div>
                        </div>

                        <div className={styles['credit-tab__body-item']}>
                            <div className={styles['credit-tab__body-pay']}>
                                <div className={styles['credit-tab__body-pay-preview']}>
                                    <div className={styles['credit-tab__body-pay-preview-inner']}>
                                        <img src={pay2.src} alt="" width={275} height={135}/>
                                    </div>
                                </div>

                                <div className={styles['credit-tab__body-pay-content']}>
                                    <div className={styles['credit-tab__body-pay-title']}>КРЕДИТ ОТ АЛЬФА-БАНКА</div>
                                    <article className={styles['credit-tab__body-pay-article']}>
                                        <p>
                                            Условия оформления кредита Альфа-банк:
                                        </p>
                                        <p>
                                            сумма кредита — от 1000 до 50 000 грн; <br/>
                                            срок кредитования — до 20 месяцев; <br/>
                                            первоначальный взнос — 0%;
                                        </p>
                                        <p>
                                            комиссия 0% на первые 4 месяца, с пятого месяца до двадцатого месяца —
                                            7-20%; <br/>
                                            ежемесячная комиссия банка за SMS-информирование — 50 грн.
                                        </p>
                                        <p>
                                            Предусматривается ежемесячное информирование о дате платежа, о
                                            поступлении/не поступлении денежных средств на счет клиента.
                                        </p>
                                        <p>
                                            Предлагается страхование (по желанию клиента).
                                        </p>
                                        <p>
                                            Необходимые документы: паспорт и ИНН. <br/>
                                            Доставка кредитного договора клиенту осуществляется по всей территории
                                            Украины.
                                        </p>
                                        <p>
                                            Оцените свои шансы на получение кредита:
                                        </p>
                                        <ul>
                                            <li>Вы - гражданин Украины.</li>
                                            <li>Ваш возраст от 21 до 70 лет.</li>
                                            <li>У Вас постоянное место работы, стаж на котором составляет не менее 3-х
                                                месяцев (для неработающих пенсионеров - 0 мес., для СПД/ФЛП - 12 мес.)
                                            </li>
                                            <li>У Вас нет просроченной задолженности по кредитам.</li>
                                            <li>Вы оформляете кредит по месту фактического проживания или юридического
                                                адреса места работы.
                                            </li>
                                            <li>У Вас при себе оригиналы паспорта и идентификационного кода.</li>
                                        </ul>
                                        <p>
                                            Если все эти позиции соответствуют, смело обращайтесь к нам. Ваши шансы
                                            получить кредит в Альфа-банке очень высоки!
                                        </p>
                                        <p>
                                            Хотите оформить кредит через Альфа-банк? - <a href="#" target="_blank"
                                                                                          rel="noreferrer">Заполнить
                                            заявку</a>
                                        </p>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CreditIntro