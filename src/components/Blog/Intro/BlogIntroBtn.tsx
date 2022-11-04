import React from 'react'
import sprite from '@icons/sprite.svg';
import styles from './Intro.module.scss';
import classNames from "classnames";

const BlogIntroBtn = () => {
      return (
            <div className={classNames(styles['blog-intro__btn-wrapper'], 'load-btn-wrapper')}>
                  <button className={classNames(styles['blog-intro__btn'], 'load-btn')}>
                        <span className={classNames(styles['blog-intro__btn-icon'], 'load-btn__icon')}>
                             <svg>
                                 <use href={`${sprite.src}#load-arrow`} />
                             </svg>
                        </span>

                        <span className={classNames(styles['blog-intro__btn-text'], 'load-btn__text')}>Загрузить еще</span>
                  </button>
            </div>
      )
}

export default BlogIntroBtn;