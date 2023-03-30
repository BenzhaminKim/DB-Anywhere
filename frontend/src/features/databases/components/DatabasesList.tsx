import { Table, Button } from 'antd';
import { formatDate } from '@/utils/format';
import { useState } from 'react';

import DatabaseDrawer from './DatabaseDrawer';
import { useDatabases } from '../api/getDatabases';

const DatabasesList = () => {
	const [selectedDatabaseId, setSelectedDatabaseId] = useState<string | undefined>(undefined);
	const databasesQuery = useDatabases();
	return (
		<div>
			<Table
				loading={databasesQuery.isLoading}
				dataSource={databasesQuery?.data?.databases}
				rowKey="id"
				columns={[
					{
						title: 'Name',
						dataIndex: 'name',
						key: 'name',
						render: (name, row) => (
							<Button type="link" onClick={() => setSelectedDatabaseId(row.id)} style={{ padding: 0 }}>
								{name}
							</Button>
						),
					},
					{
						title: 'Type',
						dataIndex: 'type',
						key: 'type',
					},
					{
						title: 'DB Name',
						dataIndex: 'db_name',
						key: 'db_name',
					},
					{
						title: 'DB User',
						dataIndex: 'db_user',
						key: 'db_user',
					},
					{
						title: 'Capacity',
						dataIndex: 'db_capacity',
						key: 'db_capacity',
						render: (capacity: number) => `${capacity}MB`,
					},
					{
						title: 'Status',
						dataIndex: 'status',
						key: 'status',
					},
					{
						title: 'Created At',
						dataIndex: 'created_at',
						key: 'created_at',
						render: (time) => formatDate(time),
					},
				]}
			/>
			<DatabaseDrawer databaseId={selectedDatabaseId} setSelectedDatabaseId={setSelectedDatabaseId} />
		</div>
	);
};

export default DatabasesList;
