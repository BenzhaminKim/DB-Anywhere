import { Descriptions, Drawer, Skeleton } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { useDatabase } from '../api/getDatabase';
import DeleteDatabase from './DeleteDatabase';
import { formatDate } from '@/utils/format';

type DatabaseDrawerProps = {
	databaseId: string | undefined;
	setSelectedDatabaseId: Dispatch<SetStateAction<undefined>>;
};

const DatabaseDrawer = ({ databaseId, setSelectedDatabaseId }: DatabaseDrawerProps) => {
	const databaseQuery = useDatabase({ databaseId: databaseId as string });
	if (databaseQuery.isLoading) {
		return null;
	}
	const database = databaseQuery.data;
	return (
		<Drawer
			width={500}
			title={database?.name}
			placement="right"
			extra={
				<DeleteDatabase databaseId={database?.id as string} callbackFunc={() => setSelectedDatabaseId(undefined)} />
			}
			onClose={() => setSelectedDatabaseId(undefined)}
			open={Boolean(databaseId)}
		>
			{database ? (
				<Descriptions column={1}>
					<Descriptions.Item label="ID">{database.id}</Descriptions.Item>
					<Descriptions.Item label="Type">{database.type}</Descriptions.Item>
					<Descriptions.Item label="Name">{database.db_name}</Descriptions.Item>
					<Descriptions.Item label="User">{database.db_user}</Descriptions.Item>
					<Descriptions.Item label="Capacity">{database.db_capacity}</Descriptions.Item>
					<Descriptions.Item label="Status">{database.status}</Descriptions.Item>
					<Descriptions.Item label="Host">{database.db_host}</Descriptions.Item>
					<Descriptions.Item label="Password">{database.db_password}</Descriptions.Item>
					<Descriptions.Item label="CreatedAt">{formatDate(database.created_at)}</Descriptions.Item>
				</Descriptions>
			) : (
				<Skeleton active />
			)}
		</Drawer>
	);
};

export default DatabaseDrawer;
