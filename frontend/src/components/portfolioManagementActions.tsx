import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import DeletePortfolioButton from "./deletePortfolioButton";
import DraftButton from "./saveAsDraftButton";

export default function PortfolioManagementActions() {
	const published = true; //!this data is coming from the back end in the future
	return (
		<>
			<h2 className="mt-24 text-2xl font-bold leading-9 tracking-tight text-gray-900">
				My Existing Portfolios
			</h2>
			<ul className="bg-gray-200 mt-10 rounded-md p-10 gap-7 ">
				<li className="relative">
					<Image
						src="https://source.unsplash.com/random"
						alt="Random Image"
						width={250}
						height={250}
						className="object-contain rounded-lg cursor-pointer hover:scale-105 transition-all duration-1000"
					/>

					<div className="flex justify-between absolute w-full bottom-0 z-10 p-4">
						<DraftButton />

						<DeletePortfolioButton />
					</div>
					<div className="flex w-6 justify-end absolute top-0 z-100 ml-52 mt-3 text-white">
						{published ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
					</div>
				</li>
			</ul>
		</>
	);
}
