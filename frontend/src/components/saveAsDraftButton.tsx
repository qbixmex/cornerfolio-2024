"use client"

function DraftButton() {
	const saveAsDraft = (formData: FormData) => {
		console.log("Save as Draft button clicked");

	};

	return (
		<form action={saveAsDraft}>
			<button
				type="submit"
				className="flex justify-center rounded-md bg-sky-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
			>
				Save as Draft
			</button>
		</form>
	);
}

export default DraftButton;
