import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';

import { useLogin } from '@/lib/auth';

type LoginFormProps = {
	onSuccess: () => void;
};

export function LoginForm({ onSuccess }: LoginFormProps) {
	const login = useLogin();

	const onFinish = async (values: any) => {
		await login.mutateAsync(values);
		message.success(`Welcome to DB Anywhere`);
		onSuccess();
	};

	return (
		<Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onFinish}>
			<Form.Item name="email" rules={[{ required: true, type: 'email' }]}>
				<Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email address" />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
				<Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
			</Form.Item>
			<Form.Item>
				<Button loading={login.isLoading} type="primary" htmlType="submit" className="login-form-button">
					Log in
				</Button>
				<span style={{ marginLeft: '5px' }}>Or</span> <Link to="../register">register now!</Link>
			</Form.Item>
		</Form>
	);
}

export default LoginForm;
