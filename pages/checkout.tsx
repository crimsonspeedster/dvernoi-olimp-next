import React, {useEffect} from "react";
import {GetServerSideProps} from "next";
import {getApolloClient} from "@services/graphql/conf/apolloClient";
import axios from "axios";
import {GetMenu} from "@components/Layout/graphql";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import HeadHTML from "@components/Layout/Head";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import {SettingsContext} from "@pages/_app";
import Layout from "@components/Layout";
import CheckoutIntro, {DeliveryCitiesProps} from "@components/Checkout/Intro";
import {getCookie} from "cookies-next";
import {CartServerDataProps} from "@pages/cart";
import {setCartServerData} from "@store/cart";
// @ts-ignore
import NovaPoshta from 'novaposhta';
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


interface CheckoutProps {
    pageData: any,
    settingsData: any,
    menus: any,
    nonce: string,
    cartData: CartServerDataProps,
    np_cities: NPCityProps[]
}

export interface NPCityProps {
    AreaDescription: string
    AreaDescriptionRu: string,
    Description: string,
    DescriptionRu: string,
    Ref: string,
    value: string,
    label: string
}

export interface NPDepartament {
    DescriptionRu?: string,
    delivery_type: string,
    Description?: string,
    ShortAddress?: string,
    ShortAddressRu?: string,
    SiteKey?: string,
    value: string,
    label: string
}

const Checkout:React.FC<CheckoutProps> = (props) => {
    const {
        pageData,
        settingsData,
        menus,
        nonce,
        cartData,
        np_cities
    } = props;

    const dispatch = useDispatch();
    const router = useRouter();

    const breadcrumbs = pageData?.yoast_head_json?.schema['@graph']?.filter((item:any) => item['@type'] === 'BreadcrumbList')?.[0]?.itemListElement;

    useEffect(()=>{
        dispatch(setCartServerData(cartData));

        if (cartData.items.length === 0)
        {
            router.push('/404');
        }
    }, [router, dispatch, cartData]);

    return (
        <>
            <SettingsContext.Provider value={{
                settings: settingsData,
                translates: pageData.translated_slugs,
                menus,
                nonce
            }}>
                <Layout>
                    <HeadHTML seoPage={pageData.yoast_head_json} />

                    <Breadcrumbs
                        list={breadcrumbs}
                    />

                    <CheckoutIntro
                        title={pageData.title.rendered}
                        npCities={np_cities}
                        deliveryShops={pageData.acf.delivery_shops}
                        deliveryCities={pageData.acf.delivery_shops.map((item:DeliveryCitiesProps) => {
                            return {
                                label: item.label,
                                value: item.label
                            };
                        })}
                    />
                </Layout>
            </SettingsContext.Provider>
        </>
    );
}

export default Checkout;

export const getServerSideProps:GetServerSideProps = async ({locale, res, req}) => {
    const apolloClient = getApolloClient();

    const pageRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/pages/`, {
        params: {
            slug: 'checkout',
            lang: locale,
            acf_format: 'standard'
        }
    });

    const nonceRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/nonce`);

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

    const novaPoshtaRequest = new NovaPoshta({ apiKey: process.env.NEXT_PUBLIC_ENV_NP_API_KEY });

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

    if (resData.cart.items.length === 0)
    {
        res.writeHead(404, { Location: '/404' });
        res.end();
    }

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

    const menus = {
        footer_company: footer_company?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
        footer_questions: footer_questions?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
        footer_catalog: footer_catalog?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
        header_top: header_top?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
        header_catalog: header_catalog?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
        catalog_menu: catalog_menu?.menus?.nodes?.[0]?.menuItems?.nodes ?? []
    };

    const np_cities = await novaPoshtaRequest.address
        .getCities()
        .then((res:any) => res?.data?.map((item:NPCityProps) => ({...item, value: item.Ref, label: item.DescriptionRu})) ?? []);

    return {
        props: {
            pageData: resData.page,
            settingsData: resData.settings,
            menus,
            nonce: resData.nonce.nonce,
            cartData: resData.cart,
            np_cities: np_cities,
            ...(await serverSideTranslations(locale ?? '', ['common']))
        }
    }
}