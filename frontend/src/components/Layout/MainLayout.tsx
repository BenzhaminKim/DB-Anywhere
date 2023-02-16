import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DesktopOutlined, PieChartOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

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
	getItem('Dashboard', '/app', <PieChartOutlined />),
	getItem('Database', '/app/database/', <DesktopOutlined />),
];

type MainLayoutProps = {
	children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
	const [collapsed, setCollapsed] = useState(false);
	const navigate = useNavigate();
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
				<div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
				<Menu
					theme="dark"
					defaultSelectedKeys={['/app']}
					mode="inline"
					items={items}
					onClick={(item) => {
						navigate(item.key);
					}}
				/>
			</Sider>
			<Layout className="site-layout">
				<Header style={{ padding: 0, background: colorBgContainer }} />
				<Content style={{ padding: 24, margin: 0, minHeight: 280, background: colorBgContainer }}>{children}</Content>
				<Footer style={{ textAlign: 'center' }}>DB Anywhere ©2023 Created by Younghwi Kim, Seunghyun Yu</Footer>
			</Layout>
		</Layout>
	);
}
