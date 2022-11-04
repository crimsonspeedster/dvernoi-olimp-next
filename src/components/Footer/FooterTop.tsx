import React from 'react';
import styles from './Footer.module.scss';
import FooterLinks from './FooterLinks';
import FooterContacts from './FooterContacts';
import classNames from "classnames";


const FooterTop = () => (
    <div className={classNames(styles['footer__top'], styles['footer-top'])}>
        <div className="container">
            <div className={styles['footer-top__inner']}>
                <FooterLinks />

                <FooterContacts />
            </div>
        </div>
    </div>
);

export default FooterTop;