import React, { useContext } from 'react'
import Link from "next/link";
import sprite from '@icons/sprite.svg'
import styles from './Header.module.scss';


const HeaderTopControls = () => {

  return (
    <div className={styles['header-top__controls']}>
      <Link className={styles['header-top__controls-item']} href="/">
        <span className={styles['header-top__controls-icon']}>
            <svg><use href={`${sprite.src}#ruler`} /></svg>
        </span>

        <span className={styles['header-top__controls-text']}>Заказать замер</span>
      </Link>

      <button
        className={styles['header-top__controls-item']}
        type="button"
        data-fancybox="callback"
        data-src="#callback-modal"
      >
        <span className={styles['header-top__controls-icon']}><svg><use href={`${sprite.src}#phone`} /></svg></span>

        <span className={styles['header-top__controls-text']}>Обратный звонок</span>
      </button>
    </div>
  )
}

export default HeaderTopControls;