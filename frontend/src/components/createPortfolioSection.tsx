import Link from "next/link";

export default function CreatePortfolioSection() {
	return (
		<>
			<h2 className="mt-24 text-2xl font-bold leading-9 tracking-tight text-gray-900">
				Manage Your Portfolios
			</h2>
			<div className="bg-gray-200 mt-10 rounded-md p-10 gap-7 ">
				<div className="mb-10">
					<h3>You have published "number" Portfolios</h3>
				</div>

				<Link href={"/"}>
					<button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
						Create New Portfolio
					</button>
				</Link>
			</div>
		</>
	);
}
