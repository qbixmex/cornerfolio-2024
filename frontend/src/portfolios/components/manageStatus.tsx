"use client";

import { FormEvent, useEffect, useState } from "react";
import { publishPortfolio, unPublishPortfolio } from "../actions/portfolio.action";
import Link from "next/link";
import { useAppDispatch } from "@/store";
import { resetToast, setToast } from "@/store/slices/toast.slice";

type Props = {
  portfolioId: string;
  tinyUrlId: string;
  status: string;
};

const HOST = process.env.CURRENT_URL ?? "http://localhost:3000";

const ManageStatus: React.FC<Readonly<Props>> = ({ portfolioId, tinyUrlId, status }) => {
  const dispatch = useAppDispatch();
  const [currentStatus, setCurrentStatus] = useState("");

  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  const handlePublishPortfolio = async (event: FormEvent) => {
		event.preventDefault();

    const data = await publishPortfolio(portfolioId);

    if ('error' in data) {
      dispatch(setToast({ message: data.error, type: 'error' }));
    }

    if ('message' in data) {
      dispatch(setToast({ message: "Portfolio published successfully 👍", type: 'success' }));
      setCurrentStatus(data.portfolio.type);
    }

    setTimeout(() => dispatch(resetToast()), 3000);
	};

	const handleUnPublishPortfolio = async (event: FormEvent) => {
		event.preventDefault();

    const data = await unPublishPortfolio(portfolioId);

    if ('error' in data) {
      dispatch(setToast({ message: data.error, type: 'error' }));
    }

    if ('message' in data) {
      dispatch(setToast({ message: "Portfolio un-published successfully 👍", type: 'success' }));
      setCurrentStatus(data.portfolio.type);
    }

    setTimeout(() => dispatch(resetToast()), 3000);
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
        href={`${HOST}/${tinyUrlId}`}
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
