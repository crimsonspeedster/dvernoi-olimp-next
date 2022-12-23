import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {GetServerSideProps} from "next";
import {getApolloClient} from "@services/graphql/conf/apolloClient";
import axios from "axios";
import {GetMenu} from "@components/Layout/graphql";
import HeadHTML from "@components/Layout/Head";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import {SettingsContext} from "@pages/_app";
import Layout from "@components/Layout";
import CartIntro from "@components/Cart/Intro";
import {useRouter} from "next/router";
import {ProductCardProps} from "@components/Cards/ProductCard/ProductCard";
import {extraDataChoosed, variation_arrayProps} from "@components/SingleProduct/Intro/SingleProductContent";
import {selectAllCartData, setCartItemsAmount, setCartServerData} from "@store/cart";
import {Provider, useDispatch, useSelector, useStore} from "react-redux";
import {getCookie} from "cookies-next";


interface CartPage {
    pageData: any,
    settingsData: any,
    menus: any,
    nonce: string,
    cartData: CartServerDataProps
}

export interface CartServerDataProps {
    items: CartItemsProps[],
    total_amount: number,
    total_items: number,
    total_price: number
}

export interface CartItemsProps {
    [key: string]: CartItemProps
}

interface CartItemMeta {
    meta_extra_products?: extraDataChoosed[]
}

export interface CartItemProps {
    hash: string,
    id: number,
    meta_data: CartItemMeta,
    quantity: number,
    variation_id: number,
    variation_product?: variation_arrayProps,
    type: string,
    variation: CartVariationProps[],
    totals: CartItemTotalsProps,
    product: ProductCardProps,
}

export interface CartVariationProps {
    name: string,
    attr_slug: string,
    value: string
}

interface CartItemTotalsProps {
    line_subtotal: string,
    line_subtotal_tax: string,
    line_total: string,
    line_total_tax: string
}

const Cart:React.FC<CartPage> = (props) => {
    const {
        pageData,
        settingsData,
        menus,
        nonce,
        cartData
    } = props;

    const dispatch = useDispatch();

    const breadcrumbs = pageData?.yoast_head_json?.schema['@graph']?.filter((item:any) => item['@type'] === 'BreadcrumbList')?.[0]?.itemListElement;

    useEffect(()=>{
        dispatch(setCartServerData(cartData));
    }, [dispatch, cartData]);

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

                    <CartIntro
                        title={pageData.title.rendered}
                    />
                </Layout>
            </SettingsContext.Provider>
        </>
    );
}

export default Cart;

export const getServerSideProps:GetServerSideProps = async ({locale, req, res}) => {
    const apolloClient = getApolloClient();

    const pageRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/pages/`, {
        params: {
            slug: 'cart',
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
        }
    });

    const resData = await axios.all([pageRequest, settingsRequest, nonceRequest, cartRequest]).then(axios.spread(function(page, settings, nonce, cartData) {
        return {
            page: page.data[0],
            settings: settings.data,
            nonce: nonce.data,
            cart: cartData.data
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
            pageData: resData.page,
            settingsData: resData.settings,
            menus,
            nonce: resData.nonce.nonce,
            cartData: resData.cart
        }
    }
}