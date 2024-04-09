import Link from 'next/link';

export default function NotFound() {
	return (
		<div
			style={{
				backgroundImage: `url(/backGround.jpg)`,
				backgroundSize: 'cover',
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
			}}
			className="flex min-h-full flex-col justify-center align-center items-center space-y-8 bg-cover h-screen w-screen"
		>
			<div className="flex min-h-full flex-col justify-center align-center px-6 py-12 lg:px-8 items-center space-y-8 bg-cover bg-black w-screen h-screen bg-opacity-50">
				<div className="bg-gray-600 bg-opacity-70 rounded-lg p-12">
					<h2 className="mt-5 text-center text-6xl font-bold leading-9 tracking-tight text-sky-300 mb-5">
						This Portfolio is not available
					</h2>
				</div>

				<Link
					className="bg-blue-400 rounded-md p-5 text-white hover:bg-blue-600 transition-colors"
					href="/"
				>
					Return Home
				</Link>
			</div>
		</div>
	);
}
