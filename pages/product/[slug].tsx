import React, {useEffect} from "react";
import HeadHTML from "@components/Layout/Head";
import {SettingsContext} from "@pages/_app";
import Layout from "@components/Layout";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import {GetServerSideProps} from "next";
import {getApolloClient} from "@services/graphql/conf/apolloClient";
import axios from "axios";
import {GetMenu} from "@components/Layout/graphql";
import {ProductCardProps} from "@components/Cards/ProductCard/ProductCard";
import SingleProductIntro from "@components/SingleProduct/Intro/Intro";
import SingleProductTabs from "@components/SingleProduct/SingleProductTabs/SingleProductTabs";
import BottomTabs from "@components/BottomTabs/BottomTabs";
import CardSlider from "@components/CardSlider/CardSlider";
import {If, Then} from "react-if";
import { getCookies, getCookie, setCookies, removeCookies } from 'cookies-next';
import styles from '@styles/SingleProduct.module.scss';
import {extraAttributesProps} from "@components/SingleProduct/Intro/SingleProductContent";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import {setCartItemsAmount, setCartServerData} from "@store/cart";
import {CartServerDataProps} from "@pages/cart";


interface ProductPageProps {
    pageData: any,
    settingsData: any,
    menus: any,
    products: ProductCardProps[],
    reviewed_products: ProductCardProps[],
    nonce: string,
    cartData: CartServerDataProps
}

const ProductPage:React.FC<ProductPageProps> = (props) => {
    const {
        pageData,
        settingsData,
        menus,
        products,
        reviewed_products,
        nonce,
        cartData
    } = props;

    const breadcrumbs = pageData?.yoast_head_json?.schema['@graph']?.filter((item:any) => item['@type'] === 'BreadcrumbList')?.[0]?.itemListElement;

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setCartServerData(cartData));
    }, [dispatch, cartData]);

    useEffect(()=>{
        const reviewed_products_ids:number[] = JSON.parse(getCookie('reviewed_products')?.toString() ?? '[]');

        reviewed_products_ids.filter(item => item === pageData.id).length  === 0 ? setCookies('reviewed_products', [...reviewed_products_ids, pageData.id], {maxAge: 3600*24*7}) : null;
    }, [pageData]);

    return (
        <SettingsContext.Provider value={{
            settings: settingsData,
            translates: pageData.translated_slugs,
            menus,
            nonce
        }}>
            <HeadHTML seoPage={pageData.yoast_head_json} />

            <Layout>
                <Breadcrumbs
                    list={breadcrumbs}
                />

                <SingleProductIntro
                    id={pageData.id}
                    title={pageData.name}
                    slug={pageData.slug}
                    attributes={pageData.attributes.filter((item:any) => item?.variation && item?.visible)}
                    sku={pageData.sku}
                    variation_array={pageData.variation_array}
                    type={pageData.type}
                    default_attributes={pageData.default_attributes}
                    images={pageData.images}
                    in_stock={pageData.in_stock}
                    regular_price={pageData.price.default}
                    extra_attributes={pageData.acf?.extra_attributes ? pageData.acf?.extra_attributes : []}
                />

                <SingleProductTabs
                    acf={pageData.acf}
                    description={pageData.description}
                />

                <If condition={products.length > 0}>
                    <Then>
                        <section className={styles['section-slider--same']}>
                            <div className="container">
                                <CardSlider
                                    block_title={'Похожие товары'}
                                    sliderItems={products}
                                    perViewAmount={4}
                                    cardType={'product'}
                                    perCard={0}
                                />
                            </div>
                        </section>
                    </Then>
                </If>

                <If condition={reviewed_products.length > 0}>
                    <Then>
                        <section className={styles['section-slider--reviewed']}>
                            <div className="container">
                                <CardSlider
                                    block_title={'Ранее просмотренные товары'}
                                    sliderItems={reviewed_products}
                                    perViewAmount={4}
                                    cardType={'product'}
                                    perCard={0}
                                />
                            </div>
                        </section>
                    </Then>
                </If>

                <BottomTabs />
            </Layout>
        </SettingsContext.Provider>
    );
}

export default ProductPage;

export const getServerSideProps:GetServerSideProps = async ({locale, params, res, req}) => {
    const apolloClient = getApolloClient();

    const pageRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_WOO_API}/products`, {
        params: {
            slug: params?.slug ?? '404',
            lang: locale,
            consumer_key: process.env.NEXT_PUBLIC_ENV_CONSUMER_KEY,
            consumer_secret: process.env.NEXT_PUBLIC_ENV_CONSUMER_SECRET,
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

    const cartRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/cart`, {
        headers: {
            'X-Headless-WP': true,
            'X-WC-Session': getCookie('X-WC-Session', {req, res})
        }
    });

    const nonceRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/nonce`);

    const resultDat = await axios.all([pageRequest, settingsRequest, nonceRequest, cartRequest]).then(axios.spread(function(page, settings, nonce, cart) {
        return {
            page: page.data ?? [],
            settings: settings.data,
            nonce: nonce.data,
            cart: cart.data
        };
    }));

    if (!params?.slug?.[0] || resultDat.page.length !== 1)
    {
        res.writeHead(301, { Location: '/404' });
        res.end();
    }

    const products = await axios.get(`${process.env.NEXT_PUBLIC_ENV_WOO_API}/products`, {
        params: {
            lang: locale,
            consumer_key: process.env.NEXT_PUBLIC_ENV_CONSUMER_KEY,
            consumer_secret: process.env.NEXT_PUBLIC_ENV_CONSUMER_SECRET,
            acf_format: 'standard',
            page: 1,
            per_page: 16,
            ...(resultDat.page[0]?.category_main?.term_id) && {category: resultDat.page[0].category_main.term_id},
            exclude: resultDat.page[0].id
        }
    })
        .then((result) => result.data)
        .catch((err) => console.log(err));

    let reviewed_products_ids = [];
    let reviewed_products = [];

    if (getCookie('reviewed_products', {req, res}))
    {
        reviewed_products_ids = JSON.parse(getCookie('reviewed_products', {req, res})?.toString() ?? '[]').filter((item: number) => item !== resultDat.page[0].id);

        if (reviewed_products_ids.length > 0)
        {
            reviewed_products = await axios.get(`${process.env.NEXT_PUBLIC_ENV_WOO_API}/products`, {
                params: {
                    lang: locale,
                    consumer_key: process.env.NEXT_PUBLIC_ENV_CONSUMER_KEY,
                    consumer_secret: process.env.NEXT_PUBLIC_ENV_CONSUMER_SECRET,
                    acf_format: 'standard',
                    page: 1,
                    per_page: 16,
                    include: reviewed_products_ids.join(','),
                }
            })
                .then((result) => result.data)
                .catch((err) => console.log(err));
        }
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
            pageData: resultDat.page[0],
            settingsData: resultDat.settings,
            menus,
            products,
            reviewed_products,
            nonce: resultDat.nonce.nonce,
            cartData: resultDat.cart
        }
    };
}