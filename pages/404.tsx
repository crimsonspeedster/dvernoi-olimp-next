import React from "react";
import NotFountIntro from "@components/NotFound/Intro";
import {GetStaticProps} from "next";
import {getApolloClient} from "@services/graphql/conf/apolloClient";
import axios from "axios";
import {GetMenu} from "@components/Layout/graphql";
import Layout from "@components/Layout";
import {SettingsContext} from "@pages/_app";

interface FourOhFourProps {
    settingsData: any,
    menus: any,
    pageData: any
}


const FourOhFour:React.FC<FourOhFourProps> = ({settingsData, pageData, menus}) => (
    <SettingsContext.Provider value={{
        settings: settingsData,
        translates: pageData.translated_slugs,
        menus
    }}>
        <Layout>
            <NotFountIntro />
        </Layout>
    </SettingsContext.Provider>
);

export default FourOhFour;

export const getStaticProps:GetStaticProps = async ({locale}) => {
    const apolloClient = getApolloClient();

    const settingsRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/options`, {
        params: {
            lang: locale,
            id: 'acf-theme-general-settings',
            acf_format: 'standard'
        }
    })

    const res = await axios.all([settingsRequest])
        .then(axios.spread(function (settings) {
            return {
                settings: settings.data
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
            settingsData: res.settings,
            pageData: {
                translated_slugs: [
                    {
                        lang: 'ru',
                        slug: 'home'
                    },
                    {
                        lang: 'uk',
                        slug: 'home'
                    },
                ]
            },
            menus
        }
    }
}