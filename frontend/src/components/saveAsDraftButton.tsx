'use client';

import { unPublishPortfolio } from '@/portfolios/actions/portfolio.action';
import { FormEvent, useState } from 'react';
import styles from '@/users/components/profile.module.css';
import { useAppDispatch } from '@/store';
import { setToast } from '@/store/slices/toast.slice';

type Props = {
	statusPortfolio: string;
	id: string;
};

function DraftButton({ statusPortfolio, id }: Props) {

	const dispatch = useAppDispatch();
	
	const handleUnPublishPortfolio = async (event: FormEvent) => {
		event.preventDefault();

		try {
			const data = await unPublishPortfolio(id);

			if (data.error) {
				dispatch(setToast({ message: data.error, type: 'error' }));
			}

			if (data.message) {
				dispatch(setToast({ message: data.message, type: 'success' }));
			}
		} catch (error) {
			console.error('Error publishing portfolio:', error);
		}
	};

	return (
		<>
			<form onSubmit={handleUnPublishPortfolio}>
				{statusPortfolio !== 'draft' && (
					<button
						type="submit"
						className="flex justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						disabled={statusPortfolio === 'draft'}
					>
						un-publish
					</button>
				)}
			</form>
		</>
	);
}

export default DraftButton;
