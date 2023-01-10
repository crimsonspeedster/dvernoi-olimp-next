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
import MasterModal from "@components/Modal/MasterModal";


interface HeaderProps {
    isOpenFilter: boolean,
    setIsOpenFilter: Dispatch<SetStateAction<boolean>>
}

const Header:React.FC<HeaderProps> = ({isOpenFilter, setIsOpenFilter}) => {
    const [isTablet, setIsTablet] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const [openCatalog, setIsOpenCatalog] = useState<boolean>(false);
    const [isFirsVisible, setIsFirsVisible] = useState<boolean>(true);
    const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const [btnToTopStatus, setBtnToTopStatus] = useState<boolean>(false);

    const router = useRouter();

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
    }, [isMobile, isTablet])

    useEffect(() => {
        isOpenMenu ? disableScrollbar() : enableScrollbar()
    }, [isOpenMenu]);

    useEffect(()=>{
        window.addEventListener('scroll', handleScroll, {
            passive: true
        });

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(()=>{
        setIsOpenSearch(false);
    }, [router.query]);

    const handleTop = ():void => {
        window.scrollTo({
            top: 100,
            left: 100,
            behavior: 'smooth'
        });
    }

    const handleScroll = ():void => {
         setBtnToTopStatus(window.pageYOffset >= 150);
    }

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
            
            <MasterModal />

            <div className={classNames(styles['header-button'], btnToTopStatus ? styles['active'] : '')} onClick={handleTop}>
                <svg width="17" height="28" viewBox="0 0 17 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 8.75L8.75 1L16.5 8.75" stroke="#A4AC14"/>
                    <path d="M8.75 1.42969L8.75 27.263" stroke="#A4AC14"/>
                </svg>
            </div>
        </header>
    )
}

export default Header