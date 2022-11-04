import React, {Dispatch, SetStateAction} from 'react'
import styles from './Header.module.scss';
import CategoryBlock from "@components/CategoryBlock/CategoryBlock";
import classNames from "classnames";

interface HeaderCategoriesProps {
    openCatalog: boolean,
    isFirsVisible: boolean,
    setIsFirsVisible: Dispatch<SetStateAction<boolean>>,
    setIsOpenCatalog: Dispatch<SetStateAction<boolean>>
}

const HeaderCategories:React.FC<HeaderCategoriesProps> = ({openCatalog, setIsOpenCatalog, isFirsVisible, setIsFirsVisible}) => {
    return (
        <div
            className={classNames(styles['header__categories'], styles['header-categories'], openCatalog ? styles['open'] : '')}
            onClick={() => setIsOpenCatalog(false)}
        >
            <div className="container">
                <div
                    className={classNames(styles['header-categories__inner'], isFirsVisible ? styles['visible'] : '', openCatalog ? styles['visible-pointer'] : '')}
                    onMouseEnter={() => setIsFirsVisible(false)}
                    onMouseLeave={() => setIsFirsVisible(true)}
                >
                    <CategoryBlock className={'main-intro__catalog-wrapper--header'}/>
                </div>
            </div>
        </div>
    )
}

export default HeaderCategories