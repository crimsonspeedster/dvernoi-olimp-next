import React, {useEffect} from "react";
import axios from "axios";
import {GetServerSideProps} from "next";
import {SettingsContext} from "@pages/_app";
import Layout from "@components/Layout";
import {GetMenu} from "@components/Layout/graphql";
import {getApolloClient} from "@services/graphql/conf/apolloClient";
import ThanksIntro from "@components/Thanks/Thanks";
import {useDispatch} from "react-redux";
import {setCartItemsAmount, setCartServerData} from "@store/cart";
import {useRouter} from "next/router";


interface ThanksProps {
    pageData: any,
    settingsData: any,
    menus: any,
    nonce: string
}

const Thanks:React.FC<ThanksProps> = (props) => {
    const {
        pageData,
        settingsData,
        menus,
        nonce
    } = props;

    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(()=>{
        axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/cart`, {
            params: {
                lang: router.locale
            },
            withCredentials: true
        })
            .then((res) => {
                dispatch(setCartServerData(res.data));
                dispatch(setCartItemsAmount(res.data.total_amount ?? 0));
            })
            .catch((error) => {console.log(error)});
    }, []);

    const breadcrumbs = pageData?.yoast_head_json?.schema['@graph']?.filter((item:any) => item['@type'] === 'BreadcrumbList')?.[0]?.itemListElement;

    return (
        <SettingsContext.Provider value={{
            settings: settingsData,
            translates: pageData.translated_slugs,
            menus,
            nonce
        }}>
            <Layout>
                <ThanksIntro />
            </Layout>
        </SettingsContext.Provider>
    );
}

export default Thanks;

export const getServerSideProps:GetServerSideProps = async ({locale}) => {
    const apolloClient = getApolloClient();

    const pageRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/pages/`, {
        params: {
            slug: 'thanks',
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

    const nonceRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/nonce`);

    const res = await axios.all([pageRequest, settingsRequest, nonceRequest]).then(axios.spread(function(page, settings, nonce) {
        return {
            page: page.data[0],
            settings: settings.data,
            nonce: nonce.data
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
            nonce: res.nonce.nonce
        }
    }
}