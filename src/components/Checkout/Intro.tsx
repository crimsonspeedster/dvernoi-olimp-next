import React, {useState, useEffect, useContext} from 'react';
import {gsap} from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import styles from './Intro.module.scss';
import CheckoutInfo from './CheckoutInfo'
import CheckoutContent from './CheckoutContent'
import classNames from "classnames";


const CheckoutIntro = () => {
    // PrefixContext

    const [isMobileList, setIsMobileList] = useState<boolean>(false);

    useEffect(() => {
        // gsap.registerPlugin(ScrollTrigger);
        //
        // ScrollTrigger.matchMedia({
        //     '(min-width: 1025px)': () => setIsMobileList(false),
        //     '(max-width: 1024px)': () => setIsMobileList(true)
        // });
    }, []);

    return (
        <section className={classNames(styles['checkout'], 'intro')}>
            <div className="container">
                <h1 className={classNames(styles['checkout__title'], 'title', 'title--dark')}>Оформления заказа</h1>
                <form
                    className={styles['checkout__from']}
                    onSubmit={e => {
                        e.preventDefault()
                    }}
                >
                    <CheckoutInfo isMobileList={isMobileList} />

                    <CheckoutContent isMobileList={isMobileList} />
                </form>
            </div>
        </section>
    );
}

export default CheckoutIntro;
