import { lazyImport } from '@/utils/lazyImport';
import { Navigate } from 'react-router-dom';

const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');
const { Landing } = lazyImport(() => import('@/features/misc'), 'Landing');

const publicRoutes = [
	{
		path: '/auth/*',
		element: <AuthRoutes />,
	},
	{
		path: '/landing',
		element: <Landing />,
	},
	{
		path: '*',
		element: <Navigate to="/" />,
	},
];

export default publicRoutes;
