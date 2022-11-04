import React, {Dispatch, SetStateAction} from 'react'
import styles from './Overlay.module.scss'
import classNames from "classnames";


interface OverlayProps {
    openCatalog: boolean,
    setIsOpenCatalog: Dispatch<SetStateAction<boolean>>,
    isOpenSearch: boolean,
    setIsOpenSearch: Dispatch<SetStateAction<boolean>>,
    isOpenMenu: boolean,
    setIsOpenMenu: Dispatch<SetStateAction<boolean>>,
    isOpenFilter: boolean,
    setIsOpenFilter: Dispatch<SetStateAction<boolean>>
};

const Overlay:React.FC<OverlayProps> = (props) => {
    const {
        openCatalog,
        setIsOpenCatalog,
        isOpenSearch,
        setIsOpenSearch,
        isOpenMenu,
        setIsOpenMenu,
        isOpenFilter,
        setIsOpenFilter
    } = props;

    return (
        <div
            className={classNames(styles['overlay'], openCatalog || isOpenSearch || isOpenMenu || isOpenFilter ? styles['open'] : '')}
            onClick={() => {
                setIsOpenCatalog(false)
                setIsOpenSearch(false)
                setIsOpenMenu(false)
                isOpenFilter && setIsOpenFilter(false)
            }}
        />
    )
}

export default Overlay