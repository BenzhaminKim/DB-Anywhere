import { Card, Progress, Typography } from 'antd';
import { DashboardFilled } from '@ant-design/icons';

import {
	StyledAvailableCapacityText,
	StyledCapacityContent,
	StyledCapacityDot,
	StyledCapacityRight,
	StyledUsedCapacityText,
	StyledUserCapacity,
} from './styles';

const { Text } = Typography;

const CapacityCard = () => (
	<Card title={<span style={{ fontSize: '19px' }}>Capacity</span>}>
		<Text>DB Anywhere is currently in closed beta, currently you can create databases within limited CPU cores.</Text>
		<StyledCapacityContent>
			<StyledUserCapacity>3 CORE</StyledUserCapacity>
			<StyledCapacityRight>
				<StyledUsedCapacityText>2 core used</StyledUsedCapacityText>
				<StyledCapacityDot>•</StyledCapacityDot>
				<StyledAvailableCapacityText>1 core available</StyledAvailableCapacityText>
			</StyledCapacityRight>
		</StyledCapacityContent>
		<Progress
			percent={66}
			size={[-1, 14]}
			status="active"
			strokeColor={{ from: '#E5BB34', to: '#E5BB34' }}
			showInfo={false}
		/>
	</Card>
);

export default CapacityCard;
