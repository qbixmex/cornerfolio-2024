"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import CreatePortfolioSection from "./createPortfolioSection";
import PortfolioManagementActions, { Portfolio } from "./portfolioManagementActions";
import Toast from "./toast";
import { resetToast } from "@/store/slices/toast.slice";
import { useEffect } from "react";

type Props = {
	data: Portfolio[];
};

const PortfolioManagementBody: React.FC<Props> = ({ data }) => {
	const dispatch = useAppDispatch();
	const toast = useAppSelector((state) => state.toast);

	useEffect(() => {
		if (toast.message.length > 0) {
			setTimeout(() => dispatch(resetToast()), 3000);
		}
	}, [toast.message]);

	return (
		<>
			{(toast.message) && (
        <Toast type={toast.type}>{toast.message}</Toast>
      )}

			<div className="flex flex-col items-center mb-10">
				<div className="flex flex-col justify-center items-center">
					<CreatePortfolioSection portfolioCount={data.length} />
				</div>
				<div className="flex flex-col justify-center items-center">
					<PortfolioManagementActions portfolios={data} />
				</div>
			</div>
		</>
	);
};

export default PortfolioManagementBody;
