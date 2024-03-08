import { deletePortfolio } from "@/api/deletePortfolioById.fetch";

function DeletePortfolioButton({ id }: { id: string }) {
	const deletePortfolioById = async (id: string) => {
		try {
			await deletePortfolio(id);

			console.log("Portfolio deleted successfully");
		} catch (error) {
			console.error("Error deleting portfolio:", error);
		}
	};

	return (
		<button
			className="flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			onClick={() => deletePortfolioById(id)}
		>
			Delete
		</button>
	);
}

export default DeletePortfolioButton;
