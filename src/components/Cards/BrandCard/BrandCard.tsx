import React from "react";
import styles from './BrandCard.module.scss';
import {PostProp} from "@components/Homepage/Posts/Posts";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import PhotoPlaceholder from "@icons/clear_photo.png";
import {useRouter} from "next/router";
import {useTranslation} from "next-i18next";


export interface BrandProp extends PostProp {
    acf: acfProps
}

interface acfProps {
    kratkoe_opisanie: string
}

const BrandCard:React.FC<BrandProp> = (props) => {
    const {
        title,
        featured_image_link,
        slug,
        id,
        acf
    } = props;

    const router = useRouter();
    const {t} = useTranslation('common');

    return (
        <div className={classNames(styles['brand-card'], `brand-${id}`)}>
            <Link href={`/brand/${slug}`} className={styles['brand-card__img']} locale={router.locale}>
                <Image
                    src={featured_image_link ? featured_image_link : PhotoPlaceholder.src}
                    width={245}
                    height={65}
                    alt={title.rendered}
                />
            </Link>

            <div className={styles['brand-card-wrapper']}>
                <Link href={`/brand/${slug}`} className={styles['brand-card__title']} locale={router.locale}>{title.rendered}</Link>

                <div className={styles['brand-card__content']} dangerouslySetInnerHTML={{__html: acf.kratkoe_opisanie}} />

                <Link
                    href={`/brand/${slug}`}
                    className={styles['brand-card__link']}
                    locale={router.locale}
                >
                    {t('watchMore')}
                </Link>
            </div>
        </div>
    );
}

export default BrandCard;