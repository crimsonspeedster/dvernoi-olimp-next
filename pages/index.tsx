import React, {useEffect} from "react";
import {GetServerSideProps} from "next";
import {getApolloClient} from "@services/graphql/conf/apolloClient";
import axios from "axios";
import {GetMenu} from "@components/Layout/graphql";
import {SettingsContext} from "@pages/_app";
import HeadHTML from "@components/Layout/Head";
import Layout from "@components/Layout";
import HomeTemplate from "@root/templates/Home";
import {useDispatch, useSelector} from "react-redux";
import {selectAllCartData, setCartItemsAmount, setCartServerData} from "@store/cart";
import {useRouter} from "next/router";

interface HomeProps {
    pageData: any,
    settingsData: any,
    menus: any,
    recentPosts: any,
    nonce: string
}


const Home:React.FC<HomeProps> = (props) => {
    const {
        pageData,
        settingsData,
        menus,
        recentPosts,
        nonce
    } = props;

    const router = useRouter();
    const dispatch = useDispatch();

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

                    <HomeTemplate
                        seoBlockContent={pageData.acf.seo_block}
                        work_parts={pageData.acf.work_parts}
                        partners={pageData.acf.partners}
                        help={pageData.acf.help}
                        causes={pageData.acf.causes}
                        door_group={pageData.acf.door_group}
                        novelties={pageData.acf.novelties}
                        last_video={pageData.acf.last_video}
                        recentPosts={recentPosts}
                        hit_prodazh={pageData.acf.hit_prodazh}
                        top_group={pageData.acf.top_group}
                    />
                </Layout>
            </SettingsContext.Provider>
        </>
    );
}

export default Home;

export const getServerSideProps:GetServerSideProps = async ({locale}) => {
    const apolloClient = getApolloClient();

    const pageRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/pages/`, {
        params: {
            slug: 'home',
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

    const recentPosts = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/posts/`, {
        params: {
            lang: locale,
            page: 1,
            per_page: 6
        }
    });

    const nonceRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/nonce`);

    const res = await axios.all([pageRequest, settingsRequest, recentPosts, nonceRequest]).then(axios.spread(function(page, settings, recentPosts, nonce) {
        return {
            page: page.data[0],
            settings: settings.data,
            recentPosts: recentPosts.data,
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
            recentPosts: res.recentPosts,
            menus,
            nonce: res.nonce.nonce
        }
    }
}