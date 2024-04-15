import NotFoundGraphic from "@/svg/404.not-found";
import Link from "next/link";

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
					<div className="text-center">
						<Link className="bg-blue-600 text-white py-2 px-3 rounded-xl font-semibold text-xl mb-10" href="/admin/portfolio-management">
							Go back
						</Link>
					</div>
				</section>
			</div>
		</div>
	);
};

export default NotFoundPortfolio;
