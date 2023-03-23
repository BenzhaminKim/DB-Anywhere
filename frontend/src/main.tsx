import React from 'react';
import ReactDOM from 'react-dom/client';

import AppProvider from '@/providers/app';
import GlobalStyle from '@/styles/GlobalStyles';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<GlobalStyle />
		<AppProvider>
			<App />
		</AppProvider>
	</React.StrictMode>
);
