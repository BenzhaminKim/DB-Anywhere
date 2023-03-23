import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';

import { useUser, useLogout } from '@/lib/auth';
import { StyledDropdownCard, StyledUserInformation, StyledUserName, StyledUserEmailAddress } from './styles';

const Profile = () => {
	const user = useUser();
	const logout = useLogout();
	const navigate = useNavigate();
	const handleLogout = () => {
		logout.mutate({});
		navigate('/landing');
	};
	return (
		<Dropdown
			dropdownRender={() => (
				<StyledDropdownCard
					cover={
						<StyledUserInformation>
							<StyledUserName>{user.data?.name}</StyledUserName>
							<StyledUserEmailAddress>{user.data?.email}</StyledUserEmailAddress>
						</StyledUserInformation>
					}
					bodyStyle={{ padding: '5px' }}
				>
					<div>
						<Button
							danger
							icon={<LogoutOutlined />}
							type="text"
							style={{ width: '100%' }}
							onClick={() => handleLogout()}
						>
							Logout
						</Button>
					</div>
				</StyledDropdownCard>
			)}
			trigger={['hover']}
		>
			<Avatar icon={<UserOutlined />} />
		</Dropdown>
	);
};

export default Profile;
