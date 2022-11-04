import React, {Dispatch, SetStateAction} from 'react'
import Menu from '@components/Menu/Menu'
import HeaderTopControls from './HeaderTopControls'
import Switcher from '@components/Switcher/Switcher'
import MobileTop from './MobileTop'
import MobileCatalog from './MobileCatalog'
import MobileBot from './MobileBot'
import MobileSearch from './MobileSearch'
import classNames from "classnames";
import styles from './Header.module.scss'

interface HeaderTopProps {
    isTablet:boolean,
    isMobile:boolean
    isOpenMenu: boolean
    setIsOpenMenu: Dispatch<SetStateAction<boolean>>
    openSubmenu: any
    closeSubmenu: any
    openSubsubmenu: any
    closeSubsubmenu: any
}

const HeaderTop:React.FC<HeaderTopProps> = (props) => {
    const {
        isTablet,
        isMobile,
        isOpenMenu,
        setIsOpenMenu,
        openSubmenu,
        closeSubmenu,
        openSubsubmenu,
        closeSubsubmenu
    } = props;

    return (
        <div className={classNames(styles['header__top'], styles['header-top'], isOpenMenu ? styles['open'] : '')}>
            <div className="container">
                <MobileTop isMobile={isMobile} setIsOpenMenu={setIsOpenMenu}/>

                <div className={styles['header-top__inner']}>
                    {!isMobile && <MobileCatalog/>}

                    {isMobile && <MobileSearch/>}

                    <Menu
                        isTablet={isTablet}
                        openSubmenu={openSubmenu}
                        closeSubmenu={closeSubmenu}
                        openSubsubmenu={openSubsubmenu}
                        closeSubsubmenu={closeSubsubmenu}
                    />

                    <HeaderTopControls/>

                    {!isMobile && <Switcher/>}

                    <MobileBot isMobile={isMobile}/>
                </div>
            </div>
        </div>
    )
}

export default HeaderTop