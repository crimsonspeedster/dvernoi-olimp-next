import React, {Dispatch, SetStateAction} from 'react'
import styles from './Header.module.scss';
import HeaderCatalog from './HeaderCatalog'
import HeaderSearch from './HeaderSearch'
import HeaderSchedule from './HeaderSchedule'
import HeaderBotControls from './HeaderBotControls'
import Burger from '@components/Burger/Burger';
import classNames from "classnames";
import Logo from "@components/Logo/Logo";


interface HeaderBotProps {
    isMobile: boolean,
    openCatalog: boolean,
    setIsOpenCatalog: Dispatch<SetStateAction<boolean>>,
    isOpenSearch: boolean
    setIsOpenSearch: Dispatch<SetStateAction<boolean>>
    isOpenMenu: boolean
    setIsOpenMenu: Dispatch<SetStateAction<boolean>>
}

const HeaderBot: React.FC<HeaderBotProps> = (props) => {
    const {
        isMobile,
        openCatalog,
        setIsOpenCatalog,
        isOpenSearch,
        setIsOpenSearch,
        isOpenMenu,
        setIsOpenMenu
    } = props;

    return (
        <div className={classNames(styles['header__bot'], styles['header-bot'])}>
            <div className="container">
                <div className={styles['header-bot__inner']}>
                    <Burger isOpenMenu={isOpenMenu} setIsOpenMenu={setIsOpenMenu}/>

                    <Logo className={'logo-header'} />

                    <HeaderCatalog
                        openCatalog={openCatalog}
                        setIsOpenCatalog={setIsOpenCatalog}
                    />

                    {!isMobile && <HeaderSearch
                        isOpenSearch={isOpenSearch}
                        setIsOpenSearch={setIsOpenSearch}
                    />}

                    <HeaderSchedule />

                    <HeaderBotControls/>
                </div>
            </div>
        </div>
    )
}

export default HeaderBot