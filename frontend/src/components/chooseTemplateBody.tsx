import { createNewPortfolioAndEdit } from "@/app/admin/portfolio-management/actions/portfolioActions";
import Image from "next/image";

export default function ChooseTemplateBody() {
	return (
		<div>
			<div className="mt-10 ml-20">
				<h2 className="mt-24 text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Choose your template
				</h2>
			</div>
			<div className="mt-10 ml-20 rounded-md">
				<form action={createNewPortfolioAndEdit}>
					<button type="submit">
						<Image
							src="https://source.unsplash.com/random"
							alt="Random Image"
							width={250}
							height={250}
							className="object-contain rounded-lg cursor-pointer hover:scale-105 transition-all duration-1000"
						/>
					</button>
				</form>
			</div>
		</div>
	);
}
