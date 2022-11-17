import React from "react";
import classNames from "classnames";
import styles from "@components/Catalog/Intro/Intro.module.scss";
import CatalogCategories, {acfBlockProps} from "@components/Catalog/Intro/CatalogCategories";


interface CatalogTemplateProps {
    title: string,
    block: acfBlockProps[]
}

const CatalogTemplate:React.FC<CatalogTemplateProps> = ({title, block}) => (
    <section className={classNames(styles['catalog-intro'], 'intro')}>
        <div className="container">
            <h1 className={classNames(styles['catalog-intro__title'], 'title', 'title--dark')}>{title}</h1>

            <CatalogCategories
                block={block}
            />
        </div>
    </section>
);

export default CatalogTemplate;