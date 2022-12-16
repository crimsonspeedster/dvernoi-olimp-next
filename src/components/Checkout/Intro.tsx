import React, {useState, useEffect} from 'react';
import styles from './Intro.module.scss';
import CheckoutInfo from './CheckoutInfo'
import CheckoutContent from './CheckoutContent'
import classNames from "classnames";


interface CheckoutIntroProps {
    title: string,
}

const CheckoutIntro:React.FC<CheckoutIntroProps> = (props) => {
    const {
        title,
    } = props;

    const [isMobileList, setIsMobileList] = useState<boolean>(false);

    useEffect(() => {
        setIsMobileList(window.innerWidth <= 1024);
    }, []);

    return (
        <section className={classNames(styles['checkout'], 'intro')}>
            <div className="container">
                <h1 className={classNames(styles['checkout__title'], 'title', 'title--dark')}>{title}</h1>

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
