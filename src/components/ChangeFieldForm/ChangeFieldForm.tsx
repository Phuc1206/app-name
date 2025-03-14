import React from 'react';
import Button from '../ui/Button/Button';
import styles from './ChangeFieldForm.module.scss';

interface ChangeFieldFormProps {
	label: string;
	value: string;
	options: { label: string; value: string }[];
	onChange: (value: string) => void;
	onCancel: () => void;
	onConfirm: () => void;
}

const ChangeFieldForm: React.FC<ChangeFieldFormProps> = ({
	label,
	value,
	options,
	onChange,
	onCancel,
	onConfirm,
}) => {
	return (
		<div className={styles.container}>
			<label className={styles.label}>{label}</label>
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className={styles.select}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<div className={styles.actions}>
				<Button variant='secondary' onClick={onCancel}>
					Hủy bỏ
				</Button>
				<Button variant='primary' onClick={onConfirm}>
					Xác nhận
				</Button>
			</div>
		</div>
	);
};

export default ChangeFieldForm;
