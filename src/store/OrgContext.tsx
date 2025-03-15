import React, { createContext, useContext, useReducer } from 'react';
import { orgReducer, initialOrgState } from './orgReducer';
import { OrgAction, OrgState, Role, Department, ModalType } from './OrgTypes';

interface OrgContextProps extends OrgState {
	dispatch: React.Dispatch<OrgAction>;
	openModal: (type: ModalType) => void;
	closeModal: () => void;
	addRole: (role: Role) => void;
	removeRole: (id: number) => void;
	addDepartment: (d: Department) => void;
	updateDepartment: (d: Department) => void;
	removeDepartment: (id: number) => void;
	updateEmployeeDepartment: (d: {
		employeeId: number;
		departmentId: number;
	}) => void;
	changeEmployeeDepartment: (d: {
		employeeId: number;
		departmentId: number;
	}) => void;
	updateEmployeeUnit: (d: { employeeId: number; unitId: number }) => void;
	updateEmployeeRole: (d: { employeeId: number; roleId: number }) => void;
	deleteEmployeeDepartment: (d: { employeeId: number }) => void;
}

const OrgContext = createContext<OrgContextProps | undefined>(undefined);

export const OrgProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [state, dispatch] = useReducer(orgReducer, initialOrgState);

	const openModal = (type: ModalType) =>
		dispatch({ type: 'OPEN_MODAL', payload: type });
	const closeModal = () => dispatch({ type: 'CLOSE_MODAL' });

	const addRole = (role: Role) => dispatch({ type: 'ADD_ROLE', payload: role });
	const removeRole = (id: number) =>
		dispatch({ type: 'REMOVE_ROLE', payload: id });

	const addDepartment = (d: Department) =>
		dispatch({ type: 'ADD_DEPARTMENT', payload: d });
	const updateDepartment = (d: Department) =>
		dispatch({ type: 'UPDATE_DEPARTMENT', payload: d });
	const removeDepartment = (id: number) =>
		dispatch({ type: 'REMOVE_DEPARTMENT', payload: id });
	const updateEmployeeDepartment = (d: {
		employeeId: number;
		departmentId: number;
	}) => dispatch({ type: 'UPDATE_EMPLOYEE_DEPARTMENT', payload: d });
	const changeEmployeeDepartment = (d: {
		employeeId: number;
		departmentId: number;
	}) => dispatch({ type: 'CHANGE_EMPLOYEE_DEPARTMENT', payload: d });
	const updateEmployeeUnit = (d: { employeeId: number; unitId: number }) =>
		dispatch({ type: 'UPDATE_EMPLOYEE_UNIT', payload: d });

	const updateEmployeeRole = (d: { employeeId: number; roleId: number }) =>
		dispatch({ type: 'UPDATE_EMPLOYEE_ROLE', payload: d });
	const deleteEmployeeDepartment = (d: { employeeId: number }) =>
		dispatch({ type: 'DELETE_EMPLOYEE_DEPARTMENT', payload: d });
	return (
		<OrgContext.Provider
			value={{
				...state,
				dispatch,
				openModal,
				closeModal,
				addRole,
				removeRole,
				addDepartment,
				updateDepartment,
				removeDepartment,
				updateEmployeeDepartment,
				changeEmployeeDepartment,
				updateEmployeeUnit,
				updateEmployeeRole,
				deleteEmployeeDepartment,
			}}
		>
			{children}
		</OrgContext.Provider>
	);
};

export const useOrg = (): OrgContextProps => {
	const context = useContext(OrgContext);
	if (!context) throw new Error('useOrg must be used within OrgProvider');
	return context;
};
