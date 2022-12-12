import React, {useEffect} from "react";
import {GetServerSideProps} from "next";
import {getApolloClient} from "@services/graphql/conf/apolloClient";
import axios from "axios";
import {GetMenu} from "@components/Layout/graphql";
import HeadHTML from "@components/Layout/Head";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import {SettingsContext} from "@pages/_app";
import Layout from "@components/Layout";
import CartIntro from "@components/Cart/Intro";


interface CartPage {
    pageData: any,
    settingsData: any,
    menus: any,
    nonce: string,
    cart: any
}

const Cart:React.FC<CartPage> = (props) => {
    const {
        pageData,
        settingsData,
        menus,
        nonce,
        cart
    } = props;

    useEffect(()=>{
        axios.post(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/wc/store/v1/cart/add-item`, {
            id: 864,
            quantity: 2,
        }, {
            withCredentials: true,
            headers: {
                Nonce: nonce,
                // 'X-WC-Session': 't_53cb1fad1300ace0ea11afb81a9c03'
            }
        })
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    console.log(cart);

    const breadcrumbs = pageData?.yoast_head_json?.schema['@graph']?.filter((item:any) => item['@type'] === 'BreadcrumbList')?.[0]?.itemListElement;

    return (
        <>
            <SettingsContext.Provider value={{
                settings: settingsData,
                translates: pageData.translated_slugs,
                menus
            }}>
                <Layout>
                    <HeadHTML seoPage={pageData.yoast_head_json} />

                    <Breadcrumbs
                        list={breadcrumbs}
                    />

                    <CartIntro
                        title={pageData.title.rendered}
                    />
                </Layout>
            </SettingsContext.Provider>
        </>
    );
}

export default Cart;

export const getServerSideProps:GetServerSideProps = async ({locale}) => {
    const apolloClient = getApolloClient();

    const pageRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/pages/`, {
        params: {
            slug: 'cart',
            lang: locale,
            acf_format: 'standard'
        }
    });

    const cartRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/wc/store/v1/cart`, {
        params: {
            lang: locale
        },
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
        // headers: {
            // Nonce: '9e13fc2560',
            // 'X-Headless-WP': true,
            // 'X-WC-Session': 't_53cb1fad1300ace0ea11afb81a9c03'
        // }
    });

    const nonceRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/nonce`);

    const settingsRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/options`, {
        params: {
            lang: locale,
            id: 'acf-theme-general-settings',
            acf_format: 'standard'
        }
    });

    const res = await axios.all([pageRequest, settingsRequest, nonceRequest, cartRequest]).then(axios.spread(function(page, settings, nonce, cart) {
        return {
            page: page.data[0],
            settings: settings.data,
            nonce: nonce.data?.nonce ?? '',
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

    const menus = {
        footer_company: footer_company?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
        footer_questions: footer_questions?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
        footer_catalog: footer_catalog?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
        header_top: header_top?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
        header_catalog: header_catalog?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
        catalog_menu: catalog_menu?.menus?.nodes?.[0]?.menuItems?.nodes ?? []
    };

    return {
        props: {
            pageData: res.page,
            settingsData: res.settings,
            menus,
            nonce: res.nonce,
            cart: res.cart
        }
    }
}