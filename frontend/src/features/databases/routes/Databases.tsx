import { ContentLayout } from '@/components/Layout';

import CreateDatabase from '../components/CreateDatabase';
import DatabasesList from '../components/DatabasesList';

export default function Databases() {
	return (
		<ContentLayout title="Databases">
			<CreateDatabase />
			<DatabasesList />
		</ContentLayout>
	);
}
