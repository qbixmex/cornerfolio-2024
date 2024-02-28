"use client";

export default function ErrorBoundary({ error }: { error: Error }) {
	return (
		<div className="flex min-h-full flex-col justify-center align-center px-6 py-12 lg:px-8 h-screen items-center space-y-8 bg-white">
			<h2 className="mt-5 text-center text-6xl font-bold leading-9 tracking-tight text-gray-900">
				Something Wrong Happened:
			</h2>
			<div
				className=" flex items-center flex-col m-y-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative space-y-6"
				role="alert"
			>
				<p className="font-bold">Error:</p>
				<p className="text-sm">{error.message}</p>
			</div>
		</div>
	);
}
