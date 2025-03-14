import React from 'react';
import styles from './ModalCenter.module.scss';
import { X } from 'lucide-react';
interface ModalCenterProps {
	title: string;
	className?: string;
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
	footer?: React.ReactNode;
}

const ModalCenter: React.FC<ModalCenterProps> = ({
	title,
	className,
	children,
	isOpen,
	onClose,
	footer,
}) => {
	if (!isOpen) return null;

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.backdrop} onClick={onClose}></div>

			<div className={`${styles.modalContainer} ${className || ''}`}>
				<div className={styles.modalHeader}>
					<h2>{title}</h2>
					<button className={styles.closeBtn} onClick={onClose}>
						<X size={24} />
					</button>
				</div>

				<div className={styles.modalBody}>{children}</div>
				{footer && <div className={styles.modalFooter}>{footer}</div>}
			</div>
		</div>
	);
};

export default ModalCenter;
