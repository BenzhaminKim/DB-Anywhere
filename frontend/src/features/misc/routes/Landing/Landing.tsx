import { Button } from 'antd';
import { Link } from 'react-router-dom';

import image from '@/assets/DbeeAnywhere.png';
import {
	StyledDiv,
	StyledTitle,
	StyledTitleDescription,
	StyledCardTitle,
	StyledCardContent,
	StyledCard,
} from './styles';

const Landing = () => {
	return (
		<StyledDiv>
			<StyledTitle>DbeeAnywhere</StyledTitle>
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
			<StyledTitleDescription>
				Get your databases running quickly
				<br /> with cloud deployment.
			</StyledTitleDescription>
			<StyledCard>
				<img
					src={image}
					alt="Database"
					style={{ width: '500px', margin: 'auto', display: 'block', marginTop: '20px' }}
				/>
				<StyledCardTitle>
					Easily deploy your databases on the cloud
					<br />
					with no configuration or installation required.
				</StyledCardTitle>
				<StyledCardContent>
					DbeeAnywhere allows for the deployment of popular databases such as PostgreSQL, MySQL, and MongoDB on the
					cloud, removing the need for physical hardware, software installation, and database configuration.
				</StyledCardContent>
			</StyledCard>
		</StyledDiv>
	);
};

export default Landing;
