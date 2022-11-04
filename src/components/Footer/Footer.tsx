import React from 'react';
import styles from './Footer.module.scss';
import FooterTop from './FooterTop';
import FooterBot from './FooterBot';
import classNames from "classnames";

const Footer = () => (
    <footer className={classNames('footer', styles['footer'])}>
        <FooterTop />

        <FooterBot />
    </footer>
);

export default Footer;