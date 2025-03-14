import Input from '../ui/Input/Input';
import styles from './Topbar.module.scss';
import { Search, Menu, User, Bell, LogOut } from 'lucide-react';
function Topbar() {
	return (
		<>
			<div className={styles.topbar}>
				<div className={styles.searchWrapper}>
					<Input
						placeholder='Nhập mã để tìm kiếm'
						iconLeft={<Menu size={16} />}
						iconRight={<Search size={16} />}
					/>
				</div>

				<div className={styles.rightSection}>
					<div className={styles.userInfo}>
						<div className={styles.username}>Nguyễn Văn Ánh</div>
						<div className={styles.role}>Quản lý hệ thống</div>
					</div>

					<div className={styles.iconButton}>
						<User />
					</div>

					<div className={styles.iconButton}>
						<Bell />
						<span className={styles.notificationDot}></span>
					</div>

					<div className={styles.iconButton}>
						<LogOut />
					</div>
				</div>
			</div>
		</>
	);
}

export default Topbar;
