import React from "react";
import SeoBlock, {seoBlockProps} from "@components/SeoBlock/SeoBlock";
import MainStages, {MainStagesProps} from "@components/Homepage/Stages/MainStages";
import Partners, {PartnersProps} from "@components/Partners/Partners";
import MainSupport, {MainSupportProps} from "@components/Homepage/Support/Support";
import MainReasons, {MainReasonsProps, repeaterProps} from "@components/Homepage/Reasons/MainReasons";
import MainSubIntro, {MainSubIntroProps} from "@components/Homepage/SubIntro/SubIntro";
import CardSlider from "@components/CardSlider/CardSlider";
import {ProductCardProps} from "@components/Cards/ProductCard/ProductCard";
import VideosSection, {last_videoProps} from "@components/Homepage/Videos/Videos";
import Novelties, {noveltiesProps} from "@components/Homepage/Novelties/Novelties";
import PostsSection, {PostProp, PostsSectionProps} from "@components/Homepage/Posts/Posts";
import Bestsellers, {BestsellersProps} from "@components/Homepage/Bestsellers/Bestsellers";
import Callback from "@components/Callback/Callback";
import MainIntro from "@components/Homepage/Intro/Intro";
import {IntroSliderProps, sliderProps} from "@components/Homepage/Intro/IntroSlider";


interface HomeTemplateProps {
    seoBlockContent?: seoBlockProps,
    work_parts: MainStagesProps,
    partners: PartnersProps,
    help: MainSupportProps,
    causes: MainReasonsProps,
    door_group: MainSubIntroProps,
    novelties: noveltiesProps,
    last_video: last_videoProps,
    recentPosts: PostProp[],
    hit_prodazh: BestsellersProps,
    top_group: IntroSliderProps
}



const HomeTemplate:React.FC<HomeTemplateProps> = (props) => {
    const {
        seoBlockContent,
        work_parts,
        help,
        last_video,
        partners,
        causes,
        door_group,
        novelties,
        recentPosts,
        hit_prodazh,
        top_group
    } = props;

    return (
        <>
            <MainIntro
                slider={top_group.slider}
            />

            <MainSubIntro
                title={door_group.title}
                description={door_group.description}
                categories_repeater={door_group.categories_repeater}
            />

            <Bestsellers
                title={hit_prodazh.title}
                repeater={hit_prodazh.repeater}
            />

            <MainReasons
                title={causes.title}
                background={causes.background}
                repeater={causes.repeater}
            />

            <Novelties
                novelties={novelties}
            />

            <MainSupport
                description={help.description}
                image_big={help.image_big}
                image_small={help.image_small}
                title={help.title}
            />

            <Partners
                title={partners.title}
                repeater={partners.repeater}
            />

            <MainStages
                background_image={work_parts.background_image}
                repeater={work_parts.repeater}
                title={work_parts.title}
            />

            <VideosSection
                last_video={last_video}
            />

            <PostsSection
                recentPosts={recentPosts}
            />

            <Callback />

            {
                seoBlockContent?.title && <SeoBlock seoBlock={seoBlockContent} />
            }
        </>
    );
}

export default HomeTemplate;