import { OrgState, OrgAction } from './OrgTypes';
import { mockEmployeeList, mockRoles } from '../utils/data';
import { mockDepartments } from '../utils/data';
export const initialOrgState: OrgState = {
	modalType: null,
	roles: mockRoles,
	departments: mockDepartments,
	employeeList: mockEmployeeList,
};

export const orgReducer = (state: OrgState, action: OrgAction): OrgState => {
	switch (action.type) {
		case 'OPEN_MODAL':
			return { ...state, modalType: action.payload };
		case 'CLOSE_MODAL':
			return { ...state, modalType: null };
		case 'ADD_ROLE':
			return { ...state, roles: [...state.roles, action.payload] };
		case 'REMOVE_ROLE':
			return {
				...state,
				roles: state.roles.filter((r) => r.id !== action.payload),
			};
		case 'ADD_DEPARTMENT':
			return { ...state, departments: [...state.departments, action.payload] };
		case 'UPDATE_DEPARTMENT':
			return {
				...state,
				departments: state.departments.map((dept) =>
					dept.id === action.payload.id ? action.payload : dept
				),
			};
		case 'UPDATE_EMPLOYEE_DEPARTMENT':
			console.log('Updating employee:', action.payload);
			return {
				...state,
				employeeList: state.employeeList.map((emp) =>
					emp.id === action.payload.employeeId
						? { ...emp, departmentId: action.payload.departmentId }
						: emp
				),
			};
		case 'REMOVE_DEPARTMENT':
			return {
				...state,
				departments: state.departments.filter((d) => d.id !== action.payload),
			};
		case 'CHANGE_EMPLOYEE_DEPARTMENT':
			return {
				...state,
				employeeList: state.employeeList.map((emp) =>
					emp.id === action.payload.employeeId
						? { ...emp, departmentId: action.payload.departmentId }
						: emp
				),
			};

		case 'UPDATE_EMPLOYEE_ROLE':
			return {
				...state,
				employeeList: state.employeeList.map((emp) =>
					emp.id === action.payload.employeeId
						? { ...emp, roleId: action.payload.roleId }
						: emp
				),
			};

		case 'UPDATE_EMPLOYEE_UNIT':
			return {
				...state,
				employeeList: state.employeeList.map((emp) =>
					emp.id === action.payload.employeeId
						? { ...emp, unitId: action.payload.unitId }
						: emp
				),
			};
		case 'DELETE_EMPLOYEE_DEPARTMENT':
			return {
				...state,
				employeeList: state.employeeList.map((emp) =>
					emp.id === action.payload.employeeId
						? { ...emp, departmentId: null }
						: emp
				),
			};
		default:
			return state;
	}
};
