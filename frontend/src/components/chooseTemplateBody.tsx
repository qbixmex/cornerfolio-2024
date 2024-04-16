import { createNewPortfolioAndEdit } from '@/app/admin/portfolio-management/actions/portfolioActions';
import Image from 'next/image';
import portfolio from '../../public/portfolio.gif';

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
						<div className="bg-gray-300 p-4 rounded-lg">
							<Image
								src={portfolio}
								alt="Random Image"
								width={350}
								height={350}
								className="object-contain rounded-lg cursor-pointer hover:scale-105 transition-all duration-1000"
							/>
						</div>
					</button>
				</form>
			</div>
		</div>
	);
}
