import { lazyImport } from '@/utils/lazyImport';
import { Navigate } from 'react-router-dom';

const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');

const publicRoutes = [
	{
		path: '/auth/*',
		element: <AuthRoutes />,
	},
	{
		path: '*',
		element: <Navigate to="/" />,
	},
];

export default publicRoutes;
