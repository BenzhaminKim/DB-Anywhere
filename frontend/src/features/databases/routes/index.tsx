import { Navigate, Route, Routes } from 'react-router-dom';

import Database from './Database';
import Databases from './Databases';

export default function DatabasesRoutes() {
	return (
		<Routes>
			<Route path="" element={<Databases />} />
			<Route path=":databaseId" element={<Database />} />
			<Route path="*" element={<Navigate to="." />} />
		</Routes>
	);
}
