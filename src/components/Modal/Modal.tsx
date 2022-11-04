import React, {Dispatch, ReactElement, SetStateAction, useEffect, useState} from "react";
import classNames from "classnames";
import styles from './Modal.module.scss';


interface ModalProps {
    children: ReactElement,
    status: boolean,
    closeHandler: Dispatch<SetStateAction<boolean>>
}

const Modal:React.FC<ModalProps> = ({children, status, closeHandler}) => {
    const [show, setShow] = useState<boolean>(status);

    useEffect(()=>{
        setShow(status);
    }, [status]);

    return (
        <div className={classNames(styles['modal'], show ? styles['active'] : '')}>
            <div
                className={styles['modal-overlay']}
                onClick={()=>{
                    setShow(false);
                    closeHandler(false);
                }}
            />

            <div className={styles['modal-content']}>
                {children}
            </div>
        </div>
    );
}

export default Modal;