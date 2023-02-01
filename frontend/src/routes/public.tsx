import { lazyImport } from '@/utils/lazyImport';

const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');

const publicRoutes = [
	{
		path: '/auth/*',
		element: <AuthRoutes />,
	},
];

export default publicRoutes;
