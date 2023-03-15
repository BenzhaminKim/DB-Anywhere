import { useParams } from 'react-router-dom';
import Head from '@/components/Head';

import { useDatabase } from '../api/getDatabase';
import { Descriptions, Skeleton } from 'antd';

export const Database = () => {
	const { databaseId } = useParams();
	const databaseQuery = useDatabase({ databaseId: databaseId as string });

	if (!databaseId) return null;

	if (databaseQuery.isLoading) {
		return <Skeleton active />;
	}

	const database = databaseQuery.data;
	if (!database) return null;

	return (
		<>
			<Head title={database.name} />
			<Descriptions title={database.name}>
				<Descriptions.Item label="DB ID">{database.id}</Descriptions.Item>
				<Descriptions.Item label="DB Type">{database.type}</Descriptions.Item>
				<Descriptions.Item label="DB Name">{database.db_name}</Descriptions.Item>
				<Descriptions.Item label="DB User">{database.db_user}</Descriptions.Item>
				<Descriptions.Item label="DB Capacity">{database.db_capacity}</Descriptions.Item>
				<Descriptions.Item label="DB Status">{database.status}</Descriptions.Item>
				<Descriptions.Item label="DB CreatedAt">{database.created_at}</Descriptions.Item>
			</Descriptions>
		</>
	);
};

export default Database;
