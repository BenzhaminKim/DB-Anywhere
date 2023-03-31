import { Spin } from 'antd';
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

export default function FirstLoading() {
	return (
		<StyledDiv>
			<Spin tip="Loading" size="large" />
			<div className="content" style={{ marginTop: '10px' }} />
		</StyledDiv>
	);
}
