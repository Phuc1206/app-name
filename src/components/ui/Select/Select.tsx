import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import clsx from 'clsx';
import styles from './Select.module.scss';

type SelectSize = 'sm' | 'md' | 'lg';

interface SelectOption {
	value: string;
	label: string;
}

interface SelectProps {
	options: SelectOption[];
	onChange?: (value: string) => void;
	placeholder: string;
	size?: SelectSize;
	className?: string;
	label?: string;
	dropUp?: boolean;
}

const Select: React.FC<SelectProps> = ({
	placeholder = 'Select an option',
	onChange,
	options,
	size = 'md',
	className = '',
	dropUp = false,
	label,
}) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
		null
	);
	const selectRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				selectRef.current &&
				!selectRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const handleSelect = (option: SelectOption) => {
		setSelectedOption(option);
		setIsOpen(false);
		onChange?.(option.value);
	};

	return (
		<div className={styles.selectWrapper} ref={selectRef}>
			<div
				className={clsx(styles.selectBox, styles[size], className)}
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className={!selectedOption ? styles.placeholder : ''}>
					{selectedOption ? selectedOption.label : placeholder}
				</span>
				<ChevronDown size={16} />
			</div>

			{isOpen && (
				<div className={clsx(styles.dropdown, dropUp && styles.dropUp)}>
					{label && <div className={styles.dropdownLabel}>{label}</div>}
					<ul className={styles.dropdownList}>
						{options.map((option) => (
							<li
								key={option.value}
								className={clsx(
									styles.optionItem,
									selectedOption?.value === option.value && 'active'
								)}
								onClick={() => handleSelect(option)}
							>
								{option.label}
								{selectedOption?.value === option.value && (
									<span className={styles.checkIcon}>
										<Check size={16} />
									</span>
								)}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

export default Select;
