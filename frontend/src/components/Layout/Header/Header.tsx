import * as React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

import HeaderLogo from './HeaderLogo';
import HeaderRightContent from './HeaderRightContent';

const { Header } = Layout;

const StyledHeader = styled(Header)`
	background-color: rgba(37, 38, 40, 0.21);
	background-image: radial-gradient(circle at 25%, hsla(0, 0%, 100%, 0.2), rgba(50, 50, 50, 0.2) 80%);
	backdrop-filter: blur(14px);
	height: 44px;
	min-height: 44px;
	min-width: 100%;
	padding: 0;
`;

const StyledHeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	flex-wrap: nowrap;
	margin-inline: 16px 10px;
	height: 100%;
`;

export default function ContentLayout() {
	return (
		<StyledHeader>
			<StyledHeaderContainer>
				<HeaderLogo />
				<HeaderRightContent />
			</StyledHeaderContainer>
		</StyledHeader>
	);
}
