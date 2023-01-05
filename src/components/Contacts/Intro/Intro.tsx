import React from 'react';
import styles from './Intro.module.scss';
import ContactsIntroInfo from './ContactsIntroInfo';
import classNames from "classnames";
import {useTranslation} from "next-i18next";

const ContactsIntro = () => {
    const {t} = useTranslation('common');

    return (
        <div className={classNames(styles['contacts-intro'], 'intro')}>
            <div className="container">
                <h1 className={classNames(styles['contacts-intro__title'], 'title', 'title--dark')}>{t('contactsTitle')}</h1>

                <ContactsIntroInfo />
            </div>
        </div>
    )
}

export default ContactsIntro;