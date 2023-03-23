import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Layout, theme } from 'antd';

import Header from './Header';

const { Content, Footer } = Layout;

type MainLayoutProps = {
	children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<Layout
			className="site-layout"
			style={{
				backgroundImage: 'url(https://www.icloud.com/system/icloud.com/current/static/wallpaper.webp)',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				minHeight: '100vh',
				backgroundColor: '#32a2f6',
			}}
		>
			<Header style={{ padding: 0, background: colorBgContainer }} />
			<Content style={{ padding: 24, margin: 0, minHeight: 280, background: 'transparent' }}>{children}</Content>
			<Footer style={{ textAlign: 'center', background: 'transparent' }}>
				DB Anywhere ©2023 Created by Younghwi Kim, Seunghyun Yu
			</Footer>
		</Layout>
	);
}
