import { Typography } from 'antd';

import DatabasesList from './DatabasesList';
import CreateDatabase from './CreateDatabase';

const { Title } = Typography;

const Databases = () => (
	<div>
		<div>
			<Title>h1. Ant Design</Title>
			<CreateDatabase />
		</div>
		<DatabasesList />
	</div>
);

export default Databases;
