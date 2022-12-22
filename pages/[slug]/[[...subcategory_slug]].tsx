import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import {GetServerSideProps} from "next";
import {getApolloClient} from "@services/graphql/conf/apolloClient";
import axios from "axios";
import {GetMenu} from "@components/Layout/graphql";
import HeadHTML from "@components/Layout/Head";
import {SettingsContext} from "@pages/_app";
import Layout from "@components/Layout";
import CatalogCategoryTemplate from "@root/templates/CatalogCategoryTemplate";
import {categoriesProps} from "@components/Blog/Intro/BlogIntroCategories";
import {Else, If, Then} from "react-if";
import {ProductCardProps} from "@components/Cards/ProductCard/ProductCard";
import styles from "@styles/SingleProduct.module.scss";
import CardSlider from "@components/CardSlider/CardSlider";
import {getCookie} from "cookies-next";
import Callback from "@components/Callback/Callback";
import BottomTabs from "@components/BottomTabs/BottomTabs";
import SeoBlock from "@components/SeoBlock/SeoBlock";
import classNames from "classnames";
import {FilterAttrsProps, FilterValuesProps} from "@components/ProductCategoryContent/ProductCategorySidebar";
import {removeMultipleSpaces} from "@utils/stringHelper";
import {useDispatch} from "react-redux";
import {setCartItemsAmount, setCartServerData} from "@store/cart";
import {CartServerDataProps} from "@pages/cart";


interface SubCategoryProps {
    settingsData: any,
    menus: any,
    pageData: any,
    products: ProductCardProps[],
    reviewed_products: ProductCardProps[],
    total_pages: number,
    current_page: number,
    nonce: string,
    cartData: CartServerDataProps
}

const SubCategory:React.FC<SubCategoryProps> = (props) => {
    const {
        settingsData,
        menus,
        pageData,
        products,
        reviewed_products,
        total_pages,
        current_page,
        nonce,
        cartData
    } = props;

    const [productItems, setProductItems] = useState<ProductCardProps[]>(products);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setCartServerData(cartData));
    }, [dispatch, cartData]);

    useEffect(()=>{
        setProductItems(products);
    }, [products]);

    const [pageTitle, setPageTitle] = useState<string>(pageData.name);
    const [seoTitle, setSeoTitle] = useState<string>(`${pageData.name} - купить ${pageData.name} в Украине, цена на ${pageData.name} в интернет магазине дверей ${process.env.NEXT_PUBLIC_ENV_FRONTEND_LINK}`);
    const [seoDescription, setSeoDescription] = useState<string>(`${pageData.name} ✅  - купить по самым лучшим ценам в Украине 🔝 , заказать ${pageData.name} прямо сейчас ✅ в интернет магазине ${process.env.NEXT_PUBLIC_ENV_FRONTEND_LINK}`);

    useEffect(()=>{
        let seoTitle:string = pageData.name,
            seoDescription:string = pageData.name;

        const choosedAttributes:string[] = [];

        pageData.category_filter.filter((item:FilterAttrsProps) => item.isChoosed).forEach((item:FilterAttrsProps) => {
            item.values.map(subitem => {
                if (subitem.isChoosed)
                {
                    choosedAttributes.push(subitem.value);
                }

                return subitem;
            });

            return item;
        });

        seoTitle = seoTitle += ` ${choosedAttributes.join(', ')}`;
        seoDescription = seoTitle += ` ${choosedAttributes.join(', ')}`;

        setPageTitle(removeMultipleSpaces(`${pageData.name} ${choosedAttributes.join(', ')}`));
        setSeoTitle(removeMultipleSpaces(`${seoTitle} - купить ${seoTitle} в Украине, цена на ${seoTitle} в интернет магазине дверей ${process.env.NEXT_PUBLIC_ENV_FRONTEND_TITLE}`));
        setSeoDescription(removeMultipleSpaces(`${seoDescription} ✅  - купить по самым лучшим ценам в Украине 🔝 , заказать ${seoDescription} прямо сейчас ✅ в интернет магазине ${process.env.NEXT_PUBLIC_ENV_FRONTEND_TITLE}`));
    }, [pageData.name, pageData.category_filter]);

    const breadcrumbs = pageData?.yoast_head_json?.schema['@graph']?.filter((item:any) => item['@type'] === 'BreadcrumbList')?.[0]?.itemListElement;

    return (
        <SettingsContext.Provider value={{
            settings: settingsData,
            translates: pageData.translated_slugs,
            menus,
            total_pages,
            page: current_page,
            nonce
        }}>
            <HeadHTML
                seoPage={{
                    ...pageData.yoast_head_json,
                    title: seoTitle,
                    og_title: seoTitle,
                    og_description: seoDescription,
                    description: seoDescription
                }}
            />

            <Layout>
                <CatalogCategoryTemplate
                    breadcrumbs={breadcrumbs}
                    pageTitle={pageTitle}
                    childrenCategories={pageData.children_terms}
                    category_filter={pageData.category_filter}
                    productItems={productItems}
                    setProductItems={setProductItems}
                    priceRange={pageData.price_range}
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

                <Callback />

                {
                    pageData.acf?.seo_block?.title &&
                    <SeoBlock
                        seoBlock={pageData.acf?.seo_block}
                    />
                }

                <BottomTabs
                    classNameStr={classNames(styles['section-slider--bottom'], pageData.acf?.seo_block?.title ? '' : styles.alone)}
                />
            </Layout>
        </SettingsContext.Provider>
    )
}

