import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { OrgProvider } from './store/index.ts';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<OrgProvider>
			<App />
		</OrgProvider>
	</StrictMode>
);
