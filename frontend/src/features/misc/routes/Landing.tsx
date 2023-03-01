import { Typography, Button } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	background-color: ${(props) => props.theme.backgroundColor};
`;

const { Title } = Typography;

export default function Landing() {
	return (
		<StyledDiv>
			<Title style={{ fontSize: '80px' }}>DB Anywhere</Title>
			<Link to="/auth/login">
				<Button
					type="primary"
					shape="round"
					size="large"
					style={{ height: '44px', fontSize: '19px', backgroundColor: 'black' }}
				>
					Login
				</Button>
			</Link>
		</StyledDiv>
	);
}
