import { Avatar, Card, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AuthUser } from '@/features/auth';

const { Title, Text } = Typography;

const ProfileCard = ({ userData }: { userData: AuthUser | null | undefined }) => {
	if (!userData) {
		return null;
	}
	const { name, email } = userData;
	return (
		<Card>
			<Avatar size={88} icon={<UserOutlined />} style={{ marginTop: '5px' }} />
			<Title level={2} style={{ marginTop: '37px', marginBottom: 0 }}>
				{name}
			</Title>
			<Text>{email}</Text>
		</Card>
	);
};

export default ProfileCard;
