import { ContentLayout } from '@/components/Layout';
import { useUser } from '@/lib/auth';

export default function Dashboard() {
	const user = useUser();
	return (
		<ContentLayout title="Dashboard">
			<h1 className="text-xl mt-2">
				Welcome <b>{`${user.data?.name}`}</b>
			</h1>
			<h4 className="my-3">
				Email Address: <b>{user.data?.email}</b>
			</h4>
			<p className="font-medium">In this application you can:</p>
			<ul className="my-4 list-inside list-disc">
				<li>Create database</li>
				<li>Delete a database</li>
			</ul>
		</ContentLayout>
	);
}
