import React, {useEffect} from "react";
import CardSlider from "@components/CardSlider/CardSlider";
import {SettingsContext} from "@pages/_app";
import HeadHTML from "@components/Layout/Head";
import Layout from "@components/Layout";
import SinglePostIntro from "@components/SinglePost/Intro/Intro";
import Breadcrumbs from "@components/Breadcrumbs/Breadcrumbs";
import {GetServerSideProps} from "next";
import {getApolloClient} from "@services/graphql/conf/apolloClient";
import axios from "axios";
import {categoriesProps} from "@components/Blog/Intro/BlogIntroCategories";
import {GetMenu} from "@components/Layout/graphql";
import {PostProp} from "@components/Homepage/Posts/Posts";
import {If, Then} from "react-if";
import styles from '@components/SinglePost/Intro/Intro.module.scss'
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {setCartItemsAmount, setCartServerData} from "@store/cart";


interface SinglePostProps {
    pageData: any,
    settingsData: any,
    menus: any,
    posts: PostProp[],
    nonce: string
}

const SinglePost:React.FC<SinglePostProps> = (props) => {
    const {
        pageData,
        settingsData,
        menus,
        posts,
        nonce
    } = props;

    const router = useRouter();

    const breadcrumbs = pageData?.yoast_head_json?.schema['@graph']?.filter((item:any) => item['@type'] === 'BreadcrumbList')?.[0]?.itemListElement;

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

    const PostJsonLD = ():string => {
        return `
            {
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "${process.env.NEXT_PUBLIC_ENV_FRONTEND_LINK}${router.asPath}"
                },
                "headline": "${pageData.title.rendered}",
                "image": "${pageData.featured_image_link}",
                "author": {
                    "@type": "ТРЕБА ДОДАТИ ІНФОРМАЦІЮ",
                    "name": "ТРЕБА ДОДАТИ ІНФОРМАЦІЮ",
                    "url": "ПОСИЛАННЯ НА АВТОРА"
                },
                "publisher": {
                    "@type": "Organization",
                    "name": "${settingsData.company_name}",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "${settingsData.logo.sizes.thumbnail}"
                    }
                },
                "datePublished": "${pageData.locale_date}"
            }
        `;
    }

    return (
        <>
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

                    <SinglePostIntro
                        title={pageData.title}
                        slug={pageData.slug}
                        content={pageData.content}
                        id={pageData.id}
                        locale_date={pageData.locale_date}
                        featured_image_link={pageData.featured_image_link}
                        category_main={pageData.category_main}
                    />

                    <If condition={posts.length > 0}>
                        <Then>
                            <section className={styles['posts-more']}>
                                <div className="container">
                                    <CardSlider
                                        block_title={'Вам будет интересно'}
                                        sliderItems={posts}
                                        perViewAmount={3}
                                        cardType={'post'}
                                        perCard={60}
                                    />
                                </div>
                            </section>
                        </Then>
                    </If>

                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{__html: PostJsonLD()}}
                    />
                </Layout>
            </SettingsContext.Provider>
        </>
    );
}

export default SinglePost;

export const getServerSideProps:GetServerSideProps = async ({locale, params, res}) => {
    const apolloClient = getApolloClient();

    const pageRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/posts/`, {
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

    const nonceRequest = axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_URL}/wp-json/twentytwentytwo-child/v1/nonce`);

    const resultDat = await axios.all([pageRequest, settingsRequest, nonceRequest]).then(axios.spread(function(page, settings, nonce) {
        return {
            page: page.data,
            settings: settings.data,
            nonce: nonce.data
        };
    }));

    if (!params?.slug?.[0] || resultDat.page.length !== 1)
    {
        res.writeHead(301, { Location: '/404' });
        res.end();
    }

    const posts = await axios.get(`${process.env.NEXT_PUBLIC_ENV_APP_API}/posts/`, {
        params: {
            lang: locale,
            _embed: true,
            acf_format: 'standard',
            page: 1,
            per_page: 3,
            exclude: resultDat.page[0].id
        }
    })
        .then((res) => res.data)
        .catch((error) => console.log(error));

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
            posts,
            nonce: resultDat.nonce.nonce
        }
    };
}