import React, {Dispatch, ReactElement, SetStateAction, useEffect, useState} from "react";
import styles from './Toast.module.scss';
import {If, Then} from "react-if";
import classNames from "classnames";

interface ToastProps {
    status: boolean
    closeHandler: Dispatch<SetStateAction<boolean>>
    children: ReactElement
}


const Toast:React.FC<ToastProps> = ({children, status, closeHandler}) => {
    const [toastStatus, setToastStatus] = useState<boolean>(status);

    useEffect(()=>{
        setToastStatus(status);
    }, [status]);

    return (
        <div className={classNames(styles['toast'], toastStatus ? styles['active'] : '')}>
            <div className={classNames(styles['toast-container'], toastStatus ? styles['active'] : '')}>
                {children}
            </div>

            <div
                className={styles['toast-overlay']}
                onClick={()=>{
                    setToastStatus(false);
                    closeHandler(false);
                }}
            />
        </div>
    );
}

export default Toast;