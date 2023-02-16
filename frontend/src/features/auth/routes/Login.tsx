import { useNavigate } from 'react-router-dom';

import Layout from '../components/Layout';
import LoginForm from '../components/LoginForm';

export default function Login() {
	const navigate = useNavigate();
	return (
		<Layout title="Log in to your account">
			<LoginForm onSuccess={() => navigate('/app')} />
		</Layout>
	);
}
