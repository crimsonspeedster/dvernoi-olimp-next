import React, {useContext} from 'react';
import Link from "next/link";
import styles from './Logo.module.scss'
import {SettingsContext} from "@pages/_app";
import classNames from "classnames";
import {useRouter} from "next/router";
import Image from "next/image";
import {Then, If, Else} from "react-if";


interface LogoProps {
    className?: string
}

const Logo: React.FC<LogoProps> = ({className}) => {
    const settingsCtx = useContext(SettingsContext).settings;
    const router = useRouter();

    return (
        <div className={classNames(styles['logo'], className)}>
            <If condition={router.pathname !== '/'}>
                <Then>
                    <Link href="/" locale={router.locale} className={styles['logo__link']}>
                        <Image src={settingsCtx.logo.url} alt={settingsCtx.logo.alt} width={163} height={38} priority={true} />
                    </Link>
                </Then>

                <Else>
                        <span className={styles['logo__link']}>
                            <Image src={settingsCtx.logo.url} alt={settingsCtx.logo.alt} width={163} height={38} priority={true} />
                        </span>
                </Else>
            </If>
        </div>
    )
}

export default Logo