export default SubCategory;

export const getServerSideProps:GetServerSideProps = async ({locale, params, res, req, query}) => {
    const apolloClient = getApolloClient();

    let filter_items:string[]|undefined = [];

    const filterStartIndex:number = params?.subcategory_slug?.indexOf('filter') ?? -1;
    const filterEndIndex:number = params?.subcategory_slug?.indexOf('apply') ?? -1;
    const pageNum:number = params?.subcategory_slug?.indexOf('page') ?? -1;

    const categoryRequestParams:any = {
        slug: params?.subcategory_slug?.[0] === 'filter' || params?.subcategory_slug?.[0] === 'page' ? params?.slug : params?.subcategory_slug?.[0] ?? params?.slug,
        lang: locale,
        consumer_key: process.env.NEXT_PUBLIC_ENV_CONSUMER_KEY,
        consumer_secret: process.env.NEXT_PUBLIC_ENV_CONSUMER_SECRET,
        acf_format: 'standard',
    }

    const productsRequestParams:any = {
        lang: locale,
        category: params?.subcategory_slug?.[0] === 'filter' || params?.subcategory_slug?.[0] === 'page' ? params?.slug : params?.subcategory_slug?.[0] ?? params?.slug,
        consumer_key: process.env.NEXT_PUBLIC_ENV_CONSUMER_KEY,
        consumer_secret: process.env.NEXT_PUBLIC_ENV_CONSUMER_SECRET,
        per_page: process.env.NEXT_PUBLIC_ENV_PRODUCTS_PER_PAGE,
        page: pageNum >= 0 && params?.subcategory_slug && params?.subcategory_slug?.length >= pageNum + 2 ? parseInt(params?.subcategory_slug?.[pageNum+1]) : 1,
        acf_format: 'standard',
        ...(query.order) && {order: query.order},
        ...(query.orderBy) && {orderby: query.orderBy}
    };

    if (filterStartIndex >= 0 && filterEndIndex > 0)
    {
        filter_items = params?.subcategory_slug?.slice(filterStartIndex+1, filterEndIndex).toString().split(',');

        filter_items?.map(item => item.split('-').filter(item => item !== 'is' && item !== 'or'))?.map(item => {
            categoryRequestParams[`filter[${item[0]}]`] = item.filter(subitem => subitem !== item[0]).join(', ');
            productsRequestParams[`filter[${item[0]}]`] = item.filter(subitem => subitem !== item[0]).join(', ');

            return item;
        });
    }

    const nonceRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/nonce`);

    const categoryRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_WOO_API}/products/categories`, {
        params: categoryRequestParams
    });

    const productsRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/products`, {
        params: productsRequestParams
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

    const resData = await axios.all([settingsRequest, categoryRequest, productsRequest, nonceRequest, cartRequest]).then(axios.spread(function(settings, category, products, nonce, cart) {
        return {
            settings: settings.data,
            pageData: category.data?.[0] ?? {},
            products: products.data.products,
            current_page: products.data.current_page,
            total_pages: products.data.total_pages,
            nonce: nonce.data,
            cart: cart.data
        };
    }));

    if (!resData.pageData.id)
    {
        res.writeHead(301, { Location: '/404' });
        res.end();
    }

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

    const {data: shop_addresses} = await apolloClient.query({
        query: GetMenu,
        variables: {
            location: 'SHOP_ADDRESSES',
            lang: locale
        },
    });

    const menus = {
        footer_company: footer_company?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
        footer_questions: footer_questions?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
        footer_catalog: footer_catalog?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
        header_top: header_top?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
        header_catalog: header_catalog?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
        catalog_menu: catalog_menu?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
        shop_addresses: shop_addresses?.menus?.nodes?.[0]?.menuItems?.nodes ?? [],
    };

    return {
        props: {
            settingsData: resData.settings,
            menus,
            pageData: resData.pageData,
            products: resData.products ?? [],
            current_page: resData.current_page,
            total_pages: resData.total_pages,
            reviewed_products,
            nonce: resData.nonce.nonce,
            cartData: resData.cart
        }
    }
}