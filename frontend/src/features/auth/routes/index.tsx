// eslint-disable-next-line import/no-extraneous-dependencies
import { Navigate, Route, Routes } from 'react-router-dom';

import Login from './Login';
import Register from './Register';

export default function AuthRoutes() {
	return (
		<Routes>
			<Route path="register" element={<Register />} />
			<Route path="login" element={<Login />} />
			<Route path="*" element={<Navigate to="/auth/login" />} />
		</Routes>
	);
}
