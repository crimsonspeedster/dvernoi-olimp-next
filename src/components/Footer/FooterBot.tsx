import React from 'react'
import styles from './Footer.module.scss';
import Copyright from '@components/Copyright/Copyright';
import FooterPayIcons from './FooterPayIcons';
import CompanyLogo from '@components/CompanyLogo/CompanyLogo';
import classNames from "classnames";


const FooterBot = () => (
    <div className={classNames(styles['footer__bot'], styles['footer-bot'])}>
        <div className="container">
            <div className={styles['footer-bot__inner']}>
                <Copyright />

                <FooterPayIcons />

                <CompanyLogo />
            </div>
        </div>
    </div>
);

export default FooterBot