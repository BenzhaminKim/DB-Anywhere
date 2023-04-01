import { Typography, Card } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;
export const StyledDiv = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	padding: 20px;
	background-color: ${(props) => props.theme.backgroundColor};
`;

export const StyledTitle = styled(Title)`
	@media screen and (min-width: 759px) {
		font-size: 100px !important;
	}
	@media screen and (max-width: 759px) {
		font-size: 50px !important;
	}
`;

export const StyledTitleDescription = styled.div`
	margin-top: 30px;
	text-align: center;
	@media screen and (min-width: 759px) {
		font-size: 40px !important;
	}
	@media screen and (max-width: 759px) {
		font-size: 24px !important;
	}
`;

export const StyledCard = styled(Card)`
	margin-top: 90px;
	max-width: 1000px;
`;

export const StyledCardTitle = styled.div`
	font-size: 28px;
	line-height: 28px;
	text-align: center;
	margin-top: 30px;
	@media screen and (min-width: 759px) {
		font-size: 28px !important;
	}
	@media screen and (max-width: 759px) {
		font-size: 21px !important;
	}
`;

export const StyledCardContent = styled.div`
	font-weight: 400;
	line-height: 25px;
	margin-top: 20px;
	margin-bottom: 20px;
	text-align: center;
	@media screen and (min-width: 759px) {
		font-size: 17px !important;
	}
	@media screen and (max-width: 759px) {
		font-size: 17px !important;
	}
`;
