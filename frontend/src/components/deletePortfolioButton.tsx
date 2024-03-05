"use client"

function DeletePortfolioButton() {
	const deleteButton = (formData: FormData) => {

		console.log("Delete button clicked");
	};

	return (
		<form action={deleteButton}>
			<button className="flex  justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
				Delete
			</button>
		</form>
	);
}

export default DeletePortfolioButton;
