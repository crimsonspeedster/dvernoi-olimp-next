import React from "react";
import CreditIntro from "@components/Credit/Intro/Intro";
import {PhotoProps} from "@components/About/Intro/Intro";


interface CreditTemplateProps {
    title: string,
    acf: acfGroupProps
}

interface acfGroupProps {
    tab_repeater: tab_repeaterProps[]
}

export interface tab_repeaterProps {
    title: string,
    banki: bankiRepeater[]
}

export interface bankiRepeater {
    nazvanie_v_tabe: string,
    foto: PhotoProps,
    nazvanie_v_tekste: string,
    opisanie: string
}

const Credit: React.FC<CreditTemplateProps> = ({title, acf}) => (
    <CreditIntro
        title={title}
        items={acf.tab_repeater}
    />
);

export default Credit;