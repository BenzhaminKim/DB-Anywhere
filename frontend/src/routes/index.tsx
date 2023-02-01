import { useRoutes } from 'react-router-dom';

import { Landing } from '@/features/misc';
import { useUser } from '@/lib/auth';
import protectedRoutes from './protected';
import publicRoutes from './public';

export default function AppRoutes() {
	const user = useUser();

	const commonRoutes = [{ path: '/', element: <Landing /> }];

	const routes = user.data ? protectedRoutes : publicRoutes;

	const element = useRoutes([...routes, ...commonRoutes]);

	// eslint-disable-next-line react/jsx-no-useless-fragment
	return <>{element}</>;
}
