import styles from './EmployeeCard.module.scss';
import { Employee } from '../../utils/type';
import { useState } from 'react';
import Button from '../ui/Button/Button';
import { MoveRight, RefreshCcw, LogOut } from 'lucide-react';
import clsx from 'clsx';
import { useOrg } from '../store';
import ChangeFieldForm from '../ChangeFieldForm/ChangeFieldForm';
import { Units } from '../../utils/data';
interface EmployeeCardProps {
	employee: Employee;
}
const EmployeeCard = ({ employee }: EmployeeCardProps) => {
	const {
		roles,
		departments,
		updateEmployeeUnit,
		changeEmployeeDepartment,
		updateEmployeeRole,
		deleteEmployeeDepartment,
	} = useOrg();

	const [isSelected, setIsSelected] = useState(false);
	const [changeField, setChangeField] = useState<
		null | 'department' | 'role' | 'unit'
	>(null);
	const [isConfirmingRemove, setIsConfirmingRemove] = useState(false);
	const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>(
		String(employee.departmentId ?? '')
	);
	const [selectedRoleId, setSelectedRoleId] = useState<string>(
		String(employee.roleId ?? '')
	);
	const [selectedUnitId, setSelectedUnitId] = useState<string>(
		String(employee.unitId ?? '')
	);

	const handleChangeDepartment = () => {
		changeEmployeeDepartment({
			employeeId: employee.id,
			departmentId: Number(selectedDepartmentId),
		});
		setChangeField(null);
	};
	return (
		<div className={styles.container}>
			<div className={styles.card}>
				<div className={styles.checkbox}>
					<input
						type='checkbox'
						checked={isSelected}
						onChange={() => {
							const newSelected = !isSelected;
							setIsSelected(newSelected);

							if (!newSelected) {
								setChangeField(null);
							}
						}}
					/>
				</div>
				<div className={styles.avatarWrapper}>
					<img
						src={employee.avatar}
						alt={employee.name}
						className={styles.avatar}
					/>
				</div>
				<div className={styles.info}>
					<div className={styles.nameWrapper}>
						<p className={styles.name}>{employee.name}</p>
					</div>
					<div className={styles.roleWrapper}>
						<p className={styles.role}>
							{roles.find((role) => role.id === employee.roleId)?.name ||
								'Chưa rõ vai trò'}
						</p>
					</div>
					<div className={styles.statusWrapper}>
						<div className={styles.status}>
							<span
								className={clsx(
									styles.statusDot,
									employee.status === 'active' ? styles.active : styles.inactive
								)}
							></span>
							<span
								className={styles.statusText}
								style={{
									color: employee.status === 'active' ? 'green' : '#888',
								}}
							>
								{employee.status === 'active' ? 'Hoạt động' : 'Không hoạt động'}
							</span>
						</div>
					</div>
				</div>
			</div>
			{isSelected && (
				<div className={styles.options}>
					<div className={styles.actions}>
						<div className={styles.actionRow}>
							<Button
								variant='text'
								className={clsx(styles.danger, styles.btnAction)}
								iconLeft={<MoveRight size={14} />}
								onClick={() => {
									setChangeField('department');
									setIsConfirmingRemove(false);
								}}
							>
								Đổi phòng ban
							</Button>
							<Button
								variant='text'
								className={styles.btnAction}
								iconLeft={<RefreshCcw size={14} />}
								onClick={() => {
									setChangeField('role');
									setIsConfirmingRemove(false);
								}}
							>
								Đổi chức vụ
							</Button>
							<Button
								variant='text'
								className={styles.btnAction}
								iconLeft={<RefreshCcw size={14} />}
								onClick={() => {
									setIsConfirmingRemove(false);
									setChangeField('unit');
								}}
							>
								Đổi đơn vị
							</Button>
						</div>
						<div className={clsx(styles.actionRow, styles.rightAlign)}>
							<Button
								variant='text'
								className={clsx(styles.danger, styles.btnAction)}
								iconLeft={<LogOut size={14} />}
								onClick={() => {
									setIsConfirmingRemove(true);
									setChangeField(null);
								}}
							>
								Xóa khỏi phòng ban
							</Button>
						</div>
					</div>
				</div>
			)}
			{changeField === 'department' && (
				<ChangeFieldForm
					label='Đổi phòng ban'
					value={String(selectedDepartmentId)}
					options={departments.map((dep) => ({
						value: String(dep.id),
						label: dep.name,
					}))}
					onChange={(val) => setSelectedDepartmentId(val)}
					onCancel={() => setChangeField(null)}
					onConfirm={handleChangeDepartment}
				/>
			)}
			{changeField === 'role' && (
				<ChangeFieldForm
					label='Đổi chức vụ'
					value={selectedRoleId}
					options={roles.map((role) => ({
						value: String(role.id),
						label: role.name,
					}))}
					onChange={(val) => setSelectedRoleId(val)}
					onCancel={() => setChangeField(null)}
					onConfirm={() => {
						updateEmployeeRole({
							employeeId: employee.id,
							roleId: Number(selectedRoleId),
						});
						setChangeField(null);
					}}
				/>
			)}
			{changeField === 'unit' && (
				<ChangeFieldForm
					label='Đổi đơn vị'
					value={selectedUnitId}
					options={Units.map((unit) => ({
						value: String(unit.id),
						label: unit.name,
					}))}
					onChange={(val) => setSelectedUnitId(val)}
					onCancel={() => setChangeField(null)}
					onConfirm={() => {
						updateEmployeeUnit({
							employeeId: employee.id,
							unitId: Number(selectedUnitId),
						});
						setChangeField(null);
					}}
				/>
			)}

			{isConfirmingRemove && (
				<div className={styles.confirmBox}>
					<p className={styles.confirmText}>
						Chắc chắn xóa người này khỏi phòng ban?
					</p>
					<div className={styles.confirmActions}>
						<Button
							variant='primary'
							className={styles.btnDanger}
							onClick={() => setIsConfirmingRemove(false)}
						>
							Hủy bỏ
						</Button>
						<Button
							variant='danger'
							onClick={() => {
								deleteEmployeeDepartment({
									employeeId: employee.id,
								});
								setIsConfirmingRemove(false);
								setIsSelected(false);
							}}
						>
							Xác nhận
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default EmployeeCard;
