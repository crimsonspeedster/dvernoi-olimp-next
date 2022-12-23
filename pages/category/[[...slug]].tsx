import React, {useEffect, useState} from "react";
import HeadHTML from "@components/Layout/Head";
import Layout from "@components/Layout";
import {SettingsContext} from "@pages/_app";
import {GetServerSideProps} from "next";
import {getApolloClient} from "@services/graphql/conf/apolloClient";
import axios from "axios";
import {GetMenu} from "@components/Layout/graphql";
import BlogTemplate from "@root/templates/Blog";
import {categoriesProps} from "@components/Blog/Intro/BlogIntroCategories";
import {PostProp} from "@components/Homepage/Posts/Posts";
import {useRouter} from "next/router";
import FourOhFour from "@pages/404";
import {useDispatch} from "react-redux";
import {setCartItemsAmount, setCartServerData} from "@store/cart";
import {CartServerDataProps} from "@pages/cart";
import {getCookie} from "cookies-next";


interface BlogPageProps {
    pageData: any,
    settingsData: any,
    menus: any,
    posts: PostProp[],
    total_pages: number,
    categories: categoriesProps[],
    page: number,
    nonce: string,
    cartData: CartServerDataProps
}

const CategoryPage:React.FC<BlogPageProps> = (props) => {
    const {
        pageData,
        settingsData,
        menus,
        posts,
        total_pages,
        categories,
        page,
        nonce,
        cartData
    } = props;

    const [postItems, setPostItems] = useState<PostProp[]>(posts);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setCartServerData(cartData));
    }, [dispatch, cartData]);

    useEffect(() => {
        setPostItems(posts);
    }, [posts]);

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
                    <BlogTemplate
                        breadcrumbs={breadcrumbs}
                        pageTitle={'Блог'}
                        categories={categories}
                        posts={postItems}
                        updatePosts={setPostItems}
                        seoBlock={pageData.acf.seo_block}
                    />
                </Layout>

            </SettingsContext.Provider>
        </>
    );
}

export default CategoryPage;

export const getServerSideProps:GetServerSideProps = async ({locale, params, res, req}) => {
    const apolloClient = getApolloClient();

    const pageRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/categories/`, {
        params: {
            slug: params?.slug?.[0] ?? 'uncategorized',
            lang: locale,
            acf_format: 'standard'
        }
    });

    const posts = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/posts/`, {
        params: {
            per_page: process.env.NEXT_PUBLIC_ENV_POSTS_PER_PAGE,
            page: !isNaN(parseInt(params?.slug?.[params?.slug?.length-1].toString() ?? '1')) ? parseInt(params?.slug?.[params?.slug?.length-1].toString() ?? '1') : 1,
            lang: locale,
            tax_name: 'category',
            category_slug: params?.slug?.[0] ?? 'uncategorized',
            _embed: true,
            order: 'asc'
        }
    })

    const categories = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/categories/`, {
        params: {
            lang: locale,
            hide_empty: true,
        }
    })

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

    const nonceRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/nonce`);

    const resultDat = await axios.all([pageRequest, settingsRequest, posts, categories, nonceRequest, cartRequest]).then(axios.spread(function(page, settings, posts, categories, nonce, cart) {
        return {
            page: page.data[0],
            settings: settings.data,
            posts: posts.data,
            categories: categories.data,
            total_pages: parseInt(posts?.headers?.['x-wp-totalpages']?.toString() ?? '1'),
            nonce: nonce.data,
            cart: cart.data
        };
    }));

    if (!params?.slug?.[0] || resultDat.categories.filter((item: categoriesProps) => item.slug === params?.slug?.[0]).length === 0)
    {
        res.writeHead(301, { Location: '/404' });
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

    return {
        props: {
            pageData: resultDat.page,
            settingsData: resultDat.settings,
            menus,
            posts: resultDat.posts,
            total_pages: resultDat.total_pages,
            categories: resultDat.categories,
            page: parseInt(params?.slug?.[params?.slug?.length-1].toString() ?? '1'),
            nonce: resultDat.nonce.nonce,
            cartData: resultDat.cart
        }
    }
}