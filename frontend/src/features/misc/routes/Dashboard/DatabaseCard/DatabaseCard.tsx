import { Card } from 'antd';

import DatabasesList from '@/features/databases/components/DatabasesList';
import CreateDatabase from '@/features/databases/components/CreateDatabase';

const DatabaseCard = () => (
	<Card title={<span style={{ fontSize: '19px' }}>Database</span>} extra={<CreateDatabase />}>
		<DatabasesList />
	</Card>
);

export default DatabaseCard;
