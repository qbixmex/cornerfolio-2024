import modern from '@/app/admin/portfolios/templates/modern-template.module.css';
import Link from 'next/link';

export default function NotFound() {
	return (
		<section
			className={`${modern.pageNotFoundBackground} flex justify-center items-center min-h-screen`}
		>
			<div className="bg-gray-800 opacity-80 rounded-lg flex flex-col gap-4 justify-center items-center py-24 px-24 lg:flex-row lg:items-center lg:gap-12 ">
				<div className="w-full lg:w-1/2">
					<p className="text-sm font-medium text-blue-500 ">404 error</p>
					<h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">Page not found</h1>
					<p className="text-gray-400">
						Sorry, this portfolio is not available.
					</p>

					<div className="flex items-center mt-6">
						<Link href="/">
							<button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600">
								Take me home
							</button>
						</Link>
					</div>
				</div>

				<div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
					<img
						className="w-full max-w-lg mx-auto"
						src="https://merakiui.com/images/components/illustration.svg"
						alt=""
					/>
				</div>
			</div>
		</section>
	);
}
