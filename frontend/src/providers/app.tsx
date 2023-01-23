import * as React from 'react';
import { ConfigProvider } from 'antd';

/**
function ErrorFalback() {
	return (
		<div>
			<h2>Hello </h2>
		</div>
	);
}
*/

type AppProviderProps = {
	children: React.ReactNode;
};

export default function AppProvider({ children }: AppProviderProps) {
	return (
		<React.Suspense fallback={<div>SPIN</div>}>
			<ConfigProvider>{children}</ConfigProvider>
		</React.Suspense>
	);
}
