import { Spin, Table, Empty, Space, Divider, Popconfirm } from 'antd';
import Link from '@/components/Elements/Link';
import { formatDate } from '@/utils/format';

import { useDatabases } from '../api/getDatabases';
import DeleteDatabase from './DeleteDatabase';

export default function DatabasesList() {
	const databasesQuery = useDatabases();
	return (
		<Table
			loading={databasesQuery.isLoading}
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
				{
					title: 'Action',
					key: 'action',
					render: (_, row) => (
						<Space size="middle" split={<Divider type="vertical" />}>
							<a>Edit</a>
							<DeleteDatabase databaseId={row.id} />
						</Space>
					),
				},
			]}
		/>
	);
}
