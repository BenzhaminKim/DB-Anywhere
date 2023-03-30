import * as React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, Spin } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import theme from '@/styles/theme';
import { ThemeProvider } from '@/styles/themed-components';
import globalAntTheme from '@/styles/AntTheme';
import { AuthLoader } from '@/lib/auth';
import { queryClient } from '@/lib/react-query';

type AppProviderProps = {
	children: React.ReactNode;
};

export default function AppProvider({ children }: AppProviderProps) {
	return (
		<React.Suspense fallback={<div>SPIN</div>}>
			<HelmetProvider>
				<QueryClientProvider client={queryClient}>
					{process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
					<ThemeProvider theme={theme}>
						<ConfigProvider theme={globalAntTheme}>
							<AuthLoader
								renderLoading={() => (
									<div className="w-screen h-screen flex justify-center items-center">
										<Spin size="large" />
									</div>
								)}
							>
								<Router>{children}</Router>
							</AuthLoader>
						</ConfigProvider>
					</ThemeProvider>
				</QueryClientProvider>
			</HelmetProvider>
		</React.Suspense>
	);
}
