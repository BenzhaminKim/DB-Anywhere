import { Link as RouterLink, LinkProps } from 'react-router-dom';

export default function Link({ className, children, ...props }: LinkProps) {
	// eslint-disable-next-line react/jsx-props-no-spreading
	return <RouterLink {...props}>{children}</RouterLink>;
}
