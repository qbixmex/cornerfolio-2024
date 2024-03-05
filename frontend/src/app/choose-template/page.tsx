import Image from "next/image";
import Link from "next/link";

export default function ChooseTemplatePage() {
	return (
		<div>
			<div className="mt-10 ml-20">
				<h2 className="mt-24 text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Choose your template
				</h2>
			</div>
			<div className="mt-10 ml-20 rounded-md">
				<Link href={"/"}>
					<Image
						src="https://source.unsplash.com/random"
						alt="Random Image"
						width={250}
						height={250}
						className="object-contain rounded-lg cursor-pointer hover:scale-105 transition-all duration-1000"
					/>
				</Link>
			</div>
		</div>
	);
}
