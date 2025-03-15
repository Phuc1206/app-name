import Button from '../ui/Button/Button';
import styles from './RoleList.module.scss';
import { X } from 'lucide-react';
import clsx from 'clsx';
import { useOrg } from '../../store';

const RoleList = () => {
	const { openModal, roles, removeRole } = useOrg();
	return (
		<div className={styles.roleList}>
			<div className={styles.btn}>
				<Button
					variant='secondary'
					size='lg'
					onClick={() => openModal('createRole')}
				>
					+ Tạo chức vụ
				</Button>
			</div>
			<ul className={styles.list}>
				{roles.map((role) => (
					<li key={role.id} className={styles.item}>
						<span
							className={clsx(
								styles.dot,
								role.status ? styles.greenDot : styles.grayDot
							)}
						/>

						<span className={styles.name}>{role.name}</span>
						<button
							className={styles.removeBtn}
							onClick={() => removeRole(role.id)}
						>
							<X size={16} />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default RoleList;
