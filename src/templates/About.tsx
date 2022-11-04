import React from "react";
import AboutIntro, {AboutIntroProps} from "@components/About/Intro/Intro";
import AboutIcons, {iconProps} from "@components/About/AboutIcons/AboutIcons";
import AboutStory, {AboutStoryProps} from "@components/About/AboutStory/AboutStory";
import AboutEmployees, {AboutEmployeesProps} from "@components/About/AboutEmployees/AboutEmployees";
import AboutMissions, {AboutMissionsProps} from "@components/About/AboutMissions/AboutMissions";
import AboutVideoblog, {AboutVideoblogProps} from "@components/About/AboutVideoblog/AboutVideoblog";
import ContactsInfo, {ContactsInfoProps} from "@components/ContactsInfo/ContactsInfo";
import Breadcrumbs, {Breadcrumb} from "@components/Breadcrumbs/Breadcrumbs";
import SeoBlock, {seoBlockProps} from "@components/SeoBlock/SeoBlock";


interface AboutTemplateProps {
    breadcrumbs: Breadcrumb[],
    top_block: AboutIntroProps,
    aboutIcons: iconProps[],
    aboutStory: AboutStoryProps,
    ourEmployers:AboutEmployeesProps,
    mission: AboutMissionsProps,
    videoBlog: AboutVideoblogProps,
    seoBlockContent?: seoBlockProps,
    contactsData: ContactsInfoProps
}

const AboutTemplate:React.FC<AboutTemplateProps> = (props) => {
    const {
        breadcrumbs,
        top_block,
        aboutIcons,
        aboutStory,
        ourEmployers,
        mission,
        videoBlog,
        contactsData,
        seoBlockContent
    } = props;

    return (
        <>
            <Breadcrumbs list={breadcrumbs} />

            <AboutIntro
                opisanie={top_block.opisanie}
                opisanie_pod_foto={top_block.opisanie_pod_foto}
                photo_right={top_block.photo_right}
                photo_top={top_block.photo_top}
            />

            <AboutIcons preimushhestva={aboutIcons} />

            <AboutStory
                nazvanie={aboutStory.nazvanie}
                istoriya_repeater={aboutStory.istoriya_repeater}
            />

            <AboutEmployees
                foto={ourEmployers.foto}
                nazvanie={ourEmployers.nazvanie}
            />

            <AboutMissions
                nazvanie={mission.nazvanie}
                repeater={mission.repeater}
            />

            <ContactsInfo
                povtoritel={contactsData.povtoritel}
                zagolovok={contactsData.zagolovok}
                showPhotos={false}
            />

            {
                seoBlockContent?.title && <SeoBlock seoBlock={seoBlockContent} />
            }

            <AboutVideoblog
                nazvanie={videoBlog.nazvanie}
                repeater={videoBlog.repeater}
            />
        </>
    );
}

export default AboutTemplate;