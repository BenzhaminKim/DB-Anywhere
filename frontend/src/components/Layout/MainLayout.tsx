import React from 'react';
import { Layout } from 'antd';

import Header from './Header';

const { Content, Footer } = Layout;

type MainLayoutProps = {
	children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
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
			<Header />
			<Content style={{ padding: 24, margin: 0, minHeight: 280, background: 'transparent' }}>{children}</Content>
			<Footer style={{ textAlign: 'center', background: 'transparent' }}>
				DbeeAnywhere ©2023 Created by Younghwi Kim, Seunghyun Yu
			</Footer>
		</Layout>
	);
};

export default MainLayout;
