import NotFoundGraphic from "@/svg/404.not-found";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

type Props = {
	message: string;
};

const NotFoundPortfolio: React.FC<Props> = ({ message }) => {
	return (
		<div className="h-screen min-h-full">
			<div className="flex flex-col md:flex-row justify-center items-center h-full">
				<section className="w-full md:w-1/2">
					<NotFoundGraphic />
				</section>
				<section className="w-full md:w-1/2">
					<h2 className="mt-5 mb-10 text-center text-3xl lg:text-6xl font-bold leading-9 tracking-tight text-stone-700">
						{ message }
					</h2>
					<div className="flex justify-center items-center">
						<Link
							className="w-fit flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded transition duration-150"
							href="/admin/portfolio-management"
						>
							<FaArrowLeft className="mr-2" /> Go back
						</Link>
					</div>
				</section>
			</div>
		</div>
	);
};

export default NotFoundPortfolio;
