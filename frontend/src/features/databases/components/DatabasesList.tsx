import { Typography, Table } from 'antd';
import { formatDate } from '@/utils/format';
import { useState } from 'react';

import DatabaseDrawer from '../components/DatabaseDrawer';
import { useDatabases } from '../api/getDatabases';

const { Link } = Typography;

export default function DatabasesList() {
	const [selectedDatabaseId, setSelectedDatabaseId] = useState(undefined);
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
						render: (name, row) => <Link onClick={() => setSelectedDatabaseId(row.id)}>{name}</Link>,
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
}
