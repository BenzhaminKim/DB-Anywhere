import React from 'react';
import AppProvider from '@/providers/app';
import { Button } from 'antd';

export default function App() {
	return (
		<AppProvider>
			<Button type="primary">HELLo</Button>
		</AppProvider>
	);
}
