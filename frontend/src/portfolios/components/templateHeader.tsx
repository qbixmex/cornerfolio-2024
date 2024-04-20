'use client';

import { updatePortfolioHeader } from '@/api/updatePortfolioHeader';
import { Theme } from '@/context/portfolio-theme-context';
import { IPortfolio } from '@/interfaces';
import { Button } from '@nextui-org/react';
import clsx from 'clsx';
import { useFormik } from 'formik';
import * as yup from 'yup';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';
import { setToast } from '@/store/slices/toast.slice';
import { useAppDispatch } from '@/store';

type Props = {
	portfolio: IPortfolio;
	theme: Theme;
};

const formSchema = yup.object().shape({
	title: yup.string().min(1, 'Title must be at least 1 character').required('Title is required !'),
	subHeading: yup
		.string()
		.min(1, 'SubHeading must be at least 1 character')
		.required('SubHeading is required !'),
});

type Header = {
	title: string;
	subHeading: string;
};

export const TemplateHeader: React.FC<Props> = ({ portfolio, theme }) => {
	const dispatch = useAppDispatch();

	const formik = useFormik<Header>({
		initialValues: {
			title: portfolio.header.title,
			subHeading: portfolio.header.subHeading,
		},
		validationSchema: formSchema,
		onSubmit: async (formData) => {
			try {
				const data = await updatePortfolioHeader(portfolio.id, formData);
				if (data.error) {
					dispatch(setToast({ message: data.error, type: 'error' }));
				}
				if (data.message) {
					dispatch(setToast({ message: data.message, type: 'success' }));
				}
			} catch (error) {
				console.error('Error updating header:', error);
			}
		},
	});

	return (
		<>
			<div
				className={`py-[30px] px-[80px] border-b-gray-300 border-2 mb-5 ${
					theme === 'modern' ? modern.headerBackGroundColor : ''
				}`}
			>
				<form
					className="gap-10 border-transparent border-2 w-full h-[150px] mt-[20px] p-[20px] hover:border-gray-300"
					onSubmit={formik.handleSubmit}
				>
					<div className="w-full outline-none text-5xl">
						<input
							id="title"
							name="title"
							value={formik.values.title}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className={`w-full outline-none text-5xl bg-transparent ${
								theme === 'modern' ? `${modern.headerFieldInput}` : ''
							}  ${
								formik.touched.title && formik.errors.title ? 'border-2 border-red-500' : 'border-0'
							} `}
							type="text"
						/>
						{formik.errors.title && formik.touched.title && (
							<p className="text-red-500 text-xs">{formik.errors.title}</p>
						)}
					</div>
					<div className="w-full outline-none ">
						<input
							id="subHeading"
							name="subHeading"
							value={formik.values.subHeading}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className={`w-full outline-none bg-transparent ${
								theme === 'modern' ? `${modern.subHeaderInputField} ` : ''
							} ${
								formik.touched.subHeading && formik.errors.subHeading
									? 'border-2 border-red-500'
									: 'border-0'
							} `}
							type="text"
						/>
						{formik.errors.subHeading && formik.touched.subHeading && (
							<p className="text-red-500 text-xs">{formik.errors.subHeading}</p>
						)}
					</div>
					<Button
						type="submit"
						className={clsx(
							'bg-gradient-to-tr from-blue-900 to-purple-900 text-white px-8 flex items-center justify-center text-xs rounded-md  h-8 w-10 hover:bg-transparent',
							{ hidden: formik.errors.title || formik.errors.subHeading },
						)}
					>
						Save
					</Button>
				</form>
			</div>
		</>
	);
};
