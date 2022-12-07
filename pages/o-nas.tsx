import React, {useContext, useState} from "react";
import AboutTemplate from "@root/templates/About";
import axios from "axios";
import {GetServerSideProps} from "next";
import {SettingsContext} from "@pages/_app";
import Layout from "@components/Layout";
import {useQuery} from "@apollo/client";
import {GetMenu} from "@components/Layout/graphql";
import {getApolloClient} from "@services/graphql/conf/apolloClient";
import HeadHTML from "@components/Layout/Head";


interface AboutProps {
    pageData: any,
    settingsData: any,
    menus: any
}

const About:React.FC<AboutProps> = (props) => {
    const {
        pageData,
        settingsData,
        menus
    } = props;

    const breadcrumbs = pageData?.yoast_head_json?.schema['@graph']?.filter((item:any) => item['@type'] === 'BreadcrumbList')?.[0]?.itemListElement;

    return (
        <SettingsContext.Provider value={{
            settings: settingsData,
            translates: pageData.translated_slugs,
            menus
        }}>
            <Layout>
                <HeadHTML seoPage={pageData.yoast_head_json} />

                <AboutTemplate
                    breadcrumbs={breadcrumbs}
                    top_block={pageData.acf.top_block}
                    aboutIcons={pageData.acf.preimushhestva}
                    aboutStory={pageData.acf.istoriya}
                    ourEmployers={pageData.acf.nashi_sotrudniki}
                    mission={pageData.acf.missiya_i_czennosti}
                    videoBlog={pageData.acf.videoblog}
                    contactsData={settingsData.nashi_magaziny}
                    seoBlockContent={pageData.acf.seo_block}
                />
            </Layout>
        </SettingsContext.Provider>
    );
}

export default About;

export const getServerSideProps:GetServerSideProps = async ({locale}) => {
    const apolloClient = getApolloClient();

    const pageRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/pages/`, {
        params: {
            slug: 'o-nas',
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
    })

    const res = await axios.all([pageRequest, settingsRequest]).then(axios.spread(function(page, settings) {
        return {
            page: page.data[0],
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
            pageData: res.page,
            settingsData: res.settings,
            menus
        }
    }
}