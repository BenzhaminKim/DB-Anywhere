import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { silentRefreshWithToken, getUser } from '@/features/auth';
import AppRoutes from '@/routes';
import axios from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import USER_QUERY_KEY from './features/auth/constants/auth';

const App = () => {
	const navigate = useNavigate();
	useEffect(() => {
		// Check if the user is authenticated
		silentRefreshWithToken()
			.then((loginResponse) => {
				axios.defaults.headers.common.Authorization = `Bearer ${loginResponse.token}`;
				getUser()
					.then((authUser) => {
						// user.data = authUser;
						queryClient.setQueryData(USER_QUERY_KEY, authUser);
						navigate('/app');
					})
					.catch((error) => {
						console.error('There was a problem checking authentication2:', error);
						navigate('/landing');
					});
			})
			.catch((error) => {
				console.error('There was a problem checking authentication:', error);
				navigate('/landing');
			});
		// return () => setIsMounted(false);
	}, []);

	return <AppRoutes />;
};

export default App;
