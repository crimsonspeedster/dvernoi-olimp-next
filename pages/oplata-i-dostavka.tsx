import React, {useEffect} from "react";
import {GetServerSideProps} from "next";
import {getApolloClient} from "@services/graphql/conf/apolloClient";
import axios from "axios";
import {GetMenu} from "@components/Layout/graphql";
import Layout from "@components/Layout";
import {SettingsContext} from "@pages/_app";
import HeadHTML from "@components/Layout/Head";
import DeliveryTemplate from "@root/templates/DeliveryTemplate";
import {useDispatch} from "react-redux";
import {setCartServerData} from "@store/cart";
import {CartServerDataProps} from "@pages/cart";
import {getCookie} from "cookies-next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";

interface DostavkaProps {
    pageData: any,
    settingsData: any,
    menus: any,
    nonce: string,
    cartData: CartServerDataProps
}

const Dostavka:React.FC<DostavkaProps> = (props) => {
    const {
        pageData,
        settingsData,
        menus,
        nonce,
        cartData
    } = props;

    const acfData = {
        sale: pageData.acf.sale,
        delivery: pageData.acf.delivery,
        delivery_price: pageData.acf.delivery_price,
        pickup: pageData.acf.pickup,
        express: pageData.acf.express,
        delivery_payment: pageData.acf.delivery_payment,
        checkout_steps: pageData.acf.checkout_steps,
        advantages: pageData.acf.advantages,
        rules_nova_powta: pageData.acf.rules_nova_powta,
        delivery_time: pageData.acf.delivery_time,
        delivery_date: pageData.acf.delivery_date,
        receipt_goods: pageData.acf.receipt_goods,
        before_get: pageData.acf.before_get,
        climb: pageData.acf.climb,
        company: pageData.acf.company
    }

    const breadcrumbs = pageData?.yoast_head_json?.schema['@graph']?.filter((item:any) => item['@type'] === 'BreadcrumbList')?.[0]?.itemListElement;

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setCartServerData(cartData));
    }, [dispatch, cartData]);

    return (
        <SettingsContext.Provider value={{
            settings: settingsData,
            translates: pageData.translated_slugs,
            menus,
            nonce
        }}>
            <HeadHTML seoPage={pageData.yoast_head_json} />

            <Layout>
                <DeliveryTemplate
                    breadcrumbs={breadcrumbs}
                    seoBlockContent={pageData.acf.seo_block}
                    title={pageData.title.rendered}
                    acf={acfData}
                />
            </Layout>
        </SettingsContext.Provider>
    );
}

export default Dostavka;

export const getServerSideProps:GetServerSideProps = async ({locale, req, res}) => {
    const apolloClient = getApolloClient();

    const pageRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/pages/`, {
        params: {
            slug: 'oplata-i-dostavka',
            lang: locale,
            acf_format: 'standard'
        }
    });

    const settingsRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/options`, {
        params: {
            lang: locale,
            id: 'acf-theme-general-settings',
            acf_format: 'standard'
        }
    });

    const cartRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/cart`, {
        headers: {
            'X-Headless-WP': true,
            'X-WC-Session': getCookie('X-WC-Session', {req, res})
        },
        params: {
            lang: locale
        }
    });

    const nonceRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/nonce`);

    const resData = await axios.all([pageRequest, settingsRequest, nonceRequest, cartRequest]).then(axios.spread(function(page, settings, nonce, cart) {
        if (!page.data?.[0])
        {
            res.writeHead(404, { Location: '/404' });
            res.end();
        }

        return {
            page: page.data[0],
            settings: settings.data,
            nonce: nonce.data,
            cart: cart.data
        };
    }));

    const {data: footer_company} = await apolloClient.query({
        query: GetMenu,
        variables: {
            location: 'FOOTER_COMPANY',
            lang: locale
        },
    });

    const {data: footer_questions} = await apolloClient.query({
        query: GetMenu,
        variables: {
            location: 'FOOTER_QUESTIONS',
            lang: locale
        },
    });

    const {data: footer_catalog} = await apolloClient.query({
        query: GetMenu,
        variables: {
            location: 'FOOTER_CATALOG',
            lang: locale
        },
    });

    const {data: header_top} = await apolloClient.query({
        query: GetMenu,
        variables: {
            location: 'HEADER_TOP',
            lang: locale
        },
    });

    const {data: header_catalog} = await apolloClient.query({
        query: GetMenu,
        variables: {
            location: 'HEADER_CATALOG',
            lang: locale
        },
    });

    const {data: catalog_menu} = await apolloClient.query({
        query: GetMenu,
        variables: {
            location: 'CATALOG_MENU',
            lang: locale
        },
    });

    const {data: shop_addresses} = await apolloClient.query({
        query: GetMenu,
        variables: {
            location: 'SHOP_ADDRESSES',
            lang: locale
        },
    });

    const menus = {
        footer_company: footer_company?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
        footer_questions: footer_questions?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
        footer_catalog: footer_catalog?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
        header_top: header_top?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
        header_catalog: header_catalog?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
        catalog_menu: catalog_menu?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
        shop_addresses: shop_addresses?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
    };

    return {
        props: {
            pageData: resData.page,
            settingsData: resData.settings,
            menus,
            nonce: resData.nonce.nonce,
            cartData: resData.cart,
            ...(await serverSideTranslations(locale ?? '', ['common']))
        }
    }
}