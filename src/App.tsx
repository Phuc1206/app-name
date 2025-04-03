import { useState } from 'react';
import DepartmentManager from './components/pages/DepartmentManager/DepartmentManager';
import Topbar from './components/Topbar/Topbar';

function App() {
	const [searchCodeDepartment, setSearchCodeDepartment] = useState('');
	return (
		<>
			<Topbar
				searchCode={searchCodeDepartment}
				setSearchCode={setSearchCodeDepartment}
			/>
			<DepartmentManager searchCodeDeparment={searchCodeDepartment} />
		</>
	);
}

export default App;
