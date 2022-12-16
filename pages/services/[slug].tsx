import React, {ReactElement, useEffect} from "react";
import {GetServerSideProps} from "next";
import {getApolloClient} from "@services/graphql/conf/apolloClient";
import axios from "axios";
import {GetMenu} from "@components/Layout/graphql";
import {SettingsContext} from "@pages/_app";
import HeadHTML from "@components/Layout/Head";
import Layout from "@components/Layout";
import Measurement from "@root/templates/services/Measurement";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import SingleDefault from "@root/templates/SingleDefault/SingleDefault";
import Credit from "@root/templates/services/Credit";
import MontageTemplate from "@root/templates/services/Montage";
import Error from "next/error";
import FourOhFour from "@pages/404";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import {setCartItemsAmount, setCartServerData} from "@store/cart";


interface ServiceSingleProps {
    pageData: any,
    settingsData: any,
    menus: any,
    nonce: string
}

const ServiceSingle:React.FC<ServiceSingleProps> = (props) => {
    const {
        pageData,
        settingsData,
        menus,
        nonce
    } = props;

    const dispatch = useDispatch();
    const router = useRouter();

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

    const breadcrumbs = pageData?.yoast_head_json?.schema['@graph']?.filter((item:any) => item['@type'] === 'BreadcrumbList')?.[0]?.itemListElement;

    const getTemplate = (name:string):ReactElement => {
        switch (name) {
            case 'service-templates/measurement.php':
                return (
                    <Measurement
                        title={pageData.title.rendered}
                        acf={pageData.acf}
                        content={pageData.content.rendered}
                    />
                );
            case 'service-templates/credit.php':
                return (
                    <Credit
                        title={pageData.title.rendered}
                        acf={pageData.acf}
                    />
                );
            case 'service-templates/montage.php':
                return (
                    <MontageTemplate
                        title={pageData.title.rendered}
                        acf={pageData.acf}
                    />
                );
            default:
                return (
                    <SingleDefault
                        title={pageData.title.rendered}
                        content={pageData.content.rendered}
                    />
                )
        }
    }

    return (
        <SettingsContext.Provider value={{
            settings: settingsData,
            translates: pageData.translated_slugs,
            menus,
            nonce
        }}>
            <HeadHTML seoPage={pageData.yoast_head_json} />

            <Layout>
                <Breadcrumbs list={breadcrumbs} />

                {
                    getTemplate(pageData.template)
                }
            </Layout>
        </SettingsContext.Provider>
    );
};

export default ServiceSingle;

export const getServerSideProps:GetServerSideProps = async ({locale, params, res}) => {
    const apolloClient = getApolloClient();

    const pageRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/services/`, {
        params: {
            slug: params?.slug ?? '',
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

    const nonceRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/nonce`);

    const resultData = await axios.all([pageRequest, settingsRequest, nonceRequest]).then(axios.spread(function(page, settings, nonce) {
        return {
            page: page.data?.[0] ?? {},
            settings: settings.data,
            nonce: nonce.data
        };
    }));

    if (!resultData.page.id)
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
            pageData: resultData.page,
            settingsData: resultData.settings,
            menus,
            nonce: resultData.nonce.nonce
        }
    }
}