import React from "react";
import MontageIntro from "@components/Montage/Intro/Intro";
import MontageSubintro from "@components/Montage/Subintro/Subintro";


interface MontageTemplateProps {
    title: string,
    acf: acfGroupProps
}

interface acfGroupProps {
    tarify: tarifyProps,
    ustanovka_dverej: ustanovka_dverejProps
}

export interface ustanovka_dverejProps {
    nazvanie_bloka: string,
    opisanie: string,
    tables_repeater: tables_repeaterProps[]
}

export interface tables_repeaterProps {
    tablicza: tabliczaProps[],
    description_after?: string
}

interface tabliczaProps {
    tip_dverei: string,
    stoimost: string
}

export interface tarifyProps {
    nazvanie: string,
    povtoritel_opisaniya: povtoritel_opisaniyaProps[]
}

interface povtoritel_opisaniyaProps {
    opisanie: string
}

const MontageTemplate:React.FC<MontageTemplateProps> = ({title, acf}) => {
    return (
        <>
            <MontageIntro
                title={title}
                block={acf.tarify}
            />

            <MontageSubintro
                block={acf.ustanovka_dverej}
            />
        </>
    );
}

export default MontageTemplate;