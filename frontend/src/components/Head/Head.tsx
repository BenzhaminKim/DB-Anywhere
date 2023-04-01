// eslint-disable-next-line import/no-extraneous-dependencies
import { Helmet } from 'react-helmet-async';

interface HeadProps {
	// eslint-disable-next-line react/require-default-props
	title?: string;
	// eslint-disable-next-line react/require-default-props
	description?: string;
}

export default function Head({ title = '', description = '' }: HeadProps) {
	return (
		<Helmet title={title ? `${title} | DbeeAnywhere` : undefined} defaultTitle="DbeeAnywhere">
			<meta name="description" content={description} />
		</Helmet>
	);
}
