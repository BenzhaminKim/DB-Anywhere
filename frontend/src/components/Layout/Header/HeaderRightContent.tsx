import styled from 'styled-components';

import Profile from './Profile';

const StyledContent = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`;

const HeaderRightContent = () => (
	<StyledContent>
		<Profile />
	</StyledContent>
);

export default HeaderRightContent;
