import React from 'react';
import Link from "next/link";
import ContactsIntro from '@components/Contacts/Intro/Intro';
import ContactsCallback from '@components/Contacts/ContactsCallback/ContactsCallback';
import ContactsInfo, {ContactsInfoProps} from '@components/ContactsInfo/ContactsInfo';
import Breadcrumbs, {Breadcrumb} from "@components/Breadcrumbs/Breadcrumbs";
import classNames from "classnames";
import styles from "@components/Contacts/Intro/Intro.module.scss";
import ContactsIntroInfo from "@components/Contacts/Intro/ContactsIntroInfo";
import {If, Then} from "react-if";
import SeoBlock, {seoBlockProps} from "@components/SeoBlock/SeoBlock";


interface ContactsTemplateProps {
    contactsData: ContactsInfoProps,
    breadcrumbs: Breadcrumb[],
    pageTitle: string,
    seoBlockContent?: seoBlockProps
}

const ContactsTemplate:React.FC<ContactsTemplateProps> = (props) => {
    const {
        contactsData,
        breadcrumbs,
        pageTitle,
        seoBlockContent
    } = props;

    return (
        <>
            <Breadcrumbs list={breadcrumbs} />

            <div className={classNames(styles['contacts-intro'], 'intro')}>
                <div className="container">
                    <h1 className={classNames(styles['contacts-intro__title'], 'title', 'title--dark')}>{pageTitle}</h1>

                    <ContactsIntroInfo />
                </div>
            </div>

            <ContactsInfo
                povtoritel={contactsData.povtoritel}
                zagolovok={contactsData.zagolovok}
                showPhotos={true}
            />

            {
                seoBlockContent?.title && <SeoBlock seoBlock={seoBlockContent} />
            }

            <ContactsCallback />
        </>
    )
}

export default ContactsTemplate;