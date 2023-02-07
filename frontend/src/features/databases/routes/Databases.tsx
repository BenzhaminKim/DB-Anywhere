import { ContentLayout } from '@/components/Layout';

import DatabasesList from '../components/DatabasesList';

export default function Databases() {
	return (
		<ContentLayout title="Databases">
			<DatabasesList />
		</ContentLayout>
	);
}
