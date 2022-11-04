import React from "react";
import Head from 'next/head';
import {useRouter} from "next/router";
import {If, Then} from "react-if";


interface HeadHTMLProps {
    seoPage: seoPageProps
}

interface seoPageProps {
    og_locale: string,
    og_site_name: string,
    og_title: string,
    og_type: string,
    title: string,
    article_modified_time: string,
    description?: string,
    og_description?: string,
    og_image?: pageImageProps[]
}

export interface pageImageProps {
    width: number,
    height: number,
    url: string,
    type: string
}


const HeadHTML: React.FC<HeadHTMLProps> = ({seoPage}) => {
    const router = useRouter();
    const current_url = `${process.env.NEXT_PUBLIC_ENV_FRONTEND_LINK}${router.route}`;

    return (
        <Head>
            <title>{seoPage.title}</title>

            <link rel="canonical" href={current_url}/>

            {/*/!*{*!/*/}
            {/*/!*    process.env.NEXT_PUBLIC_ENV_MODE === 'production' &&*!/*/}
            {/*/!*    <script async type="text/javascript" src="//static.chartbeat.com/js/chartbeat.js"/>*!/*/}
            {/*/!*}*!/*/}

            <meta property="og:locale" content={seoPage.og_locale}/>
            <meta property="og:type" content={seoPage.og_type}/>
            <meta property="og:title" content={seoPage.og_title} key="title"/>
            {
                seoPage.description || seoPage.og_description &&
                <meta property="og:description" content={seoPage.og_description ? seoPage.og_description : seoPage.description}/>
            }

            <meta property="og:url" content={current_url}/>
            <meta property="og:site_name" content={seoPage.og_site_name}/>

            {/*{meta?.og?.published_time && <meta property="article:published_time" content={meta?.og?.published_time}/>}*/}

            {/*{meta?.og?.modified_time && <meta property="article:modified_time" content={meta?.og?.modified_time}/>}*/}

            {
                seoPage.og_image &&
                <>
                    <meta property="og:image" content={seoPage.og_image?.[0]?.url}/>
                    <meta property="og:image:width" content={seoPage.og_image?.[0]?.width?.toString() ?? ''}/>
                    <meta property="og:image:height" content={seoPage.og_image?.[0]?.height?.toString() ?? ''}/>
                    <meta name="twitter:card" content="summary_large_image"/>
                    <meta name="twitter:image" content={seoPage.og_image?.[0]?.url}/>
                </>
            }

            {seoPage.description && <meta name="description" content={seoPage.description}/>}

            {/*<link rel="shortcut icon" href="/favicon.ico"/>*/}
        </Head>
    );
}

export default HeadHTML;