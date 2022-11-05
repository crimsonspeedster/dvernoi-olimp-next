import React, {useContext} from 'react'
import Link from "next/link";
import styles from './Intro.module.scss';
import sprite from '@icons/sprite.svg';
import classNames from "classnames";
import Banner from "@components/Banner/Banner";
import {SettingsContext} from "@pages/_app";
import {Else, If, Then} from "react-if";
import {AcfDataProps} from "@root/templates/DeliveryTemplate";
import Image from "next/image";
import {menuItemProp} from "@components/Header/interfaces";

interface DeliveryIntroProps {
    title: string,
    acf: AcfDataProps
}


const DeliveryIntro:React.FC<DeliveryIntroProps> = (props) => {
    const {
        title,
        acf
    } = props;

    const settingsCtx = useContext(SettingsContext).menus;

    return (
        <section className={classNames(styles['delivery'], 'intro')}>
            <div className="container">
                <h1 className={classNames(styles['delivery__title'], 'title', 'title--dark')}>{title}</h1>

                <div className={styles['delivery__inner']}>
                    <div className={classNames(styles['delivery__content'], styles['delivery-content'])}>
                        <div className={styles['delivery__subtitle']} dangerouslySetInnerHTML={{__html: acf.sale.logistik_text}} />

                        <div className={classNames(styles['delivery__block'], styles['delivery-block'])}>
                            <div className={styles['delivery-block__header']}>
                                <div className={styles['delivery-block__header-icon']}>
                                    <Image src={acf.sale.icon.url} alt={acf.sale.icon.alt} width={acf.sale.icon.width} height={acf.sale.icon.height} />
                                </div>

                                <div className={styles['delivery-block__header-title']}>{acf.sale.title}</div>
                            </div>

                            <article className={styles['delivery-block__article']}>
                                <ul>
                                    {
                                        acf.sale.repeater_description.map((item, i) => (
                                            <li key={i}>
                                                <strong>{item.title}</strong>

                                                <div dangerouslySetInnerHTML={{__html: item.description}} />
                                            </li>
                                        ))
                                    }
                                </ul>

                                <strong>{acf.sale.min_price_text}</strong>

                                {
                                    acf.sale.description_after && <div dangerouslySetInnerHTML={{__html: acf.sale.description_after}} />
                                }
                            </article>
                        </div>

                        <div className={classNames(styles['delivery__block'], styles['delivery-block'])}>
                            <div className={styles['delivery-block__header']}>
                                <div className={styles['delivery-block__header-icon']}>
                                    <Image src={acf.delivery.icon.url} alt={acf.delivery.icon.alt} width={acf.delivery.icon.width} height={acf.delivery.icon.height} />
                                </div>

                                <div className={styles['delivery-block__header-title']}>{acf.delivery.title}</div>
                            </div>

                            <article className={styles['delivery-block__article']}>
                                {
                                    acf.delivery.description_before &&
                                    <div dangerouslySetInnerHTML={{__html: acf.delivery.description_before}} />
                                }

                                <div className={styles['delivery-subblock']}>
                                    {
                                        acf.delivery.repeater_description.map((item, i) => (
                                            <div key={i} className={styles['delivery-subblock__item']}>
                                                <strong>{item.title}</strong>

                                                <div dangerouslySetInnerHTML={{__html: item.description}} />
                                            </div>
                                        ))
                                    }

                                    <If condition={acf.delivery.description_after}>
                                        <Then>
                                            <span className={styles['quote']}>{acf.delivery.description_after}</span>
                                        </Then>
                                    </If>
                                </div>
                            </article>
                        </div>

                        <div className={classNames(styles['delivery__block'], styles['delivery-block'])}>
                            <div className={styles['delivery-block__header']}>
                                <div className={styles['delivery-block__header-icon']}>
                                    <Image src={acf.delivery_price.icon.url} alt={acf.delivery_price.icon.alt} width={acf.delivery_price.icon.width} height={acf.delivery_price.icon.height} />
                                </div>

                                <div className={styles['delivery-block__header-title']}>{acf.delivery_price.title}</div>
                            </div>

                            <article className={styles['delivery-block__article']}>
                                <h5>{acf.delivery_price.price_kiev}</h5>

                                <h5>{acf.delivery_price.price_kiev_region}</h5>

                                <If condition={acf.delivery_price.cities_repeater.length}>
                                    <Then>
                                        <div className={styles['delivery-block__article-inner']}>
                                            {
                                                acf.delivery_price.cities_repeater.map((item, i) => (
                                                    <div key={i} className={styles['delivery-block__article-item']}>{item.title}</div>
                                                ))
                                            }
                                        </div>
                                    </Then>
                                </If>

                                {
                                    acf.delivery_price.description_after_cities &&
                                    <div dangerouslySetInnerHTML={{__html: acf.delivery_price.description_after_cities}} />
                                }

                                {
                                    acf.delivery_price.price_odessa &&
                                    <h3>{acf.delivery_price.price_odessa}</h3>
                                }

                                {
                                    acf.delivery_price.description_after_odessa &&
                                    <div dangerouslySetInnerHTML={{__html: acf.delivery_price.description_after_odessa}} />
                                }
                            </article>
                        </div>

                        <div className={classNames(styles['delivery__block'], styles['delivery-block'])}>
                            <div className={styles['delivery-block__header']}>
                                <div className={styles['delivery-block__header-icon']}>
                                    <Image src={acf.pickup.icon.url} alt={acf.pickup.icon.alt} width={acf.pickup.icon.width} height={acf.pickup.icon.height} />
                                </div>

                                <div className={styles['delivery-block__header-title']}>{acf.pickup.title}</div>
                            </div>

                            <article className={styles['delivery-block__article']}>
                                <ul>
                                    {
                                        acf.pickup.repeater_conditions.map((item, i) => (
                                            <li key={i}>{item.text}</li>
                                        ))
                                    }
                                </ul>

                                <div className={styles['green-text']} dangerouslySetInnerHTML={{__html: acf.pickup.description_after_conditions}} />

                                <strong>Адреса складов:</strong>

                                <ul>
                                    {
                                        acf.pickup.repeater_store.map((item, i) => (
                                            <li key={i}>{item.adress}</li>
                                        ))
                                    }
                                </ul>

                                <div className={styles['green-text']} dangerouslySetInnerHTML={{__html: acf.pickup.description_after_store}} />
                            </article>
                        </div>

                        <div className={classNames(styles['delivery__block'], styles['delivery-block'])}>
                            <div className={styles['delivery-block__header']}>
                                <div className={styles['delivery-block__header-icon']}>
                                    <Image src={acf.express.icon.url} alt={acf.express.icon.alt} width={acf.express.icon.width} height={acf.express.icon.height} />
                                </div>

                                <div className={styles['delivery-block__header-title']}>{acf.express.title}</div>
                            </div>

                            <article className={styles['delivery-block__article']} dangerouslySetInnerHTML={{__html: acf.express.description}} />
                        </div>

                        <div className={classNames(styles['delivery__block'], styles['delivery-block'])}>
                            <div className={styles['delivery-block__header']}>
                                <div className={styles['delivery-block__header-icon']}>
                                    <Image src={acf.delivery_payment.icon.url} alt={acf.delivery_payment.icon.alt} width={acf.delivery_payment.icon.width} height={acf.delivery_payment.icon.height} />
                                </div>

                                <div className={styles['delivery-block__header-title']}>{acf.delivery_payment.title}</div>
                            </div>

                            <article className={styles['delivery-block__article']}>
                                <ul>
                                    {
                                        acf.delivery_payment.payment_repeater.map((item, i) => (
                                            <li key={i}>{item.text}</li>
                                        ))
                                    }
                                </ul>

                                {
                                    acf.delivery_payment.description_after &&
                                    <div dangerouslySetInnerHTML={{__html: acf.delivery_payment.description_after}} />
                                }
                            </article>
                        </div>

                        <div className={classNames(styles['delivery__block'], styles['delivery-block'])}>
                            <div className={styles['delivery-block__header']}>
                                <div className={styles['delivery-block__header-icon']}>
                                    <Image src={acf.checkout_steps.icon.url} alt={acf.checkout_steps.icon.alt} width={acf.checkout_steps.icon.width} height={acf.checkout_steps.icon.height} />
                                </div>

                                <div className={styles['delivery-block__header-title']}>{acf.checkout_steps.title}</div>
                            </div>

                            <article className={styles['delivery-block__article']}>
                                <strong>{acf.checkout_steps.description_before}</strong>

                                <ul>
                                    {
                                        acf.checkout_steps.step_repeater.map((item, i) => (
                                            <li key={i}>{item.text}</li>
                                        ))
                                    }
                                </ul>

                                {
                                    acf.checkout_steps.description_after &&
                                    <div dangerouslySetInnerHTML={{__html: acf.checkout_steps.description_after}} />
                                }
                            </article>
                        </div>

                        <div className={classNames(styles['delivery__block'], styles['delivery-block'])}>
                            <div className={styles['delivery-block__header']}>
                                <div className={styles['delivery-block__header-icon']}>
                                    <Image src={acf.advantages.icon.url} alt={acf.advantages.icon.alt} width={acf.advantages.icon.width} height={acf.advantages.icon.height} />
                                </div>

                                <div className={styles['delivery-block__header-title']}>{acf.advantages.title}</div>
                            </div>

                            <article className={styles['delivery-block__article']}>
                                <ul>
                                    {
                                        acf.advantages.repeater.map((item, i) => (
                                            <If condition={item.description} key={i}>
                                                <Then>
                                                    <li>{item.title}</li>

                                                    <li>{item.description}</li>
                                                </Then>
                                                <Else>
                                                    <li>{item.title}</li>
                                                </Else>
                                            </If>
                                        ))
                                    }
                                </ul>
                            </article>
                        </div>

                        <div className={classNames(styles['delivery__block'], styles['delivery-block'])}>
                            <div className={styles['delivery-block__header']}>
                                <div className={styles['delivery-block__header-icon']}>
                                    <svg>
                                        <use href={`${sprite.src}#post`}/>
                                    </svg>
                                </div>

                                <div className={styles['delivery-block__header-title']}>ПРАВИЛА НОВОЙ ПОЧТЫ</div>
                            </div>

                            <article className={styles['delivery-block__article']}>
                                <ul>
                                    <li>
                                        при отправке обязательным является покупка обриштовки для дверей (что
                                        гарантирует клиенту целостность товара и возмещение средств, в случае
                                        повреждения), поэтому цена за доставку увеличивается примерно на 150-180 грн*;
                                        <em>* - для просчета стоимости в тарифах отмечайте пункт обриштовка.</em>
                                    </li>
                                    <li>также обязательным является страхование товара (его оплачивает Дверной Олимп).
                                        Что страхует клиента от получения битого товара, ибо в таком случае Новая Почта
                                        возмещает стоимость!
                                    </li>
                                </ul>
                            </article>
                        </div>

                        <div className={classNames(styles['delivery__block'], styles['delivery-block'])}>
                            <div className={styles['delivery-block__header']}>
                                <div className={styles['delivery-block__header-icon']}>
                                    <svg>
                                        <use href={`${sprite.src}#clock`}/>
                                    </svg>
                                </div>
                                <div className={styles['delivery-block__header-title']}>ВРЕМЯ ДОСТАВКИ</div>
                            </div>

                            <article className={styles['delivery-block__article']}>
                                <p>10.00 - 19.00. Выходные дни: суббота, воскресенье.</p>
                            </article>
                        </div>

                        <div className={classNames(styles['delivery__block'], styles['delivery-block'])}>
                            <div className={styles['delivery-block__header']}>
                                <div className={styles['delivery-block__header-icon']}>
                                    <svg>
                                        <use href={`${sprite.src}#schedule`}/>
                                    </svg>
                                </div>

                                <div className={styles['delivery-block__header-title']}>ВРЕМЯ ДОСТАВКИ</div>
                            </div>

                            <article className={styles['delivery-block__article']}>
                                <p>
                                    Доставка заказа 1-3 рабочих дня, при условии наличия товара на складе. Но, если
                                    нужно очень срочно, звоните! Мы приложим все усилия, чтобы помочь Вам.
                                </p>
                            </article>
                        </div>

                        <div className={classNames(styles['delivery__block'], styles['delivery-block'])}>
                            <div className={styles['delivery-block__header']}>
                                <div className={styles['delivery-block__header-icon']}>
                                    <svg>
                                        <use href={`${sprite.src}#user-check`}/>
                                    </svg>
                                </div>

                                <div className={styles["delivery-block__header-title"]}>ПОЛУЧЕНИЕ ТОВАРА</div>
                            </div>
                            <article className={styles["delivery-block__article"]}>
                                <ul>
                                    <li>Покупатель обязан при получении товара осмотреть его и при наличии претензий
                                        оформить соответствующую рекламацию на отделении Новой почты.
                                    </li>
                                    <li>Покупатель обязуется следить за сроками доставки товара самостоятельно.</li>
                                </ul>
                                <p className="green-text">
                                    В случае отказа от заказа, предоплата в размере 15% которая являлась стоимостью
                                    услуги доставки Новой Почтой (если складской товар), и полная предоплата если товар
                                    под заказ, НЕ возвращается, в том случае когда эта услуга уже выполнена.
                                </p>
                            </article>
                        </div>
                        <div className={classNames(styles['delivery__block'], styles['delivery-block'])}>
                            <div className={styles["delivery-block__header"]}>
                                <div className={styles["delivery-block__header-icon"]}>
                                    <svg>
                                        <use href={`${sprite.src}#pen`}/>
                                    </svg>
                                </div>
                                <div className={styles["delivery-block__header-title"]}>ПРИ ПОЛУЧЕНИИ ТОВАРА</div>
                            </div>
                            <article className={styles["delivery-block__article"]}>
                                <p>
                                    Покупатель обязан осмотреть товар и подписать акт-приема передачи. Претензии к
                                    внешнему виду и механическим повреждениям (не касается заводских дефектов) Вы можете
                                    предъявить только во время передачи Вам товара продавцом. Ссылка на то, что
                                    Покупатель не осмотрел товар (или плохо осмотрел), что торопил водитель, плохое
                                    освещение, испачканный товар и др. причины — не являются основанием для возврата или
                                    обмена товара после отъезда водителя.
                                </p>
                            </article>
                        </div>
                        <div className={classNames(styles['delivery__block'], styles['delivery-block'])}>
                            <div className={styles["delivery-block__header"]}>
                                <div className={styles["delivery-block__header-icon"]}>
                                    <svg>
                                        <use href={`${sprite.src}#peoples`}/>
                                    </svg>
                                </div>
                                <div className={styles["delivery-block__header-title"]}>ПОДЪЕМ</div>
                            </div>
                            <article className={styles["delivery-block__article"]}>
                                <div className={styles['delivery-block__table']}>
                                    <div className={styles['delivery-block__table-row']}>
                                        <div className={styles['delivery-block__table-row-item']}>ПОДЪЕМ</div>
                                        <div className={styles['delivery-block__table-row-item']}>ВХОДНЫЕ</div>
                                        <div className={styles['delivery-block__table-row-item']}>МЕЖКОМНАТНЫЕ/ПЛИНТУС</div>
                                    </div>
                                    <div className={styles["delivery-block__table-row"]}>
                                        <div className={styles['delivery-block__table-row-item']}>По ступенькам</div>
                                        <div className={styles['delivery-block__table-row-item']}>
                                            <p>
                                                технические, эконом до 7000 грн: 70 грн./этаж, но не менее 300 грн.
                                            </p>
                                            <p>
                                                входные от 7000 грн - 80грн/этаж, но не менее 450 грн.
                                            </p>
                                            <p>
                                                двустворчатые - по договоренности.
                                            </p>
                                        </div>
                                        <div className={styles['delivery-block__table-row-item']}>60 грн./этаж</div>
                                    </div>
                                    <div className={styles["delivery-block__table-row"]}>
                                        <div className={styles['delivery-block__table-row-item']}>Грузовой лифт</div>
                                        <div className={styles['delivery-block__table-row-item']}>300 грн.</div>
                                        <div className={styles['delivery-block__table-row-item']}>60 грн.</div>
                                    </div>
                                    <div className={styles["delivery-block__table-row"]}>
                                        <div className={styles['delivery-block__table-row-item']}>Занос на 1-й этаж (или частный
                                            дом)
                                        </div>
                                        <div className={styles['delivery-block__table-row-item']}>300 грн. (двустворчатые по
                                            договоренности)
                                        </div>
                                        <div className={styles['delivery-block__table-row-item']}>60 грн.</div>
                                    </div>
                                </div>
                                <p>
                                    Если проезд к месту разгрузки затруднен, доставка будет осуществлена максимально
                                    близко к месту планируемой выгрузки без нарушения правил дорожного движения и
                                    вероятности повреждения автомобиля, а перенос товара считается как подъем на этаж за
                                    каждые 30 метров.
                                </p>
                            </article>
                        </div>
                        <div className={classNames(styles['delivery__block'], styles['delivery-block'])}>
                            <div className={styles["delivery-block__header"]}>
                                <div className={styles["delivery-block__header-title"]}>Товариство з обмеженою відповідальністю
                                    Дверний Олімп
                                </div>
                            </div>
                            <article className={styles["delivery-block__article"]}>
                                <p>
                                    <strong>Місцезнаходження юридичної особи:</strong>
                                    04114, м. Київ, вулиця Автозаводська, будинок 29-А, приміщення 4
                                </p>
                                <p>
                                    <strong>
                                        Дата та номер запису в Єдиному державному реєстрі юридичних осіб та фізичних
                                        осіб-підприємців про проведення державної реєстрації:
                                        <span>29.10.2015, 1 069 102 0000 035539</span>
                                    </strong>
                                </p>

                                <If condition={settingsCtx.shop_addresses}>
                                    <Then>
                                        <div className={styles['delivery-block__links']}>
                                            <h4>Адреса магазинов (для просмотра ИНФО нажать НА АДРЕС):</h4>

                                            <div className={styles['delivery-block__links-inner']}>
                                                {
                                                    settingsCtx.shop_addresses.map((item:menuItemProp, i:number) => (
                                                        <div key={i} className={styles['delivery-block__links-item']}>
                                                            <div className={styles['delivery-block__links-title']}>{item.label}</div>

                                                            {
                                                                item.childItems.nodes.length &&
                                                                <div className={styles['delivery-block__links-list']}>
                                                                    {
                                                                        item.childItems.nodes.map((subitem, k) => (
                                                                            <Link key={k} className={styles['delivery-block__links-link']} href={subitem.url}>
                                                                                <span className={styles['delivery-block__links-text']}>{subitem.label}</span>

                                                                                <span className={styles['delivery-block__links-icon']}>
                                                                                    <svg><use href={`${sprite.src}#big-item-arrow`}/></svg>
                                                                                </span>
                                                                            </Link>
                                                                        ))
                                                                    }
                                                                </div>
                                                            }
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </Then>
                                </If>
                            </article>
                        </div>
                    </div>

                    <div className={classNames(styles['delivery__banner'], styles['delivery-banner'])}>
                        <div className={styles['delivery-banner__inner']}>
                            <Banner />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DeliveryIntro