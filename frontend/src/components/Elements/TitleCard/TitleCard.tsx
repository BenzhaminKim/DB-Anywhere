import styled from 'styled-components';

const StyledTitleCard = styled.div`
	background-color: #f9d745;
	padding: 10px 60px 10px 10px;
	border-radius: 0;
	border: 6px solid black;
	font-size: 40px;
	font-weight: bold;
`;

type TitleCardProps = {
	title: string;
};

const TitleCard = ({ title }: TitleCardProps) => <StyledTitleCard>{title}</StyledTitleCard>;

export default TitleCard;
