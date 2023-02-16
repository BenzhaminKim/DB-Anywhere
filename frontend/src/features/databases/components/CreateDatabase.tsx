import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';

const { Option } = Select;

const App: React.FC = () => {
	const [open, setOpen] = useState(false);

	const showDrawer = () => {
		setOpen(true);
	};

	const onClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
				New Database
			</Button>
			<Drawer
				title="Create a new database"
				width={720}
				onClose={onClose}
				open={open}
				bodyStyle={{ paddingBottom: 80 }}
				extra={
					<Space>
						<Button onClick={onClose}>Cancel</Button>
						<Button onClick={onClose} type="primary">
							Submit
						</Button>
					</Space>
				}
			>
				<Form layout="vertical" hideRequiredMark>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter name' }]}>
								<Input placeholder="Please enter name" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item name="type" label="Type" rules={[{ required: true, message: 'Please choose the type' }]}>
								<Select placeholder="Please choose the type">
									<Option value="postgres">PostgreSQL</Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={12}>
							<Form.Item
								name="db_name"
								label="Database Name"
								rules={[{ required: true, message: 'Please enter database name' }]}
							>
								<Input placeholder="Please enter database name" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item
								name="db_user"
								label="Database User"
								rules={[{ required: true, message: 'Please enter database user' }]}
							>
								<Input placeholder="Please enter database user" />
							</Form.Item>
						</Col>
					</Row>
					<Row gutter={16}>
						<Col span={24}>
							<Form.Item
								name="description"
								label="Description"
								rules={[
									{
										required: true,
										message: 'please enter url description',
									},
								]}
							>
								<Input.TextArea rows={4} placeholder="please enter url description" />
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</Drawer>
		</>
	);
};

export default App;
