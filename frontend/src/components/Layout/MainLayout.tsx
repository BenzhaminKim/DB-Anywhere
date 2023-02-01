import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}

const items: MenuItem[] = [
	getItem('Option 1', '1', <PieChartOutlined />),
	getItem('Option 2', '2', <DesktopOutlined />),
	getItem('User', 'sub1', <UserOutlined />, [getItem('Tom', '3'), getItem('Bill', '4'), getItem('Alex', '5')]),
	getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
	getItem('Files', '9', <FileOutlined />),
];

type MainLayoutProps = {
	children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
				<div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
				<Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
			</Sider>
			<Layout className="site-layout">
				<Header style={{ padding: 0, background: colorBgContainer }} />
				<Content style={{ margin: '0 16px' }}>{children}</Content>
				<Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
			</Layout>
		</Layout>
	);
}

