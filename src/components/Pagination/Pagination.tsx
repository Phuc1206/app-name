import React from 'react';
import {
	ChevronsLeft,
	ChevronLeft,
	ChevronRight,
	ChevronsRight,
} from 'lucide-react';
import clsx from 'clsx';
import styles from './Pagination.module.scss';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onFirst: () => void;
	onPrev: () => void;
	onNext: () => void;
	onLast: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onFirst,
	onPrev,
	onNext,
	onLast,
}) => {
	return (
		<div className={styles.pagination}>
			<ChevronsLeft
				size={18}
				className={clsx(styles.pageIcon, currentPage === 1 && styles.disabled)}
				onClick={currentPage === 1 ? undefined : onFirst}
			/>
			<ChevronLeft
				size={18}
				className={clsx(styles.pageIcon, currentPage === 1 && styles.disabled)}
				onClick={currentPage === 1 ? undefined : onPrev}
			/>

			<span className={styles.pageText}>
				{currentPage}/{totalPages}
			</span>

			<ChevronRight
				size={18}
				className={clsx(
					styles.pageIcon,
					currentPage === totalPages && styles.disabled
				)}
				onClick={currentPage === totalPages ? undefined : onNext}
			/>
			<ChevronsRight
				size={18}
				className={clsx(
					styles.pageIcon,
					currentPage === totalPages && styles.disabled
				)}
				onClick={currentPage === totalPages ? undefined : onLast}
			/>
		</div>
	);
};

export default Pagination;
