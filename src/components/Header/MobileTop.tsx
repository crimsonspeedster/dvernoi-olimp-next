import React, {Dispatch, SetStateAction} from 'react'
import styles from './Header.module.scss';
import Logo from '@components/Logo/Logo'
import HeaderBotControls from './HeaderBotControls'


interface MobileTopProps {
    isMobile: boolean,
    setIsOpenMenu: Dispatch<SetStateAction<boolean>>
}

const MobileTop: React.FC<MobileTopProps> = ({isMobile, setIsOpenMenu}) => {
    return (
        <div className={styles['mobile-top']}>
            {!isMobile && <Logo className={'logo-mobile'}/>}

            <button
                className={styles['mobile-close']}
                onClick={() => setIsOpenMenu(false)}
            >
                <span/>

                <span/>
            </button>

            {isMobile && <HeaderBotControls/>}
        </div>
    )
}

export default MobileTop