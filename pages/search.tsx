import React, {useEffect, useState} from "react";
import {SettingsContext} from "@pages/_app";
import Layout from "@components/Layout";
import {GetServerSideProps} from "next";
import {getApolloClient} from "@services/graphql/conf/apolloClient";
import axios from "axios";
import {GetMenu} from "@components/Layout/graphql";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import ProductCategoryContent from "@components/ProductCategoryContent/ProductCategoryContent";
import {Else, If, Then} from "react-if";
import Callback from "@components/Callback/Callback";
import SeoBlock from "@components/SeoBlock/SeoBlock";
import BottomTabs from "@components/BottomTabs/BottomTabs";
import SearchIntro from "@components/Search/Intro/Intro";
import {ProductCardProps} from "@components/Cards/ProductCard/ProductCard";
import {useRouter} from "next/router";
import HeadHTML from "@components/Layout/Head";
import {useDispatch} from "react-redux";
import {setCartItemsAmount, setCartServerData} from "@store/cart";
import {getCookie} from "cookies-next";
import {CartServerDataProps} from "@pages/cart";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";


interface SearchProps {
    pageData: any,
    settingsData: any,
    menus: any,
    products: ProductCardProps[],
    total_pages: number,
    page: number,
    nonce: string,
    cartData: CartServerDataProps
}

const Search:React.FC<SearchProps> = (props) => {
    const {
        pageData,
        settingsData,
        menus,
        products,
        total_pages,
        page,
        nonce,
        cartData
    } = props;

    const router = useRouter();
    const {t} = useTranslation('common');

    const [isOpenFilter, setIsOpenFilter] = useState<boolean>(false);
    const [ isMobile, setIsMobile ] = useState(false);
    const [productItems, setProductItems] = useState<ProductCardProps[]>(products);
    const [pageNumber, setPageNumber] = useState<number>(page);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setCartServerData(cartData));
    }, [dispatch, cartData]);

    useEffect(() => {
        setProductItems(products);
    }, [products]);

    useEffect(()=>{
        setIsMobile(window.innerWidth <= 991);
    }, []);

    const breadcrumbs = pageData?.yoast_head_json?.schema['@graph']?.filter((item:any) => item['@type'] === 'BreadcrumbList')?.[0]?.itemListElement;

    return (
        <SettingsContext.Provider value={{
            settings: settingsData,
            translates: pageData.translated_slugs,
            menus,
            total_pages,
            page,
            nonce
        }}>
            <HeadHTML seoPage={pageData.yoast_head_json} />

            <Layout>
                <Breadcrumbs list={breadcrumbs} />

                <SearchIntro title={pageData.title.rendered} />

                <If condition={productItems.length > 0}>
                    <Then>
                        <ProductCategoryContent
                            isSearchPage={true}
                            category_filter={[]}
                            isOpenFilter={isOpenFilter}
                            setIsOpenFilter={setIsOpenFilter}
                            products={productItems}
                            setProductItems={setProductItems}
                        />
                    </Then>

                    <Else>
                        <div style={{textAlign: "center", marginBottom: "40px", fontSize: "24px"}}>{t('nothingFound')}</div>
                    </Else>
                </If>

                <If condition={!isMobile}>
                    <Then>
                        <Callback />

                        <If condition={pageData.acf.seo_block?.title}>
                            <Then>
                                <SeoBlock
                                    seoBlock={pageData.acf.seo_block}
                                />
                            </Then>
                        </If>

                        <BottomTabs />
                    </Then>
                </If>
            </Layout>
        </SettingsContext.Provider>
    );
}

export default Search;

export const getServerSideProps:GetServerSideProps = async ({locale, res, req, query}) => {
    const apolloClient = getApolloClient();

    const pageRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/pages/`, {
        params: {
            slug: 'search',
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

    const productsRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_WOO_API}/products`, {
        params: {
            lang: locale,
            search: query.s ?? '',
            consumer_key: process.env.NEXT_PUBLIC_ENV_CONSUMER_KEY,
            consumer_secret: process.env.NEXT_PUBLIC_ENV_CONSUMER_SECRET,
            acf_format: 'standard',
            per_page: process.env.NEXT_PUBLIC_ENV_PRODUCTS_PER_PAGE,
            page: parseInt(query.page?.toString() ?? '1'),
            ...(query.orderBy) && {orderBy: query.orderBy},
            ...(query.order) && {order: query.order}
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

    const nonceRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/nonce`);

    const resultData = await axios.all([pageRequest, settingsRequest, productsRequest, nonceRequest, cartRequest]).then(axios.spread(function(page, settings, products, nonce, cart) {
        if (!page.data?.[0])
        {
            res.writeHead(404, { Location: '/404' });
            res.end();
        }

        return {
            page: page.data[0],
            settings: settings.data,
            products: products.data,
            total_pages: parseInt(products?.headers?.['x-wp-totalpages']?.toString() ?? '1'),
            nonce: nonce.data,
            cart: cart.data
        };
    }));

    if (!resultData.page)
    {
        res.writeHead(404, { Location: '/404' });
        res.end();
    }
    else if(!query.s)
    {
        res.writeHead(301, { Location: '/' });
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
            pageData: resultData.page,
            settingsData: resultData.settings,
            menus,
            products: resultData.products,
            total_pages: resultData.total_pages,
            page: parseInt(query.page?.toString() ?? '1'),
            nonce: resultData.nonce.nonce,
            cartData: resultData.cart,
            ...(await serverSideTranslations(locale ?? '', ['common']))
        }
    }
}