'use client';

import { UnPublishPortfolio } from '@/portfolios/actions/portfolio.action';
import { FormEvent, useState } from 'react';
import styles from '@/users/components/profile.module.css';


type Props = {
	statusPortfolio: string;
	id: string;
};

function DraftButton({ statusPortfolio, id }: Props) {
	const [toast, setToast] = useState({
		message: '',
		type: '',
	});
	const handleUnPublishPortfolio = async (event: FormEvent) => {
		event.preventDefault();

		try {
			const data = await UnPublishPortfolio(id);
			console.log(data);

			if (data.error) {
				setToast({ message: data.error, type: 'error' });
			} else {
				setToast({ message: data.message, type: 'success' });
			}
			setTimeout(() => setToast({ message: '', type: '' }), 3000);
		} catch (error) {
			console.error('Error publishing portfolio:', error);
		}
	};

	return (
		<>
		
			<form onSubmit={handleUnPublishPortfolio}>
			{toast.message && (
						<div
							className={`absolute z-[1000] left-2 right-2 w-11/12 bg-${
								toast.type === 'error' ? 'red' : 'green'
							}-500 text-white text-sx text-center px-1 py-1 rounded-md ${styles.shadow}`}
						>
							{toast.message}
						</div>
					)}
				{statusPortfolio !== 'draft' && (
					<button
						type="submit"
						className="flex justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						disabled={statusPortfolio === 'draft'}
					>
						Save as Draft
					</button>
				)}
			</form>
		</>
	);
}

export default DraftButton;
