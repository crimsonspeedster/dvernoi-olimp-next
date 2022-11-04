import React, {useContext} from 'react';
import styles from './Banner.module.scss';
import classNames from "classnames";
import {SettingsContext} from "@pages/_app";
import Image from "next/image";

interface BannerProps {
    className?: string
}

const Banner:React.FC<BannerProps> = ({className}) => {
    const settingsCtx = useContext(SettingsContext).settings.consult_group;

    return (
        <div className={classNames(className, styles['sidebar-banner'])}>
            <div className={classNames(`${className}-icon`, styles['sidebar-banner__icon'])}>
                <Image
                    src={settingsCtx.image.url}
                    alt={settingsCtx.image.alt}
                    width={56}
                    height={56}
                />
            </div>

            <div className={classNames(`${className}-title`, styles['sidebar-banner__title'])}>{settingsCtx.title}</div>

            <div
                className={classNames(`${className}-desc`, styles['sidebar-banner__desc'])}
                dangerouslySetInnerHTML={{__html: settingsCtx.description}}
            />

            <a className={classNames(`${className}-phone`, styles['sidebar-banner__phone'])} href={settingsCtx.phone.url}>{settingsCtx.phone.title}</a>
        </div>
    )
}

export default Banner;