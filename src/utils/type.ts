export type Role = {
	id: number;
	name: string;
	status: boolean;
	isManager: boolean;
};
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
	employeeCount?: number;
}
