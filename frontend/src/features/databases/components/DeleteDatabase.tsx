import React, { useState } from 'react';
import { Button, message, Modal } from 'antd';
import { isAxiosError } from 'axios';

import { useDeleteDatabase } from '../api/deleteDatabase';

type DeleteDatabaseProps = {
	databaseId: string;
	callbackFunc: () => void;
};

const DeleteDatabase = ({ databaseId, callbackFunc }: DeleteDatabaseProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const deleteDatabaseMutation = useDeleteDatabase({ databaseId });

	const handleOK = async () => {
		await deleteDatabaseMutation.mutateAsync(
			{ databaseId },
			{
				onSuccess: () => {
					message.success('Database has been deleted.');
					callbackFunc();
				},
				onError: (error) => {
					if (isAxiosError(error) && error.response) {
						message.error(error.response.data.detail);
					}
				},
			}
		);
	};

	if (!databaseId) {
		return (
			<Button type="link" disabled>
				Delete
			</Button>
		);
	}

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
};

export default DeleteDatabase;
