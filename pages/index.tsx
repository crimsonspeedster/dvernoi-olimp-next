import React, {useEffect} from "react";
import {GetServerSideProps} from "next";
import {getApolloClient} from "@services/graphql/conf/apolloClient";
import axios from "axios";
import {GetMenu} from "@components/Layout/graphql";
import {SettingsContext} from "@pages/_app";
import HeadHTML from "@components/Layout/Head";
import Layout from "@components/Layout";
import HomeTemplate from "@root/templates/Home";

interface HomeProps {
    pageData: any,
}


const Home:React.FC<HomeProps> = (props) => {
    const {
        pageData
    } = props;

    console.log(pageData);

    return (
        <>
            <div>Home Page</div>
        </>
    );
}

export default Home;

export const getServerSideProps:GetServerSideProps = async ({locale}) => {
    // const apolloClient = getApolloClient();

    const pageRequest = axios.get(`https://api.privatbank.ua/p24api/exchange_rates?date=01.12.2014&json`, {
        params: {
            slug: 'home',
            lang: locale,
            acf_format: 'standard'
        }
    });
    //
    // const settingsRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/options`, {
    //     params: {
    //         lang: locale,
    //         id: 'acf-theme-general-settings',
    //         acf_format: 'standard'
    //     }
    // });
    //
    // const recentPosts = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/posts/`, {
    //     params: {
    //         lang: locale,
    //         page: 1,
    //         per_page: 6
    //     }
    // });
    //
    const res = await axios.all([pageRequest]).then(axios.spread(function(page) {
        return {
            page: page.data
        };
    }));
    //
    // const {data: footer_company} = await apolloClient.query({
    //     query: GetMenu,
    //     variables: {
    //         location: 'FOOTER_COMPANY',
    //         lang: locale
    //     },
    // });
    //
    // const {data: footer_questions} = await apolloClient.query({
    //     query: GetMenu,
    //     variables: {
    //         location: 'FOOTER_QUESTIONS',
    //         lang: locale
    //     },
    // });
    //
    // const {data: footer_catalog} = await apolloClient.query({
    //     query: GetMenu,
    //     variables: {
    //         location: 'FOOTER_CATALOG',
    //         lang: locale
    //     },
    // });
    //
    // const {data: header_top} = await apolloClient.query({
    //     query: GetMenu,
    //     variables: {
    //         location: 'HEADER_TOP',
    //         lang: locale
    //     },
    // });
    //
    // const {data: header_catalog} = await apolloClient.query({
    //     query: GetMenu,
    //     variables: {
    //         location: 'HEADER_CATALOG',
    //         lang: locale
    //     },
    // });
    //
    // const {data: catalog_menu} = await apolloClient.query({
    //     query: GetMenu,
    //     variables: {
    //         location: 'CATALOG_MENU',
    //         lang: locale
    //     },
    // });
    //
    // const menus = {
    //     footer_company: footer_company?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
    //     footer_questions: footer_questions?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
    //     footer_catalog: footer_catalog?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
    //     header_top: header_top?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
    //     header_catalog: header_catalog?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
    //     catalog_menu: catalog_menu?.menus?.nodes?.[0]?.menuItems?.nodes ?? []
    // };
    //
    return {
        props: {
            pageData: res.page,
        }
    }
}