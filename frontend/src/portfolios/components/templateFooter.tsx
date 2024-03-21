'use client';

import { updatePortfolioFooter } from '@/api/updatePortfolioFooter';
import { IPortfolio } from '@/interfaces';
import { useAppDispatch } from '@/store';
import { setReloading } from '@/store/slices/reload.slice';
import styles from '@/users/components/profile.module.css';
import { Button } from '@nextui-org/react';
import { useFormik } from 'formik';
import { useTheme } from 'next-themes';
import { useState } from 'react';
import * as yup from 'yup';
import modern from '../../app/admin/portfolios/templates/modern-template.module.css';

type Props = {
	portfolio: IPortfolio;
};

const formSchema = yup.object().shape({
	links: yup.string().min(1, 'Link must be at least 1 character').required('Link is required !'),
	text: yup.string().min(1, 'Text must be at least 1 character').required('Text is required !'),
});

type Footer = {
	links: string;
	text: string;
};

export const TemplateFooter: React.FC<Props> = ({ portfolio }) => {
	const dispatch = useAppDispatch();
	const { theme } = useTheme();

	const formik = useFormik<Footer>({
		initialValues: {
			links: portfolio.footer.links,
			text: portfolio.footer.text,
		},
		validationSchema: formSchema,
		onSubmit: async (formData) => {
			try {
				dispatch(setReloading(true)); // reloading true

				const data = await updatePortfolioFooter(portfolio.id, formData);
				console.log(formData);
				if (data.error) {
					setToast({ message: data.error, type: 'error' });
				} else {
					setToast({ message: data.message, type: 'success' });
				}
				setTimeout(() => setToast({ message: '', type: '' }), 4000);
			} catch (error) {
				console.error('Error updating Footer:', error);
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
					theme === 'modern' ? modern.footerBackgroundColor : ''
				}`}
			>
				<form
					className="gap-10 border-transparent border-2 w-full h-[150px] mt-[20px] p-[20px] hover:border-gray-300"
					onSubmit={formik.handleSubmit}
				>
					<div className="w-full outline-none text-5xl">
						<input
							id="links"
							name="links"
							value={formik.values.links}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className={`w-full outline-none text-sm bg-transparent
							${theme === 'modern' ? modern.footerTextColor : ''}
							${formik.touched.links && formik.errors.links ? 'border-2 border-red-500' : 'border-0'} `}
							type="text"
						/>
						{formik.errors.links && formik.touched.links && (
							<p className="text-red-500 text-xs">{formik.errors.links}</p>
						)}
					</div>
					<div className="w-full outline-none ">
						<input
							id="text"
							name="text"
							value={formik.values.text}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							className={`w-full outline-none  text-sm bg-transparent
							${theme === 'modern' ? modern.subHeaderInputField : ''}

							${formik.touched.text && formik.errors.text ? 'border-2 border-red-500' : 'border-0'} `}
							type="text"
						/>
						{formik.errors.text && formik.touched.text && (
							<p className="text-red-500 text-xs">{formik.errors.text}</p>
						)}
					</div>
					<Button
						type="submit"
						className={`
						bg-gradient-to-tr from-blue-900 to-purple-900 text-white px-8 
    ${formik.errors.links || formik.errors.text ? 'hidden' : ''} 
    flex items-center justify-center text-xs rounded-md  h-8 w-10 hover:bg-transparent`}
					>
						Save
					</Button>
				</form>
			</div>
		</>
	);
};
