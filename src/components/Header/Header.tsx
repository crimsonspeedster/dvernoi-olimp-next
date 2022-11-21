import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import styles from './Header.module.scss'
import HeaderTop from './HeaderTop';
import HeaderBot from './HeaderBot';
import HeaderCategories from './HeaderCategories';
import Overlay from '@components/Overlay/Overlay'
import {isBrowser} from '@utils/isBrowser'
import {disableScrollbar} from '@utils/disableScrollbar'
import {enableScrollbar} from '@utils/enableScrollbar'
import menuStyles from '@components/Menu/Menu.module.scss';
import CallbackModal from '@components/Modal/CallbackModal';
import classNames from "classnames";
import {useRouter} from "next/router";


interface HeaderProps {
    isOpenFilter: boolean,
    setIsOpenFilter: Dispatch<SetStateAction<boolean>>
}

const Header:React.FC<HeaderProps> = ({isOpenFilter, setIsOpenFilter}) => {
    const [isTablet, setIsTablet] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [openCatalog, setIsOpenCatalog] = useState<boolean>(false);
    const [isFirsVisible, setIsFirsVisible] = useState<boolean>(true);
    const [isOpenSchedule, setIsOpenSchedule] = useState<boolean>(false);
    const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

    const router = useRouter();

    //@ts-ignore
    const closeSchedule = (e:Event) => !e?.target?.closest('.header-schedule') && setIsOpenSchedule(false)

    const openSubmenu = (e:Event) => {
        let target = e.currentTarget,
            //@ts-ignore
            submenuParent = target?.parentElement?.parentElement?.parentElement?.parentElement,
            //@ts-ignore
            submenuTarget = target?.nextElementSibling;

        submenuTarget.classList.add(menuStyles['open'])
        submenuParent.classList.add(styles['open'])
        submenuParent.classList.add(styles['overflow'])
    }

    const closeSubmenu = (e:Event) => {
        let target = e.currentTarget,
            //@ts-ignore
            submenuParent = target?.parentElement?.parentElement?.parentElement?.parentElement?.parentElement,
            //@ts-ignore
            submenuTarget = target?.parentElement;

        submenuParent.classList.remove(styles['open'])

        if (isBrowser()) {
            setTimeout(() => {
                submenuTarget.classList.remove(menuStyles['open'])
                submenuParent.classList.remove(styles['overflow'])
            }, 360)
        }
    }

    const openSubsubmenu = (e:Event) => {
        let target = e.currentTarget,
            //@ts-ignore
            subSubmenuParent = target?.parentElement?.parentElement?.parentElement,
            //@ts-ignore
            subSubmenuTarget = target?.nextElementSibling;

        subSubmenuTarget.classList.add(menuStyles['open'])
        subSubmenuParent.classList.add(menuStyles['close'])
    }

    const closeSubsubmenu = (e:Event) => {
        let target = e.currentTarget,
            //@ts-ignore
            subSubmenuParent = target?.parentElement?.parentElement.parentElement.parentElement,
            //@ts-ignore
            subSubmenuTarget = target?.parentElement;

        subSubmenuParent.classList.remove(menuStyles['close'])

        if (isBrowser()) {
            setTimeout(() => {
                subSubmenuTarget.classList.remove(menuStyles['open'])
            }, 360)
        }
    }

    useEffect(() => {
        setIsTablet(window.innerWidth <= 1024);
        setIsMobile(window.innerWidth <= 480);

        window.innerWidth >= 1025 ? setIsOpenMenu(false) : null;

        if (isBrowser()) window.addEventListener('click', closeSchedule);

        return () => {
            if (isBrowser()) window.removeEventListener('click', closeSchedule)
        }
    }, [isMobile, isTablet])

    useEffect(() => {
        isOpenMenu ? disableScrollbar() : enableScrollbar()
    }, [isOpenMenu])

    useEffect(()=>{
        setIsOpenSearch(false);
    }, [router.query]);

    return (
        <header className={classNames(styles['header'], 'header')}>
            <HeaderTop
                isTablet={isTablet}
                isMobile={isMobile}
                isOpenMenu={isOpenMenu}
                setIsOpenMenu={setIsOpenMenu}
                openSubmenu={openSubmenu}
                closeSubmenu={closeSubmenu}
                openSubsubmenu={openSubsubmenu}
                closeSubsubmenu={closeSubsubmenu}
            />

            <HeaderBot
                isMobile={isMobile}
                openCatalog={openCatalog}
                setIsOpenCatalog={setIsOpenCatalog}
                isOpenSchedule={isOpenSchedule}
                setIsOpenSchedule={setIsOpenSchedule}
                isOpenSearch={isOpenSearch}
                setIsOpenSearch={setIsOpenSearch}
                isOpenMenu={isOpenMenu}
                setIsOpenMenu={setIsOpenMenu}
            />

            {!isTablet && <HeaderCategories
                openCatalog={openCatalog}
                setIsOpenCatalog={setIsOpenCatalog}
                isFirsVisible={isFirsVisible}
                setIsFirsVisible={setIsFirsVisible}
            />}

            <Overlay
                openCatalog={openCatalog}
                setIsOpenCatalog={setIsOpenCatalog}
                isOpenSearch={isOpenSearch}
                setIsOpenSearch={setIsOpenSearch}
                isOpenMenu={isOpenMenu}
                setIsOpenMenu={setIsOpenMenu}
                isOpenFilter={isOpenFilter}
                setIsOpenFilter={setIsOpenFilter}
            />

            <CallbackModal />
        </header>
    )
}

export default Header