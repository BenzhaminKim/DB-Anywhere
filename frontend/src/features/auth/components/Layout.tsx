import * as React from 'react';
import { Card } from 'antd';

import Head from '@/components/Head';

type LayoutProps = {
	children: React.ReactNode;
	title: string;
};

export default function Layout({ children, title }: LayoutProps) {
	return (
		<>
			<Head title={title} />
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
				<Card style={{ minWidth: '400px', minHeight: '400px' }}>
					<div className="sm:mx-auto sm:w-full sm:max-w-md">
						<div className="flex justify-center">DB Anywhere</div>
						<h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">{title}</h2>
					</div>
					<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
						<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">{children}</div>
					</div>
				</Card>
			</div>
		</>
	);
}
