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
import {useTranslation} from "next-i18next";

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
    const {t} = useTranslation('common');

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

                                <strong>{t('shopAddress')}:</strong>

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
                                    <Image src={acf.rules_nova_powta.icon.url} alt={acf.rules_nova_powta.icon.alt} width={acf.rules_nova_powta.icon.width} height={acf.rules_nova_powta.icon.height} />
                                </div>

                                <div className={styles['delivery-block__header-title']}>{acf.rules_nova_powta.title}</div>
                            </div>

                            <article className={styles['delivery-block__article']}>
                                <ul>
                                    {
                                        acf.rules_nova_powta.repeater_rules.map((item, i) => (
                                            <li key={i}>
                                                {item.title}

                                                <If condition={item.description}>
                                                    <Then>
                                                        <em>{item.description}</em>
                                                    </Then>
                                                </If>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </article>
                        </div>

                        <div className={classNames(styles['delivery__block'], styles['delivery-block'])}>
                            <div className={styles['delivery-block__header']}>
                                <div className={styles['delivery-block__header-icon']}>
                                    <Image src={acf.delivery_time.icon.url} alt={acf.delivery_time.icon.alt} width={acf.delivery_time.icon.width} height={acf.delivery_time.icon.height} />
                                </div>
                                <div className={styles['delivery-block__header-title']}>{acf.delivery_time.title}</div>
                            </div>

                            <article className={styles['delivery-block__article']} dangerouslySetInnerHTML={{__html: acf.delivery_time.description}} />
                        </div>

                        <div className={classNames(styles['delivery__block'], styles['delivery-block'])}>
                            <div className={styles['delivery-block__header']}>
                                <div className={styles['delivery-block__header-icon']}>
                                    <Image src={acf.delivery_date.icon.url} alt={acf.delivery_date.icon.alt} width={acf.delivery_date.icon.width} height={acf.delivery_date.icon.height} />
                                </div>

                                <div className={styles['delivery-block__header-title']}>{acf.delivery_date.title}</div>
                            </div>

                            <article className={styles['delivery-block__article']} dangerouslySetInnerHTML={{__html: acf.delivery_date.description}} />
                        </div>

                        <div className={classNames(styles['delivery__block'], styles['delivery-block'])}>
                            <div className={styles['delivery-block__header']}>
                                <div className={styles['delivery-block__header-icon']}>
                                    <Image src={acf.receipt_goods.icon.url} alt={acf.receipt_goods.icon.alt} width={acf.receipt_goods.icon.width} height={acf.receipt_goods.icon.height} />
                                </div>

                                <div className={styles["delivery-block__header-title"]}>{acf.receipt_goods.title}</div>
                            </div>
                            <article className={styles["delivery-block__article"]}>
                                <ul>
                                    {
                                        acf.receipt_goods.repeater.map((item, i) => (
                                            <li key={i}>{item.text}</li>
                                        ))
                                    }
                                </ul>

                                {
                                    acf.receipt_goods.description_after &&
                                    <p className={styles['green-text']}>{acf.receipt_goods.description_after}</p>
                                }
                            </article>
                        </div>

                        <div className={classNames(styles['delivery__block'], styles['delivery-block'])}>
                            <div className={styles["delivery-block__header"]}>
                                <div className={styles["delivery-block__header-icon"]}>
                                    <Image src={acf.before_get.icon.url} alt={acf.before_get.icon.alt} width={acf.before_get.icon.width} height={acf.before_get.icon.height} />
                                </div>

                                <div className={styles["delivery-block__header-title"]}>{acf.before_get.title}</div>
                            </div>
                            <article className={styles["delivery-block__article"]} dangerouslySetInnerHTML={{__html: acf.before_get.description}} />
                        </div>

                        <div className={classNames(styles['delivery__block'], styles['delivery-block'])}>
                            <div className={styles["delivery-block__header"]}>
                                <div className={styles["delivery-block__header-icon"]}>
                                    <Image src={acf.climb.icon.url} alt={acf.climb.icon.alt} width={acf.climb.icon.width} height={acf.climb.icon.height} />
                                </div>

                                <div className={styles["delivery-block__header-title"]}>{acf.climb.title}</div>
                            </div>

                            <article className={styles["delivery-block__article"]}>
                                <div className={styles['delivery-block__table']}>
                                    {
                                        acf.climb.table_repeater.map((item, i) => (
                                            <div key={i} className={styles['delivery-block__table-row']}>
                                                <div className={styles['delivery-block__table-row-item']} dangerouslySetInnerHTML={{__html: item.column_1}} />

                                                <div className={styles['delivery-block__table-row-item']} dangerouslySetInnerHTML={{__html: item.column_2}} />

                                                <div className={styles['delivery-block__table-row-item']} dangerouslySetInnerHTML={{__html: item.column_3}} />
                                            </div>
                                        ))
                                    }
                                </div>

                                {
                                    acf.climb.description_after &&
                                    <div dangerouslySetInnerHTML={{__html: acf.climb.description_after}} />
                                }
                            </article>
                        </div>

                        <div className={classNames(styles['delivery__block'], styles['delivery-block'])}>
                            <div className={styles["delivery-block__header"]}>
                                <div className={styles["delivery-block__header-title"]}>{acf.company.title}</div>
                            </div>

                            <article className={styles["delivery-block__article"]}>
                                <div dangerouslySetInnerHTML={{__html: acf.company.description}} />

                                <If condition={settingsCtx.shop_addresses}>
                                    <Then>
                                        <div className={styles['delivery-block__links']}>
                                            <h4>{t('addressInfo')}:</h4>

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