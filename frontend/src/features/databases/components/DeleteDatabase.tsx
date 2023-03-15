import React, { useState } from 'react';
import { Button, Modal } from 'antd';

import { useDeleteDatabase } from '../api/deleteDatabase';

export default function DatabasesList({ databaseId }: { databaseId: string }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const deleteDatabaseMutation = useDeleteDatabase({ databaseId });

	const handleOK = async () => {
		await deleteDatabaseMutation.mutateAsync({ databaseId });
	};

	return (
		<>
			<Button type="link" onClick={() => setIsModalOpen(true)} loading={deleteDatabaseMutation.isLoading}>
				Delete
			</Button>
			<Modal
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				onOk={() => handleOK()}
				closable={!deleteDatabaseMutation.isLoading}
				confirmLoading={deleteDatabaseMutation.isLoading}
				title="Delete the database"
				okText="Yes"
				cancelText="No"
			/>
		</>
	);
}
