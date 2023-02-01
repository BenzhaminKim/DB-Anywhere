import { ContentLayout } from '@/components/Layout';

// import { CreateDiscussion } from '../components/CreateDiscussion';
import DatabasesList from '../components/DatabasesList';

export default function Discussions() {
	return (
		<ContentLayout title="Discussions">
			<DatabasesList />
		</ContentLayout>
	);
}
