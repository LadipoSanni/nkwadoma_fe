import React,{FC} from 'react'
import ReactModal from "react-modal";
import styles from "./styles.module.css";

interface Props {
    isOpen?: any;
    closeModal?: () => void;
    className?: string;
    children: React.ReactNode;
    style?: React.CSSProperties;
    closeOnOverlayClick?: boolean;
}

ReactModal.setAppElement("body");

export default function Modal({isOpen, children, closeModal, closeOnOverlayClick}: Props) {
  return (
    <ReactModal
    id={'ReactModalChildren'}
    isOpen={isOpen}
    className={`${styles.body} md:block sm:w-6`}
    overlayClassName={styles.overlay}
    onRequestClose={closeModal}
    shouldCloseOnOverlayClick={closeOnOverlayClick}
    
>
    {children}
</ReactModal>
  )
}

