import React, {useContext} from 'react';
import styles from './Copyright.module.scss';
import {SettingsContext} from "@pages/_app";

const Copyright = () => {
    const settingsCtx = useContext(SettingsContext).settings.footer;

    return (
        <div className={styles['copyright']}>
            <div className={styles['copyright__text']} dangerouslySetInnerHTML={{__html: settingsCtx?.description ?? ''}} />
        </div>
    );
}

export default Copyright;