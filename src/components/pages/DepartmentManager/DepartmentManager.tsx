import styles from './DepartmentManager.module.scss';
import { useEffect, useMemo, useState } from 'react';
import Input from '../../ui/Input/Input';
import Button from '../../ui/Button/Button';
import Img from '../../../assets/img/department_nothing 1.png';
import {
	Search,
	Plus,
	Pencil,
	Trash2,
	GalleryHorizontal,
	ArrowDownAZ,
	ArrowUpAZ,
} from 'lucide-react';
import Table, { Column } from '../../ui/Table/Table';
import RoleList from '../../RoleList/RoleList';
import Modal from '../../Modal/Modal';
import ModalCenter from '../../Modal/ModalCenter';
import Select from '../../ui/Select/Select';
import { Department } from '../../../utils/type';
import EmployeeCard from '../../Card/EmployeeCard';
import { useOrg } from '../../../store';
import Pagination from '../../Pagination/Pagination';
const rowOptions = [
	{ value: '10', label: 'số dòng hiển thị: 10' },
	{ value: '20', label: 'số dòng hiển thị: 20' },
	{ value: '50', label: 'số dòng hiển thị: 50' },
];
let id = 3;
const DepartmentManager = () => {
	const {
		modalType,
		openModal,
		closeModal,
		addRole,
		addDepartment,
		departments,
		removeDepartment,
		updateDepartment,
		updateEmployeeDepartment,
		employeeList,
		roles,
	} = useOrg();
	//filter
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const [searchKeyword, setSearchKeyword] = useState('');
	const [isAsc, setIsAsc] = useState(true);
	const [sortedDepartments, setSortedDepartments] = useState<Department[]>([]);

	const [searchEmployee, setSearchEmployee] = useState('');
	const [roleName, setRoleName] = useState('');
	const [isManager, setIsManager] = useState(false);
	const [selectedDepartment, setSelectedDepartment] =
		useState<Department | null>(null);
	const [departmentName, setDepartmentName] = useState(
		selectedDepartment?.name || ''
	);
	const [departmentCode, setDepartmentCode] = useState('');

	const [showAddEmployeeSidebar, setShowAddEmployeeSidebar] = useState(false);

	const columns: Column<Department>[] = [
		{ header: 'No.', accessor: 'id' },
		{ header: 'Tên phòng ban', accessor: 'name' },
		{
			header: 'Số nhân sự',
			accessor: 'employeeCount',
			render: (department) => {
				const count = employeeList.filter(
					(emp) => emp.departmentId === department.id
				).length;
				return count;
			},
		},
		{
			header: 'Hành động',
			accessor: 'id',
			render: (department) => (
				<div className={styles.actions}>
					<GalleryHorizontal
						size={16}
						className={styles.iconCarousel}
						fill='#4caf50'
						onClick={() => {
							setSelectedDepartment(department);
							openModal('editDepartment');
						}}
					/>
					<Pencil
						size={16}
						className={styles.iconEdit}
						fill='#4caf50'
						onClick={() => {
							setSelectedDepartment(department);
							openModal('updateDepartment');
						}}
					/>
					<Trash2
						size={16}
						className={styles.iconDelete}
						fill='#ef4444'
						onClick={() => {
							setSelectedDepartment(department);
							openModal('deleteDepartment');
						}}
					/>
				</div>
			),
		},
	];
	useEffect(() => {
		if (
			(modalType === 'updateDepartment' || modalType === 'editDepartment') &&
			selectedDepartment
		) {
			setDepartmentName(selectedDepartment.name);
			setDepartmentCode(selectedDepartment.code);
		}
	}, [modalType, selectedDepartment]);
	const handleAddDepartment = () => {
		if (!departmentName || !departmentCode) {
			alert('Vui lòng nhập đầy đủ thông tin');
			return;
		}

		addDepartment({
			id: ++id,
			name: departmentName,
			code: departmentCode,
		});

		// reset form và đóng modal
		setDepartmentName('');
		setDepartmentCode('');
		closeModal();
	};
	const handleDeleteDepartment = () => {
		if (selectedDepartment) {
			removeDepartment(selectedDepartment.id);
			setSelectedDepartment(null);
			closeModal();
		}
	};
	const handleUpdateDepartment = () => {
		if (!selectedDepartment) return;

		const updated = {
			...selectedDepartment,
			name: departmentName,
			code: departmentCode,
		};

		updateDepartment(updated);
		setDepartmentCode('');
		setDepartmentName('');
		closeModal();
	};
	const employeesInDepartment = employeeList.filter(
		(emp) => emp.departmentId === selectedDepartment?.id
	);

	const filteredData = useMemo(() => {
		return departments.filter((dept) =>
			dept.name.toLowerCase().includes(searchKeyword.toLowerCase())
		);
	}, [departments, searchKeyword]);
	const totalPages = Math.ceil(filteredData.length / pageSize);
	const goToFirstPage = () => setCurrentPage(1);
	const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
	const goToNextPage = () =>
		setCurrentPage((prev) => Math.min(prev + 1, totalPages));
	const goToLastPage = () => setCurrentPage(totalPages);
	const paginatedData = useMemo(() => {
		const dataToUse = sortedDepartments.length
			? sortedDepartments
			: filteredData;
		const start = (currentPage - 1) * pageSize;
		return dataToUse.slice(start, start + pageSize);
	}, [filteredData, sortedDepartments, currentPage, pageSize]);
	const handleSortAZ = () => {
		const sorted = [...filteredData].sort((a, b) => {
			const nameA = a.name.toLowerCase();
			const nameB = b.name.toLowerCase();
			return isAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
		});

		setSortedDepartments(sorted);
		setIsAsc(!isAsc);
		setCurrentPage(1);
	};
	const handleCreateRole = () => {
		if (!roleName.trim()) {
			alert('Vui lòng nhập tên chức vụ');
			return;
		}

		addRole({
			id: Date.now(),
			name: roleName.trim(),
			status: true,
			isManager,
		});

		setRoleName('');
		setIsManager(false);
		closeModal();
	};

	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.header}>
					<h1>QUẢN LÝ PHÒNG BAN</h1>
					<div className={styles.seach}>
						<Input
							span={true}
							placeholder='Tìm kiếm phòng ban...'
							iconLeft={<Search size={16} />}
							className={styles.searchInput}
							onChange={(e) => setSearchKeyword(e.target.value)}
						/>
					</div>
					<div className={styles.addbtn}>
						<Button
							iconLeft={<Plus />}
							size='md'
							variant='primary'
							onClick={() => openModal('createDepartment')}
						>
							Tạo mới
						</Button>
					</div>
				</div>

				<div className={styles.content}>
					<div className={styles.left}>
						<div className={styles.table}>
							<Table
								columns={columns}
								data={paginatedData}
								className={styles.table}
							/>
						</div>
						<div className={styles.footer}>
							<div className={styles.controls}>
								<Button
									size='sm'
									variant='primary'
									iconLeft={
										isAsc ? <ArrowDownAZ size={16} /> : <ArrowUpAZ size={16} />
									}
									className={styles.btnFilter}
									onClick={handleSortAZ}
								>
									Bộ lọc
								</Button>

								<div className={styles.select}>
									<Select
										options={rowOptions}
										placeholder='số dòng hiển thị: 10'
										size='md'
										dropUp={true}
										onChange={(value) => setPageSize(Number(value))}
										className='no-border'
									/>
								</div>
							</div>

							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onFirst={goToFirstPage}
								onPrev={goToPrevPage}
								onNext={goToNextPage}
								onLast={goToLastPage}
							/>
						</div>
					</div>
					<div className={styles.right}>
						<RoleList />
					</div>
				</div>
			</div>
			{modalType === 'createRole' && (
				<Modal title='Tạo chức vụ' isOpen={true} onClose={closeModal}>
					<div className={styles.wrapperInput}>
						<label className={styles.labelInput} htmlFor=''>
							Chức vụ
						</label>
						<input
							placeholder='Tên chức vụ'
							className={styles.inputModal}
							value={roleName}
							onChange={(e) => setRoleName(e.target.value)}
						/>
						<label className={styles.labelCheckbox} htmlFor='isManager'>
							<input
								type='checkbox'
								id='isManager'
								className={styles.checkboxModal}
								checked={isManager}
								onChange={(e) => setIsManager(e.target.checked)}
							/>
							Xác nhận chức vụ này là cấp quản lý
						</label>
						<Button size='md' variant='primary' onClick={handleCreateRole}>
							Xác nhận
						</Button>
					</div>
				</Modal>
			)}
			{modalType === 'createDepartment' && (
				<Modal title='Tạo phòng ban' isOpen={true} onClose={closeModal}>
					<div className={styles.wrapperInput}>
						<label className={styles.labelInput} htmlFor=''>
							Tên phòng ban
						</label>
						<input
							placeholder='Nhập tên phòng ban (ví dụ: Phòng kinh doanh)'
							className={styles.inputModal}
							value={departmentName}
							onChange={(e) => setDepartmentName(e.target.value)}
						/>
						<label className={styles.labelInput} htmlFor=''>
							Mã phòng ban
						</label>
						<input
							placeholder='Tên phòng ban (ví dụ: KINHDOANH)'
							className={styles.inputModal}
							value={departmentCode}
							onChange={(e) => setDepartmentCode(e.target.value)}
						/>
						<Button size='md' variant='primary' onClick={handleAddDepartment}>
							Xác nhận
						</Button>
					</div>
				</Modal>
			)}
			{modalType === 'updateDepartment' && (
				<Modal title='Cập nhật phòng ban' isOpen={true} onClose={closeModal}>
					<div className={styles.wrapperInput}>
						<label className={styles.labelInput} htmlFor=''>
							Tên phòng ban
						</label>
						<input
							className={styles.inputModal}
							value={departmentName}
							onChange={(e) => setDepartmentName(e.target.value)}
						/>
						<label className={styles.labelInput} htmlFor=''>
							Mã phòng ban
						</label>
						<input
							placeholder='KINHDOANH'
							className={styles.inputModal}
							value={departmentCode}
							onChange={(e) => setDepartmentCode(e.target.value)}
						/>
						<Button
							size='md'
							variant='primary'
							onClick={handleUpdateDepartment}
						>
							Xác nhận
						</Button>
					</div>
				</Modal>
			)}
			{modalType === 'editDepartment' && (
				<Modal title={departmentName} isOpen={true} onClose={closeModal}>
					<div className={styles.modalContainer}>
						{employeesInDepartment.length === 0 ? (
							<div className={styles.leftPanel}>
								<div className={styles.imgModal}>
									<img src={Img} alt='No employees' />
								</div>
								<p>
									Không có nhân sự trong phòng này. Bạn muốn thêm nhân sự mới?
								</p>
								<div className={styles.btnModal}>
									<Button
										size='md'
										variant='primary'
										iconLeft={<Plus size={15} />}
										disabled={showAddEmployeeSidebar}
										onClick={() => setShowAddEmployeeSidebar(true)}
									>
										Thêm nhân sự
									</Button>
								</div>
							</div>
						) : (
							<div className={styles.leftPanelCard}>
								<div className={styles.headerContainer}>
									<div className={styles.topBar}>
										<span className={styles.totalCount}>
											Số nhân sự: {employeesInDepartment.length}
										</span>
										<Input
											className={styles.searchInput}
											span={true}
											placeholder='Tìm kiếm nhân sự hoặc cán bộ...'
											iconLeft={<Search size={15} />}
											value={searchEmployee}
											onChange={(e) => setSearchEmployee(e.target.value)}
										/>
									</div>

									<div className={styles.tableHeader}>
										<span>Chọn</span>
										<span>Ảnh</span>
										<span>Họ và tên</span>
										<span>Chức vụ</span>
										<span>T.T Hoạt động</span>
									</div>
								</div>

								<div className={styles.cardContainer}>
									{employeesInDepartment
										.filter((emp) => {
											const search = searchEmployee.toLowerCase();
											const role = roles.find((r) => r.id === emp.roleId);
											const roleName = role ? role.name.toLowerCase() : '';
											return (
												emp.name.toLowerCase().includes(search) ||
												roleName.includes(search)
											);
										})
										.map((emp) => (
											<EmployeeCard key={emp.id} employee={emp} />
										))}
								</div>

								<div className={styles.btnAddEmployee}>
									<Button
										iconLeft={<Plus size={24} />}
										onClick={() => setShowAddEmployeeSidebar(true)}
									>
										Thêm nhân sự
									</Button>
								</div>
							</div>
						)}

						{showAddEmployeeSidebar && (
							<div className={styles.rightPanel}>
								<div className={styles.sidebarHeader}>
									<Button
										variant='secondary'
										onClick={() => setShowAddEmployeeSidebar(false)}
									>
										Xong
									</Button>
									<p className={styles.subTitle}>
										Nhân sự (
										{
											employeeList.filter((emp) => emp.departmentId === null)
												.length
										}
										)
									</p>
									<span>Nhân sự chưa có phòng ban sẽ hiển thị dưới đây</span>
								</div>

								<div className={styles.employeeList}>
									{employeeList
										.filter((emp) => emp.departmentId === null)
										.map((emp) => {
											const role = roles.find((r) => r.id === emp.roleId);
											return (
												<div className={styles.employeeItem} key={emp.id}>
													<img src={emp.avatar} className={styles.avatar} />
													<div className={styles.info}>
														<p className={styles.name}>{emp.name}</p>
														<p className={styles.role}>
															{role?.name || 'Chưa rõ vai trò'}
														</p>
													</div>
													<button
														onClick={() =>
															selectedDepartment?.id &&
															updateEmployeeDepartment({
																employeeId: emp.id,
																departmentId: selectedDepartment.id,
															})
														}
													>
														<Plus size={15} />
													</button>
												</div>
											);
										})}
								</div>
							</div>
						)}
					</div>
				</Modal>
			)}

			{modalType === 'deleteDepartment' && (
				<ModalCenter
					title='Xóa phòng ban'
					isOpen={true}
					onClose={closeModal}
					footer={
						<>
							<Button onClick={closeModal}>Hủy bỏ</Button>
							<Button variant='danger' onClick={handleDeleteDepartment}>
								Chắc chắn xóa
							</Button>
						</>
					}
				>
					<p>Bạn có chắc chắn muốn xóa phòng ban này không?</p>
					<div style={{ fontSize: '1.2rem', fontWeight: '700' }}>
						{selectedDepartment?.name}
					</div>
					<p
						style={{
							color: 'red',
							marginTop: '1rem',
							backgroundColor: '#FFE0E0',
							padding: '16px',
							textAlign: 'center',
						}}
					>
						Tất cả dữ liệu trong phòng ban này sẽ xóa bỏ hoàn toàn!
					</p>
				</ModalCenter>
			)}
		</>
	);
};

export default DepartmentManager;
