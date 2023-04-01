import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, message, Modal, Select } from 'antd';
import { isAxiosError } from 'axios';

import { CreateDatabaseDTO, useCreateDatabase } from '../api/createDatabase';
import { useDatabaseCapacity } from '../api/getDatabaseCapacity';

const { Option } = Select;

const App: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();
	const createDatabaseMutation = useCreateDatabase();
	const databaseCapacityQuery = useDatabaseCapacity();
	const [messageApi, contextHolder] = message.useMessage();
	let unit = 'MB';
	let maximumCapacity = 0;
	let remainingCapacity = 0;
	if (databaseCapacityQuery.data) {
		unit = databaseCapacityQuery.data.unit;
		remainingCapacity = databaseCapacityQuery.data.maximum_capacity - databaseCapacityQuery.data.current_capacity;
		if (remainingCapacity > 25) {
			maximumCapacity = 25;
		} else {
			maximumCapacity = remainingCapacity;
		}
	}

	if (isModalOpen && remainingCapacity <= 0) {
		messageApi.open({
			key: 'UnableToCreateDatabaseMessage',
			type: 'warning',
			content: 'No more databases can be created because there is no remaining capacity.',
			duration: 2,
		});
		setIsModalOpen(false);
	}

	const handleCancel = () => {
		setIsModalOpen(false);
		form.resetFields();
	};

	const handleSubmit = async (values: CreateDatabaseDTO) => {
		await createDatabaseMutation.mutate(values, {
			onSuccess: () => {
				console.log('A new database has been created.');
			},
			onError: (error) => {
				if (isAxiosError(error) && error.response) {
					message.error(error.response.data.detail);
				}
			},
		});
		handleCancel();
	};

	return (
		<>
			{contextHolder}
			<Button
				type="link"
				onClick={() => setIsModalOpen(true)}
				icon={<PlusOutlined />}
				loading={createDatabaseMutation.isLoading}
			/>
			<Modal
				title="Create a new database"
				width={500}
				open={isModalOpen}
				onOk={form.submit}
				onCancel={() => handleCancel()}
				confirmLoading={createDatabaseMutation.isLoading}
				okText="Create"
			>
				<Form form={form} layout="vertical" onFinish={handleSubmit}>
					<Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter name' }]}>
						<Input placeholder="Please enter name" />
					</Form.Item>
					<Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please choose the type' }]}>
						<Select placeholder="Please choose the type">
							<Option value="postgres">PostgreSQL</Option>
							<Option value="mysql">MySQL</Option>
							<Option value="mongodb">MongoDB</Option>
						</Select>
					</Form.Item>
					<Form.Item
						name="db_name"
						label="Database Name"
						rules={[{ required: true, message: 'Please enter database name' }]}
					>
						<Input placeholder="Please enter database name" />
					</Form.Item>
					<Form.Item
						name="db_user"
						label="Database User"
						rules={[{ required: true, message: 'Please enter database user' }]}
					>
						<Input placeholder="Please enter database user" />
					</Form.Item>
					<Form.Item
						name="db_password"
						label="Database Password"
						rules={[{ required: true, message: 'Please enter database name' }]}
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						name="db_capacity"
						label="Database Capacity"
						rules={[{ required: true, message: 'Please enter database capacity' }]}
					>
						<InputNumber min={0} max={maximumCapacity} addonAfter={unit} />
					</Form.Item>
					<div style={{ color: 'grey' }}>
						For reference, the maximum capacity of one database is 25MB. Currently, your remaining capacity is{' '}
						<span>{remainingCapacity}</span>
						MB.
					</div>
				</Form>
			</Modal>
		</>
	);
};

export default App;
