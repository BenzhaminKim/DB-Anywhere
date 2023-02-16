import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Spin } from 'antd';
import { lazyImport } from '@/utils/lazyImport';
import { MainLayout } from '@/components/Layout';

const { DatabasesRoutes } = lazyImport(() => import('@/features/databases'), 'DatabasesRoutes');
const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');

function App() {
	return (
		<MainLayout>
			<Suspense
				fallback={
					<div
						style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
					>
						<Spin size="large" />
					</div>
				}
			>
				<Outlet />
			</Suspense>
		</MainLayout>
	);
}

const protectedRoutes = [
	{
		path: '/app',
		element: <App />,
		children: [
			{ path: 'database/*', element: <DatabasesRoutes /> },
			{ path: '', element: <Dashboard /> },
			{ path: '*', element: <Navigate to="." /> },
		],
	},
];

export default protectedRoutes;
