import React from 'react';
import {
    EmailShareButton,
    TwitterShareButton,
    FacebookShareButton,
    TelegramShareButton,
    ViberShareButton,
    WhatsappShareButton,
} from 'react-share';
import sprite from '@icons/sprite.svg';
import styles from './Intro.module.scss';
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";


interface SinglePostShareProps {
    title: string
}

const SinglePostShare:React.FC<SinglePostShareProps> = ({title}) => {
    const router = useRouter();
    const current_link = `${process.env.NEXT_PUBLIC_ENV_FRONTEND_LINK}${router.asPath}`;
    const {t} = useTranslation('common');

    return (
        <div className={styles['single-post-intro__share']}>
            <div className={styles['single-post-intro__share-text']}>{t('shareTitle')}:</div>

            <div className={styles['single-post-intro__share-inner']}>
                <EmailShareButton
                    className={styles['single-post-intro__share-btn']}
                    url={current_link}
                    subject={title}
                >
                    <span className={styles['single-post-intro__share-btn-inner']}>
                        <svg><use href={`${sprite.src}#at`}/></svg>
                    </span>
                </EmailShareButton>

                <TwitterShareButton
                    className={styles['single-post-intro__share-btn']}
                    url={current_link}
                    title={title}
                >
                    <span className={styles['single-post-intro__share-btn-inner']}>
                        <svg><use href={`${sprite.src}#twitter`}/></svg>
                    </span>
                </TwitterShareButton>

                <FacebookShareButton
                    className={styles['single-post-intro__share-btn']}
                    url={current_link}
                    quote={title}
                >
                    <span className={styles['single-post-intro__share-btn-inner']}>
                        <svg><use href={`${sprite.src}#facebook`}/></svg>
                    </span>
                </FacebookShareButton>

                <TelegramShareButton
                    className={styles['single-post-intro__share-btn']}
                    url={current_link}
                    title={title}
                >
                    <span className={styles['single-post-intro__share-btn-inner']}>
                        <svg><use href={`${sprite.src}#telegram`}/></svg>
                    </span>
                </TelegramShareButton>

                <ViberShareButton
                    className={styles['single-post-intro__share-btn']}
                    url={current_link}
                    title={title}
                >
                    <span className={styles['single-post-intro__share-btn-inner']}>
                        <svg><use href={`${sprite.src}#viber`}/></svg>
                    </span>
                </ViberShareButton>

                <WhatsappShareButton
                    className={styles['single-post-intro__share-btn']}
                    url={current_link}
                    title={title}
                    separator=":: "
                >
                    <span className={styles['single-post-intro__share-btn-inner']}>
                        <svg><use href={`${sprite.src}#whatsapp`}/></svg>
                    </span>
                </WhatsappShareButton>
            </div>
        </div>
    );
}

export default SinglePostShare;