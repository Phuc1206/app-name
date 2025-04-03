import Input from '../ui/Input/Input';
import styles from './Topbar.module.scss';
import { Search, Menu, User, Bell, LogOut } from 'lucide-react';
function Topbar({
	searchCode,
	setSearchCode,
}: {
	searchCode: string;
	setSearchCode: (value: string) => void;
}) {
	return (
		<>
			<div className={styles.topbar}>
				<div className={styles.searchWrapper}>
					<Input
						placeholder='Nhập mã để tìm kiếm'
						iconLeft={<Menu size={16} />}
						iconRight={<Search size={16} />}
						onChange={(e) => setSearchCode(e.target.value)}
						value={searchCode}
					/>
				</div>

				<div className={styles.rightSection}>
					<div className={styles.userInfo}>
						<div className={styles.username}>Nguyễn Văn Ánh</div>
						<div className={styles.role}>Quản lý hệ thống</div>
					</div>

					<div className={styles.iconButton}>
						<User style={{ color: 'gray' }} />
					</div>

					<div className={styles.iconButton}>
						<Bell size={16} style={{ color: 'gray' }} />
						<span className={styles.notificationDot}>3</span>
					</div>

					<div className={styles.iconButton}>
						<LogOut style={{ color: 'red' }} />
					</div>
				</div>
			</div>
		</>
	);
}

export default Topbar;
