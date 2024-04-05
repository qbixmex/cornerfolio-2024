'use client';

import { UnPublishPortfolio } from '@/portfolios/actions/portfolio.action';
import { FormEvent, useState } from 'react';

type Props = {
	statusPortfolio: string;
	id: string;
};

function DraftButton({ statusPortfolio, id }: Props) {
	const [status, setStatus] = useState<'draft' | 'published'>('draft');

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
				setStatus('draft');
			}
			setTimeout(() => setToast({ message: '', type: '' }), 4000);
		} catch (error) {
			console.error('Error publishing portfolio:', error);
		}
	};

	return (
		<form onSubmit={handleUnPublishPortfolio}>
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
	);
}

export default DraftButton;
