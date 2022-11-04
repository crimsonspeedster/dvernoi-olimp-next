import React, {Dispatch, SetStateAction} from 'react';
import styles from './Burger.module.scss';
import classNames from "classnames";

interface BurgerProps {
    isOpenMenu: boolean,
    setIsOpenMenu: Dispatch<SetStateAction<boolean>>
}

const Burger:React.FC<BurgerProps> = ({isOpenMenu, setIsOpenMenu}) => {
    const menu_items: number[] = [0, 0, 0];

    return (
        <button
            className={classNames(styles['burger'], isOpenMenu ? styles.active : '')}
            onClick={() => setIsOpenMenu(true)}
        >
            {
                menu_items.map((item, key) => <span key={key}/>)
            }
        </button>
    )
}

export default Burger;