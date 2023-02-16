import { Link } from 'react-router-dom';
import { Divider, Space, Typography } from 'antd';

export default function Landing() {
	return (
		<div>
			<div>DB Anywhere</div>

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
		</div>
	);
}
