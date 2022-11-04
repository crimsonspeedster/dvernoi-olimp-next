import React from 'react';
import styles from './MainReasons.module.scss';

const MainReasonsList = () => {
    return (
        <div className="main-reasons__inner">
            <div className="main-reasons__item">
                <div className="main-reasons__item-inner">
                    <p className="main-reasons__item-desc">Более 10 лет успешной работы</p>
                </div>
            </div>
            <div className="main-reasons__item">
                <div className="main-reasons__item-inner">
                    <p className="main-reasons__item-desc">Продукция от 52 лучших производителей</p>
                </div>
            </div>
            <div className="main-reasons__item">
                <div className="main-reasons__item-inner">
                    <p className="main-reasons__item-desc">Изготовление дверей по индивидуальным размерам</p>
                </div>
            </div>
            <div className="main-reasons__item">
                <div className="main-reasons__item-inner">
                    <p className="main-reasons__item-desc">Гарантия до 3-х лет</p>
                </div>
            </div>
            <div className="main-reasons__item">
                <div className="main-reasons__item-inner">
                    <p className="main-reasons__item-desc">Любая форма оплаты</p>
                </div>
            </div>
            <div className="main-reasons__item">
                <div className="main-reasons__item-inner">
                    <p className="main-reasons__item-desc">Более 450 000 счастливых клиентов</p>
                </div>
            </div>
        </div>
    )
}

export default MainReasonsList