import React from 'react';
import styles from './Intro.module.scss';
import BrandCard, {BrandProp} from "@components/Cards/BrandCard/BrandCard";


interface BrandsIntroListProps {
    posts: BrandProp[]
}

const BrandsIntroList:React.FC<BrandsIntroListProps> = ({posts}) => (
    <div className={styles['brands__inner']}>
        {
            posts.map((item, i) => {
                return (
                    <BrandCard
                        key={i}
                        acf={item.acf}
                        title={item.title}
                        slug={item.slug}
                        id={item.id}
                        locale_date={item.locale_date}
                        featured_image_link={item.featured_image_link}
                    />
                )
            })
        }
    </div>
);

export default BrandsIntroList;