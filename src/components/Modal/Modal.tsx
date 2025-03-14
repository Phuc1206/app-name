import React from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
	title: string;
	className?: string;
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({
	title,
	className,
	children,
	isOpen,
	onClose,
}) => {
	if (!isOpen) return null;

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.backdrop} onClick={onClose}></div>

			<div className={`${styles.modalContainer} ${className || ''}`}>
				<div className={styles.modalHeader}>
					<h2>{title}</h2>
					<button onClick={onClose}>Đóng lại</button>
				</div>

				<div className={styles.modalBody}>{children}</div>
			</div>
		</div>
	);
};

export default Modal;
