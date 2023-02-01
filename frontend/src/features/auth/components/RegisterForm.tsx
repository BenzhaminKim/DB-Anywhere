import { Button, Form, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { useRegister } from '@/lib/auth';
import { RegisterCredentialsDTO } from '../api/register';

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};

function RegisterForm() {
	const registerMutation = useRegister();
	const [form] = Form.useForm();

	const onFinish = (values: any) => {
		console.log('Received values of form: ', values);
		const { name, email, password } = values;
		const userInfo: RegisterCredentialsDTO = {
			name,
			email,
			password,
		};
		registerMutation.mutate(userInfo);
	};

	return (
		<Form
			labelCol={formItemLayout.labelCol}
			wrapperCol={formItemLayout.wrapperCol}
			form={form}
			name="register"
			onFinish={onFinish}
			style={{ maxWidth: 600 }}
			scrollToFirstError
		>
			<Form.Item
				name="name"
				label="Name"
				rules={[{ required: true, message: 'Please input your name!', whitespace: true }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name="email"
				label="E-mail"
				rules={[
					{
						type: 'email',
						message: 'The input is not valid E-mail!',
					},
					{
						required: true,
						message: 'Please input your E-mail!',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name="password"
				label="Password"
				rules={[
					{
						required: true,
						message: 'Please input your password!',
					},
				]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name="confirm"
				label="Confirm Password"
				dependencies={['password']}
				hasFeedback
				rules={[
					{
						required: true,
						message: 'Please confirm your password!',
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error('The two passwords that you entered do not match!'));
						},
					}),
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item>
				<Button loading={registerMutation.isLoading} type="primary" htmlType="submit" className="login-form-button">
					Log in
				</Button>
			</Form.Item>
			<Link to="../login">Log In</Link>
		</Form>
	);
}

export default RegisterForm;
