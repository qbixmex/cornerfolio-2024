"use client";

import { FormEvent, useState } from "react";
import { publishPortfolio, unPublishPortfolio } from "../actions/portfolio.action";
import Link from "next/link";

type Props = {
  portfolioId: string;
  tinyUrlId: string;
  status: string;
  setToast: (toast: { message: string; type: string }) => void;
};

const ManageStatus: React.FC<Readonly<Props>> = ({ portfolioId, tinyUrlId, status, setToast }) => {

  const [ currentStatus, setCurrentStatus ] = useState(status);
 
  const handlePublishPortfolio = async (event: FormEvent) => {
		event.preventDefault();

		try {
			const data = await publishPortfolio(portfolioId);

			if (data.error) {
				setToast({ message: data.error, type: 'error' });
			} else {
				setToast({ message: data.message, type: 'success' });
				setCurrentStatus('published');
			}

			setTimeout(() => setToast({ message: '', type: '' }), 4000);
		} catch (error) {
			console.error('Error publishing portfolio:', error);
		}
	};

	const handleUnPublishPortfolio = async (event: FormEvent) => {
		event.preventDefault();

		try {
			const data = await unPublishPortfolio(portfolioId);

			if (data.error) {
				setToast({ message: data.error, type: 'error' });
			} else {
				setToast({ message: data.message, type: 'success' });
				setCurrentStatus('draft');
			}
			setTimeout(() => setToast({ message: '', type: '' }), 4000);
		} catch (error) {
			console.error('Error publishing portfolio:', error);
		}
	};

  return (
    <section className="fixed top-[55px] w-full bg-gray-200 flex justify-end z-30">
    <div className="fixed top-[55px] w-full bg-gray-200 flex justify-end">
      {currentStatus === 'draft' && (
        <form onSubmit={handlePublishPortfolio}>
          <button
            type="submit"
            className="rounded-md bg-sky-600 hover:bg-sky-500 border m-2 px-4 py-2 justify-between text-white text-base transition-colors hover:cursor-pointer"
          >
            Publish
          </button>
        </form>
      )}

      {currentStatus === 'published' && (
        <form onSubmit={handleUnPublishPortfolio}>
          <button
            type="submit"
            className="rounded-md bg-sky-600 hover:bg-sky-500 border m-2 px-4 py-2 justify-between text-white text-base transition-colors hover:cursor-pointer"
          >
            Un-publish
          </button>
        </form>
      )}

      <Link
        href={`http://localhost:3000/${tinyUrlId}`}
        target="blank"
        className="rounded-md bg-blue-600 hover:bg-blue-500 border m-2 mr-20 px-4 py-2 justify-between text-white text-base transition-colors"
        title="Live Portfolio Preview"
      >
        Preview
      </Link>
    </div>
  </section>
  );

};

export default ManageStatus;
