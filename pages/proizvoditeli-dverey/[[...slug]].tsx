import React, {useEffect, useState} from "react";
import HeadHTML from "@components/Layout/Head";
import {SettingsContext} from "@pages/_app";
import Layout from "@components/Layout";
import {GetServerSideProps} from "next";
import {getApolloClient} from "@services/graphql/conf/apolloClient";
import {GetMenu} from "@components/Layout/graphql";
import axios from "axios";
import BrandsIntro from "@components/Brands/Intro/Intro";
import {categoriesProps} from "@components/Blog/Intro/BlogIntroCategories";
import {BrandProp} from "@components/Cards/BrandCard/BrandCard";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import {setCartItemsAmount, setCartServerData} from "@store/cart";
import {CartServerDataProps} from "@pages/cart";
import {getCookie} from "cookies-next";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";


interface BrandsProps {
    pageData: any,
    settingsData: any,
    menus: any,
    page: number,
    total_pages: number,
    categories: categoriesProps[],
    posts: BrandProp[],
    nonce: string,
    cartData: CartServerDataProps
}

const Brands:React.FC<BrandsProps> = (props) => {
    const {
        pageData,
        settingsData,
        menus,
        page,
        total_pages,
        posts,
        categories,
        nonce,
        cartData
    } = props;

    const [postItems, setPostItems] = useState<BrandProp[]>(posts);

    useEffect(() => {
        setPostItems(posts);
    }, [posts]);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setCartServerData(cartData));
    }, [dispatch, cartData]);

    const breadcrumbs = pageData?.yoast_head_json?.schema['@graph']?.filter((item:any) => item['@type'] === 'BreadcrumbList')?.[0]?.itemListElement;

    return (
        <>
            <SettingsContext.Provider value={{
                settings: settingsData,
                translates: pageData.translated_slugs,
                menus,
                total_pages,
                nonce
            }}>
                <HeadHTML seoPage={pageData.yoast_head_json} />

                <Layout>
                    <Breadcrumbs
                        list={breadcrumbs}
                    />

                    <BrandsIntro
                        title={pageData.title.rendered}
                        categories={categories}
                        posts={postItems}
                        updatePosts={setPostItems}
                    />
                </Layout>
            </SettingsContext.Provider>
        </>
    );
}

export default Brands;

export const getServerSideProps:GetServerSideProps = async ({locale, params, res, req}) => {
    const apolloClient = getApolloClient();

    const pageRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/pages/`, {
        params: {
            slug: 'proizvoditeli-dverey',
            lang: locale,
            acf_format: 'standard'
        }
    });

    const brands = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/brend/`, {
        params: {
            per_page: process.env.NEXT_PUBLIC_ENV_BRAND_PER_PAGE,
            page: !isNaN(parseInt(params?.slug?.[params?.slug?.length-1].toString() ?? '1')) ? parseInt(params?.slug?.[params?.slug?.length-1].toString() ?? '1') : 1,
            parent: 0,
            lang: locale,
            _embed: true,
            order: 'asc'
        }
    })

    const brands_cats = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/brands-category/`, {
        params: {
            lang: locale,
            hide_empty: true,
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

    const settingsRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/options`, {
        params: {
            lang: locale,
            id: 'acf-theme-general-settings',
            acf_format: 'standard'
        }
    })

    const nonceRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/nonce`);

    const resData = await axios.all([pageRequest, settingsRequest, brands, brands_cats, nonceRequest, cartRequest]).then(axios.spread(function(page, settings, brands, brands_cats, nonce, cart) {
        if (!page.data?.[0])
        {
            res.writeHead(404, { Location: '/404' });
            res.end();
        }

        return {
            page: page.data[0],
            settings: settings.data,
            posts: brands.data,
            categories: brands_cats.data,
            total_pages: parseInt(brands?.headers?.['x-wp-totalpages']?.toString() ?? '1'),
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
            total_pages: resData.total_pages,
            categories: resData.categories,
            posts: resData.posts,
            nonce: resData.nonce.nonce,
            page: parseInt(params?.slug?.[params?.slug?.length-1].toString() ?? '1'),
            cartData: resData.cart,
            ...(await serverSideTranslations(locale ?? '', ['common']))
        }
    }
}