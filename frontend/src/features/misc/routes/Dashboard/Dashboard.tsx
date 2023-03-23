import { ContentLayout } from '@/components/Layout';
import { useUser } from '@/lib/auth';
import { Col, Row } from 'antd';

import ProfileCard from './ProfileCard';
import CapacityCard from './CapacityCard';
import DatabaseCard from './DatabaseCard';
import { StyledDashboardMain, StyledDashboardContent } from './styles';

const Dashboard = () => {
	const user = useUser();
	return (
		<ContentLayout title="">
			<StyledDashboardMain>
				<StyledDashboardContent>
					<Row gutter={[16, 24]}>
						<Col className="gutter-row" xs={{ span: 24 }} lg={{ span: 8 }}>
							<ProfileCard userData={user.data} />
						</Col>
						<Col className="gutter-row" xs={{ span: 24 }} lg={{ span: 16 }}>
							<CapacityCard />
						</Col>
						<Col span={24}>
							<DatabaseCard />
						</Col>
					</Row>
				</StyledDashboardContent>
			</StyledDashboardMain>
		</ContentLayout>
	);
};

export default Dashboard;
