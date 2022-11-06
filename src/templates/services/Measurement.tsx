import React from "react";
import RulerIntro from "@root/Ruler/Intro/Intro";
import {PhotoProps} from "@components/About/Intro/Intro";
import {Breadcrumb} from "@components/Breadcrumbs/Breadcrumbs";
import RulerSubintro from "@root/Ruler/Subintro/Subintro";
import {If, Then} from "react-if";
import RulerVideo from "@root/Ruler/RulerVideo/RulerVideo";


interface MeasurementTemplateProps {
    title: string,
    content: string,
    acf: acfGroupProps,
}

interface acfGroupProps {
    opisanie_sverhu: string,
    kartinka_sprava: PhotoProps,
    video: videoAcfProps
}

interface videoAcfProps {
    dobavit_video: boolean,
    nazvanie?: string,
    ssylka_na_video?: string,
    foto?: PhotoProps,
    dlitelnost_video?: string
}

const Measurement:React.FC<MeasurementTemplateProps> = (props) => {
    const {
        title,
        acf,
        content
    } = props;

    return (
        <>
            <RulerIntro
                title={title}
                opisanie_sverhu={acf.opisanie_sverhu}
            />

            <RulerSubintro
                content={content}
                image={acf.kartinka_sprava}
            />

            <If condition={acf.video.dobavit_video}>
                <Then>
                    <RulerVideo
                        title={acf.video.nazvanie ?? ''}
                        link={acf.video.ssylka_na_video ?? ''}
                        image={acf.video.foto}
                        duration={acf.video.dlitelnost_video}
                    />
                </Then>
            </If>
        </>
    )
}

export default Measurement;