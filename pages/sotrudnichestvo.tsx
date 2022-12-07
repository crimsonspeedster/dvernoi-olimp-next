import React from "react";
import HeadHTML from "@components/Layout/Head";
import {SettingsContext} from "@pages/_app";
import Layout from "@components/Layout";
import styles from '@styles/CooperationPage.module.scss';
import {GetServerSideProps} from "next";
import {getApolloClient} from "@services/graphql/conf/apolloClient";
import axios from "axios";
import {GetMenu} from "@components/Layout/graphql";
import classNames from "classnames";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import {PhotoProps} from "@components/About/Intro/Intro";
import {If, Then} from "react-if";
import Image from "next/image";


interface CooperationProps {
    pageData: any,
    settingsData: any,
    menus: any
}

interface CooperationPageProps {
    id: number,
    content: contentProps
    acf: CooperationACFProps
}

interface contentProps {
    rendered: string
}

interface CooperationACFProps {
    top_block: ACFTopProps
}

interface ACFTopProps {
    description_before: string,
    repeater: ACFTOPRepeaterProps[]
}

interface ACFTOPRepeaterProps {
    image: PhotoProps,
    title?: string
}

const Cooperation:React.FC<CooperationProps> = (props) => {
    const {
        pageData,
        settingsData,
        menus
    } = props;

    const breadcrumbs = pageData?.yoast_head_json?.schema['@graph']?.filter((item:any) => item['@type'] === 'BreadcrumbList')?.[0]?.itemListElement;

    console.log(pageData);

    return (
        <SettingsContext.Provider value={{
            settings: settingsData,
            translates: pageData.translated_slugs,
            menus
        }}>
            <Layout>
                <HeadHTML seoPage={pageData.yoast_head_json} />

                <Breadcrumbs
                    list={breadcrumbs}
                />

                <section className={styles['top']}>
                    <div className="container">
                        <div className={classNames('article', styles['top__description'])} dangerouslySetInnerHTML={{__html: pageData.acf.top_block.description_before ?? ''}} />

                        <If condition={pageData.acf.top_block.repeater.length > 0}>
                            <Then>
                                <div className={styles['top__row']}>
                                    {
                                        pageData.acf.top_block.repeater.map((item:ACFTOPRepeaterProps, i:number) => (
                                            <div className={styles['top-item']} key={i}>
                                                <div className={styles['top-item__img']}>
                                                    <Image src={item.image.url} alt={item.image.alt} fill />
                                                </div>

                                                <If condition={item.title}>
                                                    <Then>
                                                        <p className={styles['top-item__description']}>{item.title}</p>
                                                    </Then>
                                                </If>
                                            </div>
                                        ))
                                    }
                                </div>
                            </Then>
                        </If>
                    </div>
                </section>

                <If condition={pageData.content.rendered}>
                    <Then>
                        <section className={classNames('article', styles['content'])}>
                            <div className="container" dangerouslySetInnerHTML={{__html: pageData.content.rendered ?? ''}} />
                        </section>
                    </Then>
                </If>
            </Layout>
        </SettingsContext.Provider>
    );
}

export default Cooperation;

export const getServerSideProps:GetServerSideProps = async ({locale}) => {
    const apolloClient = getApolloClient();

    const pageRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/pages/`, {
        params: {
            slug: 'sotrudnichestvo',
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
    })

    const res = await axios.all([pageRequest, settingsRequest]).then(axios.spread(function(page, settings) {
        return {
            page: page.data[0],
            settings: settings.data
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
            menus
        }
    }
}