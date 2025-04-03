import React from 'react';
import styles from './Table.module.scss';

export type Column<T> = {
	header: string;
	accessor: keyof T;
	render?: (item: T) => React.ReactNode;
};

interface TableProps<T> {
	columns: Column<T>[];
	data: T[];
	className?: string;
}

const Table = <T,>({ columns, data, className = '' }: TableProps<T>) => {
	return (
		<div className={`${styles.tableWrapper} ${className}`}>
			<table className={styles.table}>
				<thead className={styles.thead}>
					<tr>
						{columns.map((col, idx) => (
							<th key={idx} className={styles.th}>
								{col.header}
							</th>
						))}
					</tr>
				</thead>
				<tbody className={styles.tbody}>
					{data.map((item, rowIdx) => (
						<tr key={rowIdx}>
							{columns.map((col, colIdx) => (
								<td key={colIdx} className={styles.td}>
									{col.render
										? col.render(item)
										: String(item[col.accessor] ?? '')}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
