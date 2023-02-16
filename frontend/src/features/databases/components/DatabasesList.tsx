import { Spin, Table, Empty } from 'antd';
import { formatDate } from '@/utils/format';

import { useDatabases } from '../api/getDatabases';

export default function DatabasesList() {
	const databasesQuery = useDatabases();

	if (databasesQuery.isLoading) {
		return <Spin size="large" />;
	}
	if (!databasesQuery.data || !databasesQuery?.data?.length) return <Empty />;
	return (
		<Table
			dataSource={databasesQuery.data}
			columns={[
				{
					title: 'Id',
					dataIndex: 'id',
					key: 'id',
				},
				{
					title: 'Name',
					dataIndex: 'name',
					key: 'name',
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
					title: 'DB Capacity',
					dataIndex: 'db_capacity',
					key: 'db_capacity',
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
	);
}
