import * as React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

import { Card, TitleCard } from '@/components/Elements';
import Head from '@/components/Head';

const BackgroundDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background-color: ${(props) => props.theme.backgroundColor};
`;

const { Title } = Typography;

type LayoutProps = {
	children: React.ReactNode;
	title: string;
};

export default function Layout({ children, title }: LayoutProps) {
	return (
		<>
			<Head title={title} />
			<BackgroundDiv>
				<div>
					<TitleCard title="DbeeAnywhere" />
					<Card style={{ minWidth: '400px', minHeight: '400px' }}>
						<Title level={4}>{title}</Title>
						<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
							<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">{children}</div>
						</div>
					</Card>
				</div>
			</BackgroundDiv>
		</>
	);
}
