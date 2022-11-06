import React from "react";
import styles from './SingleDefault.module.scss';
import classNames from "classnames";

interface SingleDefaultProps {
    title: string,
    content?: string
}

const SingleDefault: React.FC<SingleDefaultProps> = ({title, content}) => (
    <section className={classNames(styles['privacy-intro'], 'intro')}>
        <div className="container">
            <h1 className={classNames(styles['privacy-intro__title'], 'title', 'title--dark')}>{title}</h1>

            {
                content &&
                <article className={classNames(styles['privacy-intro__article'], 'article')} dangerouslySetInnerHTML={{__html: content}} />
            }
        </div>
    </section>
);

export default SingleDefault;