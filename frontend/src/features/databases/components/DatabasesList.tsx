import { Spin, Table, Empty } from 'antd';
import Link from '@/components/Elements/Link';
import { formatDate } from '@/utils/format';

import { useDatabases } from '../api/getDatabases';

export default function DatabasesList() {
	const databasesQuery = useDatabases();

	if (databasesQuery.isLoading) {
		return <Spin size="large" />;
	}
	if (!databasesQuery.data || !databasesQuery?.data?.databases.length) return <Empty />;
	return (
		<Table
			dataSource={databasesQuery?.data?.databases}
			rowKey="id"
			columns={[
				{
					title: 'Id',
					dataIndex: 'id',
					key: 'id',
					render: (id: string) => <Link to={`./${id}`}>{id}</Link>,
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
