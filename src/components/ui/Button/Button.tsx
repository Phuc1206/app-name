import React, { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
	children: ReactNode;
	variant?: ButtonVariant;
	size?: ButtonSize;
	type?: 'button' | 'submit' | 'reset';
	isLoading?: boolean;
	disabled?: boolean;
	href?: string;
	iconLeft?: ReactNode;
	iconRight?: ReactNode;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

const Button: React.FC<ButtonProps> = ({
	children,
	variant = 'primary',
	size = 'md',
	type = 'button',
	isLoading = false,
	disabled = false,
	href,
	iconLeft,
	iconRight,
	className = '',
	onClick,
	...props
}) => {
	const classes = clsx(
		styles.button,
		styles[variant],
		styles[size],
		(disabled || isLoading) && styles.disabled,
		className
	);

	const content = (
		<>
			{iconLeft && <span style={{ marginRight: '0.5rem' }}>{iconLeft}</span>}
			{isLoading ? 'Loading...' : children}
			{iconRight && <span style={{ marginLeft: '0.5rem' }}>{iconRight}</span>}
		</>
	);

	if (href) {
		return (
			<a href={href} className={classes} onClick={onClick} {...props}>
				{content}
			</a>
		);
	}

	return (
		<button
			type={type}
			disabled={disabled || isLoading}
			className={classes}
			onClick={onClick}
			{...props}
		>
			{content}
		</button>
	);
};

export default Button;
