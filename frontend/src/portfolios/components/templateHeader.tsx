'use client';

import { updatePortfolioHeader } from '@/api/updatePortfolioHeader';
import { IPortfolio } from '@/interfaces';
import { useAppDispatch } from '@/store';
import { setReloading } from '@/store/slices/reload.slice';
import styles from '@/users/components/profile.module.css';
import { useFormik } from 'formik';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import * as yup from 'yup';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';
import clsx from 'clsx';

type Props = {
	portfolio: IPortfolio;
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

export const TemplateHeader: React.FC<Props> = ({ portfolio }) => {
	const dispatch = useAppDispatch();
	const { theme } = useTheme();

	const formik = useFormik<Header>({
		initialValues: {
			title: portfolio.header.title,
			subHeading: portfolio.header.subHeading,
		},
		validationSchema: formSchema,
		onSubmit: async (formData) => {
			try {
				dispatch(setReloading(true)); // reloading true

				const data = await updatePortfolioHeader(portfolio.id, formData);
				console.log(formData);
				if (data.error) {
					setToast({ message: data.error, type: 'error' });
				} else {
					setToast({ message: data.message, type: 'success' });
				}
				setTimeout(() => setToast({ message: '', type: '' }), 4000);
			} catch (error) {
				console.error('Error updating header:', error);
			} finally {
				dispatch(setReloading(false)); // reloading false
			}
		},
	});

	const [toast, setToast] = useState({
		message: '',
		type: '',
	});

	return (
		<>
			{toast.message && (
				<div
					className={`fixed z-[100] top-5 right-5 w-fit bg-${
						toast.type === 'error' ? 'red' : 'green'
					}-500 text-white text-lg px-5 py-3 rounded-md mb-5 ${styles.slideLeft}`}
				>
					{toast.message}
				</div>
			)}

			<div
				className={`py-[30px] px-[80px] border-b-gray-300 border-2 ${
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
					<button
						type="submit"
						className={clsx(
							`hover:bg-gray-200 flex text-xs justify-center self-center rounded-md border h-8 w-9`,
							{ 'hidden': formik.errors.title || formik.errors.subHeading }
						)}
					>save</button>
				</form>
			</div>
		</>
	);
};
