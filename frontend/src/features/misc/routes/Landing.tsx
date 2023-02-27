import { Link } from 'react-router-dom';
import { Divider, Space, Typography } from 'antd';
import styled from 'styled-components';

import { Card, TitleCard } from '@/components/Elements';

const StyledDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	background-color: ${(props) => props.theme.backgroundColor};
`;

export default function Landing() {
	return (
		<StyledDiv>
			<div>
				<TitleCard title="DB Anywhere" />
				<Card>
					<Space split={<Divider type="vertical" />}>
						<Typography.Link>
							<Link to="/auth/login">
								<div>Login</div>
							</Link>
						</Typography.Link>
						<Typography.Link>
							<Link to="/auth/register">
								<div>Register</div>
							</Link>
						</Typography.Link>
					</Space>
				</Card>
			</div>
		</StyledDiv>
	);
}
