export type ModalType =
	| 'createRole'
	| 'createDepartment'
	| 'updateDepartment'
	| 'editDepartment'
	| 'deleteDepartment'
	| null;

export interface Role {
	id: number;
	name: string;
	status: boolean;
	isManager: boolean;
}
export interface Employee {
	id: number;
	name: string;
	status: string;
	avatar: string;
	roleId: number;
	departmentId: number | null;
	unitId: number | null;
}
export interface Department {
	id: number;
	name: string;
	code: string;
	employees?: Employee[];
}

export interface OrgState {
	modalType: ModalType;
	roles: Role[];
	departments: Department[];
	employeeList: Employee[];
}

export type OrgAction =
	| { type: 'OPEN_MODAL'; payload: ModalType }
	| { type: 'CLOSE_MODAL' }
	| { type: 'ADD_ROLE'; payload: Role }
	| { type: 'REMOVE_ROLE'; payload: number }
	| { type: 'ADD_DEPARTMENT'; payload: Department }
	| { type: 'UPDATE_DEPARTMENT'; payload: Department }
	| {
			type: 'UPDATE_EMPLOYEE_DEPARTMENT';
			payload: { employeeId: number; departmentId: number };
	  }
	| {
			type: 'CHANGE_EMPLOYEE_DEPARTMENT';
			payload: { employeeId: number; departmentId: number };
	  }
	| { type: 'REMOVE_DEPARTMENT'; payload: number }
	| {
			type: 'UPDATE_EMPLOYEE_ROLE';
			payload: { employeeId: number; roleId: number };
	  }
	| {
			type: 'UPDATE_EMPLOYEE_UNIT';
			payload: { employeeId: number; unitId: number };
	  }
	| {
			type: 'DELETE_EMPLOYEE_DEPARTMENT';
			payload: { employeeId: number };
	  };
