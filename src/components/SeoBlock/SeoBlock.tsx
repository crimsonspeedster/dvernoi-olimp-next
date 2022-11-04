import React, {useEffect, useState} from 'react'
import styles from './SeoBlock.module.scss';
import {isBrowser} from '@utils/isBrowser';
import classNames from "classnames";
import {If, Then} from "react-if";

interface SeoBlockProps {
    seoBlock: seoBlockProps
}

export interface seoBlockProps {
    hiden_description?: string,
    small_description: string,
    title: string
}

const SeoBlock: React.FC<SeoBlockProps> = ({seoBlock}) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [btnText, setBtnText] = useState<string>('Узнать больше');

    useEffect(() => {
        isOpen ? setBtnText('Свернуть') : setBtnText('Узнать больше');
    }, [isOpen]);

    const toggleBlock = (): void => {
        setOpen(!isOpen);
    }

    return (
        <div className={styles['seo-block']}>
            <div className="container">
                <div className={classNames(styles['seo-block__title'], 'title', 'title--dark')}>{seoBlock.title}</div>

                <article className={classNames(styles['seo-block__article'], 'article')}>
                    <div className={classNames(styles['seo-block__inner'], isOpen && seoBlock?.hiden_description ? styles['active'] : '')} dangerouslySetInnerHTML={{__html: seoBlock.small_description}} />

                    <If condition={seoBlock?.hiden_description}>
                        <Then>
                            <div className={classNames(styles['seo-block__small'], isOpen ? styles['active'] : '')} dangerouslySetInnerHTML={{__html: seoBlock?.hiden_description ?? ''}} />
                        </Then>
                    </If>
                </article>

                <If condition={seoBlock?.hiden_description}>
                    <Then>
                        <div className={styles['seo-block__btn-wrapper']}>
                            <button
                                className={classNames(styles['seo-block__btn'], 'btn')}
                                onClick={toggleBlock}
                            >
                                <span className={classNames(styles['seo-block__btn-text'], 'btn__text')}>{btnText}</span>
                            </button>
                        </div>
                    </Then>
                </If>
            </div>
        </div>
    )
}

export default SeoBlock;