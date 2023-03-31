import { Card, Progress, Typography } from 'antd';

import { useDatabaseCapacity } from '@/features/databases/api/getDatabaseCapacity';

import {
	StyledAvailableCapacityText,
	StyledCapacityContent,
	StyledCapacityDot,
	StyledCapacityRight,
	StyledUsedCapacityText,
	StyledUserCapacity,
} from './styles';

const { Text } = Typography;

const CapacityCard = () => {
	const databaseCapacityQuery = useDatabaseCapacity();
	let unit = 'MB';
	let maximumCapacity = 0;
	let currentCapacity = 0;
	let percentage = 0;
	if (databaseCapacityQuery.data) {
		unit = databaseCapacityQuery.data.unit;
		maximumCapacity = databaseCapacityQuery.data.maximum_capacity;
		currentCapacity = databaseCapacityQuery.data.current_capacity;
		if (currentCapacity > 0 && maximumCapacity > 0) {
			percentage = (currentCapacity / maximumCapacity) * 100;
		}
	}
	return (
		<Card title={<span style={{ fontSize: '19px' }}>Capacity</span>}>
			<Text>DB Anywhere is currently in closed beta, currently you can create databases within limited storage.</Text>
			<StyledCapacityContent>
				<StyledUserCapacity>{`${maximumCapacity}${unit}`}</StyledUserCapacity>
				<StyledCapacityRight>
					<StyledUsedCapacityText>{`${currentCapacity}${unit}`} used</StyledUsedCapacityText>
					<StyledCapacityDot>•</StyledCapacityDot>
					<StyledAvailableCapacityText>
						{`${maximumCapacity - currentCapacity}${unit}`} available
					</StyledAvailableCapacityText>
				</StyledCapacityRight>
			</StyledCapacityContent>
			<Progress
				percent={percentage}
				size={[-1, 14]}
				status="active"
				strokeColor={{ from: '#E5BB34', to: '#E5BB34' }}
				showInfo={false}
			/>
		</Card>
	);
};

export default CapacityCard;
