import React from "react";
import DeliveryIntro from "@components/Delivery/Intro";
import Breadcrumbs, {Breadcrumb} from "@components/Breadcrumbs/Breadcrumbs";
import SeoBlock, {seoBlockProps} from "@components/SeoBlock/SeoBlock";
import {PhotoProps} from "@components/About/Intro/Intro";


interface DeliveryTemplateProps {
    breadcrumbs: Breadcrumb[],
    seoBlockContent?: seoBlockProps,
    title: string,
    acf: AcfDataProps
}

export interface AcfDataProps {
    sale: SaleGroup,
    delivery: deliveryGroup,
    delivery_price: delivery_priceGroup,
    pickup: pickupProps,
    express: defaultItemProps,
    delivery_payment: delivery_paymentProps,
    checkout_steps: checkout_stepsProps,
    advantages: advantagesProps,
    rules_nova_powta: rules_nova_powtaProps,
    delivery_time: delivery_timeProps,
    delivery_date: delivery_timeProps,
    receipt_goods: receipt_goodsProps,
    before_get: delivery_timeProps,
    climb: climbProps,
    company: repeater_description,
}

interface SaleGroup {
    logistik_text: string,
    title: string,
    icon: PhotoProps,
    repeater_description: repeater_description[],
    min_price_text?: string,
    description_after?: string
}

interface repeater_description {
    title: string,
    description: string
}

interface deliveryGroup {
    title: string,
    icon: PhotoProps,
    description_before?: string,
    repeater_description: repeater_description[],
    description_after?: string
}

interface delivery_priceGroup {
    title: string,
    icon: PhotoProps,
    price_kiev: string,
    price_kiev_region: string,
    cities_repeater: cities_repeaterProps[],
    description_after_cities?: string,
    price_odessa?: string,
    description_after_odessa?: string
}

interface cities_repeaterProps {
    title: string
}

interface pickupProps {
    title: string,
    icon: PhotoProps,
    repeater_conditions: repeater_conditionsProps[],
    description_after_conditions: string,
    repeater_store: repeater_storeProps[],
    description_after_store: string
}

interface repeater_conditionsProps {
    text: string
}

interface repeater_storeProps {
    adress: string
}

interface defaultItemProps {
    title: string,
    icon: PhotoProps,
    description: string
}

interface delivery_paymentProps {
    title: string,
    icon: PhotoProps,
    payment_repeater: repeater_conditionsProps[],
    description_after?: string
}

interface checkout_stepsProps {
    title: string,
    icon: PhotoProps,
    description_before: string,
    step_repeater: repeater_conditionsProps[],
    description_after?: string
}

interface advantagesProps {
    title: string,
    icon: PhotoProps,
    repeater: advantagesRepeater[],
}

interface advantagesRepeater {
    title: string,
    description?: string
}

interface rules_nova_powtaProps {
    title: string,
    icon: PhotoProps,
    repeater_rules: advantagesRepeater[]
}

interface delivery_timeProps {
    title: string,
    icon: PhotoProps,
    description: string
}

interface receipt_goodsProps {
    title: string,
    icon: PhotoProps,
    repeater: repeater_conditionsProps[],
    description_after?: string
}

interface climbProps {
    title: string,
    icon: PhotoProps,
    table_repeater: table_repeaterProps[],
    description_after?: string
}

interface table_repeaterProps {
    column_1: string,
    column_2: string,
    column_3: string
}

const DeliveryTemplate:React.FC<DeliveryTemplateProps> = (props) => {
    const {
        breadcrumbs,
        seoBlockContent,
        title,
        acf
    } = props;

    return (
        <>
            <Breadcrumbs list={breadcrumbs} />

            <DeliveryIntro
                title={title}
                acf={acf}
            />

            {
                seoBlockContent?.title && <SeoBlock seoBlock={seoBlockContent} />
            }
        </>
    );
}

export default DeliveryTemplate;