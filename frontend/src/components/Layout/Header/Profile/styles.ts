import styled from 'styled-components';
import { Card } from 'antd';

export const StyledDropdownCard = styled(Card)`
	min-width: 240px;
	background-color: #fff;
	border-radius: 16px;
	padding: 0;
	display: flex;
	flex-direction: column;
`;

export const StyledUserInformation = styled.div`
	background-color: rgba(170, 170, 174, 0.15);
	border-block-end-width: 1px;
	border-block-end-color: rgba(170, 170, 174, 0.3);
	padding: 10px 15px;
	border-top-left-radius: 16px;
	border-top-right-radius: 16px;
`;

export const StyledUserName = styled.div`
	font-size: 17px;
	font-weight: 600;
	line-height: 21px;
`;

export const StyledUserEmailAddress = styled.div`
	overflow: hidden;
	font-size: 14px;
	font-weight: 300;
	line-height: 20px;
	color: #58585a;
`;
