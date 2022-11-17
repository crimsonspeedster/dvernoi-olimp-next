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


interface SubCategoryProps {
    settingsData: any,
    menus: any,
    pageData: any,
    is_product: boolean,
}

const SubCategory:React.FC<SubCategoryProps> = (props) => {
    const {
        settingsData,
        menus,
        pageData,
        is_product,
    } = props;

    const router = useRouter();

    const filterStartIndex:number|undefined = router.query.subcategory_slug?.indexOf('filter');
    const filterEndIndex:number|undefined = router.query.subcategory_slug?.indexOf('apply');

    const [filterItems, setFilterItems] = useState<string[]|undefined>([]);

    useEffect(()=>{

        if (filterStartIndex !== undefined && filterEndIndex !== undefined)
        {
            setFilterItems(router.query.subcategory_slug?.slice(filterStartIndex+1, filterEndIndex).toString().split(','));
        }

    }, [filterEndIndex, filterStartIndex, router.query.subcategory_slug]);

    // const handleClick = (category: string, cat_param: string):void => {
    //     const linkItemsFilter:string|undefined = filterItems?.filter(item => item.includes(category))[0];
    //     const indexInFilterItems:number = filterItems?.findIndex(item => item.includes(category)) ?? 0;
    //     const linkItemsArray:string[] = linkItemsFilter ? linkItemsFilter.split('-') : [];
    //
    //     if (linkItemsFilter && !linkItemsArray.includes(cat_param))
    //     {
    //         filterItems && filterItems.length ? router.push(`/${router.query.slug}/filter/${[...filterItems.filter((item) => item !== linkItemsFilter), `${linkItemsFilter}-or-${cat_param}`]?.join('/')}/apply`) : router.push(`/${router.query.slug}/filter/${linkItemsFilter}-or-${cat_param}/apply`);
    //     }
    //     else if (!linkItemsFilter && !linkItemsArray.includes(cat_param)) {
    //         filterItems && filterItems.length ? router.push(`/${router.query.slug}/filter/${[...filterItems, `${category}-is-${cat_param}`]?.join('/')}/apply`) : router.push(`/${router.query.slug}/filter/${category}-is-${cat_param}/apply`);
    //     }
    //     else if (linkItemsArray.includes(cat_param)) {
    //         const stringWithoutParam:string = linkItemsArray.filter(item => item !== cat_param).join('-');
    //         let filtered_param:string|boolean = false;
    //
    //         if (stringWithoutParam === `${category}-is` || stringWithoutParam === `${category}-or`)
    //         {
    //             filtered_param = false;
    //         }
    //         else if (stringWithoutParam.endsWith('or'))
    //         {
    //             filtered_param = stringWithoutParam.slice(0, -3);
    //         }
    //         else if (stringWithoutParam.includes('is-or'))
    //         {
    //             filtered_param = stringWithoutParam.replace('is-or', 'is');
    //         }
    //         else if(stringWithoutParam.includes('or-or'))
    //         {
    //             filtered_param = stringWithoutParam.replace('or-or', 'or');
    //         }
    //
    //         const filterString:string[]|undefined = filterItems?.filter((item, i) => i !== indexInFilterItems);
    //
    //         if (filtered_param)
    //         {
    //             filterString?.push(filtered_param);
    //         }
    //
    //         if (filterString && filterString.length > 0)
    //         {
    //             router.push(`/${router.query.slug}/filter/${filterString.join('/')}/apply`);
    //         }
    //         else {
    //             setFilterItems([]);
    //             router.push(`/${router.query.slug}`);
    //         }
    //         // filterString && filterString.length > 0 ? router.push(`/${router.query.slug}/filter/${filterString.join('/')}/apply`) : router.push(`/${router.query.slug}`);
    //     }
    // }

    const breadcrumbs = pageData?.yoast_head_json?.schema['@graph']?.filter((item:any) => item['@type'] === 'BreadcrumbList')?.[0]?.itemListElement;

    return (
        <SettingsContext.Provider value={{
            settings: settingsData,
            translates: pageData.translated_slugs,
            menus
        }}>
            <HeadHTML seoPage={pageData.yoast_head_json} />

            <Layout>
                <If condition={!is_product}>
                    <Then>
                        <CatalogCategoryTemplate
                            breadcrumbs={breadcrumbs}
                            pageTitle={pageData.name}
                            childrenCategories={pageData.children_terms}
                        />
                    </Then>

                    <Else>
                        <div>Is Product Page</div>
                    </Else>
                </If>
            </Layout>
        </SettingsContext.Provider>
    )
}

export default SubCategory;

export const getServerSideProps:GetServerSideProps = async ({locale, params, res}) => {
    const apolloClient = getApolloClient();

    const categoryRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/product_cat/`, {
        params: {
            slug: params?.subcategory_slug?.[0] ?? params?.slug,
            lang: locale,
            acf_format: 'standard'
        }
    });

    const productRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_WOO_API}/products`, {
        params: {
            slug: params?.subcategory_slug?.[1] ?? params?.subcategory_slug?.[0] ?? params?.slug,
            lang: locale,
            acf_format: 'standard',
            consumer_key: process.env.NEXT_PUBLIC_ENV_CONSUMER_KEY,
            consumer_secret: process.env.NEXT_PUBLIC_ENV_CONSUMER_SECRET
        }
    });

    const settingsRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/options`, {
        params: {
            lang: locale,
            id: 'acf-theme-general-settings',
            acf_format: 'standard'
        }
    })

    const resData = await axios.all([settingsRequest, categoryRequest, productRequest]).then(axios.spread(function(settings, category, product) {
        return {
            settings: settings.data,
            pageData: product.data.length === 0 ? category.data : product.data,
            is_product: product.data.length > 0
        };
    }));

    if (resData.pageData.length === 0)
    {
        res.writeHead(301, { Location: '/404' });
        res.end();
    }
    else if (resData.is_product && params?.subcategory_slug?.[1] && resData.pageData?.[0]?.category_main?.slug !== params?.subcategory_slug?.[0])
    {
        res.writeHead(301, { Location: '/404' });
        res.end();
    }
    else if (resData.is_product && !params?.subcategory_slug?.[1] && resData.pageData?.[0]?.category_main?.slug !== params?.slug)
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
            pageData: resData.pageData[0],
            is_product: resData.is_product,
        }
    }
}