import React from 'react';
import styles from './Intro.module.scss';
import ContactsIntroInfo from './ContactsIntroInfo';
import classNames from "classnames";

const ContactsIntro = () => {
    return (
        <div className={classNames(styles['contacts-intro'], 'intro')}>
            <div className="container">
                <h1 className={classNames(styles['contacts-intro__title'], 'title', 'title--dark')}>Контакты</h1>

                <ContactsIntroInfo />
            </div>
        </div>
    )
}

export default ContactsIntro;