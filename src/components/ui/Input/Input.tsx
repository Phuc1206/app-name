import React, { InputHTMLAttributes, ReactNode } from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	iconLeft?: ReactNode;
	iconRight?: ReactNode;
	onIconLeftClick?: () => void;
	onIconRightClick?: () => void;
	error?: string;
	className?: string;
	helperText?: string;
	span?: boolean;
}

const Input: React.FC<InputProps> = ({
	label,
	iconLeft,
	iconRight,
	onIconLeftClick,
	onIconRightClick,
	error,
	className = '',
	helperText,
	span,
	...props
}) => {
	const inputClass = clsx(
		styles.inputField,
		error ? styles.error : styles.default,
		iconLeft && styles.withIconLeft,
		iconRight && styles.withIconRight
	);

	return (
		<div className={clsx(styles.inputContainer, className)}>
			{label && <label className={styles.inputLabel}>{label}</label>}

			<div className={styles.inputWrapper}>
				{iconLeft && (
					<div
						className={clsx(
							styles.iconLeft,
							span && styles.iconLeftWithDivider
						)}
						onClick={onIconLeftClick}
					>
						{iconLeft}
					</div>
				)}
				<input className={inputClass} {...props} />
				{iconRight && (
					<div className={styles.iconRight} onClick={onIconRightClick}>
						{iconRight}
					</div>
				)}
			</div>

			{error ? (
				<p className={styles.errorText}>{error}</p>
			) : helperText ? (
				<p className={styles.helperText}>{helperText}</p>
			) : null}
		</div>
	);
};

export default Input;
