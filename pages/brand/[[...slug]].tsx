import React, {useContext, useEffect, useState} from "react";
import HeadHTML from "@components/Layout/Head";
import Layout from "@components/Layout";
import {SettingsContext} from "@pages/_app";
import {GetServerSideProps} from "next";
import {getApolloClient} from "@services/graphql/conf/apolloClient";
import axios from "axios";
import {GetMenu} from "@components/Layout/graphql";
import {BrandProp} from "@components/Cards/BrandCard/BrandCard";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import ProductCategoryContent from "@components/ProductCategoryContent/ProductCategoryContent";
import {If, Then} from "react-if";
import styles from "@styles/SingleProduct.module.scss";
import CardSlider from "@components/CardSlider/CardSlider";
import {getCookie} from "cookies-next";
import {ProductCardProps} from "@components/Cards/ProductCard/ProductCard";
import SingleBrandIntro from "@components/SingleBrand/Intro/Intro";
import SingleBrandCollection from "@components/SingleBrand/SingleBrandCollection/SingleBrandCollaction";
import SingleBrandTemplate from "@root/templates/SingleBrandTemplate";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import {setCartItemsAmount, setCartServerData} from "@store/cart";
import {CartServerDataProps} from "@pages/cart";


interface BrandProps {
    pageData: any,
    settingsData: any,
    menus: any,
    reviewed_products: ProductCardProps[],
    posts: BrandProp[],
    total_pages: number,
    current_page: number,
    products: ProductCardProps[],
    categoryData: any,
    nonce: string,
    cartData: CartServerDataProps
}

const Brand:React.FC<BrandProps> = (props) => {
    const {
        pageData,
        settingsData,
        menus,
        posts,
        reviewed_products,
        products,
        total_pages,
        categoryData,
        current_page,
        nonce,
        cartData
    } = props;

    const breadcrumbs = pageData?.yoast_head_json?.schema['@graph']?.filter((item:any) => item['@type'] === 'BreadcrumbList')?.[0]?.itemListElement;

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setCartServerData(cartData));
    }, [dispatch, cartData]);

    const [childPosts, setChildPosts] = useState<BrandProp[]>(posts);
    const [productItems, setProductItems] = useState<ProductCardProps[]>(products);

    useEffect(()=>{
        setProductItems(products);
    }, [products]);

    useEffect(()=>{
        setChildPosts(posts);
    }, [posts]);

    return (
        <>
            <SettingsContext.Provider value={{
                settings: settingsData,
                translates: pageData.translated_slugs,
                menus,
                total_pages,
                page: current_page,
                products_category: pageData.category_main?.slug ?? '',
                nonce
            }}>
                <HeadHTML seoPage={pageData.yoast_head_json} />

                <Layout>
                    <SingleBrandTemplate
                        breadcrumbs={breadcrumbs}
                        title={pageData.title.rendered}
                        content={pageData.content.rendered}
                        posts={childPosts}
                        collectionTitle={'Колекции'}
                        category_filter={categoryData.category_filter}
                        productItems={productItems}
                        setProductItems={setProductItems}
                        priceRange={categoryData.price_range}
                        image={pageData.featured_image_link}
                    />

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
                </Layout>
            </SettingsContext.Provider>
        </>
    );
}

export default Brand;

export const getServerSideProps:GetServerSideProps = async ({locale, params, res, req, query}) => {
    const apolloClient = getApolloClient();

    let filter_items:string[]|undefined = [];

    const filterStartIndex:number = params?.slug?.indexOf('filter') ?? -1;
    const filterEndIndex:number = params?.slug?.indexOf('apply') ?? -1;
    const pageNum:number = params?.slug?.indexOf('page') ?? -1;

    const pageRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/brend/`, {
        params: {
            slug: params?.slug ?? '404',
            lang: locale,
            _embed: true,
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
            page: page.data,
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

    const categoryRequestParams:any = {
        slug: resultDat.page[0].category_main.slug,
        lang: locale,
        consumer_key: process.env.NEXT_PUBLIC_ENV_CONSUMER_KEY,
        consumer_secret: process.env.NEXT_PUBLIC_ENV_CONSUMER_SECRET,
        acf_format: 'standard',
    }

    const productsRequestParams:any = {
        lang: locale,
        category: resultDat.page[0].category_main.slug,
        consumer_key: process.env.NEXT_PUBLIC_ENV_CONSUMER_KEY,
        consumer_secret: process.env.NEXT_PUBLIC_ENV_CONSUMER_SECRET,
        per_page: process.env.NEXT_PUBLIC_ENV_PRODUCTS_PER_PAGE,
        page: pageNum >= 0 && params?.slug && params?.slug?.length >= pageNum + 2 ? parseInt(params?.slug?.[pageNum+1]) : 1,
        acf_format: 'standard',
        ...(query.order) && {order: query.order},
        ...(query.orderBy) && {orderby: query.orderBy}
    };

    if (filterStartIndex >= 0 && filterEndIndex > 0)
    {
        filter_items = params?.slug?.slice(filterStartIndex+1, filterEndIndex).toString().split(',');

        filter_items?.map(item => item.split('-').filter(item => item !== 'is' && item !== 'or'))?.map(item => {
            categoryRequestParams[`filter[${item[0]}]`] = item.filter(subitem => subitem !== item[0]).join(', ');
            productsRequestParams[`filter[${item[0]}]`] = item.filter(subitem => subitem !== item[0]).join(', ');

            return item;
        });
    }

    const categoryRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_WOO_API}/products/categories`, {
        params: categoryRequestParams
    });

    const productsRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/products`, {
        params: productsRequestParams
    });

    const postsRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/brend/`, {
        params: {
            lang: locale,
            _embed: true,
            acf_format: 'standard',
            parent: resultDat.page[0].id
        }
    });

    const subResultDat = await axios.all([postsRequest, categoryRequest, productsRequest]).then(axios.spread(function(posts, category, products) {
        return {
            categoryData: category.data?.[0] ?? {},
            products: products.data.products,
            posts: posts.data,
            current_page: products.data.current_page,
            total_pages: products.data.total_pages
        };
    }));

    let reviewed_products_ids = JSON.parse(getCookie('reviewed_products', {req, res})?.toString() ?? '[]');
    let reviewed_products = [];

    if (getCookie('reviewed_products', {req, res}) && reviewed_products_ids.length > 0)
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
            products: subResultDat.products,
            categoryData: subResultDat.categoryData,
            posts: subResultDat.posts,
            current_page: subResultDat.current_page,
            total_pages: subResultDat.total_pages,
            reviewed_products,
            nonce: resultDat.nonce.nonce,
            cartData: resultDat.cart
        }
    };
}